"use client";
import {
  EmailAuthProvider,
  type User,
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  updateProfile,
} from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getUserApiKey, onApiKeyChange, setUserApiKey } from "./ai";
import { accountsEnabled, auth, db } from "./firebase";
import { applyRemote, clearLocal, onLocalWrite, store, syncableKeys } from "./storage";

// ───────────── Firestore layout ─────────────
//   users/{uid}                 profile: displayName, email, createdAt
//   users/{uid}/private/keys    { anthropicApiKey }
//   users/{uid}/data/{key}      { json, updatedAt }  one document per progress key (attempts, srs, plan…)
// firestore.rules lets each signed-in user read and write only their own users/{uid} tree.

const OWNER = "clb9-owner"; // uid whose progress is currently in this browser
const META = "clb9-sync-meta"; // { key: last local change, ms }

export type SyncState = "idle" | "syncing" | "synced" | "error";

export interface Profile {
  displayName: string;
  email: string;
}

interface AccountCtx {
  enabled: boolean;
  loading: boolean;
  user: User | null;
  profile: Profile | null;
  sync: SyncState;
  syncError: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveProfile: (p: { displayName: string }) => Promise<void>;
  saveApiKey: (key: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
  syncNow: () => Promise<void>;
}

const Ctx = createContext<AccountCtx | null>(null);

function readMeta(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(META) || "{}");
  } catch {
    return {};
  }
}
function writeMeta(m: Record<string, number>) {
  try {
    localStorage.setItem(META, JSON.stringify(m));
  } catch {}
}
function readOwner() {
  try {
    return localStorage.getItem(OWNER);
  } catch {
    return null;
  }
}
function writeOwner(uid: string | null) {
  try {
    if (uid) localStorage.setItem(OWNER, uid);
    else localStorage.removeItem(OWNER);
  } catch {}
}

const userDoc = (uid: string) => doc(db(), "users", uid);
const keysDoc = (uid: string) => doc(db(), "users", uid, "private", "keys");
const dataCol = (uid: string) => collection(db(), "users", uid, "data");

/** Two-way merge on sign-in: newest copy of each key wins. */
async function pullAndMerge(uid: string) {
  const owner = readOwner();
  if (owner && owner !== uid) {
    // Someone else's progress is in this browser: never mix accounts.
    clearLocal();
    writeMeta({});
  }
  const meta = readMeta();
  const snap = await getDocs(dataCol(uid));
  const incoming: Record<string, unknown> = {};
  const remoteTs: Record<string, number> = {};
  snap.forEach((d) => {
    const { json, updatedAt } = d.data() as { json?: string; updatedAt?: { toMillis(): number } };
    const ts = updatedAt?.toMillis?.() ?? 0;
    remoteTs[d.id] = ts;
    if (json != null && (meta[d.id] ?? 0) < ts) {
      try {
        incoming[d.id] = JSON.parse(json);
        meta[d.id] = ts;
      } catch {
        /* skip a corrupt document */
      }
    }
  });
  applyRemote(incoming);
  writeOwner(uid);
  writeMeta(meta);
  // Upload anything that is newer here (including progress made before signing in).
  const toPush = syncableKeys().filter((k) => !(k in remoteTs) || (meta[k] ?? Date.now()) > remoteTs[k]);
  await pushKeys(uid, toPush);
}

async function pushKeys(uid: string, keys: string[]) {
  if (!keys.length) return;
  const meta = readMeta();
  // Firestore batches allow 500 writes; progress has only a handful of keys.
  const batch = writeBatch(db());
  keys.forEach((k) => {
    const value = store.read<unknown>(k, null);
    if (value === null) batch.delete(doc(dataCol(uid), k));
    else batch.set(doc(dataCol(uid), k), { json: JSON.stringify(value), updatedAt: serverTimestamp() });
    meta[k] = Date.now();
  });
  await batch.commit();
  writeMeta(meta);
}

async function deleteAllData(uid: string) {
  const snap = await getDocs(dataCol(uid));
  const batch = writeBatch(db());
  snap.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(accountsEnabled);
  const [sync, setSync] = useState<SyncState>("idle");
  const [syncError, setSyncError] = useState<string | null>(null);
  const dirty = useRef(new Set<string>());
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uidRef = useRef<string | null>(null);

  const flush = useCallback(async () => {
    const uid = uidRef.current;
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    if (!uid) return;
    const keys = [...dirty.current];
    dirty.current.clear();
    if (!keys.length) return;
    setSync("syncing");
    try {
      if (keys.includes("*")) {
        await deleteAllData(uid);
        writeMeta({});
      } else {
        await pushKeys(uid, keys);
      }
      setSync("synced");
      setSyncError(null);
    } catch (e) {
      keys.forEach((k) => dirty.current.add(k)); // retry on the next change or "Sync now"
      setSync("error");
      setSyncError(e instanceof Error ? e.message : String(e));
    }
  }, []);

  // Track local changes and push them a couple of seconds later.
  useEffect(() => {
    if (!accountsEnabled) return;
    const off = onLocalWrite((key) => {
      if (key.startsWith("draft:")) return;
      const meta = readMeta();
      meta[key] = Date.now();
      writeMeta(meta);
      if (!uidRef.current) return;
      if (key === "*") dirty.current.clear();
      dirty.current.add(key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(flush, 2000);
    });
    const offKey = onApiKeyChange((key) => {
      const uid = uidRef.current;
      if (uid) setDoc(keysDoc(uid), { anthropicApiKey: key, updatedAt: serverTimestamp() }).catch(() => {});
    });
    const onHide = () => {
      if (document.visibilityState === "hidden") void flush();
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      off();
      offKey();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, [flush]);

  // React to sign-in / sign-out.
  useEffect(() => {
    if (!accountsEnabled) return;
    return onAuthStateChanged(auth(), async (u) => {
      uidRef.current = u?.uid ?? null;
      setUser(u);
      if (!u) {
        setProfile(null);
        setSync("idle");
        setLoading(false);
        return;
      }
      setSync("syncing");
      try {
        const [p, k] = await Promise.all([getDoc(userDoc(u.uid)), getDoc(keysDoc(u.uid))]);
        const data = p.data() as Partial<Profile> | undefined;
        setProfile({ displayName: data?.displayName ?? u.displayName ?? "", email: u.email ?? "" });
        const key = (k.data()?.anthropicApiKey as string | undefined) ?? "";
        if (key) setUserApiKey(key, false);
        else if (getUserApiKey() && readOwner() === u.uid) await setDoc(keysDoc(u.uid), { anthropicApiKey: getUserApiKey(), updatedAt: serverTimestamp() });
        else setUserApiKey("", false);
        await pullAndMerge(u.uid);
        setSync("synced");
        setSyncError(null);
      } catch (e) {
        setSync("error");
        setSyncError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo<AccountCtx>(
    () => ({
      enabled: accountsEnabled,
      loading,
      user,
      profile,
      sync,
      syncError,
      async signUp(name, email, password) {
        const cred = await createUserWithEmailAndPassword(auth(), email.trim(), password);
        await updateProfile(cred.user, { displayName: name.trim() });
        await setDoc(userDoc(cred.user.uid), { displayName: name.trim(), email: email.trim(), createdAt: serverTimestamp() });
        setProfile({ displayName: name.trim(), email: email.trim() });
      },
      async signIn(email, password) {
        await signInWithEmailAndPassword(auth(), email.trim(), password);
      },
      async resetPassword(email) {
        await sendPasswordResetEmail(auth(), email.trim());
      },
      async signOut() {
        await flush();
        await fbSignOut(auth());
        // Leave nothing behind for the next person on this device.
        clearLocal();
        writeMeta({});
        writeOwner(null);
        setUserApiKey("", false);
      },
      async saveProfile({ displayName }) {
        const u = auth().currentUser;
        if (!u) throw new Error("Not signed in.");
        await updateProfile(u, { displayName: displayName.trim() });
        await setDoc(userDoc(u.uid), { displayName: displayName.trim(), email: u.email ?? "" }, { merge: true });
        setProfile({ displayName: displayName.trim(), email: u.email ?? "" });
      },
      async saveApiKey(key) {
        const u = auth().currentUser;
        if (!u) throw new Error("Not signed in.");
        await setDoc(keysDoc(u.uid), { anthropicApiKey: key.trim(), updatedAt: serverTimestamp() });
        setUserApiKey(key.trim(), false);
      },
      async deleteAccount(password) {
        const u = auth().currentUser;
        if (!u?.email) throw new Error("Not signed in.");
        await reauthenticateWithCredential(u, EmailAuthProvider.credential(u.email, password));
        uidRef.current = null;
        await deleteAllData(u.uid);
        await deleteDoc(keysDoc(u.uid));
        await deleteDoc(userDoc(u.uid));
        await deleteUser(u);
        clearLocal();
        writeMeta({});
        writeOwner(null);
        setUserApiKey("", false);
      },
      async syncNow() {
        const uid = uidRef.current;
        if (!uid) return;
        setSync("syncing");
        try {
          await flush();
          await pullAndMerge(uid);
          setSync("synced");
          setSyncError(null);
        } catch (e) {
          setSync("error");
          setSyncError(e instanceof Error ? e.message : String(e));
        }
      },
    }),
    [loading, user, profile, sync, syncError, flush],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAccount(): AccountCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAccount must be used inside <AccountProvider>.");
  return ctx;
}

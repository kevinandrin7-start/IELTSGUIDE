"use client";
import { type FirebaseApp, getApps, initializeApp } from "firebase/app";
import { type Auth, connectAuthEmulator, getAuth } from "firebase/auth";
import { type Firestore, connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "./firebaseConfig";

function config(): typeof FIREBASE_CONFIG {
  const env = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;
  if (env) {
    try {
      return { ...FIREBASE_CONFIG, ...JSON.parse(env) };
    } catch {
      /* fall back to the committed config */
    }
  }
  return FIREBASE_CONFIG;
}

/** True when a Firebase project is configured, i.e. accounts are available. */
export const accountsEnabled = Boolean(config().apiKey && config().projectId);

let app: FirebaseApp | null = null;
// Local testing only: NEXT_PUBLIC_FIREBASE_EMULATOR=1 points the app at `firebase emulators:start`.
const useEmulator = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === "1";

function firebaseApp(): FirebaseApp {
  if (!accountsEnabled) throw new Error("Accounts are not configured.");
  if (!app) {
    app = getApps()[0] ?? initializeApp(config());
    if (useEmulator) {
      connectAuthEmulator(getAuth(app), "http://127.0.0.1:9099", { disableWarnings: true });
      connectFirestoreEmulator(getFirestore(app), "127.0.0.1", 8080);
    }
  }
  return app;
}

export const auth = (): Auth => getAuth(firebaseApp());
export const db = (): Firestore => getFirestore(firebaseApp());

/** Turns Firebase error codes into plain-English messages. */
export function authMessage(err: unknown): string {
  const code = (err as { code?: string })?.code ?? "";
  const map: Record<string, string> = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/missing-password": "Enter your password.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/user-not-found": "No account uses that email.",
    "auth/email-already-in-use": "An account with that email already exists. Try signing in.",
    "auth/weak-password": "Use a password with at least 8 characters.",
    "auth/too-many-requests": "Too many attempts. Wait a few minutes and try again.",
    "auth/network-request-failed": "You appear to be offline. Check your connection.",
    "auth/requires-recent-login": "For security, enter your password again to do this.",
    "auth/unauthorized-domain": "This website isn't on the project's authorized domains list in Firebase.",
    "permission-denied": "The database refused access. Check that the security rules are published.",
  };
  return map[code] ?? (err instanceof Error ? err.message : "Something went wrong. Please try again.");
}

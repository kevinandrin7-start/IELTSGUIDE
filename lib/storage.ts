"use client";
import { useCallback, useSyncExternalStore } from "react";
import type { Attempt, ErrorEntry, SrsState, StudyPlan } from "./types";

// ───────────── LocalStorage store (small JSON state) ─────────────
// Everything is namespaced under "clb9:" so it can be exported/reset in one go.

const PREFIX = "clb9:";
const listeners = new Set<() => void>();
const cache = new Map<string, unknown>();

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  if (cache.has(key)) return cache.get(key) as T;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    const val = raw ? (JSON.parse(raw) as T) : fallback;
    cache.set(key, val);
    return val;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, val: T) {
  cache.set(key, val);
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(val));
  } catch {
    /* storage full / private mode – keep in memory */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(PREFIX)) {
      cache.delete(e.key.slice(PREFIX.length));
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

/** React hook: persistent state backed by localStorage, shared across components. */
export function useStored<T>(key: string, fallback: T): [T, (v: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(key, fallback),
    () => fallback,
  );
  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const prev = read(key, fallback);
      write(key, typeof v === "function" ? (v as (p: T) => T)(prev) : v);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set];
}

export const store = { read, write };

// ───────────── Domain helpers ─────────────

const EMPTY_ATTEMPTS: Attempt[] = [];
const EMPTY_ERRORS: ErrorEntry[] = [];
const EMPTY_DAYS: string[] = [];
const EMPTY_SRS: Record<string, SrsState> = {};

export const useAttempts = () => useStored<Attempt[]>("attempts", EMPTY_ATTEMPTS);
export const useErrors = () => useStored<ErrorEntry[]>("errors", EMPTY_ERRORS);
export const usePlan = () => useStored<StudyPlan | null>("plan", null);
export const useSrs = () => useStored<Record<string, SrsState>>("srs", EMPTY_SRS);
export const useStudyDays = () => useStored<string[]>("days", EMPTY_DAYS);
export const useDoneTasks = () => useStored<string[]>("planDone", EMPTY_DAYS);
export const useLessonsDone = () => useStored<string[]>("lessonsDone", EMPTY_DAYS);

export function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Mark today as a study day (drives the streak). */
export function markStudied() {
  const days = read<string[]>("days", []);
  const t = today();
  if (!days.includes(t)) write("days", [...days, t]);
}

export function addAttempt(a: Attempt) {
  write("attempts", [...read<Attempt[]>("attempts", []), a]);
  markStudied();
}

export function addErrors(entries: ErrorEntry[]) {
  if (!entries.length) return;
  write("errors", [...entries, ...read<ErrorEntry[]>("errors", [])].slice(0, 500));
}

export function streak(days: string[]): number {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  // allow streak to continue if today not studied yet
  if (!set.has(today())) d.setDate(d.getDate() - 1);
  for (;;) {
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!set.has(k)) break;
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function exportAll(): string {
  const out: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(PREFIX)) out[k] = JSON.parse(localStorage.getItem(k) || "null");
  }
  return JSON.stringify(out, null, 2);
}

export function resetAll() {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(PREFIX)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
  cache.clear();
  listeners.forEach((l) => l());
}

// ───────────── IndexedDB (large blobs: speaking recordings) ─────────────

function idb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open("clb9", 1);
    req.onupgradeneeded = () => req.result.createObjectStore("recordings");
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveRecording(key: string, blob: Blob) {
  const db = await idb();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction("recordings", "readwrite");
    tx.objectStore("recordings").put(blob, key);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}

export async function loadRecording(key: string): Promise<Blob | undefined> {
  const db = await idb();
  return new Promise((res, rej) => {
    const tx = db.transaction("recordings", "readonly");
    const r = tx.objectStore("recordings").get(key);
    r.onsuccess = () => res(r.result as Blob | undefined);
    r.onerror = () => rej(r.error);
  });
}

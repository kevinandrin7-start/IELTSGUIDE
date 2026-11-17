"use client";
import { useCallback, useEffect, useRef, useState } from "react";

/** Countdown timer. Calls onExpire once when it reaches 0. */
export function useCountdown(seconds: number, opts: { running: boolean; onExpire?: () => void }) {
  const [left, setLeft] = useState(seconds);
  const expired = useRef(false);
  const cb = useRef(opts.onExpire);
  cb.current = opts.onExpire;

  useEffect(() => {
    if (!opts.running) return;
    const end = Date.now() + left * 1000;
    const t = setInterval(() => {
      const l = Math.max(0, Math.round((end - Date.now()) / 1000));
      setLeft(l);
      if (l === 0 && !expired.current) {
        expired.current = true;
        clearInterval(t);
        cb.current?.();
      }
    }, 250);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opts.running]);

  const reset = useCallback((s: number) => {
    expired.current = false;
    setLeft(s);
  }, []);

  return { left, reset };
}

/** MediaRecorder wrapper for Speaking practice. */
export function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rec = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const resolver = useRef<((b: Blob | null) => void) | null>(null);

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunks.current = [];
      mr.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: mr.mimeType || "audio/webm" });
        resolver.current?.(blob);
        resolver.current = null;
      };
      mr.start();
      rec.current = mr;
      setRecording(true);
      return true;
    } catch {
      setError("Microphone unavailable. Allow microphone access in your browser to record (you can still practise speaking aloud).");
      return false;
    }
  }, []);

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!rec.current || rec.current.state === "inactive") return resolve(null);
      resolver.current = resolve;
      rec.current.stop();
      setRecording(false);
    });
  }, []);

  useEffect(() => () => {
    if (rec.current && rec.current.state !== "inactive") rec.current.stop();
  }, []);

  return { recording, error, start, stop };
}

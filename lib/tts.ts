"use client";
import type { ScriptLine, Speaker } from "./types";

// Web Speech API wrapper that plays a multi-speaker script line by line,
// giving each speaker a distinct voice. Used for Listening mock tests,
// drills, vocabulary pronunciation and Speaking examiner questions.

export function ttsSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

let voiceCache: SpeechSynthesisVoice[] = [];
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (!ttsSupported()) return Promise.resolve([]);
  const v = speechSynthesis.getVoices();
  if (v.length) {
    voiceCache = v;
    return Promise.resolve(v);
  }
  return new Promise((resolve) => {
    const done = () => {
      voiceCache = speechSynthesis.getVoices();
      resolve(voiceCache);
    };
    speechSynthesis.addEventListener("voiceschanged", done, { once: true });
    setTimeout(done, 1500);
  });
}

const FEMALE_HINTS = ["female", "samantha", "victoria", "karen", "moira", "tessa", "serena", "fiona", "zira", "susan", "hazel", "libby", "sonia", "natasha", "aria", "jenny", "kate", "google uk english female", "google us english"];
const MALE_HINTS = ["male", "daniel", "alex", "fred", "oliver", "george", "david", "mark", "james", "ryan", "guy", "thomas", "arthur", "google uk english male", "rishi"];

/** Pick English voices, preferring UK/AU/CA/US variety like the real test. */
export function pickVoice(gender: "male" | "female", index = 0): SpeechSynthesisVoice | undefined {
  const en = voiceCache.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  if (!en.length) return undefined;
  const hints = gender === "female" ? FEMALE_HINTS : MALE_HINTS;
  const matches = en.filter((v) => hints.some((h) => v.name.toLowerCase().includes(h)));
  const pool = matches.length ? matches : en;
  return pool[index % pool.length];
}

export function speak(text: string, opts: { rate?: number; gender?: "male" | "female"; onEnd?: () => void } = {}) {
  if (!ttsSupported()) return opts.onEnd?.();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-GB";
  u.rate = opts.rate ?? 0.95;
  const v = pickVoice(opts.gender ?? "female");
  if (v) u.voice = v;
  u.onend = () => opts.onEnd?.();
  u.onerror = () => opts.onEnd?.();
  speechSynthesis.speak(u);
}

export function stopSpeech() {
  if (ttsSupported()) speechSynthesis.cancel();
}

export interface ScriptPlayer {
  play: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  seek: (line: number) => void;
  setRate: (r: number) => void;
}

/**
 * Plays script lines sequentially. Calls onLine(index) when each line starts
 * (for transcript sync) and onDone when finished.
 */
export function createScriptPlayer(
  script: ScriptLine[],
  speakers: Speaker[],
  cb: { onLine?: (i: number) => void; onDone?: () => void },
  initialRate = 1,
): ScriptPlayer {
  let idx = 0;
  let rate = initialRate;
  let stopped = true;
  let token = 0;

  const voiceFor = (name: string) => {
    const si = speakers.findIndex((s) => s.name === name);
    const sp = speakers[si];
    if (!sp) return { voice: pickVoice("male", 3), pitch: 1, rate: 1 };
    const sameGenderBefore = speakers.slice(0, si).filter((s) => s.voice === sp.voice).length;
    return { voice: pickVoice(sp.voice, sameGenderBefore), pitch: sp.pitch ?? 1, rate: sp.rate ?? 1 };
  };

  const playLine = (my: number) => {
    if (stopped || my !== token) return;
    if (idx >= script.length) {
      stopped = true;
      cb.onDone?.();
      return;
    }
    const line = script[idx];
    cb.onLine?.(idx);
    const u = new SpeechSynthesisUtterance(line.text);
    const v = voiceFor(line.speaker);
    if (v.voice) u.voice = v.voice;
    u.lang = v.voice?.lang || "en-GB";
    u.pitch = v.pitch;
    u.rate = Math.min(2, Math.max(0.5, rate * v.rate * 0.95));
    u.onend = () => {
      if (my !== token) return;
      idx++;
      setTimeout(() => playLine(my), 350);
    };
    u.onerror = u.onend;
    speechSynthesis.speak(u);
  };

  return {
    play() {
      if (!ttsSupported()) {
        cb.onDone?.();
        return;
      }
      speechSynthesis.cancel();
      stopped = false;
      token++;
      loadVoices().then(() => playLine(token));
    },
    pause() {
      speechSynthesis.pause();
    },
    resume() {
      speechSynthesis.resume();
    },
    stop() {
      stopped = true;
      token++;
      speechSynthesis.cancel();
    },
    seek(line: number) {
      idx = Math.max(0, Math.min(script.length - 1, line));
      if (!stopped) {
        token++;
        speechSynthesis.cancel();
        const my = token;
        setTimeout(() => playLine(my), 50);
      }
    },
    setRate(r: number) {
      rate = r;
    },
  };
}

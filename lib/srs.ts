import type { SrsState } from "./types";

// SM-2 style spaced repetition. Grades: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy.
const DAY = 86_400_000;

export function initial(): SrsState {
  return { ease: 2.5, interval: 0, due: 0, reps: 0 };
}

export function review(s: SrsState | undefined, grade: 0 | 1 | 2 | 3, now = Date.now()): SrsState {
  const cur = s ?? initial();
  if (grade === 0) {
    return { ease: Math.max(1.3, cur.ease - 0.2), interval: 0, reps: 0, due: now + 60_000 * 5 };
  }
  let interval: number;
  if (cur.reps === 0) interval = grade === 3 ? 3 : 1;
  else if (cur.reps === 1) interval = grade === 1 ? 2 : grade === 3 ? 7 : 4;
  else interval = Math.round(cur.interval * (grade === 1 ? 1.2 : grade === 3 ? cur.ease * 1.3 : cur.ease));
  const ease = Math.max(1.3, cur.ease + (grade === 1 ? -0.15 : grade === 3 ? 0.15 : 0));
  return { ease, interval, reps: cur.reps + 1, due: now + interval * DAY };
}

export function isDue(s: SrsState | undefined, now = Date.now()) {
  return !s || s.due <= now;
}

export function label(grade: 0 | 1 | 2 | 3, s: SrsState | undefined): string {
  const n = review(s, grade, 0);
  if (grade === 0) return "5m";
  return `${n.interval}d`;
}

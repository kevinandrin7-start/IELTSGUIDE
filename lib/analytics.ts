import type { Attempt, Skill } from "./types";
import { QTYPE_LABEL } from "./grade";

export const SKILLS: Skill[] = ["listening", "reading", "writing", "speaking"];

export function latestBand(attempts: Attempt[], skill: Skill): Attempt | undefined {
  return [...attempts].filter((a) => a.skill === skill && a.kind === "mock" && a.band != null).sort((a, b) => b.date - a.date)[0];
}

export function bestBand(attempts: Attempt[], skill: Skill): number | null {
  const b = attempts.filter((a) => a.skill === skill && a.kind === "mock" && a.band != null).map((a) => a.band!);
  return b.length ? Math.max(...b) : null;
}

/** Accuracy per question type across every graded attempt. */
export function qtypeAccuracy(attempts: Attempt[]) {
  const map = new Map<string, { label: string; skill: Skill; correct: number; total: number }>();
  for (const a of attempts) {
    for (const r of a.answers ?? []) {
      const key = `${a.skill}:${r.qtype}`;
      const cur = map.get(key) ?? { label: QTYPE_LABEL[r.qtype], skill: a.skill, correct: 0, total: 0 };
      cur.total++;
      if (r.correct) cur.correct++;
      map.set(key, cur);
    }
  }
  return [...map.values()].sort((a, b) => a.correct / a.total - b.correct / b.total);
}

export function heatColor(acc: number) {
  // red → amber → green
  if (acc >= 0.9) return "var(--good)";
  if (acc >= 0.8) return "#65a30d";
  if (acc >= 0.7) return "var(--warn)";
  return "var(--bad)";
}

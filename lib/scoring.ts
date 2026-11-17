import type { Skill } from "./types";

// Raw-score → band tables (typical published conversions; IELTS adjusts
// slightly per test version, so treat as ±0.5 estimates).
const LISTENING: [number, number][] = [
  [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6],
  [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3], [4, 2.5], [2, 2], [1, 1], [0, 0],
];

const GT_READING: [number, number][] = [
  [40, 9], [39, 8.5], [37, 8], [36, 7.5], [34, 7], [32, 6.5], [30, 6],
  [27, 5.5], [23, 5], [19, 4.5], [15, 4], [12, 3.5], [9, 3], [6, 2.5], [4, 2], [2, 1.5], [1, 1], [0, 0],
];

export function rawToBand(skill: "listening" | "reading", raw: number): number {
  const table = skill === "listening" ? LISTENING : GT_READING;
  for (const [min, band] of table) if (raw >= min) return band;
  return 0;
}

/** IRCC IELTS General Training → CLB equivalency (per skill). */
export const CLB_TABLE: { clb: number; listening: number; reading: number; writing: number; speaking: number }[] = [
  { clb: 10, listening: 8.5, reading: 8, writing: 7.5, speaking: 7.5 },
  { clb: 9, listening: 8, reading: 7, writing: 7, speaking: 7 },
  { clb: 8, listening: 7.5, reading: 6.5, writing: 6.5, speaking: 6.5 },
  { clb: 7, listening: 6, reading: 6, writing: 6, speaking: 6 },
  { clb: 6, listening: 5.5, reading: 5, writing: 5.5, speaking: 5.5 },
  { clb: 5, listening: 5, reading: 4, writing: 5, speaking: 5 },
  { clb: 4, listening: 4.5, reading: 3.5, writing: 4, speaking: 4 },
];

export const TARGET: Record<Skill, number> = { listening: 8, reading: 7, writing: 7, speaking: 7 };
export const TARGET_RAW = { listening: "35–36/40", reading: "34–35/40" };

export function bandToClb(skill: Skill, band: number): number {
  for (const row of CLB_TABLE) if (band >= row[skill]) return row.clb;
  return 3;
}

export function overallBand(bands: number[]): number {
  if (!bands.length) return 0;
  const avg = bands.reduce((a, b) => a + b, 0) / bands.length;
  return Math.round(avg * 2) / 2; // IELTS rounds .25 up to .5 and .75 up to next whole
}

export function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[.,;:!?"]+$/g, "")
    .replace(/^(the|a|an)\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function isCorrect(given: string, accepted: string[]): boolean {
  const g = normalise(given || "");
  if (!g) return false;
  return accepted.some((a) => normalise(a) === g);
}

export function wordCount(text: string): number {
  return (text.trim().match(/\S+/g) || []).length;
}

export function fmtTime(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

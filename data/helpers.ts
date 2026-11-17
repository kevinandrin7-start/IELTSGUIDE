import type { Option, Question } from "@/lib/types";

/** Compact question builder: q("t1-l-1", 1, "Surname: ____", ["Kowalski"], "Spelled out …") */
export const q = (id: string, num: number, prompt: string, answer: string[] | string, explanation: string): Question => ({
  id,
  num,
  prompt,
  answer: Array.isArray(answer) ? answer : [answer],
  explanation,
});

/** "A|B|C" option builder: opts("the lake", "the budget", "a petition") → A/B/C */
export const opts = (...texts: string[]): Option[] =>
  texts.map((text, i) => ({ key: String.fromCharCode(65 + i), text }));

export const roman = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii"];
export const romanOpts = (...texts: string[]): Option[] => texts.map((text, i) => ({ key: roman[i], text }));

import type { AnswerRecord, ErrorEntry, QType, QuestionGroup, Skill } from "./types";
import { isCorrect } from "./scoring";

export const QTYPE_LABEL: Record<QType, string> = {
  tfng: "True/False/Not Given",
  ynng: "Yes/No/Not Given",
  mcq: "Multiple Choice",
  multi: "Choose TWO",
  matching: "Matching",
  headings: "Matching Headings",
  gap: "Completion (notes/form/summary)",
  short: "Short Answer",
  map: "Map/Plan Labelling",
};

export function gradeGroups(groups: QuestionGroup[], answers: Record<string, string>): AnswerRecord[] {
  const out: AnswerRecord[] = [];
  for (const g of groups) {
    for (const q of g.questions) {
      const given = answers[q.id] ?? "";
      let correct: boolean;
      if (g.type === "multi") {
        correct = !!given && q.answer.includes(given.toUpperCase());
      } else if (["mcq", "matching", "headings", "map", "tfng", "ynng"].includes(g.type)) {
        correct = q.answer.some((a) => a.toLowerCase() === given.trim().toLowerCase());
      } else {
        correct = isCorrect(given, q.answer);
      }
      out.push({ qid: q.id, num: q.num, qtype: g.type, correct, given });
    }
  }
  return out;
}

export function toErrorEntries(records: AnswerRecord[], skill: Skill, sourceLabel: string): ErrorEntry[] {
  const now = Date.now();
  return records
    .filter((r) => !r.correct)
    .map((r) => ({
      id: `${now}-${r.qid}`,
      date: now,
      skill,
      qtype: QTYPE_LABEL[r.qtype],
      source: `${sourceLabel} Q${r.num}`,
      note: r.given ? `You answered "${r.given}"` : "Left blank",
    }));
}

import { DRILLS } from "@/data/drills";
import { LESSONS } from "@/data/lessons";
import type { Skill, StudyPlan } from "./types";
import { TARGET } from "./scoring";

export interface PlanTask {
  id: string;
  date: string; // yyyy-mm-dd
  skill: Skill | "vocab" | "mock";
  title: string;
  href: string;
  minutes: number;
}

const SKILLS: Skill[] = ["listening", "reading", "writing", "speaking"];

function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function daysUntil(dateIso: string) {
  const end = new Date(dateIso + "T00:00:00");
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}

/** Builds a day-by-day roadmap from today until the exam date. */
export function generatePlan(plan: StudyPlan): PlanTask[] {
  const total = Math.max(7, Math.min(120, daysUntil(plan.examDate)));
  // ~25 minutes per task on top of the daily 10-minute vocab review
  const perDay = 1 + Math.max(1, Math.min(6, Math.round((plan.hoursPerDay * 60 - 10) / 25)));

  // Weighted skill rotation: skills below target appear twice as often, the biggest gap three times.
  const gaps = SKILLS.map((s) => ({ s, gap: TARGET[s] - (plan.diagnostic[s] ?? 6) })).sort((a, b) => b.gap - a.gap);
  const rotation: Skill[] = [];
  gaps.forEach(({ s, gap }, i) => {
    const w = gap > 0 ? (i === 0 ? 3 : 2) : 1;
    for (let k = 0; k < w; k++) rotation.push(s);
  });
  const interleaved: Skill[] = [];
  const pool = [...rotation];
  while (pool.length) {
    const next = pool.findIndex((s) => s !== interleaved[interleaved.length - 1]);
    interleaved.push(pool.splice(next === -1 ? 0 : next, 1)[0]);
  }

  const lessonQueue: Record<Skill, string[]> = { listening: [], reading: [], writing: [], speaking: [] };
  LESSONS.forEach((l) => lessonQueue[l.skill].push(l.id));
  const drillQueue: Record<Skill, string[]> = { listening: [], reading: [], writing: [], speaking: [] };
  DRILLS.forEach((d) => drillQueue[d.skill].push(d.id));

  const mock1Day = Math.floor(total * 0.55);
  const mock2Day = Math.floor(total * 0.85);
  const tasks: PlanTask[] = [];
  let r = 0;
  const lessonIdx: Record<Skill, number> = { listening: 0, reading: 0, writing: 0, speaking: 0 };
  const drillIdx: Record<Skill, number> = { listening: 0, reading: 0, writing: 0, speaking: 0 };

  for (let day = 0; day < total; day++) {
    const d = new Date();
    d.setDate(d.getDate() + day);
    const date = iso(d);
    const phase = day < total * 0.4 ? "learn" : day < total * 0.85 ? "practise" : "simulate";

    tasks.push({ id: `${date}-vocab`, date, skill: "vocab", title: "Lexical bank: review due flashcards", href: "/vocab", minutes: 10 });

    if (day === mock1Day || day === mock2Day) {
      const id = day === mock1Day ? "mock-1" : "mock-2";
      tasks.push({ id: `${date}-${id}`, date, skill: "mock", title: `Full ${id === "mock-1" ? "Mock Test 1" : "Mock Test 2"} (all four skills)`, href: "/mock", minutes: 170 });
      continue;
    }

    for (let k = 0; k < perDay - 1; k++) {
      const skill = interleaved[r++ % interleaved.length];
      const lessons = lessonQueue[skill];
      const drills = drillQueue[skill];
      if (phase === "learn" && lessonIdx[skill] < lessons.length) {
        const lessonId = lessons[lessonIdx[skill]++];
        const l = LESSONS.find((x) => x.id === lessonId)!;
        tasks.push({ id: `${date}-${l.id}`, date, skill, title: `Lesson: ${l.title}`, href: `/learn/${l.id}`, minutes: l.minutes });
      } else if (phase !== "simulate" || k > 0) {
        const drillId = drills[drillIdx[skill]++ % drills.length];
        const dr = DRILLS.find((x) => x.id === drillId)!;
        tasks.push({ id: `${date}-${dr.id}-${k}`, date, skill, title: `Drill: ${dr.title}`, href: `/drills/${dr.id}`, minutes: dr.minutes });
      } else {
        const mock = day % 2 ? "mock-1" : "mock-2";
        tasks.push({ id: `${date}-${skill}-sim`, date, skill, title: `Timed ${skill} section (${mock === "mock-1" ? "Mock 1" : "Mock 2"}) — review your error log after`, href: `/exam/${mock}/${skill}`, minutes: skill === "listening" ? 35 : skill === "speaking" ? 15 : 60 });
      }
    }
  }
  return tasks;
}

// ───────────── Diagnostic ─────────────

export interface DiagItem {
  id: string;
  skill: Skill;
  prompt: string;
  audio?: string; // spoken via TTS for listening items
  choices: string[];
  answer: number;
}

export const DIAGNOSTIC: DiagItem[] = [
  { id: "dl1", skill: "listening", audio: "The class was meant to start at seven fifteen, but because the room is being painted, we've pushed it back to quarter to eight.", prompt: "What time does the class start?", choices: ["7.15", "7.45", "8.15"], answer: 1 },
  { id: "dl2", skill: "listening", audio: "My surname's Thackeray: T, H, A, C, K, E, R, A, Y.", prompt: "How is the surname spelled?", choices: ["Thakeray", "Thackery", "Thackeray"], answer: 2 },
  { id: "dl3", skill: "listening", audio: "A lot of people assume the museum is free on Sundays, and it used to be. But since January, free entry is only on the first Monday of each month.", prompt: "When is entry free now?", choices: ["Every Sunday", "First Monday of the month", "Every Monday in January"], answer: 1 },
  { id: "dr1", skill: "reading", prompt: "Text: 'Staff may claim travel expenses up to £20 per day; receipts must be submitted within 30 days.'\nStatement: 'Staff can claim any amount if they keep receipts.'", choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 1 },
  { id: "dr2", skill: "reading", prompt: "Text: 'The gym's new pool opened in March and has proved extremely popular with families.'\nStatement: 'The pool is heated.'", choices: ["TRUE", "FALSE", "NOT GIVEN"], answer: 2 },
  { id: "dr3", skill: "reading", prompt: "Which heading best fits: 'Although many workers welcome flexible hours, managers worry about communication, and some teams report that meetings have become harder to schedule.'", choices: ["The benefits of flexibility", "Concerns about flexible working", "How to schedule meetings"], answer: 1 },
  { id: "dw1", skill: "writing", prompt: "Which closing is correct after 'Dear Sir or Madam'?", choices: ["Yours sincerely", "Yours faithfully", "Best wishes"], answer: 1 },
  { id: "dw2", skill: "writing", prompt: "Choose the most accurate sentence.", choices: ["The number of people who works from home have increased.", "The number of people working from home has increased.", "The number of people who work from home have been increased."], answer: 1 },
  { id: "dw3", skill: "writing", prompt: "'Some say X, others say Y. Discuss both views and give your opinion.' How many main viewpoints must the body paragraphs cover?", choices: ["One — your opinion only", "Two — both views", "Three — both views plus a compromise"], answer: 1 },
  { id: "ds1", skill: "speaking", prompt: "Examiner: 'Do you like cooking?' Which answer best shows Band 7 fluency?", choices: ["Yes, I like.", "Yes, I really enjoy it, mainly because it helps me relax — last weekend I made a curry from scratch.", "Cooking is a process of preparing food using heat, which humans have done for thousands of years."], answer: 1 },
  { id: "ds2", skill: "speaking", prompt: "In Part 2 you run out of ideas after 70 seconds. What should you do?", choices: ["Stop and wait for the next question", "Repeat what you said", "Move to how you feel about it now / future plans"], answer: 2 },
  { id: "ds3", skill: "speaking", prompt: "Which phrase best introduces a cautious Part 3 opinion?", choices: ["It is 100% true that…", "It's probably fair to say that…", "Everybody knows that…"], answer: 1 },
];

/** Blend objective accuracy with self-rating and any previous official score. */
export function estimateBand(correct: number, total: number, selfBand: number, previous?: number): number {
  const objective = 5 + (correct / total) * 2.5; // 0% → 5.0, 100% → 7.5
  const blend = previous ? previous * 0.6 + objective * 0.2 + selfBand * 0.2 : objective * 0.6 + selfBand * 0.4;
  return Math.round(blend * 2) / 2;
}

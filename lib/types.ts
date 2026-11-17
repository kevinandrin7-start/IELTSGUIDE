// ───────────────────────── Core data schemas ─────────────────────────
// Every piece of content in the app (lessons, drills, mock tests, vocab)
// is typed here so new material can be added as plain data files.

export type Skill = "listening" | "reading" | "writing" | "speaking";

export type QType =
  | "tfng" // True / False / Not Given
  | "ynng" // Yes / No / Not Given
  | "mcq" // single answer multiple choice
  | "multi" // choose TWO/THREE letters
  | "matching" // match to a list of options (A–H)
  | "headings" // matching headings (i–x)
  | "gap" // note / form / table / sentence / summary completion (typed)
  | "short" // short-answer question
  | "map"; // map / plan labelling (letter options)

export interface Option {
  key: string; // "A", "B", "iv"…
  text: string;
}

export interface Question {
  id: string; // unique within a test, e.g. "t1-l-7"
  num: number; // question number shown to user (1–40)
  prompt: string; // use "____" to mark the gap position for gap questions
  answer: string[]; // accepted answers (case-insensitive). For "multi" every letter is its own question.
  explanation: string; // why the answer is right / where the evidence is
}

export interface QuestionGroup {
  id: string;
  type: QType;
  instructions: string; // e.g. "Write NO MORE THAN TWO WORDS AND/OR A NUMBER"
  title?: string; // e.g. form title for note completion
  options?: Option[]; // shared option bank (mcq per-question options go on question via options map)
  questionOptions?: Record<string, Option[]>; // per-question MCQ options keyed by question id
  mapId?: string; // for map labelling: which SVG plan to render
  questions: Question[];
}

export interface ScriptLine {
  speaker: string; // must match a Speaker.name, or "Narrator"
  text: string;
}

export interface Speaker {
  name: string;
  voice: "male" | "female";
  pitch?: number;
  rate?: number;
}

export interface ListeningSection {
  id: string;
  part: 1 | 2 | 3 | 4;
  title: string;
  context: string; // shown before audio: "You will hear a woman phoning a…"
  speakers: Speaker[];
  script: ScriptLine[];
  groups: QuestionGroup[];
}

export interface ReadingText {
  id: string;
  title: string;
  kind: string; // "Advertisement", "Workplace handbook", "Feature article"…
  paragraphs: { label?: string; text: string }[];
}

export interface ReadingSection {
  id: string;
  part: 1 | 2 | 3;
  title: string;
  texts: ReadingText[];
  groups: QuestionGroup[];
}

export type LetterTone = "formal" | "semi-formal" | "informal";
export type EssayType =
  | "opinion"
  | "discussion"
  | "advantages"
  | "problem-solution"
  | "two-part";

export interface WritingTask {
  id: string;
  task: 1 | 2;
  prompt: string;
  bullets?: string[];
  tone?: LetterTone;
  essayType?: EssayType;
  minWords: number;
  suggestedMinutes: number;
  modelAnswer: string; // Band 8+ model (original)
  examinerNotes: string[]; // why the model scores highly
}

export interface SpeakingSet {
  part1: { topic: string; questions: string[] }[];
  part2: { cue: string; bullets: string[]; finalLine: string; roundOff: string };
  part3: { theme: string; questions: string[] }[];
  modelPart2: string; // sample Band 8 long turn (original)
}

export interface MockTest {
  id: string;
  title: string;
  blurb: string;
  listening: ListeningSection[];
  reading: ReadingSection[];
  writing: WritingTask[];
  speaking: SpeakingSet;
}

// ───────────────────────── Lessons ─────────────────────────

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "tip"; title?: string; text: string; tone?: "tip" | "warn" | "clb9" }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "example"; title?: string; text: string; note?: string }
  | { kind: "blueprint"; title: string; rows: { label: string; color: string; items: string[] }[] }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | { kind: "checklist"; groups: { title: string; items: string[] }[] }
  | { kind: "compare"; left: { title: string; text: string }; right: { title: string; text: string } };

export interface Lesson {
  id: string;
  skill: Skill;
  title: string;
  summary: string;
  minutes: number;
  level: "core" | "clb9"; // clb9 = specifically about the 6.5 → 7/8 jump
  blocks: Block[];
}

// ───────────────────────── Drills ─────────────────────────

export interface Drill {
  id: string;
  skill: Skill;
  title: string;
  qtype: string; // human label used for filtering + error heatmap
  minutes: number;
  description: string;
  // A drill is either a mini reading/listening exercise rendered with the
  // standard question engine, or a classification/rewrite exercise.
  passage?: ReadingText;
  listening?: ListeningSection;
  groups?: QuestionGroup[];
  classify?: { prompt: string; items: { text: string; answer: string; why: string }[]; choices: string[] };
  rewrite?: { prompt: string; items: { from: string; model: string; hint: string }[] };
  speak?: { prompt: string; questions: string[]; seconds: number; formula: string };
}

// ───────────────────────── Vocabulary ─────────────────────────

export interface VocabCard {
  id: string;
  topic: string;
  word: string;
  pos: string;
  meaning: string;
  collocations: string[];
  example: string;
  band6?: string; // the "safe" word this upgrades
}

export interface SrsState {
  ease: number;
  interval: number; // days
  due: number; // epoch ms
  reps: number;
}

// ───────────────────────── User progress ─────────────────────────

export interface AnswerRecord {
  qid: string;
  num: number;
  qtype: QType;
  correct: boolean;
  given: string;
}

export interface Attempt {
  id: string;
  testId: string; // mock id or drill id
  kind: "mock" | "drill" | "diagnostic";
  skill: Skill;
  date: number;
  raw?: number; // out of 40 for L/R
  total?: number;
  band?: number;
  answers?: AnswerRecord[];
  criteria?: Record<string, number>; // W/S rubric scores
  durationSec?: number;
}

export interface StudyPlan {
  examDate: string; // ISO date
  hoursPerDay: number;
  weak: Skill[];
  createdAt: number;
  diagnostic: Record<Skill, number>; // estimated bands
}

export interface ErrorEntry {
  id: string;
  date: number;
  skill: Skill;
  qtype: string;
  source: string; // "Mock Test 1 – Reading Q14"
  note: string;
}

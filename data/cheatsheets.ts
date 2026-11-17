import type { Block } from "@/lib/types";

export interface CheatSheet {
  id: string;
  title: string;
  icon: string; // lucide icon name
  blocks: Block[];
}

export const CHEATSHEETS: CheatSheet[] = [
  {
    id: "time",
    title: "Time-management splits",
    icon: "Timer",
    blocks: [
      { kind: "table", head: ["Paper", "Total", "Split", "Hard rule"], rows: [
        ["Listening", "~30 min + 2 min review", "Read ahead during every pause", "Never go back during the audio — move on"],
        ["Reading (GT)", "60 min", "15 · 20 · 25 (Sections 1 · 2 · 3)", "Max 90 sec on any one question; flag and return"],
        ["Writing", "60 min", "20 (Task 1) · 40 (Task 2)", "Task 2 is worth twice Task 1 — start Task 2 by minute 20"],
        ["Speaking", "11–14 min", "P1 4–5 · P2 3–4 · P3 4–5", "Part 2: keep talking until stopped"],
      ]},
      { kind: "table", head: ["Writing Task 2 · 40 min", "Minutes"], rows: [["Analyse + plan", "5–7"], ["Introduction", "4"], ["Body 1", "10"], ["Body 2", "10"], ["Conclusion", "3"], ["Check", "5"]] },
      { kind: "table", head: ["Writing Task 1 · 20 min", "Minutes"], rows: [["Tone + purpose + 1 detail per bullet", "3"], ["Write 4 paragraphs", "14"], ["Check sign-off, tense, articles", "3"]] },
    ],
  },
  {
    id: "paraphrase",
    title: "Keyword paraphrasing table",
    icon: "Repeat",
    blocks: [
      { kind: "p", text: "Most Reading and Listening answers depend on recognising that the question and the text say the same thing in different words." },
      { kind: "table", head: ["Question says", "Text / audio may say"], rows: [
        ["cheap", "inexpensive, affordable, reasonably priced, low-cost, won't break the bank"],
        ["expensive", "costly, pricey, overpriced, high-end, at a premium"],
        ["free", "no charge, complimentary, at no cost, included"],
        ["must", "required, compulsory, obligatory, mandatory, essential"],
        ["not allowed", "prohibited, forbidden, not permitted, banned"],
        ["increase", "rise, grow, go up, climb, surge, boost"],
        ["decrease", "fall, drop, decline, go down, reduce, cut"],
        ["old", "elderly, aged, senior, over 65, pensioners"],
        ["children", "under-16s, kids, youngsters, minors, juniors"],
        ["start", "begin, commence, launch, kick off, get under way"],
        ["finish", "end, complete, conclude, wrap up"],
        ["problem", "issue, difficulty, drawback, challenge, obstacle"],
        ["help", "assist, support, aid, give a hand"],
        ["job", "position, role, post, employment, vacancy"],
        ["boss", "manager, supervisor, line manager, head of department"],
        ["pay", "salary, wage, fee, charge, cost"],
        ["refund", "money back, reimbursement, repayment"],
        ["popular", "in demand, sought after, fills up quickly, sells out"],
        ["near", "close to, next to, a short walk from, adjacent to"],
        ["necessary", "essential, vital, required, indispensable"],
        ["show", "demonstrate, indicate, reveal, display"],
        ["choose", "select, pick, opt for, decide on"],
        ["enough", "sufficient, adequate, plenty"],
        ["change", "alter, modify, adjust, amend"],
        ["improve", "enhance, upgrade, refine, boost"],
        ["safe", "secure, protected, risk-free"],
        ["dangerous", "hazardous, risky, unsafe"],
        ["important", "significant, crucial, key, vital"],
        ["often", "frequently, regularly, repeatedly"],
        ["rarely", "seldom, hardly ever, infrequently"],
        ["about / approximately", "roughly, around, nearly, just under/over"],
        ["book", "reserve, make a reservation, register, sign up"],
        ["cancel", "call off, withdraw, scrap"],
        ["delay", "postpone, put off, push back, reschedule"],
        ["advantage", "benefit, plus, upside, merit"],
        ["disadvantage", "drawback, downside, limitation"],
      ]},
    ],
  },
  {
    id: "pitfalls",
    title: "Word count & grammar pitfalls checklist",
    icon: "ListChecks",
    blocks: [
      { kind: "checklist", groups: [
        { title: "Word count", items: ["Task 1 ≥ 150, Task 2 ≥ 250 (aim 170–200 / 270–300)", "Count lines × average words per line in practice so you can estimate quickly", "Numbers and contractions count as one word", "Very long answers waste time and add errors — quality > quantity"] },
        { title: "Articles", items: ["a/an + singular countable: a problem, an issue", "the + specific or already mentioned: the government, the internet", "No article for general plurals/uncountables: Children need exercise. Pollution is rising."] },
        { title: "Agreement & plurals", items: ["People ARE, the number of people IS", "One of the main reasonS IS…", "Uncountable: advice, information, equipment, research, furniture (no -s)"] },
        { title: "Tense", items: ["Letters: present perfect for recent problems (I have had three cancellations)", "Past simple for specific past time (I lost it on 14 March)", "Don't jump between present and past in the same story"] },
        { title: "Punctuation", items: ["No comma splices: 'It is cheap, it is fast.' ✗ → 'It is cheap and fast.' ✓", "Comma after introductory phrase: 'In my opinion, …'", "However needs punctuation: '…; however, …' or '. However, …'"] },
        { title: "Letters", items: ["Sir or Madam → Yours faithfully; Mr X → Yours sincerely", "No contractions in formal letters", "All three bullets covered — tick them off"] },
      ]},
    ],
  },
  {
    id: "panic",
    title: "Panic Button strategies",
    icon: "Siren",
    blocks: [
      { kind: "h", text: "Listening — you missed an answer" },
      { kind: "list", items: ["Let it go immediately. Guess later in the review time.", "Find the NEXT question's keyword and listen for it.", "In the 2-minute review, fill every blank — a guess can score; a blank can't."] },
      { kind: "h", text: "Reading — 10 minutes left and 12 questions to go" },
      { kind: "list", items: ["Do completion and matching questions first (fastest per mark).", "For TFNG, scan for the keyword only; if not found in 30 seconds, answer NOT GIVEN.", "Fill every blank before time ends — no negative marking."] },
      { kind: "h", text: "Writing — 15 minutes left and Task 2 not started" },
      { kind: "list", items: ["Write a 4-paragraph essay with short bodies (3 sentences each). An under-length but complete essay beats an unfinished one.", "Intro: paraphrase + opinion in two sentences.", "Skip the vocabulary pass; do a 1-minute grammar pass only."] },
      { kind: "h", text: "Speaking — your mind goes blank" },
      { kind: "list", items: ["Buy time naturally: 'That's a tricky one — let me think for a second.'", "Use the 5W lifeline: who, what, where, when, why — answer any one.", "Part 2: jump to the next PPF box (Past → Present → Future).", "Ask the examiner to repeat: 'Sorry, could you say that again?' — this is not penalised."] },
    ],
  },
  {
    id: "scores",
    title: "Band ↔ raw score ↔ CLB",
    icon: "Gauge",
    blocks: [
      { kind: "table", head: ["CLB", "Listening", "Reading", "Writing", "Speaking"], rows: [
        ["10", "8.5", "8.0", "7.5", "7.5"],
        ["9 ← target", "8.0", "7.0", "7.0", "7.0"],
        ["8", "7.5", "6.5", "6.5", "6.5"],
        ["7", "6.0", "6.0", "6.0", "6.0"],
      ]},
      { kind: "table", head: ["Band", "Listening /40", "GT Reading /40"], rows: [
        ["9", "39–40", "40"], ["8.5", "37–38", "39"], ["8", "35–36", "37–38"], ["7.5", "32–34", "36"], ["7", "30–31", "34–35"], ["6.5", "26–29", "32–33"], ["6", "23–25", "30–31"],
      ]},
      { kind: "p", text: "Sources: IRCC language test equivalency charts (IELTS General Training); raw-score conversions are typical published values and can vary by ±1 per test version. Each skill must meet CLB 9 individually — the overall band does not count for Express Entry." },
    ],
  },
  {
    id: "testday",
    title: "Test-day checklist (computer-delivered)",
    icon: "CalendarCheck",
    blocks: [
      { kind: "checklist", groups: [
        { title: "Before", items: ["Same ID document you registered with", "Arrive 30 minutes early; phones go in a locker", "Water in a clear bottle (rules vary by centre)", "Since mid-2026 nearly all IELTS tests are on computer — practise typing essays under time pressure"] },
        { title: "On screen", items: ["Highlight and note tools: right-click on text", "Word counter shows live count in Writing", "Use the question palette to flag and return", "Font size and colour contrast can be changed in settings"] },
        { title: "After", items: ["Results usually within 1–5 days for computer tests", "One Skill Retake lets you resit a single skill if you narrowly miss CLB 9"] },
      ]},
    ],
  },
];

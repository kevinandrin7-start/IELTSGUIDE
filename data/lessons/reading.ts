import type { Lesson } from "@/lib/types";

export const readingLessons: Lesson[] = [
  {
    id: "r-format",
    skill: "reading",
    title: "GT Reading format and the 15-20-25 rule",
    summary: "Three sections that get harder. Spend less time on the easy texts so you have 25 minutes for Section 3.",
    minutes: 7,
    level: "core",
    blocks: [
      { kind: "table", head: ["Section", "Texts", "Questions", "Target time"], rows: [
        ["1 — Social survival", "2–3 short everyday texts: adverts, notices, timetables", "~14", "15 min"],
        ["2 — Workplace survival", "2 work texts: handbooks, policies, job descriptions", "~13", "20 min"],
        ["3 — General reading", "1 long article of general interest (~800–900 words)", "~13", "25 min"],
      ]},
      { kind: "tip", tone: "clb9", title: "Your CLB 9 target", text: "Band 7.0 in GT Reading requires about 34–35 correct out of 40. Because GT texts are easier than Academic, the bar is higher — you can drop only 5–6 marks." },
      { kind: "compare", left: { title: "Sections 1 & 2: speed-scan", text: "Don't read the text first. Read the question, identify the key detail (a price, a day, an age), and scan for it. Most answers are one sentence long. Aim for under 1 minute per question." }, right: { title: "Section 3: deep comprehension", text: "Skim the whole article in 2–3 minutes for structure (what each paragraph does). Then work question by question. Opinion and inference questions need careful reading of whole sentences." } },
      { kind: "p", text: "There is no extra transfer time in Reading: the 60 minutes includes writing your answers. On computer, answers are typed straight into the boxes." },
    ],
  },
  {
    id: "r-tfng",
    skill: "reading",
    title: "True / False / Not Given vs Yes / No / Not Given",
    summary: "A four-step decision framework that removes guessing.",
    minutes: 12,
    level: "core",
    blocks: [
      { kind: "compare", left: { title: "TRUE / FALSE / NOT GIVEN", text: "Tests FACTS in the text. Used for notices, handbooks, factual articles." }, right: { title: "YES / NO / NOT GIVEN", text: "Tests the WRITER'S OPINIONS or claims. Appears with articles where the writer argues a view." } },
      { kind: "steps", items: [
        { title: "1. Find the topic of the statement", text: "Underline the subject + key detail. 'DVDs can be borrowed for the same time as books' → topic = loan period for DVDs." },
        { title: "2. Locate the section", text: "Scan for the topic (DVDs). Questions follow text order." },
        { title: "3. Compare meaning, not words", text: "Does the text say the same thing (TRUE), the opposite thing (FALSE), or nothing about that specific detail (NOT GIVEN)?" },
        { title: "4. Apply the 'contradiction test'", text: "Only answer FALSE if you can point to words that make the statement impossible. If you're 'inferring' it's false from silence, it's NOT GIVEN." },
      ]},
      { kind: "table", head: ["Statement", "Text says", "Answer", "Why"], rows: [
        ["Members pay a fine for late books.", "We no longer charge fines.", "FALSE", "Direct contradiction"],
        ["Laptops must be booked in advance.", "Laptops available for up to two hours.", "NOT GIVEN", "Booking never mentioned"],
        ["Children need two documents.", "Children need a parent to sign.", "NOT GIVEN", "Documents for children not mentioned"],
        ["Over-65s don't pay for reservations.", "Reservations free for over 65.", "TRUE", "Paraphrase"],
      ]},
      { kind: "tip", tone: "warn", title: "Qualifier traps", text: "Watch words that change meaning: all / some / most, always / usually, only, must / may, increase / decrease. 'Some laptops' vs 'All laptops' turns TRUE into FALSE or NOT GIVEN." },
    ],
  },
  {
    id: "r-headings",
    skill: "reading",
    title: "Matching headings",
    summary: "Read for the MAIN idea of a paragraph, not a detail that happens to match a word.",
    minutes: 10,
    level: "clb9",
    blocks: [
      { kind: "steps", items: [
        { title: "Read the headings first", text: "Cross out any heading used in an example. Notice headings that are similar — the difference matters." },
        { title: "Read the first two and last sentence of each paragraph", text: "The main idea is usually stated there. Summarise it in 3–5 words in your head." },
        { title: "Match your summary, not single words", text: "Distractor headings repeat a word from the paragraph (e.g., 'café') but don't describe the whole paragraph." },
        { title: "Do the easy ones first", text: "Leave paragraphs with two possible headings until the end; elimination solves them." },
      ]},
      { kind: "example", title: "Mock Test 1, Section C", text: "'The company will provide a laptop, headset and second monitor… Please do not buy equipment yourself and claim the cost back.'", note: "Heading = 'Equipment you will receive'. 'Claiming expenses' is a trap: the paragraph says NOT to claim." },
    ],
  },
  {
    id: "r-completion",
    skill: "reading",
    title: "Summary, sentence and note completion",
    summary: "Grammar tells you half the answer before you even look at the text.",
    minutes: 8,
    level: "core",
    blocks: [
      { kind: "list", items: [
        "Check the word limit first: 'NO MORE THAN TWO WORDS AND/OR A NUMBER'.",
        "Predict the grammar: after 'the' → noun; after 'is very' → adjective; after 'were' → past participle or adjective.",
        "Copy words EXACTLY from the text — spelling mistakes cost marks.",
        "For word-bank summaries (A–H), the bank uses synonyms; the text uses different words.",
        "Summaries usually cover one or two paragraphs — find the start and the answers follow in order.",
      ]},
      { kind: "tip", title: "Check grammar after you answer", text: "Read the whole sentence with your answer in it. If it isn't grammatical (singular/plural, article), it's probably wrong." },
    ],
  },
  {
    id: "r-matching-info",
    skill: "reading",
    title: "Matching information in short texts (Section 1)",
    summary: "Five adverts, seven statements: how to beat 'which course…?' questions fast.",
    minutes: 7,
    level: "core",
    blocks: [
      { kind: "steps", items: [
        { title: "Classify the statement", text: "Is it about price, age, time, location, materials, qualification? Turn each into a 1-word category." },
        { title: "Scan every text for that category", text: "Several texts may mention age — only one will match the exact condition (e.g., age limit vs age discount)." },
        { title: "Remember letters can repeat", text: "'NB You may use any letter more than once' — don't avoid a letter because you already used it." },
      ]},
      { kind: "tip", tone: "warn", text: "Near-miss trap: 'Students should bring their own equipment.' Cooking class asks for containers (to take food home) — not equipment for the course. Bookkeeping asks for a laptop (equipment)." },
    ],
  },
  {
    id: "r-jump",
    skill: "reading",
    title: "From 30 to 35: the CLB 9 reading plan",
    summary: "Most candidates at 6.0–6.5 lose marks through time, not comprehension.",
    minutes: 6,
    level: "clb9",
    blocks: [
      { kind: "list", ordered: true, items: [
        "Time every section separately in practice. If Section 1 takes more than 17 minutes, you need speed drills, not harder texts.",
        "Never leave a blank — there's no penalty for wrong answers.",
        "Move on after 90 seconds on one question. Flag it in the palette and return.",
        "Keep an error log by question type. If 60% of mistakes are TFNG, spend a week only on TFNG.",
        "Learn paraphrase pairs (see Cheat Sheets): most answers depend on recognising synonyms.",
      ]},
    ],
  },
];

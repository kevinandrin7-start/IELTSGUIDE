import type { Lesson } from "@/lib/types";

export const speakingLessons: Lesson[] = [
  {
    id: "s-format",
    skill: "speaking",
    title: "The Speaking test and what Band 7 sounds like",
    summary: "11–14 minutes, three parts, four criteria. Band 7 = speaking at length without effort, with some flexible vocabulary.",
    minutes: 6,
    level: "core",
    blocks: [
      { kind: "table", head: ["Part", "Length", "What happens"], rows: [
        ["1 — Interview", "4–5 min", "Familiar topics: work, home, hobbies. 3–4 questions per topic."],
        ["2 — Long turn", "3–4 min", "Cue card. 1 minute to prepare, then speak for up to 2 minutes. One short follow-up question."],
        ["3 — Discussion", "4–5 min", "Abstract questions linked to the Part 2 topic. Opinions, comparisons, predictions."],
      ]},
      { kind: "table", head: ["Criterion", "Band 7 looks like"], rows: [
        ["Fluency & Coherence", "Long answers with only occasional hesitation; uses discourse markers flexibly"],
        ["Lexical Resource", "Some less common words and collocations; paraphrases when stuck"],
        ["Grammatical Range & Accuracy", "Mix of complex structures; many error-free sentences"],
        ["Pronunciation", "Easy to understand; good stress and chunking; accent doesn't matter"],
      ]},
      { kind: "tip", tone: "warn", title: "Memorised answers are penalised", text: "Examiners are trained to spot memorised language. Learn FRAMEWORKS, not scripts." },
    ],
  },
  {
    id: "s-part1",
    skill: "speaking",
    title: "Part 1: Answer + Reason + Example",
    summary: "Turn one-line answers into natural 2–3 sentence responses.",
    minutes: 8,
    level: "core",
    blocks: [
      { kind: "blueprint", title: "The A-R-E formula", rows: [
        { label: "Answer", color: "teal", items: ["Direct answer to the question, with a natural opener"] },
        { label: "Reason", color: "rose", items: ["Why? Use 'mainly because', 'the thing is', 'I suppose it's because'"] },
        { label: "Example", color: "green", items: ["A specific detail: 'For instance, last weekend…' or a contrast 'although…'"] },
      ]},
      { kind: "compare", left: { title: "Band 5–6", text: "Q: Do you like cooking?\nA: Yes, I like cooking. It is fun." }, right: { title: "Band 7+", text: "Q: Do you like cooking?\nA: Yes, I genuinely enjoy it, mainly because it helps me switch off after work. Just last Sunday, for example, I spent the whole afternoon making a lamb stew from scratch." } },
      { kind: "list", items: ["Aim for 15–25 seconds per answer. Longer isn't better in Part 1.", "Vary your openers: 'Absolutely', 'Not really, to be honest', 'It depends, actually'.", "Don't repeat the question word for word — paraphrase it."] },
    ],
  },
  {
    id: "s-part2",
    skill: "speaking",
    title: "Part 2: the 1-minute PPF note grid",
    summary: "Use Past–Present–Future to fill 2 full minutes without running out of ideas.",
    minutes: 10,
    level: "clb9",
    blocks: [
      { kind: "p", text: "You get 1 minute and a pencil. Don't write sentences. Write 3–4 keywords in each box of a simple grid, then speak through the boxes in order." },
      { kind: "table", head: ["Box", "What to note", "Speaking time"], rows: [
        ["Intro", "Paraphrase the card in one line", "10 sec"],
        ["PAST", "Background: when, where, how it started", "35 sec"],
        ["PRESENT", "The bullets on the card: what, how, details", "45 sec"],
        ["FUTURE", "How you feel now / what happens next — the 'explain' line", "30 sec"],
      ]},
      { kind: "example", title: "Card: Describe a skill you learned as an adult", text: "Intro: cooking — late twenties\nPAST: takeaways, chef flatmate, deal\nPRESENT: techniques not recipes, onion disaster, 6 months\nFUTURE: save money, health, switch off → bread course", note: "Compare with the full Band 8 model in Mock Test 1 Speaking." },
      { kind: "tip", tone: "clb9", title: "Never stop before the examiner does", text: "If you finish early, add: a feeling ('What surprised me most was…'), a comparison ('Compared to when I was younger…'), or a future plan." },
    ],
  },
  {
    id: "s-part3",
    skill: "speaking",
    title: "Part 3: abstract opinions, hedging and natural idioms",
    summary: "Answer bigger questions with a clear structure and cautious, sophisticated language.",
    minutes: 10,
    level: "clb9",
    blocks: [
      { kind: "blueprint", title: "O-R-E-C framework for Part 3", rows: [
        { label: "Opinion", color: "teal", items: ["'I'd argue that…', 'On the whole, I tend to think…'"] },
        { label: "Reason", color: "rose", items: ["'The main reason is that…', 'This is largely because…'"] },
        { label: "Example", color: "green", items: ["General example: 'In my country, for instance…', 'Take X, for example…'"] },
        { label: "Contrast", color: "amber", items: ["'That said…', 'Having said that, in some cases…', 'Of course, it depends on…'"] },
      ]},
      { kind: "h", text: "Hedging language (sounds Band 7+)" },
      { kind: "list", items: ["It's probably fair to say that…", "To some extent, yes, although…", "I'd imagine that…", "There's a good chance that…", "It's hard to generalise, but…", "This tends to be the case in…"] },
      { kind: "h", text: "Idioms that sound natural (use one per answer at most)" },
      { kind: "table", head: ["Idiom", "Meaning", "Natural use"], rows: [
        ["a double-edged sword", "has good and bad sides", "Technology is a double-edged sword for learning."],
        ["in the long run", "eventually", "In the long run, it saves money."],
        ["the tip of the iceberg", "a small part of a bigger problem", "Traffic is just the tip of the iceberg."],
        ["easier said than done", "difficult in practice", "Changing habits is easier said than done."],
        ["get to grips with", "learn to deal with", "It took me months to get to grips with it."],
      ]},
      { kind: "tip", tone: "warn", text: "Avoid clichéd idioms like 'raining cats and dogs' or 'piece of cake' — examiners hear them constantly and they sound memorised." },
    ],
  },
  {
    id: "s-fluency",
    skill: "speaking",
    title: "Fluency and pronunciation tricks",
    summary: "Fill thinking time naturally and chunk your speech.",
    minutes: 6,
    level: "core",
    blocks: [
      { kind: "table", head: ["Situation", "Say this instead of 'umm…'"], rows: [
        ["Need thinking time", "That's an interesting question — I haven't really thought about it before, but…"],
        ["Don't know the word", "I'm not sure what it's called, but it's a kind of…"],
        ["Made a mistake", "Sorry — what I mean is…"],
        ["Didn't understand", "Could you rephrase the question, please?"],
      ]},
      { kind: "list", items: ["Record every practice answer (Speaking simulator) and listen back once.", "Pause at commas and full stops, not in the middle of a phrase.", "Stress the new or important word: 'I didn't LOVE it, but I LEARNED a lot.'"] },
    ],
  },
];

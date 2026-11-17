// Rubrics + prompt builders for Writing & Speaking evaluation.
// The descriptors below are condensed, paraphrased summaries of what
// separates Band 6, 7 and 8 — written for self-assessment, not copied
// from the official public band descriptors.

export interface Criterion {
  key: string;
  name: string;
  short: string;
  bands: { band: number; text: string }[];
  upgrade: string[]; // concrete moves that push 6.5 → 7+
}

export const WRITING_T1_CRITERIA: Criterion[] = [
  {
    key: "TA",
    name: "Task Achievement",
    short: "TA",
    bands: [
      { band: 6, text: "All bullets addressed but one is thin or unclear; purpose mostly clear; tone may slip in places." },
      { band: 7, text: "All three bullets covered and clearly extended; purpose is obvious from the first lines; tone consistent and appropriate." },
      { band: 8, text: "Every bullet fully and naturally developed with relevant detail; purpose and tone handled with total control." },
    ],
    upgrade: [
      "State the purpose in sentence one (paraphrase the task — don't copy it).",
      "Give each bullet its own paragraph of ~50 words with a reason AND a specific detail (dates, names, amounts).",
      "Match the tone to the reader before you start: Dear Sir or Madam → formal; Dear Mr Patel → semi-formal; Dear Sam → informal.",
    ],
  },
  {
    key: "CC",
    name: "Coherence & Cohesion",
    short: "CC",
    bands: [
      { band: 6, text: "Organised overall, but linking words are mechanical or sometimes wrong; paragraphing occasionally illogical." },
      { band: 7, text: "Logical progression; clear paragraphs; range of linkers used with some flexibility; referencing mostly accurate." },
      { band: 8, text: "Information sequenced smoothly; cohesion feels invisible; paragraphing always sensible." },
    ],
    upgrade: [
      "One bullet = one paragraph (the four-paragraph template).",
      "Replace 'Firstly / Secondly / Finally' chains with referencing: 'this delay', 'the item in question', 'such a change'.",
      "Open each paragraph with a topic sentence that tells the reader which bullet it answers.",
    ],
  },
  {
    key: "LR",
    name: "Lexical Resource",
    short: "LR",
    bands: [
      { band: 6, text: "Adequate vocabulary; some attempt at less common words with errors; noticeable repetition." },
      { band: 7, text: "Enough range for flexibility and precision; some less common items and collocations; occasional slips." },
      { band: 8, text: "Wide, natural range; skilful collocation and register control; rare errors." },
    ],
    upgrade: [
      "Use register-correct set phrases: 'I would be grateful if…' (formal) vs 'Could you possibly…' (semi) vs 'Any chance you could…' (informal).",
      "Swap generic verbs: get → obtain/receive, fix → resolve/repair, tell → inform/notify.",
      "Avoid contractions in formal letters; use them naturally in informal ones.",
    ],
  },
  {
    key: "GRA",
    name: "Grammatical Range & Accuracy",
    short: "GRA",
    bands: [
      { band: 6, text: "Mix of simple and complex sentences; frequent errors in complex structures but meaning clear." },
      { band: 7, text: "Variety of complex structures; frequent error-free sentences; good control of punctuation." },
      { band: 8, text: "Wide range of structures; the majority of sentences error-free; only occasional slips." },
    ],
    upgrade: [
      "In each body paragraph include one conditional, one relative clause, or one passive.",
      "Polite indirect requests: 'I was wondering whether you could…'.",
      "Proofread for articles, plurals and subject–verb agreement (the most common Band 6 errors).",
    ],
  },
];

export const WRITING_T2_CRITERIA: Criterion[] = [
  { ...WRITING_T1_CRITERIA[0], key: "TR", name: "Task Response", short: "TR",
    bands: [
      { band: 6, text: "Addresses all parts but some more fully than others; position present but conclusions may be unclear or repetitive." },
      { band: 7, text: "Addresses all parts; clear position throughout; main ideas extended and supported, though some may lack focus." },
      { band: 8, text: "Sufficiently addresses all parts; well-developed response with relevant, extended and supported ideas." },
    ],
    upgrade: [
      "Answer EVERY part of the question (two-part questions need two direct answers).",
      "State your position in the introduction and keep it identical in the conclusion.",
      "Each body paragraph: Topic sentence → Explanation → Further explanation → Specific example.",
    ] },
  WRITING_T1_CRITERIA[1],
  WRITING_T1_CRITERIA[2],
  WRITING_T1_CRITERIA[3],
];

export const SPEAKING_CRITERIA: Criterion[] = [
  {
    key: "FC", name: "Fluency & Coherence", short: "FC",
    bands: [
      { band: 6, text: "Willing to speak at length but loses coherence at times; hesitation or self-correction; connectives over-used." },
      { band: 7, text: "Speaks at length without noticeable effort; some hesitation when searching for language; flexible discourse markers." },
      { band: 8, text: "Fluent with only occasional repetition; hesitation is content-related; topics developed coherently." },
    ],
    upgrade: ["Part 1: Answer + Reason + Example (2–3 sentences).", "Part 2: PPF grid (Past → Present → Future) keeps you talking for 2 minutes.", "Use fillers that sound natural: 'That's an interesting one…', 'Let me think…'."],
  },
  {
    key: "LR", name: "Lexical Resource", short: "LR",
    bands: [
      { band: 6, text: "Wide enough vocabulary to discuss topics at length; meaning clear despite inappropriate choices; paraphrases generally OK." },
      { band: 7, text: "Flexible vocabulary on a variety of topics; some less common and idiomatic items; awareness of style and collocation." },
      { band: 8, text: "Wide resource used readily and flexibly; skilful use of less common and idiomatic language; occasional inaccuracies." },
    ],
    upgrade: ["Use topic collocations from the Lexical Bank.", "One natural idiom per part maximum — never forced.", "Paraphrase the examiner's question instead of repeating it."],
  },
  {
    key: "GRA", name: "Grammatical Range & Accuracy", short: "GRA",
    bands: [
      { band: 6, text: "Mix of simple and complex structures with limited flexibility; frequent errors with complex structures." },
      { band: 7, text: "Range of complex structures used with some flexibility; frequent error-free sentences." },
      { band: 8, text: "Wide range of structures used flexibly; majority of sentences error-free." },
    ],
    upgrade: ["Part 3: hypothetical conditionals ('If governments were to…').", "Contrast clauses ('Whereas…', 'Although…').", "Past perfect in Part 2 stories."],
  },
  {
    key: "P", name: "Pronunciation", short: "P",
    bands: [
      { band: 6, text: "Range of features with mixed control; generally understood; some mispronunciation reduces clarity." },
      { band: 7, text: "Shows most positive features of Band 6 and some of Band 8 — good chunking and stress." },
      { band: 8, text: "Wide range of features; sustains flexible use; easy to understand throughout; accent has minimal effect." },
    ],
    upgrade: ["Chunk speech into thought groups; pause at commas, not mid-phrase.", "Stress the content word that carries new information.", "Record and compare your Part 2 with the model."],
  },
];

export function buildWritingPrompt(task: { task: 1 | 2; prompt: string; bullets?: string[] }, answer: string) {
  const crit = task.task === 1 ? "Task Achievement, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy" : "Task Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy";
  return `You are a senior IELTS examiner. Grade this IELTS General Training Writing Task ${task.task} response.

TASK:
${task.prompt}
${task.bullets?.map((b) => "• " + b).join("\n") ?? ""}

CANDIDATE RESPONSE (${answer.trim().split(/\s+/).length} words):
"""
${answer}
"""

Score each criterion (${crit}) on the 0–9 scale in half bands, justify each score in 1–2 sentences with quotes from the response, and give the overall band.
The candidate needs Band 7.0 for CLB 9. Then provide:
1. The 3 changes most likely to raise the score to 7+.
2. Band 7+ rewrites of the 3 weakest sentences (original → rewrite).
3. A list of grammar/spelling errors with corrections.`;
}

export function buildSpeakingPrompt(transcript: string, part: string) {
  return `You are a senior IELTS Speaking examiner. Below is a transcript of a candidate's ${part} answer.
Score Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy (and Pronunciation only if notes are provided) in half bands, justify each with quotes,
then give 3 concrete tips and Band 7+ rewrites of 3 sentences. The target is Band 7.0 (CLB 9).

TRANSCRIPT:
"""
${transcript}
"""`;
}

export interface AiGrade {
  overall: number;
  criteria: { key: string; band: number; comment: string }[];
  improvements: string[];
  rewrites: { original: string; improved: string }[];
  errors: { error: string; correction: string }[];
}

/** Calls the optional /api/grade route. Returns null if AI grading isn't configured. */
export async function gradeWithAI(kind: "writing" | "speaking", prompt: string): Promise<AiGrade | { error: string }> {
  try {
    const res = await fetch("/api/grade", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, prompt }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || `AI grading unavailable (${res.status})` };
    return data as AiGrade;
  } catch {
    return { error: "AI grading endpoint not reachable (offline or static build)." };
  }
}

import type { Lesson } from "@/lib/types";

// Writing lessons are built around Kevin's two uploaded resources:
//  • the GT Task 1 letter template (Para 1 = purpose, Paras 2–4 = one bullet each, ~50 words)
//  • the IELTS Writing Structures Guide (5 Task 2 essay structures + checklists)
// Model letters/essays here are original.

export const writingLessons: Lesson[] = [
  {
    id: "w-t1-template",
    skill: "writing",
    title: "Task 1: the four-paragraph letter template",
    summary: "One purpose paragraph, then one ~50-word paragraph per bullet. It guarantees full task coverage every time.",
    minutes: 10,
    level: "core",
    blocks: [
      { kind: "p", text: "Every GT Task 1 question gives a situation and three bullet points. Examiners check that you cover all three, fully, in a tone that suits the reader. This template (from your uploaded guide) makes that automatic:" },
      { kind: "blueprint", title: "Letter template", rows: [
        { label: "Greeting", color: "slate", items: ["Dear Sir or Madam, / Dear Mr Patel, / Dear Sam,"] },
        { label: "Para 1", color: "teal", items: ["Reason why you're writing — paraphrase the background in the question (1–2 sentences)"] },
        { label: "Para 2", color: "rose", items: ["Bullet point 1 — about 50 words: answer + reason + specific detail"] },
        { label: "Para 3", color: "green", items: ["Bullet point 2 — about 50 words"] },
        { label: "Para 4", color: "amber", items: ["Bullet point 3 — about 50 words"] },
        { label: "Closing", color: "slate", items: ["One closing line + sign-off (Yours faithfully / Yours sincerely / Best wishes) + name"] },
      ]},
      { kind: "table", head: ["Item", "Target"], rows: [
        ["Minimum words", "150 (writing fewer is penalised under Task Achievement)"],
        ["Ideal length", "170–200 words — enough detail without wasting Task 2 time"],
        ["Time", "20 minutes: 3 plan, 14 write, 3 check"],
        ["Weight", "Task 2 counts double, so never go past 20 minutes on Task 1"],
      ]},
      { kind: "steps", items: [
        { title: "Identify the reader → tone", text: "Stranger / company → formal. Someone you know professionally (manager, landlord, neighbour you don't know well) → semi-formal. Friend or family → informal." },
        { title: "Identify the purpose", text: "Complain, apologise, request, thank, invite, inform, explain, recommend. Your first sentence must make it obvious." },
        { title: "Brainstorm one detail per bullet", text: "Invent concrete facts: names, dates, amounts, places. Detail is what lifts a 6 to a 7 in Task Achievement." },
        { title: "Write paragraph by paragraph", text: "Each paragraph starts by signalling its bullet: 'I chose your gym mainly because…', 'Unfortunately, the reality has been…', 'I would therefore be grateful if…'" },
      ]},
      { kind: "tip", tone: "clb9", title: "Why 6.5 letters miss 7", text: "In the 100 student samples you uploaded, the Band 7 letters lost marks for: one bullet answered in a single sentence, tone that drifted (formal opener but chatty middle), and copying the task wording in the first line. Band 8–9 letters gave every bullet a reason AND a specific detail." },
    ],
  },
  {
    id: "w-t1-tone",
    skill: "writing",
    title: "Task 1: tone matrix — formal, semi-formal, informal",
    summary: "Greeting, opener, request, closing and sign-off for each register. Mixing registers is the #1 Task 1 error.",
    minutes: 10,
    level: "core",
    blocks: [
      { kind: "table", head: ["", "Formal", "Semi-formal", "Informal"], rows: [
        ["Reader", "Unknown person, company, official", "Known person in a professional role: manager, landlord, teacher", "Friend, relative, close colleague"],
        ["Greeting", "Dear Sir or Madam,", "Dear Mr Chen, / Dear Ms Ortiz,", "Dear Sam, / Hi Sam,"],
        ["Opener", "I am writing to complain about / enquire about / request…", "I am writing to let you know that… / I'm writing regarding…", "I hope you're well! I'm writing to tell you…"],
        ["Request", "I would be grateful if you could…", "Would it be possible to…? / I was wondering if…", "Could you…? / Any chance you could…?"],
        ["Apology", "Please accept my sincere apologies for…", "I'm very sorry for…", "I'm really sorry about…"],
        ["Closing line", "I look forward to hearing from you at your earliest convenience.", "I look forward to hearing from you. / Thank you for your understanding.", "Can't wait to hear from you! / Write back soon."],
        ["Sign-off", "Yours faithfully, + full name", "Yours sincerely, / Kind regards, + full name", "Best wishes, / Love, / Take care, + first name"],
        ["Contractions", "Never", "Avoid (occasional is OK)", "Use naturally"],
        ["Phrasal verbs", "Avoid (use single verbs: postpone, contact)", "Some", "Plenty (put off, get in touch)"],
      ]},
      { kind: "tip", tone: "warn", title: "Sign-off rule", text: "Dear Sir or Madam → Yours faithfully. Dear Mr/Ms + surname → Yours sincerely. Mixing these is a visible accuracy error. Also watch spelling: one student sample wrote 'King regards' and another 'Your sincerely'." },
      { kind: "example", title: "Same idea, three tones", text: "Formal: I would be grateful if you could arrange a replacement at your earliest convenience.\nSemi-formal: Would it be possible to arrange a replacement sometime next week?\nInformal: Any chance you could sort out a new one for me next week?" },
    ],
  },
  {
    id: "w-t1-phrases",
    skill: "writing",
    title: "Task 1: phrase bank from Band 7–9 letters",
    summary: "Purpose openers, bullet transitions and closings collected from the high-scoring GT letters in your uploaded samples.",
    minutes: 8,
    level: "core",
    blocks: [
      { kind: "h", text: "Purpose openers (Para 1)" },
      { kind: "list", items: [
        "I am writing to inform you that I will be leaving my part-time position at the end of this month. (formal/semi)",
        "I am writing with regard to a laptop that I lost during my recent holiday. (formal)",
        "I am writing to make a claim under my travel insurance policy for… (formal)",
        "I am writing to apologise for missing the project deadline last week, which… (semi)",
        "I am writing to request some time off next month. (semi)",
        "I hope this letter finds you well. I'm writing to thank you for… (informal)",
        "I'm writing to let you know some exciting news — I've just… (informal)",
      ]},
      { kind: "h", text: "Bullet transitions (start of Paras 2–4)" },
      { kind: "table", head: ["Purpose of paragraph", "Formal / semi", "Informal"], rows: [
        ["Describe", "The item in question is…", "It's a…"],
        ["Explain what happened", "Unfortunately, on 12 March… / The reason for this is that…", "What happened was…"],
        ["Give reasons", "I chose your company mainly because…", "The main reason is…"],
        ["State what you want", "I would therefore like to request… / I would appreciate it if…", "So, I was hoping you could…"],
        ["Suggest / invite", "I would like to suggest that…", "Why don't you…? / How about…?"],
        ["Reassure", "I have already arranged for… to cover my duties.", "Don't worry — I've already…"],
      ]},
      { kind: "h", text: "Closings" },
      { kind: "list", items: ["I look forward to your prompt reply.", "Please do not hesitate to contact me if you require any further information.", "Thank you in advance for your understanding.", "Let me know what you think!", "Give my love to the family."] },
      { kind: "tip", text: "Common scenario types in the samples: lost property / insurance claims, resigning or requesting leave, apologising to a manager, thanking a friend for a stay, organising something for a family event, complaining about a faulty product. Practise each with the template." },
    ],
  },
  {
    id: "w-t1-models",
    skill: "writing",
    title: "Task 1: three Band 8 model letters (one per tone)",
    summary: "Original models that follow the four-paragraph template exactly. Study how each bullet is extended.",
    minutes: 12,
    level: "clb9",
    blocks: [
      { kind: "example", title: "SEMI-FORMAL — You need time off work. Write to your manager: explain why, say how long, explain how your work will be covered.", text: `Dear Ms Alvarez,

I am writing to request a period of leave next month to deal with an urgent family matter.

My father is due to have knee surgery on 9 October, and the hospital has advised that he will need full-time support for at least a week afterwards. As my mother is currently abroad, I am the only family member able to look after him.

I would therefore like to take seven working days off, from 9 to 17 October inclusive. I would be happy for this to be deducted from my annual leave allowance, of which I still have twelve days remaining.

To ensure that my work does not fall behind, I have already discussed the situation with Tom Reid, who has kindly agreed to handle my client calls. I will also leave detailed notes on all ongoing projects and remain reachable by email for anything urgent.

Thank you for considering my request. I look forward to hearing from you.

Yours sincerely,
Priya Nair`, note: "182 words. Each body paragraph = one bullet with reason + concrete detail (dates, names, numbers)." },
      { kind: "example", title: "FORMAL — You lost a bag on a train. Write to the rail company: describe the bag, explain where and when you lost it, say what you want them to do.", text: `Dear Sir or Madam,

I am writing to report a bag that I left on one of your trains last Thursday and to ask for your help in recovering it.

The bag is a medium-sized navy-blue rucksack with brown leather straps and a small luggage tag bearing my name. Inside, there is a silver laptop, a black diary and a pair of reading glasses in a red case.

I was travelling on the 17:45 service from Leeds to York on 14 March, sitting in carriage C. Unfortunately, I was distracted by a phone call as the train approached York and did not realise I had left the bag in the overhead rack until I reached the station exit.

I would be extremely grateful if you could check whether the bag has been handed in to your lost property office. If it has, I would appreciate it if you could contact me on 07700 900 123 to arrange collection.

I look forward to your prompt reply.

Yours faithfully,
Jonas Weber`, note: "Formal register throughout: no contractions, 'I would be extremely grateful', 'arrange collection'." },
      { kind: "example", title: "INFORMAL — A friend let you stay at their home. Write to thank them: say what you enjoyed most, explain why you didn't write sooner, invite them to visit you.", text: `Dear Maria,

I hope you're doing well! I'm writing to say a huge thank you for letting me stay with you in Valencia — it was easily the best holiday I've had in years.

What I loved most was the day we cycled along the old riverbed to the beach. I still can't believe how much ground we covered, and that seafood paella afterwards was out of this world. I've already tried to make it twice, with mixed results!

Sorry it's taken me so long to write. The week I got back, my office moved to a new building, and I've been working late almost every night trying to unpack and get everything up and running again.

Anyway, it's my turn to play host now. Why don't you come over in the spring? The cherry blossoms are amazing in April, and I'd love to show you round the old town.

Let me know when you're free!

Love,
Ana`, note: "Informal features: contractions, exclamation marks, idioms ('out of this world'), phrasal verbs ('get… up and running')." },
    ],
  },
  {
    id: "w-t2-structures",
    skill: "writing",
    title: "Task 2: the five essay blueprints",
    summary: "From your Writing Structures Guide: identify the essay type, then follow its colour-coded paragraph plan.",
    minutes: 15,
    level: "core",
    blocks: [
      { kind: "p", text: "Using the wrong structure is one of the most common reasons for a Task Response score below 7. Identify the question type first. Every type uses 4 paragraphs and the same body-paragraph engine: Topic sentence → Explanation → Explain further → Example." },
      { kind: "table", head: ["Question wording", "Essay type"], rows: [
        ["To what extent do you agree or disagree? / Do you agree?", "Opinion"],
        ["Discuss both views and give your own opinion.", "Discuss both views"],
        ["What are the advantages and disadvantages?", "Advantages & disadvantages"],
        ["What problems…? What solutions…? / What causes…? How can…?", "Problem & solution"],
        ["Two direct questions (Why…? Is this positive or negative?)", "Two-part / double question"],
      ]},
      { kind: "blueprint", title: "1 · Opinion essay", rows: [
        { label: "Introduction", color: "teal", items: ["Paraphrase the question", "Clear opinion", "Main idea 1", "Main idea 2"] },
        { label: "Body 1", color: "rose", items: ["Topic sentence (main idea 1)", "Explanation", "Explain further", "Example"] },
        { label: "Body 2", color: "green", items: ["Topic sentence (main idea 2)", "Explanation", "Further explanation", "Example"] },
        { label: "Conclusion", color: "teal", items: ["Restate opinion", "Summary of main idea 1", "Summary of main idea 2"] },
      ]},
      { kind: "blueprint", title: "2 · Discuss both views (+ opinion)", rows: [
        { label: "Introduction", color: "teal", items: ["Paraphrase", "Briefly outline viewpoint 1", "Briefly outline viewpoint 2", "State your opinion"] },
        { label: "Body 1", color: "rose", items: ["Topic sentence: viewpoint 1", "Explanation", "Example", "State that you disagree (if you do)"] },
        { label: "Body 2", color: "green", items: ["Topic sentence: viewpoint 2", "Explanation", "Example", "State that you agree"] },
        { label: "Conclusion", color: "teal", items: ["In conclusion, although + viewpoint 1, + your opinion about viewpoint 2"] },
      ]},
      { kind: "blueprint", title: "3 · Advantages & disadvantages", rows: [
        { label: "Introduction", color: "teal", items: ["Paraphrase", "Briefly state 2 advantages", "Briefly state 2 disadvantages"] },
        { label: "Body 1 (advantages)", color: "rose", items: ["Advantage 1 + explanation", "Advantage 2 + explanation + example"] },
        { label: "Body 2 (disadvantages)", color: "green", items: ["Disadvantage 1 + explanation", "Disadvantage 2 + explanation + example"] },
        { label: "Conclusion", color: "teal", items: ["Summarise both advantages", "Summarise both disadvantages"] },
      ]},
      { kind: "blueprint", title: "4 · Problem & solution", rows: [
        { label: "Introduction", color: "teal", items: ["Paraphrase", "Briefly state 2 problems", "Briefly state 2 solutions"] },
        { label: "Body 1 (problems)", color: "rose", items: ["Problem 1 + explanation", "Problem 2 + explanation + example"] },
        { label: "Body 2 (solutions)", color: "green", items: ["Solution 1 + explanation", "Solution 2 + explanation + example"] },
        { label: "Conclusion", color: "teal", items: ["Summarise both problems", "Summarise both solutions"] },
      ]},
      { kind: "blueprint", title: "5 · Two-part / double question", rows: [
        { label: "Introduction", color: "teal", items: ["Paraphrase", "Directly answer question 1", "Directly answer question 2"] },
        { label: "Body 1", color: "rose", items: ["Topic sentence: answer to Q1", "Explain", "Explain further", "Example"] },
        { label: "Body 2", color: "green", items: ["Topic sentence: answer to Q2", "Explain", "Explain further", "Example"] },
        { label: "Conclusion", color: "teal", items: ["Summarise answer to Q1", "Summarise answer to Q2"] },
      ]},
      { kind: "tip", tone: "warn", title: "Templates, not formulas", text: "As your guide stresses: the structure organises your thinking, but you still need your own ideas and language. Memorised sentences are discounted by examiners." },
    ],
  },
  {
    id: "w-t2-process",
    skill: "writing",
    title: "Task 2: the planning → drafting → checking workflow",
    summary: "The 40-minute process and the self-check list from your Structures Guide.",
    minutes: 8,
    level: "core",
    blocks: [
      { kind: "table", head: ["Stage", "Minutes", "What you do"], rows: [
        ["Pre-writing", "5–7", "Identify the type, answer the question(s) in your head, generate 2 main ideas, populate the structure in note form"],
        ["Drafting", "25–28", "Write the introduction, then 2 body paragraphs, then look back at the introduction to write the conclusion"],
        ["Checking", "5", "Vocabulary pass (replace repeated/simple words) then grammar pass (fix errors)"],
      ]},
      { kind: "checklist", groups: [
        { title: "Planning — ingredients", items: ["Did I read and understand the question?", "Did I paraphrase the question statement in my own words?", "Did I generate 2 main ideas (or 2 adv + 2 disadv / 2 problems + 2 solutions)?", "Did I think of explanations and examples?", "Do these ideas make sense together?"] },
        { title: "Planning — structure", items: ["Did I follow the exact structure for this essay type?", "Did I populate the structure appropriately?", "Did I use the structure while writing?"] },
        { title: "Writing — intro & conclusion", items: ["Does my first sentence mean the same as the question statement?", "Have I varied my language in the first sentence?", "Are both main ideas clearly outlined in the introduction?", "Does the conclusion summarise the same ideas as the introduction?"] },
        { title: "Writing — body paragraphs", items: ["Do my topic sentences match the main ideas in my introduction?", "Have I explained each main idea?", "Have I given one example in each body paragraph?"] },
        { title: "Checking", items: ["Have I checked for grammar mistakes and fixed them?", "Have I varied my vocabulary and replaced simple words with higher-level ones?", "Have I checked spelling and word meaning?", "Have I written at least 250 words?"] },
      ]},
    ],
  },
  {
    id: "w-cohesion",
    skill: "writing",
    title: "Band 7+ cohesion and complex sentences",
    summary: "Flexible linking, referencing and five sentence structures that show grammatical range.",
    minutes: 10,
    level: "clb9",
    blocks: [
      { kind: "compare", left: { title: "Band 6 cohesion", text: "Firstly, … Secondly, … Thirdly, … Moreover, … Furthermore, … In addition, … In conclusion, …\n(Mechanical: every sentence starts with a linker.)" }, right: { title: "Band 7+ cohesion", text: "The main reason I support this is… This means that… A further advantage is… Such a change would… As a result,…\n(Linkers mixed with referencing words: this, such, these, the latter.)" } },
      { kind: "table", head: ["Structure", "Pattern", "Example"], rows: [
        ["Second conditional", "If + past, would + verb", "If governments invested in night trains, short flights would become less attractive."],
        ["Relative clause", "noun + which/who/where", "Parents, who often work long hours, benefit most from flexible hours."],
        ["Concession", "Although / While / Despite", "Although online shopping is convenient, it has hidden environmental costs."],
        ["Passive for objectivity", "It is often argued that…", "It is widely believed that early education improves later results."],
        ["Participle clause", "-ing / -ed opening", "Faced with rising costs, many libraries have formed partnerships."],
      ]},
      { kind: "tip", text: "Aim for at least one of each in every Task 2 essay — but accuracy comes first. A simple correct sentence scores better than a broken complex one." },
    ],
  },
  {
    id: "w-lexis",
    skill: "writing",
    title: "Lexical upgrades: Band 6 words → Band 8 equivalents",
    summary: "Replace safe, repeated words with precise, natural alternatives.",
    minutes: 8,
    level: "clb9",
    blocks: [
      { kind: "table", head: ["Band 6", "Band 8 alternatives", "In context"], rows: [
        ["very important", "crucial, vital, essential, of paramount importance", "Regular exercise is crucial for long-term health."],
        ["big", "substantial, considerable, significant", "a substantial increase in costs"],
        ["good / bad", "beneficial / detrimental", "a detrimental effect on concentration"],
        ["a lot of", "a great deal of (uncountable), numerous (countable)", "numerous studies have shown"],
        ["show", "demonstrate, illustrate, reveal", "This clearly demonstrates that…"],
        ["think", "maintain, contend, argue", "Critics contend that…"],
        ["get", "obtain, acquire, gain", "gain valuable experience"],
        ["problem", "issue, drawback, obstacle", "a major obstacle to progress"],
        ["help", "assist, facilitate, support", "facilitate communication"],
        ["increase", "rise, grow, surge, escalate", "a sharp rise in demand"],
        ["people", "individuals, citizens, the public, residents", "local residents"],
        ["nowadays", "in recent years, in the modern era", "In recent years, remote work has…"],
        ["solve", "address, tackle, resolve", "tackle the root causes"],
      ]},
      { kind: "tip", tone: "warn", text: "Collocation matters more than rarity: 'make a decision' (not 'do a decision'), 'pose a threat', 'play a role', 'raise awareness', 'meet the needs of'." },
    ],
  },
];

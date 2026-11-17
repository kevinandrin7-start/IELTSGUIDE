import type { Drill } from "@/lib/types";
import { opts, q, romanOpts } from "./helpers";

const TFNG = [{ key: "TRUE", text: "TRUE" }, { key: "FALSE", text: "FALSE" }, { key: "NOT GIVEN", text: "NOT GIVEN" }];
const YNNG = [{ key: "YES", text: "YES" }, { key: "NO", text: "NO" }, { key: "NOT GIVEN", text: "NOT GIVEN" }];

export const DRILLS: Drill[] = [
  // ───────── READING ─────────
  {
    id: "d-tfng-1",
    skill: "reading",
    title: "10-minute True/False/Not Given",
    qtype: "True/False/Not Given",
    minutes: 10,
    description: "A workplace notice with 7 statements. Apply the contradiction test before choosing FALSE.",
    passage: {
      id: "dp-1",
      title: "Oakridge Hospital — Volunteer Programme",
      kind: "Workplace notice",
      paragraphs: [
        { text: "Oakridge Hospital welcomes volunteers aged 18 and over. Volunteers aged 16 and 17 may help in the hospital shop and garden only, and must have written permission from a parent." },
        { text: "All volunteers attend a half-day induction, which covers fire safety, patient confidentiality and infection control. Inductions take place on the first Monday of each month. Volunteers cannot start any role until they have completed the induction." },
        { text: "We ask volunteers to commit to at least one three-hour shift per week for a minimum of six months. Shifts are available seven days a week, although weekend shifts are usually the hardest to fill." },
        { text: "Travel expenses of up to £8 per shift can be claimed by submitting receipts to the volunteer office. Volunteers also receive a free hot meal in the staff canteen on any day they work a shift." },
        { text: "Volunteers working directly with patients must have a background check, which the hospital will arrange and pay for. This process normally takes three to four weeks." },
      ],
    },
    groups: [
      {
        id: "dg-1", type: "tfng", options: TFNG,
        instructions: "Write TRUE, FALSE or NOT GIVEN.",
        questions: [
          q("d1-1", 1, "Sixteen-year-olds can volunteer in any department of the hospital.", "FALSE", "Shop and garden only."),
          q("d1-2", 2, "Volunteers can begin working before their induction if they are experienced.", "FALSE", "'Cannot start any role until they have completed the induction.'"),
          q("d1-3", 3, "The induction includes a session on first aid.", "NOT GIVEN", "Fire safety, confidentiality and infection control are listed; first aid is not mentioned either way."),
          q("d1-4", 4, "It is more difficult to find volunteers for weekend shifts.", "TRUE", "'Weekend shifts are usually the hardest to fill.'"),
          q("d1-5", 5, "Volunteers must provide receipts to claim travel costs.", "TRUE", "'By submitting receipts.'"),
          q("d1-6", 6, "Volunteers are given a free meal only on weekends.", "FALSE", "'On any day they work a shift.'"),
          q("d1-7", 7, "Volunteers must pay for their own background check.", "FALSE", "'The hospital will arrange and pay for.'"),
        ],
      },
    ],
  },
  {
    id: "d-headings-1",
    skill: "reading",
    title: "Matching Headings sprint",
    qtype: "Matching Headings",
    minutes: 8,
    description: "Five paragraphs, seven headings. Summarise each paragraph in 3–5 words before you look at the list.",
    passage: {
      id: "dp-2",
      title: "Why Sleep Matters More Than We Think",
      kind: "Article",
      paragraphs: [
        { label: "A", text: "For decades, sleep was regarded as a passive state — the body simply switching off for the night. Researchers now know this view is wrong. During sleep the brain is highly active, sorting the day's memories, clearing waste products and preparing for the following day." },
        { label: "B", text: "The consequences of not sleeping enough are serious. Adults who regularly sleep less than six hours a night are more likely to develop heart disease and diabetes, and they catch colds more easily. Even a single night of poor sleep reduces concentration as much as being slightly drunk." },
        { label: "C", text: "Modern life makes good sleep harder to achieve. Screens emit blue light that delays the release of melatonin, the hormone that makes us feel sleepy. Long working hours and late-night messages mean many people go to bed with their minds still racing." },
        { label: "D", text: "Fortunately, simple changes can make a large difference. Going to bed and getting up at the same time every day — even at weekends — is the single most effective habit. Keeping bedrooms cool and dark, and avoiding caffeine after lunchtime, also help." },
        { label: "E", text: "Some employers have begun to take sleep seriously. A number of companies now discourage emails after 8 pm, and a few have installed quiet rooms where staff can take a short nap during the day, believing that rested employees make fewer mistakes." },
      ],
    },
    groups: [
      {
        id: "dg-2", type: "headings",
        instructions: "Choose the correct heading for each paragraph, A–E.",
        options: romanOpts("Workplaces responding to the issue", "An outdated belief", "The history of sleep research", "Health risks of too little sleep", "Practical steps for better rest", "Why melatonin supplements are popular", "Obstacles created by today's lifestyle"),
        questions: [
          q("d2-1", 1, "Paragraph A", "ii", "Sleep 'was regarded as a passive state… this view is wrong'."),
          q("d2-2", 2, "Paragraph B", "iv", "Heart disease, diabetes, colds, concentration."),
          q("d2-3", 3, "Paragraph C", "vii", "Screens, long hours, late messages = modern life obstacles. Melatonin is a detail (vi is a trap)."),
          q("d2-4", 4, "Paragraph D", "v", "Same bedtime, cool rooms, no caffeine."),
          q("d2-5", 5, "Paragraph E", "i", "Companies discouraging emails, quiet rooms."),
        ],
      },
    ],
  },
  {
    id: "d-summary-1",
    skill: "reading",
    title: "Summary completion (word bank)",
    qtype: "Summary Completion",
    minutes: 6,
    description: "Match the summary's synonyms to the text. Check grammar after each choice.",
    passage: {
      id: "dp-3",
      title: "The Four-Day Working Week",
      kind: "Article",
      paragraphs: [
        { text: "In a large trial involving more than sixty companies, employees worked four days a week for the same pay. Managers were initially worried that output would fall, but most firms reported that productivity stayed the same or even improved." },
        { text: "Staff said they felt less exhausted and took fewer sick days. Many used the extra day for family responsibilities, exercise or further study. Recruitment also became easier, as job advertisements offering a four-day week attracted far more applicants." },
        { text: "Not every organisation found the change straightforward. Businesses that must be open to customers every day, such as restaurants, had to introduce complicated rotas, and a small number returned to the traditional five-day week after the trial ended." },
      ],
    },
    groups: [
      {
        id: "dg-3", type: "matching",
        instructions: "Complete the summary using the list of words, A–H.",
        options: opts("salary", "efficiency", "absences", "candidates", "customers", "schedules", "holidays", "profits"),
        questions: [
          q("d3-1", 1, "Employees kept the same ____ while working one day less.", "A", "'For the same pay' = salary."),
          q("d3-2", 2, "Most companies found that ____ did not decline.", "B", "'Productivity stayed the same' = efficiency."),
          q("d3-3", 3, "Workers reported fewer ____ due to illness.", "C", "'Fewer sick days' = absences."),
          q("d3-4", 4, "Job adverts attracted many more ____.", "D", "'Far more applicants' = candidates."),
          q("d3-5", 5, "Restaurants needed complex ____ to stay open daily.", "F", "'Complicated rotas' = schedules."),
        ],
      },
    ],
  },
  {
    id: "d-ynng-1",
    skill: "reading",
    title: "Yes/No/Not Given: writer's views",
    qtype: "Yes/No/Not Given",
    minutes: 6,
    description: "Identify the writer's opinion signals: 'In my view', 'surely', 'it is a mistake to…'.",
    passage: {
      id: "dp-4",
      title: "Should Cities Ban Cars From Their Centres?",
      kind: "Opinion article",
      paragraphs: [
        { text: "Several European cities have closed their historic centres to private cars, and the results have been striking: cleaner air, quieter streets and busier shops. It is a mistake, however, to assume that the same policy would work everywhere." },
        { text: "Cities with excellent public transport can make the change relatively painlessly. Where buses are infrequent and unreliable, a ban simply punishes people who have no alternative, particularly those who live on the edge of the city and work unusual hours." },
        { text: "Surely the sensible approach is to improve public transport first and restrict cars later. Some campaigners argue that bans themselves force governments to invest in buses and trams, but I have seen little evidence that this happens." },
      ],
    },
    groups: [
      {
        id: "dg-4", type: "ynng", options: YNNG,
        instructions: "Do the statements agree with the views of the writer? Write YES, NO or NOT GIVEN.",
        questions: [
          q("d4-1", 1, "Car bans have had positive results in some European cities.", "YES", "'The results have been striking: cleaner air…'"),
          q("d4-2", 2, "A car ban would be equally effective in any city.", "NO", "'It is a mistake… to assume that the same policy would work everywhere.'"),
          q("d4-3", 3, "Shop owners usually oppose car bans at first.", "NOT GIVEN", "Shops being busier is mentioned, but not owners' initial attitudes."),
          q("d4-4", 4, "Public transport should be improved before cars are restricted.", "YES", "'Surely the sensible approach is to improve public transport first.'"),
          q("d4-5", 5, "Car bans lead governments to invest more in public transport.", "NO", "'I have seen little evidence that this happens.'"),
        ],
      },
    ],
  },

  // ───────── LISTENING ─────────
  {
    id: "d-listen-form",
    skill: "listening",
    title: "Part 1 form completion (spelling & numbers)",
    qtype: "Form Completion",
    minutes: 5,
    description: "A short booking call with corrections and spelled names. Aim for 6/6.",
    listening: {
      id: "dl-1", part: 1, title: "Dental appointment", context: "A man is calling a dental clinic to book an appointment.",
      speakers: [{ name: "Clinic", voice: "female" }, { name: "Caller", voice: "male" }],
      script: [
        { speaker: "Clinic", text: "Brightsmile Dental, how can I help?" },
        { speaker: "Caller", text: "Hi, I'd like to book a check-up. I'm a new patient." },
        { speaker: "Clinic", text: "Of course. What's your surname?" },
        { speaker: "Caller", text: "It's Okonjo. O, K, O, N, J, O." },
        { speaker: "Clinic", text: "And your date of birth?" },
        { speaker: "Caller", text: "The thirtieth of August, nineteen ninety-one. Sorry, no — the thirteenth. Thirteenth of August." },
        { speaker: "Clinic", text: "Thirteenth of August, 1991. We have a slot on Wednesday at ten fifteen, or Thursday at four forty." },
        { speaker: "Caller", text: "Wednesday morning is no good, I'm afraid. Thursday, please." },
        { speaker: "Clinic", text: "Fine. A check-up for new patients is forty-five pounds, but if you book a cleaning at the same time it's sixty in total." },
        { speaker: "Caller", text: "Just the check-up for now, thanks." },
        { speaker: "Clinic", text: "Please bring a list of any medicines you take. And our new address is 9 Calder Lane — we've moved from the High Street." },
      ],
      groups: [],
    },
    groups: [
      {
        id: "dg-5", type: "gap", instructions: "Write ONE WORD AND/OR A NUMBER for each answer.", title: "Brightsmile Dental — New Patient",
        questions: [
          q("d5-1", 1, "Surname: ____", "Okonjo", "Spelled O-K-O-N-J-O."),
          q("d5-2", 2, "Date of birth: ____ August 1991", ["13", "13th", "thirteenth"], "He corrects thirtieth to thirteenth."),
          q("d5-3", 3, "Appointment day: ____", "Thursday", "Wednesday is rejected."),
          q("d5-4", 4, "Time: ____ pm", ["4.40", "4:40", "four forty"], "Thursday's slot is 4.40."),
          q("d5-5", 5, "Cost: £____", ["45", "forty-five"], "He only books the check-up; £60 includes cleaning (distractor)."),
          q("d5-6", 6, "Clinic address: 9 ____ Lane", "Calder", "The High Street is the old address."),
        ],
      },
    ],
  },
  {
    id: "d-listen-mcq",
    skill: "listening",
    title: "Part 3 distractor hunt (MCQ)",
    qtype: "Multiple Choice",
    minutes: 5,
    description: "Two colleagues disagree before agreeing. Choose what they finally decide.",
    listening: {
      id: "dl-2", part: 3, title: "Planning a team event", context: "Two colleagues, Lena and Raj, are planning a team event.",
      speakers: [{ name: "Lena", voice: "female" }, { name: "Raj", voice: "male" }],
      script: [
        { speaker: "Raj", text: "So, for the team event, I was thinking bowling. Everyone enjoyed it last year." },
        { speaker: "Lena", text: "They did, but we've got three new people who might prefer something where they can actually talk. What about a cooking class?" },
        { speaker: "Raj", text: "A cooking class is a great idea, actually. People have to work together." },
        { speaker: "Lena", text: "And when? Friday afternoon is popular." },
        { speaker: "Raj", text: "Half the team works from home on Fridays, though. Thursday would get more people in." },
        { speaker: "Lena", text: "True. Thursday it is. How should we pay? The department budget won't cover all of it." },
        { speaker: "Raj", text: "We could ask everyone to contribute, but that might put people off. I'd rather ask the director for extra funding." },
        { speaker: "Lena", text: "Agreed — let's try that before asking staff to pay." },
      ],
      groups: [],
    },
    groups: [
      {
        id: "dg-6", type: "mcq", instructions: "Choose the correct letter, A, B or C.",
        questionOptions: {
          "d6-1": opts("bowling", "a cooking class", "a quiz night"),
          "d6-2": opts("Wednesday", "Thursday", "Friday"),
          "d6-3": opts("from the department budget only", "by asking staff to contribute", "by requesting money from the director"),
        },
        questions: [
          q("d6-1", 1, "What activity do they choose?", "B", "Bowling is Raj's first idea; they agree on cooking."),
          q("d6-2", 2, "When will the event be?", "B", "Friday rejected because of home working."),
          q("d6-3", 3, "How will they pay for it?", "C", "'Ask the director for extra funding… let's try that.'"),
        ],
      },
    ],
  },

  // ───────── WRITING ─────────
  {
    id: "d-tone",
    skill: "writing",
    title: "Task 1 tone calibration",
    qtype: "Letter Tone",
    minutes: 6,
    description: "Classify each sentence as formal, semi-formal or informal. Mixed tone is the most common Task 1 error.",
    classify: {
      prompt: "Which register does each sentence belong to?",
      choices: ["formal", "semi-formal", "informal"],
      items: [
        { text: "I would be grateful if you could refund the full amount.", answer: "formal", why: "'I would be grateful if…' is a classic formal request." },
        { text: "Any chance you could pick me up from the station?", answer: "informal", why: "'Any chance…' + phrasal verb 'pick up'." },
        { text: "I was wondering if I could take Friday off.", answer: "semi-formal", why: "Polite but personal — suits a manager you know." },
        { text: "Please accept my sincere apologies for the inconvenience caused.", answer: "formal", why: "Fixed formal apology phrase." },
        { text: "Can't wait to see you next month!", answer: "informal", why: "Ellipsis (no 'I') + exclamation + contraction." },
        { text: "Thank you for your understanding in this matter.", answer: "semi-formal", why: "Polite closing suitable for a known professional contact (also acceptable in formal)." },
        { text: "I am writing to enquire about the vacancy advertised on your website.", answer: "formal", why: "'Enquire', 'vacancy', 'advertised' — formal vocabulary to a stranger." },
        { text: "Guess what? I finally passed my driving test!", answer: "informal", why: "Conversational question + exclamation." },
      ],
    },
  },
  {
    id: "d-lexis",
    skill: "writing",
    title: "Lexical upgrade: Band 6 → Band 8",
    qtype: "Lexical Resource",
    minutes: 8,
    description: "Rewrite each sentence using more precise vocabulary. Compare with the model.",
    rewrite: {
      prompt: "Rewrite the sentence replacing the underlined-style simple words (in CAPS) with Band 8 alternatives.",
      items: [
        { from: "Technology has a VERY BIG effect on how children learn.", model: "Technology has a profound impact on how children learn.", hint: "profound / significant + impact" },
        { from: "The government should SOLVE the PROBLEM of traffic.", model: "The government should tackle the issue of traffic congestion.", hint: "tackle / address + issue" },
        { from: "A LOT OF people THINK that university should be free.", model: "Many people maintain that university education should be free of charge.", hint: "maintain / contend" },
        { from: "Working from home is GOOD for parents.", model: "Working from home is particularly beneficial for parents.", hint: "beneficial / advantageous" },
        { from: "Prices have GONE UP A LOT in recent years.", model: "Prices have risen sharply in recent years.", hint: "rise + sharply / dramatically" },
        { from: "This SHOWS that exercise is VERY IMPORTANT.", model: "This clearly demonstrates that exercise is vital.", hint: "demonstrate + vital / crucial" },
      ],
    },
  },
  {
    id: "d-essaytype",
    skill: "writing",
    title: "Task 2: identify the essay type",
    qtype: "Essay Type",
    minutes: 5,
    description: "Choosing the wrong structure caps Task Response at 6. Identify the type in 10 seconds.",
    classify: {
      prompt: "Which structure from the Writing Structures Guide fits each question?",
      choices: ["opinion", "discussion", "advantages", "problem-solution", "two-part"],
      items: [
        { text: "Some people believe that unpaid community service should be compulsory for teenagers. To what extent do you agree or disagree?", answer: "opinion", why: "'To what extent do you agree' = opinion." },
        { text: "More people are choosing to live alone. Why is this happening? Is it a positive or negative development?", answer: "two-part", why: "Two direct questions." },
        { text: "Many cities are suffering from traffic congestion. What are the causes, and what can be done to solve this problem?", answer: "problem-solution", why: "Causes + solutions." },
        { text: "Some think museums should be free, while others think visitors should pay. Discuss both views and give your opinion.", answer: "discussion", why: "'Discuss both views'." },
        { text: "Online learning is replacing classroom teaching in many places. What are the advantages and disadvantages of this?", answer: "advantages", why: "'Advantages and disadvantages'." },
        { text: "Do the advantages of tourism outweigh the disadvantages?", answer: "opinion", why: "'Do… outweigh' asks for your judgement — treat as opinion (adv vs disadv with a clear position)." },
      ],
    },
  },

  // ───────── SPEAKING ─────────
  {
    id: "d-part1",
    skill: "speaking",
    title: "Part 1 extension drill (A-R-E)",
    qtype: "Speaking Part 1",
    minutes: 6,
    description: "Answer + Reason + Example in 20 seconds per question. Record and play back.",
    speak: {
      prompt: "Answer each question in 15–25 seconds using Answer + Reason + Example.",
      formula: "Answer → Reason ('mainly because…') → Example ('for instance, last week…')",
      seconds: 25,
      questions: ["Do you like cooking?", "How do you usually spend your weekends?", "Do you prefer mornings or evenings?", "Is there a place in your city you like to visit?", "Do you use public transport often?"],
    },
  },
  {
    id: "d-part2",
    skill: "speaking",
    title: "Part 2 cue card with PPF notes",
    qtype: "Speaking Part 2",
    minutes: 4,
    description: "1 minute to note Past/Present/Future keywords, then speak for 2 minutes.",
    speak: {
      prompt: "Describe a place you visited that you would like to return to. You should say: where it is, when you went there, what you did there — and explain why you would like to go back.",
      formula: "Intro (10s) → PAST (35s) → PRESENT/bullets (45s) → FUTURE/why (30s)",
      seconds: 120,
      questions: ["Describe a place you visited that you would like to return to."],
    },
  },
  {
    id: "d-part3",
    skill: "speaking",
    title: "Part 3 opinion builder (O-R-E-C)",
    qtype: "Speaking Part 3",
    minutes: 6,
    description: "Opinion → Reason → Example → Contrast. 40–60 seconds each.",
    speak: {
      prompt: "Give a developed answer to each abstract question.",
      formula: "Opinion → Reason → Example → Contrast ('That said…')",
      seconds: 60,
      questions: ["Why do young people move to big cities?", "Will people still read printed books in the future?", "Should governments spend more on public transport or roads?"],
    },
  },
];

export const getDrill = (id: string) => DRILLS.find((d) => d.id === id);

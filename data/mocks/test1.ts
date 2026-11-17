import type { MockTest } from "@/lib/types";
import { opts, q, romanOpts } from "../helpers";

// ════════════════════════════════════════════════════════════════════
// MOCK TEST 1 — all passages, scripts, prompts and model answers are
// original material written for this app in the style of IELTS GT.
// ════════════════════════════════════════════════════════════════════

export const test1: MockTest = {
  id: "mock-1",
  title: "Mock Test 1",
  blurb: "Community centre enrolment, a park volunteer day, complaint-handling training and urban beekeeping. Reading: course adverts, library rules, a leave policy, remote-working guidelines and an article on night trains.",
  // ───────────────────────────── LISTENING ─────────────────────────────
  listening: [
    {
      id: "t1-l-p1",
      part: 1,
      title: "Part 1 — Course enrolment",
      context: "You will hear a man phoning a community centre to enrol on an evening course. First, you have some time to look at questions 1 to 10.",
      speakers: [
        { name: "Receptionist", voice: "female" },
        { name: "Daniel", voice: "male" },
      ],
      script: [
        { speaker: "Receptionist", text: "Good morning, Riverside Community Centre, Helen speaking. How can I help?" },
        { speaker: "Daniel", text: "Oh, hello. I'd like to enrol on one of your evening courses, please. I saw the programme for the autumn term." },
        { speaker: "Receptionist", text: "Of course. I'll just take a few details first. Could I have your name?" },
        { speaker: "Daniel", text: "Yes, it's Daniel Kowalski." },
        { speaker: "Receptionist", text: "Could you spell the surname for me?" },
        { speaker: "Daniel", text: "Sure. K, O, W, A, L, S, K, I." },
        { speaker: "Receptionist", text: "Thank you. And your address?" },
        { speaker: "Daniel", text: "It's 14 Elmwood Street. That's E, L, M, W, O, O, D." },
        { speaker: "Receptionist", text: "14 Elmwood Street. And the postcode?" },
        { speaker: "Daniel", text: "R V 7, 2 Q D." },
        { speaker: "Receptionist", text: "Lovely. And what's the best number to contact you on?" },
        { speaker: "Daniel", text: "Well, my work number is 01632 960 455, but I'm not always at my desk, so it's better to use my mobile. That's 07700 914 382." },
        { speaker: "Receptionist", text: "07700 914 382. Got it. Now, which course were you interested in?" },
        { speaker: "Daniel", text: "I was originally going to do pottery, but a friend told me it's already full." },
        { speaker: "Receptionist", text: "Yes, I'm afraid pottery filled up in the first week. We do have a waiting list." },
        { speaker: "Daniel", text: "That's alright. I've actually decided I'd rather do photography. I've just bought a decent camera and I don't really know how to use it." },
        { speaker: "Receptionist", text: "Photography it is. We run that on two evenings. There's a Tuesday group and a Thursday group." },
        { speaker: "Daniel", text: "Tuesdays would be ideal… oh, actually no, I play football on Tuesdays. Thursday, please." },
        { speaker: "Receptionist", text: "No problem, Thursday. The course used to run for ten weeks, but this term it's been shortened to eight weeks, starting on the twelfth of September." },
        { speaker: "Daniel", text: "Eight weeks is fine. How much is it?" },
        { speaker: "Receptionist", text: "The full price is one hundred and twenty pounds. Do you live in the borough?" },
        { speaker: "Daniel", text: "Yes, I do." },
        { speaker: "Receptionist", text: "Then you get the residents' discount of twenty per cent, so that comes to ninety-six pounds." },
        { speaker: "Daniel", text: "Great. Is there anything I need to bring?" },
        { speaker: "Receptionist", text: "Your own camera, obviously. Memory cards are provided, and we have a few spare batteries. But the tutor asks everyone to bring a tripod, because the night photography sessions need one." },
        { speaker: "Daniel", text: "I'll borrow one from my brother. Is that everything?" },
        { speaker: "Receptionist", text: "Just one last question. We like to know how people hear about us. Was it our website?" },
        { speaker: "Daniel", text: "No, I don't think I've ever looked at your website. I saw your advert in the local newspaper." },
        { speaker: "Receptionist", text: "Thank you. That's all done. You'll get a confirmation letter in the post." },
      ],
      groups: [
        {
          id: "t1-l-g1",
          type: "gap",
          title: "Riverside Community Centre — Course Enrolment Form",
          instructions: "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
          questions: [
            q("t1-l-1", 1, "Surname: ____", "Kowalski", "Spelled letter by letter: K-O-W-A-L-S-K-I. Spelling must be exact."),
            q("t1-l-2", 2, "Address: 14 ____ Street", "Elmwood", "Daniel spells it: E-L-M-W-O-O-D."),
            q("t1-l-3", 3, "Postcode: ____", ["RV7 2QD", "RV72QD"], "'R V 7, 2 Q D'. Postcodes are a classic Part 1 answer — write capitals clearly."),
            q("t1-l-4", 4, "Mobile number: ____", ["07700914382", "07700 914 382", "07700 914382"], "Distractor: the work number (01632 960 455) is given first, but he says the mobile is better."),
            q("t1-l-5", 5, "Course: ____", "photography", "Distractor: pottery is mentioned first but it is full; he chooses photography."),
            q("t1-l-6", 6, "Day: ____", "Thursday", "He starts to say Tuesday, then corrects himself because of football — a self-correction distractor."),
            q("t1-l-7", 7, "Length of course: ____ weeks", ["8", "eight"], "It 'used to run for ten weeks' (distractor) but is now eight."),
            q("t1-l-8", 8, "Fee after discount: £____", ["96", "ninety-six"], "£120 minus 20% residents' discount = £96, stated directly."),
            q("t1-l-9", 9, "Must bring: own camera and a ____", "tripod", "Memory cards and batteries are provided (distractors); a tripod must be brought."),
            q("t1-l-10", 10, "Heard about the centre from: local ____", ["newspaper", "newspapers"], "The receptionist suggests the website (distractor); Daniel says the local newspaper."),
          ],
        },
      ],
    },
    {
      id: "t1-l-p2",
      part: 2,
      title: "Part 2 — Greenway Park volunteer day",
      context: "You will hear a woman talking to a group of new volunteers about a park restoration project.",
      speakers: [{ name: "Fiona", voice: "female" }],
      script: [
        { speaker: "Fiona", text: "Good evening, everyone, and thank you for coming. My name's Fiona Marsh and I coordinate the volunteers here at Greenway Park." },
        { speaker: "Fiona", text: "Let me start with a little background. Many people think the restoration project started because the lake had become polluted, and it's true the water quality was poor. Others assume it was because the council cut the parks budget. But in fact, the project only got going when local residents organised a petition with over three thousand signatures. That's what persuaded the council to act." },
        { speaker: "Fiona", text: "Now, about Saturday. In previous years we started at half past eight, but people found that too early, so this time we'll begin at nine o'clock sharp. Tea and coffee will be served at half past nine, once everyone's been given a task." },
        { speaker: "Fiona", text: "What do you need to bring? Gloves are provided, so don't worry about those. The café is donating sandwiches, so you won't need a packed lunch either. What you must bring is waterproof clothing — the forecast isn't great, and some of the work is right beside the water." },
        { speaker: "Fiona", text: "A quick bit of history while I think of it. Visitors often assume that the big oak by the lake is the oldest tree in the park, and the beech trees along the avenue are certainly impressive. But the oldest is actually the cedar, planted in the eighteen-forties when the park first opened." },
        { speaker: "Fiona", text: "Families are very welcome. Children under twelve can take part in all sessions, morning and afternoon, but they must be accompanied by an adult at all times." },
        { speaker: "Fiona", text: "Now, if you look at the map, I'll show you where things will be on the day. When you come in through the main gate, the tool collection point will be immediately on your right. Please don't go to the left — that's the car park, and it'll be busy." },
        { speaker: "Fiona", text: "The first aid tent will be on the east side of the lake, between the lake and the playground, so it's easy to reach from anywhere." },
        { speaker: "Fiona", text: "One of our biggest tasks is the new wildflower meadow. That's in the far north-east corner of the park — go past the bandstand and keep to the right." },
        { speaker: "Fiona", text: "Some of you will be helping to finish the new bird hide. It's on the western shore of the lake, looking across the water towards the east. The old hide, by the way, was on the north shore, but that's been taken down." },
        { speaker: "Fiona", text: "And finally, the café. It used to be beside the bandstand, but it has moved and is now just by the north gate, in the north-west corner. That's where lunch will be served." },
      ],
      groups: [
        {
          id: "t1-l-g2",
          type: "mcq",
          instructions: "Choose the correct letter, A, B or C.",
          questionOptions: {
            "t1-l-11": opts("the lake had become polluted", "the council reduced the parks budget", "local residents organised a petition"),
            "t1-l-12": opts("8.30", "9.00", "9.30"),
            "t1-l-13": opts("their own gloves", "a packed lunch", "waterproof clothing"),
            "t1-l-14": opts("an oak", "a beech", "a cedar"),
            "t1-l-15": opts("cannot take part", "must be with an adult", "can only join the morning session"),
          },
          questions: [
            q("t1-l-11", 11, "The restoration project started because", "C", "Pollution and budget cuts are mentioned as what people think; 'in fact… residents organised a petition'."),
            q("t1-l-12", 12, "On Saturday, volunteers should arrive at", "B", "8.30 was the old time; 9.30 is tea. 'We'll begin at nine o'clock sharp.'"),
            q("t1-l-13", 13, "Volunteers must bring", "C", "Gloves are provided; lunch is donated. 'What you must bring is waterproof clothing.'"),
            q("t1-l-14", 14, "The oldest tree in the park is", "C", "Oak and beech are distractors; 'the oldest is actually the cedar'."),
            q("t1-l-15", 15, "Children under twelve", "B", "They can take part in all sessions 'but they must be accompanied by an adult'."),
          ],
        },
        {
          id: "t1-l-g3",
          type: "map",
          mapId: "greenway",
          instructions: "Label the map. Choose the correct letter, A–H.",
          options: opts("A", "B", "C", "D", "E", "F", "G", "H").map((o) => ({ key: o.key, text: o.key })),
          questions: [
            q("t1-l-16", 16, "Tool collection point", "B", "'Through the main gate… immediately on your right.' A (left, by the car park) is the distractor."),
            q("t1-l-17", 17, "First aid tent", "D", "'East side of the lake, between the lake and the playground.'"),
            q("t1-l-18", 18, "Wildflower meadow", "F", "'Far north-east corner… past the bandstand and keep to the right.'"),
            q("t1-l-19", 19, "New bird hide", "C", "'Western shore of the lake.' The old hide on the north shore (E) is a distractor."),
            q("t1-l-20", 20, "Café", "G", "It used to be by the bandstand (distractor); now 'just by the north gate, in the north-west corner'."),
          ],
        },
      ],
    },
    {
      id: "t1-l-p3",
      part: 3,
      title: "Part 3 — Planning complaint-handling training",
      context: "You will hear two hotel employees, Priya and Tom, planning a staff training session on handling customer complaints.",
      speakers: [
        { name: "Priya", voice: "female" },
        { name: "Tom", voice: "male" },
      ],
      script: [
        { speaker: "Tom", text: "So, Priya, Mrs Lewis wants us to run the complaints training next month. Do you know why it's suddenly so urgent? I assumed complaints had gone up." },
        { speaker: "Priya", text: "That's what I thought too, but actually complaints went down slightly last quarter. The real reason is that we've taken on twelve new seasonal staff, and most of them have never worked in a hotel before." },
        { speaker: "Tom", text: "That makes sense. Head office has its own online course, but Mrs Lewis said we should do something face to face." },
        { speaker: "Priya", text: "Right. I'd like to include a role-play. People remember far more when they actually practise." },
        { speaker: "Tom", text: "Agreed. What if we filmed the role-plays so people could watch themselves afterwards?" },
        { speaker: "Priya", text: "Hmm, I think new staff would feel really self-conscious with a camera on them. But what I would like is to base the role-plays on real complaints we've received — with names removed, of course." },
        { speaker: "Tom", text: "Yes, that's a much better idea. They'll be far more realistic than made-up scenarios. Let's do that." },
        { speaker: "Priya", text: "What did you think of head office's online module? Should we ask people to do it beforehand?" },
        { speaker: "Tom", text: "It's not too long — about forty minutes — and it's certainly easy enough. The problem is that it still refers to the old booking system and the old refund rules. It really needs updating before we recommend it." },
        { speaker: "Priya", text: "Fair point. Now, where shall we hold the session? I booked the conference room provisionally." },
        { speaker: "Tom", text: "The conference room's quite cramped for twenty people. What about the restaurant? It's closed on Monday mornings, and there's plenty of space for moving around." },
        { speaker: "Priya", text: "Good idea. I'll cancel the conference room booking and we'll use the restaurant." },
        { speaker: "Tom", text: "And how will we know whether the training has worked? We could give them a quiz at the end." },
        { speaker: "Priya", text: "A quiz only tests whether they remember the theory. I'd rather look at our guest feedback scores over the following three months. That's what really matters." },
        { speaker: "Tom", text: "OK, let's track the feedback scores. Now, the topics. First, listening without interrupting." },
        { speaker: "Priya", text: "People find that harder than they think. I'd get them to practise it in pairs, one complaining and one listening." },
        { speaker: "Tom", text: "Then apologising appropriately." },
        { speaker: "Priya", text: "Honestly, our staff are already very good at that. We can just mention it briefly." },
        { speaker: "Tom", text: "Offering compensation, like a free meal or a discount." },
        { speaker: "Priya", text: "That's sensitive, because there are limits on what each person can offer. I think one of the managers should lead that part." },
        { speaker: "Tom", text: "Escalating serious issues — when to call the duty manager." },
        { speaker: "Priya", text: "That one's crucial, and there are lots of different scenarios. We'll need to give it more time than the others — at least half an hour." },
        { speaker: "Tom", text: "And finally, recording complaints in the system." },
        { speaker: "Priya", text: "The system's quite confusing. I think screenshots showing each step would help most — people need to see exactly where to click." },
      ],
      groups: [
        {
          id: "t1-l-g4",
          type: "mcq",
          instructions: "Choose the correct letter, A, B or C.",
          questionOptions: {
            "t1-l-21": opts("the number of complaints has increased", "many new staff have joined", "head office requires it"),
            "t1-l-22": opts("it should be filmed", "it should be based on real complaints", "it should be shorter than planned"),
            "t1-l-23": opts("too long", "out of date", "too difficult"),
            "t1-l-24": opts("in the conference room", "in the restaurant", "online"),
            "t1-l-25": opts("a quiz", "guest feedback scores", "observation by managers"),
          },
          questions: [
            q("t1-l-21", 21, "Why is the training needed now?", "B", "Complaints 'went down slightly' (A is wrong). 'The real reason is… twelve new seasonal staff.'"),
            q("t1-l-22", 22, "What do they agree about the role-play?", "B", "Tom suggests filming; Priya rejects it. Both agree to use real complaints."),
            q("t1-l-23", 23, "What does Tom think of the online module?", "B", "'Not too long… easy enough. The problem is that it still refers to the old system' = out of date."),
            q("t1-l-24", 24, "Where will the session take place?", "B", "The conference room was provisionally booked but is cramped; they choose the restaurant."),
            q("t1-l-25", 25, "How will they measure the success of the training?", "B", "Tom suggests a quiz; Priya prefers guest feedback scores and Tom agrees."),
          ],
        },
        {
          id: "t1-l-g5",
          type: "matching",
          instructions: "What comment do they make about each training topic? Choose FIVE answers from the box and write the correct letter, A–F.",
          options: opts(
            "needs more time than the others",
            "can be left out",
            "should be led by a manager",
            "needs visual examples",
            "staff already do this well",
            "should be practised in pairs",
          ),
          questions: [
            q("t1-l-26", 26, "Listening without interrupting", "F", "'Practise it in pairs, one complaining and one listening.'"),
            q("t1-l-27", 27, "Apologising appropriately", "E", "'Our staff are already very good at that.' Note it is mentioned briefly, not left out (B)."),
            q("t1-l-28", 28, "Offering compensation", "C", "'One of the managers should lead that part.'"),
            q("t1-l-29", 29, "Escalating serious issues", "A", "'We'll need to give it more time than the others.'"),
            q("t1-l-30", 30, "Recording complaints in the system", "D", "'Screenshots showing each step' = visual examples."),
          ],
        },
      ],
    },
    {
      id: "t1-l-p4",
      part: 4,
      title: "Part 4 — Urban beekeeping",
      context: "You will hear part of a talk about keeping bees in cities.",
      speakers: [{ name: "Lecturer", voice: "male" }],
      script: [
        { speaker: "Lecturer", text: "Today I want to look at a trend that has spread through cities around the world: urban beekeeping." },
        { speaker: "Lecturer", text: "Keeping bees on city rooftops isn't entirely new. One of the best-known early examples is on the roof of the opera house in Paris, where hives have been kept for several decades, and the honey is sold in the building's shop." },
        { speaker: "Lecturer", text: "So why do cities suit bees surprisingly well? First, parks, gardens and balconies provide a much greater variety of flowers than modern farmland, where a single crop may stretch for miles. Second, cities are warmer than the surrounding countryside, so the foraging season — the period when bees can fly out and collect food — starts earlier and finishes later. And third, far fewer pesticides are used in urban gardens than on farms." },
        { speaker: "Lecturer", text: "However, the trend has raised concerns. Ecologists point out that honeybees compete with wild bees for nectar, and in some neighbourhoods there may now be too many hives for the flowers available." },
        { speaker: "Lecturer", text: "Disease is another worry. When hives are close together, infections can spread quickly, which is why responsible beekeepers make sure their hives are inspected regularly — at least once every two weeks during the summer." },
        { speaker: "Lecturer", text: "And then there are the neighbours. Interestingly, complaints are rarely about noise. Most are about fear of stings, even though honeybees are generally calm unless their hive is disturbed." },
        { speaker: "Lecturer", text: "What about the honey itself? Many people assumed city honey would be contaminated. Researchers in several cities tested it, particularly for lead, and found levels were far lower than expected — well within safety limits." },
        { speaker: "Lecturer", text: "In fact, because bees sample such a wide area, their honey is now being used as a tool to monitor pollution across a whole city, almost like a network of tiny environmental sensors." },
        { speaker: "Lecturer", text: "So, what should cities do? Most experts now say that adding more hives is not the answer. The most effective step would be to plant more native trees, which provide huge amounts of food for both honeybees and wild bees in a very small area of ground." },
      ],
      groups: [
        {
          id: "t1-l-g6",
          type: "gap",
          title: "Urban Beekeeping",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          questions: [
            q("t1-l-31", 31, "History: well-known early example — hives on the roof of the ____ house in Paris", "opera", "'On the roof of the opera house in Paris.'"),
            q("t1-l-32", 32, "Cities suit bees: greater ____ of flowers than farmland", "variety", "'A much greater variety of flowers than modern farmland.'"),
            q("t1-l-33", 33, "Warmer temperatures mean a longer ____ season", "foraging", "'The foraging season… starts earlier and finishes later.'"),
            q("t1-l-34", 34, "Fewer ____ are used in urban gardens", "pesticides", "'Far fewer pesticides are used in urban gardens.' Plural needed."),
            q("t1-l-35", 35, "Concerns: honeybees compete with wild bees for ____", "nectar", "'Compete with wild bees for nectar.'"),
            q("t1-l-36", 36, "To limit disease, hives should be ____ regularly", "inspected", "'Make sure their hives are inspected regularly.'"),
            q("t1-l-37", 37, "Neighbours mostly complain about fear of ____", "stings", "Noise is the distractor; 'most are about fear of stings'."),
            q("t1-l-38", 38, "Research: city honey contained less ____ than expected", "lead", "'Tested it, particularly for lead… far lower than expected.'"),
            q("t1-l-39", 39, "Honey is now used to monitor ____ across a city", "pollution", "'Used as a tool to monitor pollution.'"),
            q("t1-l-40", 40, "Recommendation: plant more native ____", "trees", "'Adding more hives is not the answer… plant more native trees.'"),
          ],
        },
      ],
    },
  ],

  // ───────────────────────────── READING ─────────────────────────────
  reading: [
    {
      id: "t1-r-s1",
      part: 1,
      title: "Section 1",
      texts: [
        {
          id: "t1-r-a",
          title: "Evening Classes at Northgate College",
          kind: "Advertisements",
          paragraphs: [
            { label: "A", text: "Conversational Spanish — Meet new people while you learn! Ideal for complete beginners. Classes run on Monday evenings for 10 weeks. All course materials are included in the fee of £85. Our tutor, a native speaker from Valencia, keeps groups to a maximum of 12." },
            { label: "B", text: "Bookkeeping for Small Businesses — Learn to manage your own accounts with confidence. Students who complete all assignments receive a nationally recognised certificate. Tuesdays, 6.30–8.30 pm. Fee £140. Students must bring a laptop; a limited number can be borrowed from the library." },
            { label: "C", text: "Introduction to Woodwork — Build a simple stool and a bookshelf over eight Wednesday evenings. All tools are supplied, but there is an extra charge of £30 for timber. Because of the machinery used, this course is not open to anyone under 18." },
            { label: "D", text: "Creative Writing — Whether you want to write short stories or your family history, this friendly course will help. Thursday evenings. Fee £70, reduced to £50 for those aged over 60. At the end of the course, students' work will be published in a small anthology." },
            { label: "E", text: "Healthy Cooking on a Budget — Cook delicious meals for less than £3 a portion. Classes take place on Friday evenings in our newly refurbished kitchen. Fee £95, which includes all ingredients. You will take home whatever you cook, so please bring containers." },
          ],
        },
        {
          id: "t1-r-b",
          title: "Hartfield Public Library — Borrowing Rules",
          kind: "Notice",
          paragraphs: [
            { text: "Membership is free to anyone who lives, works or studies in Hartfield. To join, bring one document showing your current address, such as a utility bill or bank statement. Children under 16 must have a parent or guardian sign their application form." },
            { text: "Adult members may borrow up to 15 items at a time. Books may be kept for three weeks; DVDs and games for one week only. Items can be renewed twice online or by phone, unless another member has reserved them." },
            { text: "We no longer charge fines for late books. However, if an item is more than six weeks overdue, it will be treated as lost and you will be asked to pay its replacement cost. Your account will be suspended until the item is returned or paid for." },
            { text: "Reservations cost 50p per item, but are free for members aged over 65. You will be notified by email or text when your item is ready to collect, and it will be held for seven days." },
            { text: "Laptops are available for use inside the library for up to two hours per day. They may not be taken out of the building." },
          ],
        },
      ],
      groups: [
        {
          id: "t1-r-g1",
          type: "matching",
          instructions: "Look at the five advertisements, A–E. For which course are the following statements true? Write the correct letter, A–E. NB You may use any letter more than once.",
          options: opts("Conversational Spanish", "Bookkeeping", "Woodwork", "Creative Writing", "Healthy Cooking"),
          questions: [
            q("t1-r-1", 1, "Older students pay less for this course.", "D", "D: '£70, reduced to £50 for those aged over 60'."),
            q("t1-r-2", 2, "Students may need to pay an additional cost for materials.", "C", "C: 'an extra charge of £30 for timber'. A and E include materials in the fee."),
            q("t1-r-3", 3, "The course leads to a qualification.", "B", "B: 'a nationally recognised certificate'."),
            q("t1-r-4", 4, "There is an age restriction on this course.", "C", "C: 'not open to anyone under 18'. D mentions age only for a discount."),
            q("t1-r-5", 5, "Students should bring their own equipment.", "B", "B: 'Students must bring a laptop'. E asks for containers — but that is for taking food home, not equipment for learning. (Accepting E is a common trap.)"),
            q("t1-r-6", 6, "The class size is limited.", "A", "A: 'keeps groups to a maximum of 12'."),
            q("t1-r-7", 7, "Students' work will appear in print.", "D", "D: 'students' work will be published in a small anthology'."),
          ],
        },
        {
          id: "t1-r-g2",
          type: "tfng",
          instructions: "Do the following statements agree with the information in the library notice? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.",
          options: [
            { key: "TRUE", text: "TRUE" },
            { key: "FALSE", text: "FALSE" },
            { key: "NOT GIVEN", text: "NOT GIVEN" },
          ],
          questions: [
            q("t1-r-8", 8, "People who work in Hartfield but live elsewhere can join the library.", "TRUE", "'Free to anyone who lives, works or studies in Hartfield.'"),
            q("t1-r-9", 9, "Children need two documents to become members.", "NOT GIVEN", "The notice says children need a parent's signature; it says nothing about children needing two documents."),
            q("t1-r-10", 10, "DVDs can be borrowed for the same length of time as books.", "FALSE", "Books: three weeks; DVDs: one week only."),
            q("t1-r-11", 11, "A reserved item cannot be renewed.", "TRUE", "'Renewed twice… unless another member has reserved them.'"),
            q("t1-r-12", 12, "Members pay a small fine for each day a book is late.", "FALSE", "'We no longer charge fines for late books.'"),
            q("t1-r-13", 13, "Members over 65 do not pay for reservations.", "TRUE", "'Free for members aged over 65.'"),
            q("t1-r-14", 14, "Laptops must be booked in advance.", "NOT GIVEN", "The notice gives a two-hour limit but says nothing about booking."),
          ],
        },
      ],
    },
    {
      id: "t1-r-s2",
      part: 2,
      title: "Section 2",
      texts: [
        {
          id: "t1-r-c",
          title: "Brookline Logistics — Staff Handbook: Annual Leave",
          kind: "Workplace handbook",
          paragraphs: [
            { text: "Full-time employees are entitled to 25 days of paid annual leave per year, in addition to public holidays. Part-time staff receive a pro-rata allowance based on their contracted hours. The leave year runs from 1 April to 31 March." },
            { text: "All leave requests must be submitted through the HR portal. Requests for periods of five days or more should be made at least four weeks in advance; shorter requests require one week's notice. Your line manager will normally respond within three working days." },
            { text: "Because of the volume of orders in the run-up to the holidays, no annual leave can be taken during the first three weeks of December, except in exceptional circumstances approved by a director." },
            { text: "Employees may carry over a maximum of five unused days into the next leave year. Any carried-over days must be used by the end of June, after which they will be lost. Unused leave cannot be exchanged for payment except when an employee leaves the company." },
            { text: "After five years of continuous service, staff receive one additional day of leave per year, up to a maximum of 30 days. Staff who wish to take unpaid leave — for example, for an extended trip abroad — should discuss this with their manager before submitting a formal request." },
          ],
        },
        {
          id: "t1-r-d",
          title: "Brookline Logistics — Guidelines for Remote Working",
          kind: "Workplace guidelines",
          paragraphs: [
            { label: "A", text: "Office-based staff may work from home for up to two days per week, provided their role allows it and their manager agrees. Warehouse and driving roles are not eligible. New employees must complete their three-month probation period before applying." },
            { label: "B", text: "Your home workspace should be quiet, well lit and separate from areas used for other activities where possible. Before you begin, you must complete the online workstation assessment so that we can check your desk, chair and screen are set up correctly." },
            { label: "C", text: "The company will provide a laptop, headset and second monitor. Staff who need an adjustable chair or other equipment for health reasons should contact the facilities team, who will arrange delivery. Please do not buy equipment yourself and claim the cost back." },
            { label: "D", text: "Company laptops must be locked whenever you step away, and confidential documents must never be printed at home. Always connect through the company's secure network software, especially if you are working somewhere other than your home, such as a café or library." },
            { label: "E", text: "Remote workers must be available during the core hours of 10 am to 3 pm and keep their online status up to date. Outside these hours, you may arrange your working day flexibly, as long as you complete your contracted hours each week." },
            { label: "F", text: "Working alone can be isolating. Teams are encouraged to hold a short video call each morning, and every remote worker should spend at least one day a fortnight in the office so they stay connected with colleagues." },
            { label: "G", text: "Remote working arrangements are reviewed every six months. If performance or communication suffers, your manager may ask you to return to the office full-time. Equally, you may end the arrangement yourself at any time by giving two weeks' notice." },
          ],
        },
      ],
      groups: [
        {
          id: "t1-r-g3",
          type: "gap",
          instructions: "Complete the notes below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the text for each answer.",
          title: "Annual leave — key points",
          questions: [
            q("t1-r-15", 15, "Leave for part-time staff is calculated according to their ____", ["contracted hours", "hours"], "'Pro-rata allowance based on their contracted hours.'"),
            q("t1-r-16", 16, "All requests must go through the ____", ["HR portal"], "'Submitted through the HR portal.'"),
            q("t1-r-17", 17, "A two-week holiday must be requested at least ____ ahead", ["four weeks", "4 weeks"], "Two weeks = more than five days → 'at least four weeks in advance'."),
            q("t1-r-18", 18, "Leave in early December needs permission from a ____", ["director"], "'Exceptional circumstances approved by a director.'"),
            q("t1-r-19", 19, "Carried-over days are lost if not used by the end of ____", ["June"], "'Must be used by the end of June.'"),
            q("t1-r-20", 20, "Long-serving staff can have a maximum of ____ days' leave", ["30", "thirty"], "'Up to a maximum of 30 days.'"),
          ],
        },
        {
          id: "t1-r-g4",
          type: "headings",
          instructions: "The guidelines have seven sections, A–G. Choose the correct heading for each section from the list of headings below. Write the correct number, i–ix.",
          options: romanOpts(
            "Keeping information safe",
            "Who can apply",
            "Avoiding loneliness",
            "Claiming expenses for travel",
            "Equipment you will receive",
            "When you must be contactable",
            "Preparing your home office",
            "How the arrangement can end",
            "Choosing a suitable café",
          ),
          questions: [
            q("t1-r-21", 21, "Section A", "ii", "Describes eligibility: office staff yes, warehouse no, new staff after probation."),
            q("t1-r-22", 22, "Section B", "vii", "Quiet, well-lit workspace + workstation assessment = preparing your home office."),
            q("t1-r-23", 23, "Section C", "v", "Laptop, headset, monitor provided. 'Expenses' (iv) is a trap — you should NOT claim costs."),
            q("t1-r-24", 24, "Section D", "i", "Locking laptops, not printing confidential documents, secure network. Café (ix) is only an example of location."),
            q("t1-r-25", 25, "Section E", "vi", "Core hours 10–3 when you must be available."),
            q("t1-r-26", 26, "Section F", "iii", "'Working alone can be isolating' → video calls, office days."),
            q("t1-r-27", 27, "Section G", "viii", "Reviews, manager may end it, or you may end it with notice."),
          ],
        },
      ],
    },
    {
      id: "t1-r-s3",
      part: 3,
      title: "Section 3",
      texts: [
        {
          id: "t1-r-e",
          title: "The Return of the Night Train",
          kind: "General interest article",
          paragraphs: [
            { label: "A", text: "For much of the twentieth century, sleeper trains were the glamorous way to cross a continent. Passengers would board in the evening, eat dinner as the countryside darkened, and wake up hundreds of kilometres away in a different city — sometimes a different country. Yet by the early 2000s, many of these services had disappeared. Budget airlines could carry passengers between capitals in an hour or two for a fraction of the price, and high-speed rail lines made daytime journeys of five or six hours practical. Railway operators, faced with ageing carriages and falling demand, concluded that night trains were an expensive luxury they could no longer afford." },
            { label: "B", text: "Over the past decade, however, the picture has changed. In several European countries, new overnight routes have been launched and old ones revived, often with modern carriages offering private compartments with their own showers. One national operator that had kept its sleeper network running when others gave up has seen passenger numbers rise year after year, and it now runs services to more than twenty cities. Its decision to continue, once seen as stubborn, now looks remarkably far-sighted." },
            { label: "C", text: "The most obvious explanation for this revival is concern about the climate. A passenger travelling by train over a medium distance is typically responsible for a small fraction of the carbon emissions of someone making the same journey by air. A growing number of travellers, particularly younger ones, say that they actively try to avoid short flights. However, surveys suggest that environmental motives alone rarely determine a booking. When asked to explain their choice, many passengers mention practical advantages first: a night train departs from the city centre, avoids lengthy airport security checks, and — crucially — saves the cost of a hotel room." },
            { label: "D", text: "The economics of night trains remain challenging. A sleeper carriage carries far fewer passengers than a seated one, yet it requires the same track access fees, which in some countries are calculated per kilometre regardless of how many people are on board. Trains that cross borders face additional difficulties: different electrical systems, signalling standards and safety rules can mean changing locomotives and crews at each frontier. One operator estimated that a single international route involved negotiations with no fewer than seven separate infrastructure companies." },
            { label: "E", text: "Supporters argue that governments should treat night trains as a public service rather than a purely commercial business. Some countries now subsidise overnight routes, arguing that the environmental benefits justify the cost. Critics respond that the money would achieve more if it were spent improving daytime services, which carry far greater numbers of passengers. In my view, this argument misses the point: for journeys of more than about eight hours, daytime trains simply cannot compete with aircraft, whereas a train that runs while passengers sleep can." },
            { label: "F", text: "There are also signs that the night train is changing its image. Where it was once associated with either luxury or discomfort — elegant private cabins at one extreme, crowded six-berth compartments at the other — new designs are aiming for the middle ground. One recently introduced carriage features 'mini-cabins': small, capsule-style spaces for a single traveller, each with a lockable door, a charging point and enough room to sit up. They are cheaper than a private compartment but offer far more privacy than a shared one, and early indications are that solo travellers find them extremely attractive." },
            { label: "G", text: "Whether the revival will last is uncertain. Much depends on whether governments continue to provide financial support and whether operators can overcome the technical barriers to cross-border travel. But the night train has already shown that it is not merely a nostalgic relic. For travellers who value time, comfort and a lower environmental impact, it offers something that no other form of transport can quite match: the chance to wake up at your destination." },
          ],
        },
      ],
      groups: [
        {
          id: "t1-r-g5",
          type: "mcq",
          instructions: "Choose the correct letter, A, B, C or D.",
          questionOptions: {
            "t1-r-28": opts("passengers disliked the old carriages", "cheaper and faster alternatives became available", "railway companies merged with airlines", "governments banned overnight services"),
            "t1-r-29": opts("it has reduced the number of its routes", "it was criticised for buying new carriages", "it is now regarded as having made a wise choice", "it has stopped running international services"),
            "t1-r-30": opts("the environment is the main reason most people book", "practical benefits often influence passengers more than environmental ones", "younger passengers prefer to fly short distances", "hotels near stations have become more expensive"),
            "t1-r-31": opts("they are charged according to distance rather than passenger numbers", "sleeper carriages need more maintenance", "staff costs are higher at night", "tickets must be sold far in advance"),
            "t1-r-32": opts("they are more spacious than private compartments", "they are designed mainly for families", "they combine affordability with privacy", "they have proved unpopular with passengers"),
          },
          questions: [
            q("t1-r-28", 28, "According to paragraph A, many night trains disappeared because", "B", "Budget airlines (cheaper) and high-speed rail (faster daytime trips). Ageing carriages are mentioned but not that passengers disliked them."),
            q("t1-r-29", 29, "What does the writer say about the operator that kept its sleeper network?", "C", "'Once seen as stubborn, now looks remarkably far-sighted' = a wise choice."),
            q("t1-r-30", 30, "What do surveys of passengers suggest?", "B", "'Environmental motives alone rarely determine a booking… many mention practical advantages first.'"),
            q("t1-r-31", 31, "One financial problem for night trains is that track fees", "A", "'Calculated per kilometre regardless of how many people are on board.'"),
            q("t1-r-32", 32, "What is said about the new 'mini-cabins'?", "C", "'Cheaper than a private compartment but… far more privacy than a shared one.'"),
          ],
        },
        {
          id: "t1-r-g6",
          type: "ynng",
          instructions: "Do the following statements agree with the views of the writer? Write YES if the statement agrees with the views of the writer, NO if the statement contradicts the views of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.",
          options: [
            { key: "YES", text: "YES" },
            { key: "NO", text: "NO" },
            { key: "NOT GIVEN", text: "NOT GIVEN" },
          ],
          questions: [
            q("t1-r-33", 33, "Subsidies for night trains would be better spent on daytime services.", "NO", "The writer says this argument 'misses the point' — they disagree with the critics."),
            q("t1-r-34", 34, "Night trains have an advantage over daytime trains for very long journeys.", "YES", "'For journeys of more than about eight hours, daytime trains simply cannot compete… whereas a train that runs while passengers sleep can.'"),
            q("t1-r-35", 35, "Night train tickets will become cheaper than flights within ten years.", "NOT GIVEN", "No prediction about future ticket prices is made."),
            q("t1-r-36", 36, "The night train is more than a reminder of the past.", "YES", "'It is not merely a nostalgic relic.'"),
          ],
        },
        {
          id: "t1-r-g7",
          type: "matching",
          instructions: "Complete the summary using the list of words, A–H, below. Write the correct letter, A–H.",
          title: "Obstacles to international night trains",
          options: opts("locomotives", "passengers", "borders", "fares", "standards", "companies", "stations", "timetables"),
          questions: [
            q("t1-r-37", 37, "Trains that cross ____ face extra problems.", "C", "'Trains that cross borders face additional difficulties.'"),
            q("t1-r-38", 38, "Countries may use different electrical systems and safety ____.", "E", "'Different electrical systems, signalling standards and safety rules.'"),
            q("t1-r-39", 39, "As a result, ____ and crews sometimes have to be changed.", "A", "'Changing locomotives and crews at each frontier.'"),
            q("t1-r-40", 40, "One route required discussions with seven infrastructure ____.", "F", "'Negotiations with no fewer than seven separate infrastructure companies.'"),
          ],
        },
      ],
    },
  ],

  // ───────────────────────────── WRITING ─────────────────────────────
  writing: [
    {
      id: "t1-w-1",
      task: 1,
      tone: "formal",
      prompt: "You recently joined a gym, but you have been disappointed with the facilities and service. Write a letter to the manager of the gym. In your letter:",
      bullets: [
        "explain why you joined the gym",
        "describe the problems you have experienced",
        "say what you would like the manager to do",
      ],
      minWords: 150,
      suggestedMinutes: 20,
      modelAnswer: `Dear Sir or Madam,

I am writing to express my disappointment with the facilities and service I have received since becoming a member of your Westgate branch six weeks ago.

I chose your gym mainly because it advertised a newly refurbished weights area and evening yoga classes, both of which fitted my work schedule perfectly. As someone recovering from a back injury, I was also reassured by the promise of a free consultation with a qualified personal trainer.

Unfortunately, the reality has been rather different. Two of the four treadmills have displayed "out of order" signs since I joined, and the changing rooms are frequently left without hot water. Furthermore, the yoga classes I was particularly looking forward to have been cancelled three times without notice, and my consultation has still not been arranged despite two requests at reception.

I would therefore be grateful if you could arrange for the faulty equipment to be repaired as soon as possible and book my consultation within the next week. Given the problems I have described, I would also appreciate a partial refund of this month's membership fee.

I look forward to hearing from you at your earliest convenience.

Yours faithfully,
Daniel Kowalski`,
      examinerNotes: [
        "Para 1 states the purpose immediately by paraphrasing the task (template: reason for writing).",
        "Each of the three bullets has its own ~50-word paragraph, as in the four-paragraph template.",
        "Consistent formal register: 'I would be grateful if…', 'at your earliest convenience', no contractions.",
        "Specific details (six weeks, two of four treadmills, cancelled three times) make the task fully achieved.",
        "'Dear Sir or Madam' correctly closed with 'Yours faithfully'.",
      ],
    },
    {
      id: "t1-w-2",
      task: 2,
      essayType: "opinion",
      prompt: "Some people believe that employers should allow staff to work from home for part of the week, while others think employees should always work in the office. To what extent do you agree that working from home should be allowed?",
      minWords: 250,
      suggestedMinutes: 40,
      modelAnswer: `In recent years, advances in communication technology have made it possible for many employees to do their jobs from home. I strongly agree that companies should allow staff to work remotely for part of the week, because it improves productivity and helps employees achieve a healthier balance between work and family life.

The main reason I support flexible arrangements is that many people actually work more efficiently at home. Without the constant interruptions of a busy open-plan office, employees can concentrate on demanding tasks for longer periods. Moreover, the time saved by not commuting can be spent on work rather than in traffic. For example, a software developer who previously spent ninety minutes a day travelling can reinvest that time in writing and testing code, which benefits both the individual and the employer.

A further advantage is the positive effect on employees' wellbeing. Parents, in particular, find it far easier to collect children from school or attend medical appointments when they are not required to be at their desks from nine to five. Staff who feel trusted to manage their own time tend to be more loyal, which reduces the considerable cost of recruiting and training replacements. Some critics argue that teamwork suffers when colleagues rarely meet, but this problem can be solved simply by requiring everyone to attend the office on the same two or three days each week.

In conclusion, I firmly believe that allowing staff to work from home for part of the week is beneficial, since it raises productivity and supports a better work–life balance, provided that regular face-to-face contact is maintained.`,
      examinerNotes: [
        "Opinion essay structure from your Writing Structures Guide: Paraphrase → Clear opinion → Main idea 1 → Main idea 2.",
        "Each body paragraph follows Topic sentence → Explanation → Explain further → Example.",
        "Position is clear in the introduction, maintained in both body paragraphs and restated in the conclusion (TR 7+).",
        "A counter-argument is acknowledged and answered inside body paragraph 2 — shows range without changing structure.",
        "Less common collocations: 'demanding tasks', 'reinvest that time', 'considerable cost of recruiting'.",
      ],
    },
  ],

  // ───────────────────────────── SPEAKING ─────────────────────────────
  speaking: {
    part1: [
      { topic: "Work or studies", questions: ["Do you work or are you a student?", "What do you like most about your job?", "Is there anything you would like to change about your work?", "Do you think you will do the same kind of work in the future?"] },
      { topic: "Your neighbourhood", questions: ["Can you describe the area where you live?", "What do you like about living there?", "Has your neighbourhood changed in recent years?"] },
      { topic: "Weather", questions: ["What kind of weather do you like best?", "Does the weather ever affect your plans?", "Would you like to live somewhere with a different climate?"] },
    ],
    part2: {
      cue: "Describe a skill you learned as an adult.",
      bullets: ["what the skill is", "how you learned it", "how long it took you to learn"],
      finalLine: "and explain how this skill has been useful to you.",
      roundOff: "Do you think you will learn any more skills like this?",
    },
    part3: [
      { theme: "Learning new skills", questions: ["Why do some adults find it difficult to learn new skills?", "Is it better to learn a skill from a teacher or from online videos?", "Which skills do you think will be most important for young people in the future?"] },
      { theme: "Skills and work", questions: ["Should employers pay for their staff to learn new skills?", "How has technology changed the skills that workers need?", "Do you think practical skills are valued as much as academic qualifications?"] },
    ],
    modelPart2: `I'd like to talk about learning to cook properly, which is something I only really got to grips with in my late twenties.

When I was growing up, my mother did all the cooking, and when I moved out I survived mainly on takeaways and ready meals. Things changed when I moved in with a flatmate who was a trained chef. He was horrified by my eating habits, so we made a deal: I'd do the washing up if he taught me one new dish every weekend.

At first it was pretty humbling — I couldn't even chop an onion without it falling apart. But he was patient, and he insisted on teaching me techniques rather than recipes: how to control the heat, how to season as you go, that kind of thing. I'd say it took about six months before I felt confident cooking for other people without his help.

These days, I cook from scratch almost every evening. The most obvious benefit is financial — I probably save a couple of hundred dollars a month. But it's also improved my health, and, to be honest, it's become my way of switching off after work. When I'm chopping vegetables, I'm not thinking about emails.

Looking ahead, I'd love to take a proper course in baking bread, because that's a completely different science, and it's the one area where I still feel like a beginner.`,
  },
};

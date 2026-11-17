import type { MockTest } from "@/lib/types";
import { opts, q, romanOpts } from "../helpers";

// MOCK TEST 2 — original material written for this app.

const TFNG = [
  { key: "TRUE", text: "TRUE" },
  { key: "FALSE", text: "FALSE" },
  { key: "NOT GIVEN", text: "NOT GIVEN" },
];

export const test2: MockTest = {
  id: "mock-2",
  title: "Mock Test 2",
  blurb: "Van hire booking, a food festival radio talk, feedback on a mentoring scheme and the history of the shipping container. Reading: weekend events, pool rules, a car park policy, an email guide and an article on modern libraries.",
  listening: [
    {
      id: "t2-l-p1",
      part: 1,
      title: "Part 1 — Van hire booking",
      context: "You will hear a woman phoning a company to hire a van. First, you have some time to look at questions 1 to 10.",
      speakers: [
        { name: "Agent", voice: "male" },
        { name: "Sophie", voice: "female" },
      ],
      script: [
        { speaker: "Agent", text: "Pellmans Van Hire, good afternoon. Mark speaking." },
        { speaker: "Sophie", text: "Hi. I'm moving flat soon and I'd like to hire a van for a day." },
        { speaker: "Agent", text: "Certainly. What size were you thinking of? We have small, medium and large." },
        { speaker: "Sophie", text: "I was going to ask for a large one, but honestly it's only a one-bedroom flat. Would a medium van be enough?" },
        { speaker: "Agent", text: "For a one-bedroom flat, a medium van is usually plenty." },
        { speaker: "Sophie", text: "OK, medium then." },
        { speaker: "Agent", text: "And which day would you like it?" },
        { speaker: "Sophie", text: "Saturday the fourteenth, if possible." },
        { speaker: "Agent", text: "Let me check… I'm sorry, Saturday's fully booked for medium vans. I could do the Friday before." },
        { speaker: "Sophie", text: "Friday's fine. I can take the day off work." },
        { speaker: "Agent", text: "What time would you like to collect it?" },
        { speaker: "Sophie", text: "As early as possible — seven o'clock?" },
        { speaker: "Agent", text: "We don't open until half past seven, I'm afraid." },
        { speaker: "Sophie", text: "Half seven, then." },
        { speaker: "Agent", text: "Can I take your name?" },
        { speaker: "Sophie", text: "Sophie Brannigan. That's B, R, A, double N, I, G, A, N." },
        { speaker: "Agent", text: "Thank you. When you collect the van, you'll need to bring your driving licence. And we also need a second form of ID — a passport is best." },
        { speaker: "Sophie", text: "Would a bank card do?" },
        { speaker: "Agent", text: "No, it has to be a passport, I'm afraid." },
        { speaker: "Sophie", text: "OK. And how much will it cost?" },
        { speaker: "Agent", text: "At weekends a medium van is seventy-five pounds a day, but on weekdays it's sixty-five." },
        { speaker: "Sophie", text: "So Friday is sixty-five. Is insurance included?" },
        { speaker: "Agent", text: "Basic insurance is included. If you want full cover, it's an extra twelve pounds per day. Most people take it." },
        { speaker: "Sophie", text: "I'll take the full cover, then." },
        { speaker: "Agent", text: "There's also a refundable deposit of two hundred pounds, which we return when the van comes back undamaged." },
        { speaker: "Sophie", text: "Fine. Anything else I should know?" },
        { speaker: "Agent", text: "The van must be returned clean, and with a full tank. If not, we charge for fuel at quite a high rate." },
        { speaker: "Sophie", text: "Understood. Do you provide anything to help with moving furniture?" },
        { speaker: "Agent", text: "Protective blankets are free. We also hire out a trolley for heavy items, for eight pounds." },
        { speaker: "Sophie", text: "Yes, I'll hire the trolley — I've got a heavy washing machine." },
      ],
      groups: [
        {
          id: "t2-l-g1",
          type: "gap",
          title: "Pellmans Van Hire — Booking Details",
          instructions: "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer.",
          questions: [
            q("t2-l-1", 1, "Size of van: ____", "medium", "She considers large (distractor) but chooses medium."),
            q("t2-l-2", 2, "Day of hire: ____", "Friday", "Saturday is fully booked; she accepts the Friday before."),
            q("t2-l-3", 3, "Collection time: ____ am", ["7.30", "7:30", "seven thirty", "half past seven"], "She asks for 7.00 but they open at 7.30."),
            q("t2-l-4", 4, "Name: Sophie ____", "Brannigan", "Spelled with 'double N': B-R-A-N-N-I-G-A-N."),
            q("t2-l-5", 5, "Bring: driving licence and ____", "passport", "A bank card is rejected; it has to be a passport."),
            q("t2-l-6", 6, "Daily rate: £____", ["65", "sixty-five"], "£75 is the weekend rate (distractor); Friday is a weekday = £65."),
            q("t2-l-7", 7, "Insurance: extra £12 per day for ____ cover", "full", "'If you want full cover, it's an extra twelve pounds per day.'"),
            q("t2-l-8", 8, "Refundable deposit: £____", ["200", "two hundred"], "'A refundable deposit of two hundred pounds.'"),
            q("t2-l-9", 9, "Return the van clean and with a full ____", "tank", "'Returned clean, and with a full tank.'"),
            q("t2-l-10", 10, "Extra item hired: ____", "trolley", "Blankets are free (distractor); she hires the trolley for £8."),
          ],
        },
      ],
    },
    {
      id: "t2-l-p2",
      part: 2,
      title: "Part 2 — Harbourside Food Festival",
      context: "You will hear a festival organiser talking on local radio about this year's food festival.",
      speakers: [
        { name: "Presenter", voice: "male" },
        { name: "Joanna", voice: "female" },
      ],
      script: [
        { speaker: "Presenter", text: "With me in the studio is Joanna Reed, director of the Harbourside Food Festival. Joanna, what's new this year?" },
        { speaker: "Joanna", text: "Well, we moved to the harbour two years ago, and entry has always been free, so neither of those is new. The big change is that we've extended the festival from three days to four, so it now runs from Thursday to Sunday." },
        { speaker: "Joanna", text: "Our cookery demonstrations are always popular. Entry to the festival is free, but demonstration tickets cost five pounds, and they sell out quickly. There won't be any tickets on sale on the day, so you really must book online in advance." },
        { speaker: "Joanna", text: "As for getting there, please don't drive. The harbour car parks will be closed to the public, and although extra buses are running, they'll be very crowded. The best option is the ferry from the city centre, which runs every twenty minutes and drops you right at the entrance." },
        { speaker: "Joanna", text: "One more request: last year we collected money for a local charity, and we'll do that again. But what we're really asking this year is that visitors bring their own reusable cups. We're trying to cut waste, and stalls will give you a small discount if you do." },
        { speaker: "Joanna", text: "Now let me take you around the site. On The Quay you'll find our street food traders. There used to be live music there, but this year it's all about our street food competition — visitors vote for their favourite stall." },
        { speaker: "Joanna", text: "The Market Hall is our indoor space. If the weather turns bad, head there — it has plenty of seating under cover." },
        { speaker: "Joanna", text: "On Lighthouse Lawn there are face painting, cookery workshops and games for children, so it's ideal for families." },
        { speaker: "Joanna", text: "Fisherman's Row is our seafood area. Everything served there comes only from boats along this stretch of coast — it's a real celebration of the region." },
        { speaker: "Joanna", text: "The Garden Terrace has cheese and chocolate makers, and almost all of them will be offering free samples, so go hungry!" },
        { speaker: "Joanna", text: "And finally, the Old Customs House is where our evening programme happens. While the rest of the site closes at seven, the Customs House stays open until eleven every night. The live music, by the way, has moved to the main stage by the entrance." },
      ],
      groups: [
        {
          id: "t2-l-g2",
          type: "mcq",
          instructions: "Choose the correct letter, A, B or C.",
          questionOptions: {
            "t2-l-11": opts("lasts longer than before", "has moved to a new location", "is free to enter for the first time"),
            "t2-l-12": opts("must be booked online beforehand", "can be bought at the entrance", "are included in the entry price"),
            "t2-l-13": opts("car", "ferry", "bus"),
            "t2-l-14": opts("bring their own cups", "donate to a charity", "vote online"),
          },
          questions: [
            q("t2-l-11", 11, "This year's festival is different because it", "A", "The move and free entry are not new; it is extended from three days to four."),
            q("t2-l-12", 12, "Tickets for cookery demonstrations", "A", "'No tickets on sale on the day… book online in advance.'"),
            q("t2-l-13", 13, "The organiser recommends travelling by", "B", "Car parks closed; buses crowded; 'the best option is the ferry'."),
            q("t2-l-14", 14, "This year, visitors are especially asked to", "A", "Charity collection is repeated, but 'what we're really asking… bring their own reusable cups'."),
          ],
        },
        {
          id: "t2-l-g3",
          type: "matching",
          instructions: "Which feature does each area of the festival have? Choose SIX answers from the box and write the correct letter, A–H.",
          options: opts("food from the local region only", "live music", "seating under cover", "free samples", "activities for children", "a competition", "late opening", "cookery books for sale"),
          questions: [
            q("t2-l-15", 15, "The Quay", "F", "Live music used to be there (distractor); now 'our street food competition'."),
            q("t2-l-16", 16, "Market Hall", "C", "'Plenty of seating under cover.'"),
            q("t2-l-17", 17, "Lighthouse Lawn", "E", "'Face painting… games for children.'"),
            q("t2-l-18", 18, "Fisherman's Row", "A", "'Only from boats along this stretch of coast.'"),
            q("t2-l-19", 19, "Garden Terrace", "D", "'Offering free samples.'"),
            q("t2-l-20", 20, "Old Customs House", "G", "'Stays open until eleven every night.' Live music has moved to the main stage."),
          ],
        },
      ],
    },
    {
      id: "t2-l-p3",
      part: 3,
      title: "Part 3 — Reviewing a mentoring scheme",
      context: "You will hear two colleagues, Marcus and Elena, discussing the results of a survey about their company's mentoring scheme.",
      speakers: [
        { name: "Marcus", voice: "male" },
        { name: "Elena", voice: "female" },
      ],
      script: [
        { speaker: "Marcus", text: "So, Elena, the survey results are in. Remind me — why did we set up the mentoring scheme in the first place? I've heard people say it was about promotion." },
        { speaker: "Elena", text: "That was a side benefit, but the main reason was that too many people were leaving within their first year. The idea was that having a mentor would make them want to stay." },
        { speaker: "Marcus", text: "Right. And what did mentees say they got out of it? I expected them to mention technical skills." },
        { speaker: "Elena", text: "A few did, and some said they felt more confident. But by far the most common answer was that they'd got to know people in other departments, which they'd never have done otherwise." },
        { speaker: "Marcus", text: "Interesting. What about the mentors? I assumed they'd complain about lack of time." },
        { speaker: "Elena", text: "Surprisingly, time wasn't the main issue, and most felt the training session was adequate. The biggest complaint was that they weren't sure what they were supposed to achieve with their mentee. The goals were never clear." },
        { speaker: "Marcus", text: "And how often should the pairs meet? At the moment it's monthly." },
        { speaker: "Elena", text: "Most people said monthly was too infrequent — they forgot what they'd discussed. But weekly would be too much for the mentors. I'd suggest every two weeks." },
        { speaker: "Marcus", text: "Agreed. How should we match people? We've been pairing people from the same department." },
        { speaker: "Elena", text: "Some companies use personality questionnaires, but I'm not convinced. I think we should match people according to their career interests — someone who wants to move into marketing gets a mentor from marketing." },
        { speaker: "Marcus", text: "That makes sense. So what's our next step? The board will want a presentation eventually." },
        { speaker: "Elena", text: "Eventually, yes, and maybe another survey next year. But the first thing we need to do is write a short guide for mentors, so they know what's expected." },
        { speaker: "Marcus", text: "What should go in it? A timetable for the year?" },
        { speaker: "Elena", text: "I'd rather leave the timing up to each pair. But it should definitely have some sample questions for the first meeting, because people find that one awkward. And it should include examples of goals — that's what mentors said was missing." },
        { speaker: "Marcus", text: "What about HR contact details and a feedback form?" },
        { speaker: "Elena", text: "Those are already on the intranet, so there's no need to repeat them." },
        { speaker: "Marcus", text: "And next year, should we widen the scheme? I'd like to include graduates." },
        { speaker: "Elena", text: "Graduates already have their own programme. But part-time staff were left out this year, which wasn't fair. And remote workers, who probably feel the most isolated, should definitely be invited." },
        { speaker: "Marcus", text: "What about warehouse staff?" },
        { speaker: "Elena", text: "They have a separate scheme run by the operations team, so let's leave that." },
      ],
      groups: [
        {
          id: "t2-l-g4",
          type: "mcq",
          instructions: "Choose the correct letter, A, B or C.",
          questionOptions: {
            "t2-l-21": opts("to reduce the number of staff leaving", "to improve customer service", "to prepare staff for promotion"),
            "t2-l-22": opts("learning technical skills", "becoming more confident", "meeting people in other departments"),
            "t2-l-23": opts("lack of time", "inadequate training", "unclear goals"),
            "t2-l-24": opts("weekly", "every two weeks", "monthly"),
            "t2-l-25": opts("department", "personality", "career interests"),
            "t2-l-26": opts("give a presentation to the board", "carry out another survey", "write a guide for mentors"),
          },
          questions: [
            q("t2-l-21", 21, "Why was the mentoring scheme introduced?", "A", "Promotion was 'a side benefit'; 'the main reason was… too many people were leaving'."),
            q("t2-l-22", 22, "Most mentees said the main benefit was", "C", "'By far the most common answer… got to know people in other departments.'"),
            q("t2-l-23", 23, "Mentors' biggest complaint was", "C", "Time and training were not the main issues; 'the goals were never clear'."),
            q("t2-l-24", 24, "In future, pairs should meet", "B", "Monthly too infrequent, weekly too much → every two weeks."),
            q("t2-l-25", 25, "Elena suggests matching people by", "C", "Department is current practice; she rejects questionnaires; chooses career interests."),
            q("t2-l-26", 26, "What will they do first?", "C", "'The first thing we need to do is write a short guide for mentors.'"),
          ],
        },
        {
          id: "t2-l-g5",
          type: "multi",
          instructions: "Choose TWO letters, A–E. Which TWO things will be included in the guide for mentors?",
          options: opts("sample questions for the first meeting", "a timetable for the year", "HR contact details", "examples of goals", "a feedback form"),
          questions: [
            q("t2-l-27", 27, "Guide contents (1)", ["A", "D"], "Sample questions and examples of goals are included. Timetable is left to pairs; HR details and feedback form are on the intranet."),
            q("t2-l-28", 28, "Guide contents (2)", ["A", "D"], "See above — answers A and D in either order."),
          ],
        },
        {
          id: "t2-l-g6",
          type: "multi",
          instructions: "Choose TWO letters, A–E. Which TWO groups will be invited to join the scheme next year?",
          options: opts("part-time staff", "warehouse staff", "senior managers", "graduates", "remote workers"),
          questions: [
            q("t2-l-29", 29, "New groups (1)", ["A", "E"], "Part-time staff and remote workers. Graduates and warehouse staff have their own schemes."),
            q("t2-l-30", 30, "New groups (2)", ["A", "E"], "See above — answers A and E in either order."),
          ],
        },
      ],
    },
    {
      id: "t2-l-p4",
      part: 4,
      title: "Part 4 — The shipping container",
      context: "You will hear part of a talk about how the shipping container changed world trade.",
      speakers: [{ name: "Lecturer", voice: "female" }],
      script: [
        { speaker: "Lecturer", text: "Today I'd like to talk about an invention that most people never think about, yet it has shaped almost everything we buy: the shipping container." },
        { speaker: "Lecturer", text: "Before containers, cargo was loaded piece by piece. Sacks, barrels and boxes were carried on board by teams of dock workers, and a single ship could take up to a week to load or unload. Ships often spent more time in port than at sea." },
        { speaker: "Lecturer", text: "The system was also notoriously insecure. Theft was extremely common, and alcohol was by far the most frequently stolen item." },
        { speaker: "Lecturer", text: "The man usually credited with changing all this is Malcolm McLean, who wasn't a sailor at all. He ran a trucking company in the United States, and he was frustrated by the hours his drivers spent waiting at ports." },
        { speaker: "Lecturer", text: "In 1956, a converted tanker carried fifty-eight of his containers from New Jersey to Houston. The voyage was a success, but the real breakthrough came later, when the industry agreed on standard sizes for containers, meaning any container could fit on any ship, train or truck." },
        { speaker: "Lecturer", text: "The effect on costs was dramatic. By some estimates, the cost of loading cargo fell by more than ninety per cent." },
        { speaker: "Lecturer", text: "Ports changed too. Container ships need huge cranes and vast storage areas, and old ports in city centres simply didn't have enough space. As a result, many ports moved to new sites outside the cities, and old docklands were turned into housing and offices." },
        { speaker: "Lecturer", text: "Perhaps the biggest impact was on manufacturing. Because shipping became cheap and predictable, companies could rely on global supply chains, making parts in one country and assembling them in another." },
        { speaker: "Lecturer", text: "The system isn't perfect, of course. Every year, hundreds of containers are lost at sea, mostly during storms, when they can be washed off the decks of ships." },
      ],
      groups: [
        {
          id: "t2-l-g7",
          type: "gap",
          title: "The Shipping Container",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          questions: [
            q("t2-l-31", 31, "Before containers: cargo carried on by teams of dock ____", "workers", "'Teams of dock workers.'"),
            q("t2-l-32", 32, "Loading one ship could take up to a ____", "week", "'Up to a week to load or unload.'"),
            q("t2-l-33", 33, "The item stolen most often was ____", "alcohol", "'Alcohol was by far the most frequently stolen item.'"),
            q("t2-l-34", 34, "McLean ran a ____ company", ["trucking", "truck", "haulage"], "'He ran a trucking company.' He was not a sailor (distractor)."),
            q("t2-l-35", 35, "1956: first voyage from New Jersey to ____", "Houston", "'From New Jersey to Houston.'"),
            q("t2-l-36", 36, "Breakthrough: agreement on standard ____", "sizes", "'Standard sizes for containers.'"),
            q("t2-l-37", 37, "Cost of loading fell by more than ____ %", ["90", "ninety"], "'More than ninety per cent.'"),
            q("t2-l-38", 38, "Ports moved out of cities because they lacked ____", "space", "'Didn't have enough space.'"),
            q("t2-l-39", 39, "Companies could rely on global ____ chains", "supply", "'Global supply chains.'"),
            q("t2-l-40", 40, "Containers are mostly lost at sea during ____", "storms", "'Mostly during storms.'"),
          ],
        },
      ],
    },
  ],

  reading: [
    {
      id: "t2-r-s1",
      part: 1,
      title: "Section 1",
      texts: [
        {
          id: "t2-r-a",
          title: "What's On in Millbrook This Weekend",
          kind: "Event listings",
          paragraphs: [
            { label: "A", text: "Millbrook Farmers' Market — Saturday 8 am–1 pm, Town Square. Over forty stalls selling local produce, bread and plants. This month's market includes a 'grow your own' advice tent run by the Millbrook Allotment Society. Free entry. Dogs on leads welcome." },
            { label: "B", text: "Open Studios — Saturday and Sunday, 10 am–5 pm. Twelve local artists open their homes and workshops to the public. Pick up a free map from the library. Many artists will be selling work, and several are offering short drawing sessions for beginners (£5, booking essential)." },
            { label: "C", text: "Riverside Fun Run — Sunday 9 am. Choose a 2 km family route or a 5 km route. Registration £8 for adults, free for under-16s. All money raised goes to the children's ward at Millbrook Hospital. Runners must register online by Friday at noon; no registration on the day." },
            { label: "D", text: "Vintage Car Show — Sunday 11 am–4 pm, Millbrook Park. More than sixty classic cars on display, from the 1920s to the 1980s. Adults £6, children free. Owners will be available to answer questions, and visitors may sit in selected cars. No dogs, please." },
            { label: "E", text: "Repair Café — Saturday 2–5 pm, Community Hall. Bring your broken toasters, lamps, bicycles and clothes and our volunteer fixers will try to repair them for free. Donations towards tea and cake are welcome. Please note: we cannot repair mobile phones or laptops." },
            { label: "F", text: "Jazz in the Gardens — Saturday 7–10 pm, Hollins House. An evening of live music in the historic walled garden. Tickets £15, including one drink. Bring a blanket or chair. If it rains, the concert will move indoors to the Orangery, which has limited seating." },
          ],
        },
        {
          id: "t2-r-b",
          title: "Lakeside Leisure Centre — Swimming Pool Information",
          kind: "Notice",
          paragraphs: [
            { text: "The main pool is open from 6.30 am to 9.30 pm on weekdays and from 8 am to 6 pm at weekends. The learner pool closes one hour earlier than the main pool every day." },
            { text: "Lane swimming takes place every weekday from 6.30 to 9 am and from 7 to 9.30 pm. During these sessions, lanes are marked slow, medium and fast. Please choose the lane that matches your speed and always swim in a clockwise direction." },
            { text: "Children under 8 must be accompanied in the water by an adult aged 16 or over. Each adult may supervise a maximum of two children under 8." },
            { text: "Swimming caps are compulsory for anyone with hair longer than shoulder length. Caps can be bought at reception for £2.50. Outdoor shoes must not be worn beyond the changing room entrance." },
            { text: "Lockers require a £1 coin, which is returned when you open the locker. Lost property is kept at reception for one month, after which it is donated to charity." },
            { text: "The pool will be closed for annual maintenance from 1 to 14 August. During this period, members may use the pool at Hilltop Sports Centre free of charge by showing their membership card." },
          ],
        },
      ],
      groups: [
        {
          id: "t2-r-g1",
          type: "matching",
          instructions: "Look at the six events, A–F. For which event are the following statements true? Write the correct letter, A–F. NB You may use any letter more than once.",
          options: opts("Farmers' Market", "Open Studios", "Fun Run", "Vintage Car Show", "Repair Café", "Jazz in the Gardens"),
          questions: [
            q("t2-r-1", 1, "You must sign up in advance and cannot do so on the day.", "C", "'Must register online by Friday at noon; no registration on the day.' B's booking is only for drawing sessions."),
            q("t2-r-2", 2, "This event takes place over two days.", "B", "'Saturday and Sunday.'"),
            q("t2-r-3", 3, "The venue may change depending on the weather.", "F", "'If it rains, the concert will move indoors.'"),
            q("t2-r-4", 4, "Money raised will support a medical facility.", "C", "'Goes to the children's ward at Millbrook Hospital.'"),
            q("t2-r-5", 5, "Some electronic items will not be accepted.", "E", "'We cannot repair mobile phones or laptops.'"),
            q("t2-r-6", 6, "Visitors can get gardening advice.", "A", "'A grow your own advice tent.' F is in a garden but offers music, not advice."),
            q("t2-r-7", 7, "Pets are not allowed.", "D", "'No dogs, please.' A explicitly welcomes dogs."),
            q("t2-r-8", 8, "A drink is included in the price.", "F", "'Tickets £15, including one drink.'"),
          ],
        },
        {
          id: "t2-r-g2",
          type: "short",
          instructions: "Answer the questions below. Choose NO MORE THAN THREE WORDS AND/OR A NUMBER from the text for each answer.",
          questions: [
            q("t2-r-9", 9, "What time does the learner pool close on Saturdays?", ["5 pm", "5pm", "5"], "Main pool closes at 6 pm at weekends; learner pool closes one hour earlier = 5 pm."),
            q("t2-r-10", 10, "In which direction must lane swimmers swim?", ["clockwise", "a clockwise direction"], "'Always swim in a clockwise direction.'"),
            q("t2-r-11", 11, "What is the minimum age of an adult supervising young children?", ["16", "sixteen"], "'An adult aged 16 or over.'"),
            q("t2-r-12", 12, "Who must wear a swimming cap?", ["anyone with long hair", "people with long hair", "anyone with hair longer than shoulder length"], "'Hair longer than shoulder length.' Answers expressing long hair are accepted."),
            q("t2-r-13", 13, "How long is lost property kept?", ["one month", "1 month", "a month"], "'Kept at reception for one month.'"),
            q("t2-r-14", 14, "What must members show to swim at Hilltop during the closure?", ["membership card", "their membership card"], "'By showing their membership card.'"),
          ],
        },
      ],
    },
    {
      id: "t2-r-s2",
      part: 2,
      title: "Section 2",
      texts: [
        {
          id: "t2-r-c",
          title: "Staff Car Park — Information for New Employees",
          kind: "Workplace notice",
          paragraphs: [
            { text: "The staff car park at our Eastfield site has 180 spaces, but more than 300 people work here, so parking cannot be guaranteed. Spaces are allocated on a first-come, first-served basis, except for those marked for disabled drivers and the six bays reserved for car-sharers." },
            { text: "To use the car park, you need a parking permit, which can be requested from the facilities team during your first week. Permits are free, but a replacement for a lost permit costs £10. Your permit must be clearly displayed on the dashboard at all times." },
            { text: "Car-sharing is strongly encouraged. Employees who travel to work with at least one colleague can apply for a car-share permit, which allows them to use the reserved bays near the main entrance. Both employees must work at the Eastfield site." },
            { text: "Electric vehicle charging points are available in bays 1 to 8. Charging is free, but vehicles must be moved as soon as charging is complete so that others can use the points. Staff who leave a fully charged car in these bays for more than four hours may lose their permit." },
            { text: "Cyclists can use the secure bike shelter beside the warehouse, which requires your staff ID card to enter. Showers and lockers are available in the main building." },
            { text: "The car park is locked at 10 pm every night. Staff working late shifts should speak to security, who can arrange for vehicles to be collected." },
          ],
        },
        {
          id: "t2-r-d",
          title: "Writing Professional Emails at Halden Logistics",
          kind: "Staff guide",
          paragraphs: [
            { text: "Every email you send represents the company, so it should be clear, polite and easy to act on. Start with a subject line that summarises the purpose of the message; vague subject lines such as 'Question' or 'Update' are likely to be overlooked." },
            { text: "When writing to customers or suppliers, use a greeting such as 'Dear Ms Patel'. With colleagues you know well, 'Hi' followed by their first name is acceptable. Keep your first sentence focused on why you are writing, and put any request near the beginning rather than at the end." },
            { text: "Aim to keep emails short. If a message is longer than three paragraphs, consider whether a phone call or meeting would be more efficient. Use bullet points for lists of actions or information." },
            { text: "Before sending, check that any attachments are included and that file names make sense to the recipient. Avoid writing in capital letters, which can appear aggressive, and never send an email when you are angry — save it as a draft and review it later." },
            { text: "Only copy in people who genuinely need the information. Overusing 'reply all' fills colleagues' inboxes and is one of the most common complaints in our staff surveys." },
            { text: "Finally, aim to reply to external emails within one working day, even if only to say when a full answer will follow." },
          ],
        },
      ],
      groups: [
        {
          id: "t2-r-g3",
          type: "tfng",
          instructions: "Do the following statements agree with the information in the car park notice? Write TRUE, FALSE or NOT GIVEN.",
          options: TFNG,
          questions: [
            q("t2-r-15", 15, "There are enough parking spaces for every employee.", "FALSE", "180 spaces for more than 300 staff."),
            q("t2-r-16", 16, "New staff must pay for their first parking permit.", "FALSE", "'Permits are free'; only replacements cost £10."),
            q("t2-r-17", 17, "Car-share bays are located close to the main entrance.", "TRUE", "'Reserved bays near the main entrance.'"),
            q("t2-r-18", 18, "A colleague from another site can be part of a car-share arrangement.", "FALSE", "'Both employees must work at the Eastfield site.'"),
            q("t2-r-19", 19, "Staff must pay to charge electric vehicles.", "FALSE", "'Charging is free.'"),
            q("t2-r-20", 20, "The bike shelter is monitored by security cameras.", "NOT GIVEN", "It is 'secure' and needs an ID card; cameras are not mentioned."),
            q("t2-r-21", 21, "Staff on late shifts can still collect their cars after 10 pm.", "TRUE", "Security 'can arrange for vehicles to be collected'."),
          ],
        },
        {
          id: "t2-r-g4",
          type: "gap",
          instructions: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the text for each answer.",
          questions: [
            q("t2-r-22", 22, "A clear ____ helps make sure an email is not ignored.", ["subject line"], "'Vague subject lines… are likely to be overlooked.'"),
            q("t2-r-23", 23, "Requests should appear near the ____ of the email.", ["beginning", "start"], "'Put any request near the beginning rather than at the end.'"),
            q("t2-r-24", 24, "Lists of actions should be presented as ____.", ["bullet points"], "'Use bullet points for lists of actions.'"),
            q("t2-r-25", 25, "Writing in ____ may seem aggressive.", ["capital letters", "capitals"], "'Avoid writing in capital letters, which can appear aggressive.'"),
            q("t2-r-26", 26, "An email written in anger should be saved as a ____.", ["draft"], "'Save it as a draft and review it later.'"),
            q("t2-r-27", 27, "Staff surveys show many complaints about the use of ____.", ["reply all"], "'Overusing reply all… one of the most common complaints.'"),
          ],
        },
      ],
    },
    {
      id: "t2-r-s3",
      part: 3,
      title: "Section 3",
      texts: [
        {
          id: "t2-r-e",
          title: "The Quiet Reinvention of the Public Library",
          kind: "General interest article",
          paragraphs: [
            { label: "A", text: "Twenty years ago, many commentators predicted that the public library would not survive the digital age. If every book could be downloaded and every fact found with a search engine, they asked, why would anyone visit a building full of paper? In many countries, budgets were cut, opening hours were reduced and hundreds of branches closed. Yet the library has not disappeared. Instead, it has been quietly reinventing itself, and in some cities visitor numbers are higher today than they were before the internet." },
            { label: "B", text: "The most visible change is in the buildings themselves. Traditional libraries were designed around silence and shelving, with long rows of bookcases and strict rules about noise. Many new libraries devote less than half their floor space to books. The rest is given over to meeting rooms, cafés, children's play areas and 'makerspaces' — workshops where members of the public can use 3D printers, sewing machines and sound-recording equipment." },
            { label: "C", text: "Behind these changes lies a different understanding of what a library is for. Librarians increasingly describe their role not as looking after collections but as connecting people with knowledge, skills and each other. Many libraries now run job clubs, language conversation groups and classes in basic computer skills. For people without internet access at home — still a significant minority in many countries — the library may be the only place where they can apply for jobs or government services online." },
            { label: "D", text: "Not everyone welcomes the transformation. Some long-standing users complain that libraries have become noisy and that book collections have been reduced to make room for other activities. A survey in one city found that although overall satisfaction had risen, older users were noticeably less positive than younger ones. In response, several libraries have introduced 'quiet floors' where talking and phone calls are not permitted, attempting to serve both groups under one roof." },
            { label: "E", text: "Funding remains the central challenge. Because libraries are usually paid for by local governments, they compete for money with services such as social care and road maintenance, which many voters consider more urgent. Some libraries have responded by forming partnerships — sharing buildings with health clinics, post offices or council offices — so that running costs are split. Others rely increasingly on volunteers, although critics argue that this risks replacing skilled professional staff." },
            { label: "F", text: "Interestingly, the digital revolution that was supposed to destroy libraries has in some ways strengthened them. Ebook and audiobook lending has grown rapidly, and many libraries now offer free access to online newspapers, language-learning apps and research databases that would be expensive for individuals to subscribe to. During periods when buildings were closed, these services attracted many people who had not used a library for years." },
            { label: "G", text: "What, then, is the library of the future? Perhaps the best description is a 'third place' — a space that is neither home nor work, where people can spend time without being expected to buy anything. In an age when such spaces are increasingly rare, that may prove to be the library's most valuable contribution of all." },
          ],
        },
      ],
      groups: [
        {
          id: "t2-r-g5",
          type: "headings",
          instructions: "The article has seven paragraphs, A–G. Choose the correct heading for each paragraph from the list below. Write the correct number, i–x.",
          options: romanOpts(
            "A space that asks nothing of its visitors",
            "Online services that brought people back",
            "Trying to satisfy different kinds of users",
            "A prediction that proved wrong",
            "The history of library architecture",
            "Sharing costs and relying on unpaid help",
            "From guarding books to linking people",
            "Rooms designed for more than reading",
            "Why young people prefer ebooks",
            "Training librarians for the digital age",
          ),
          questions: [
            q("t2-r-28", 28, "Paragraph A", "iv", "Commentators predicted the library would not survive; it has."),
            q("t2-r-29", 29, "Paragraph B", "viii", "Less floor space for books; meeting rooms, cafés, makerspaces. (v 'history' is too broad.)"),
            q("t2-r-30", 30, "Paragraph C", "vii", "'Not as looking after collections but as connecting people.'"),
            q("t2-r-31", 31, "Paragraph D", "iii", "Older vs younger users; quiet floors 'to serve both groups'."),
            q("t2-r-32", 32, "Paragraph E", "vi", "Partnerships split running costs; volunteers."),
            q("t2-r-33", 33, "Paragraph F", "ii", "Ebooks and online services attracted people who hadn't used a library for years."),
            q("t2-r-34", 34, "Paragraph G", "i", "'A space… where people can spend time without being expected to buy anything.'"),
          ],
        },
        {
          id: "t2-r-g6",
          type: "mcq",
          instructions: "Choose the correct letter, A, B, C or D.",
          questionOptions: {
            "t2-r-35": opts("they no longer lend books", "most of their space is used for purposes other than books", "they are smaller than traditional libraries", "they have stricter rules on noise"),
            "t2-r-36": opts("older users were less satisfied than younger users", "most users wanted more books", "satisfaction had fallen overall", "younger users wanted quiet floors"),
            "t2-r-37": opts("they reduce the quality of service", "they may take the place of trained staff", "they are difficult to recruit", "they are only available at weekends"),
          },
          questions: [
            q("t2-r-35", 35, "According to paragraph B, many new libraries are different because", "B", "'Devote less than half their floor space to books.'"),
            q("t2-r-36", 36, "What did the city survey find?", "A", "'Older users were noticeably less positive than younger ones', while overall satisfaction rose (C wrong)."),
            q("t2-r-37", 37, "What concern do critics have about volunteers?", "B", "'This risks replacing skilled professional staff.'"),
          ],
        },
        {
          id: "t2-r-g7",
          type: "gap",
          instructions: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the text for each answer.",
          questions: [
            q("t2-r-38", 38, "In makerspaces, the public can use equipment such as 3D printers and ____.", ["sewing machines", "sound-recording equipment"], "Either item listed in paragraph B within the word limit — 'sewing machines' fits."),
            q("t2-r-39", 39, "Libraries compete for funds with services like social care and ____.", ["road maintenance"], "'Social care and road maintenance.'"),
            q("t2-r-40", 40, "The writer suggests the library could be described as a ____.", ["third place"], "'Perhaps the best description is a third place.'"),
          ],
        },
      ],
    },
  ],

  writing: [
    {
      id: "t2-w-1",
      task: 1,
      tone: "informal",
      prompt: "A friend is going to stay in your home while you are away on holiday. Write a letter to your friend. In your letter:",
      bullets: [
        "explain how to get into your home",
        "give instructions about looking after your pet",
        "suggest some things to do in your area",
      ],
      minWords: 150,
      suggestedMinutes: 20,
      modelAnswer: `Dear Sam,

I'm so glad you're able to stay at my place while I'm away — it's a huge weight off my mind! I just wanted to give you a few details before you arrive on Friday.

Getting in is easy. I've left a spare key with Mrs Okafor at number 12, and she'll be in all afternoon. The front door can be a bit stubborn, so you'll need to pull it towards you while you turn the key. The alarm code is the last four digits of my phone number.

As for Biscuit, she's very low-maintenance. Just give her one scoop of dry food in the morning and half a pouch of wet food in the evening, and keep her water bowl topped up. She's not allowed outside after dark, so please make sure the cat flap is locked by eight.

When you fancy getting out, the riverside path is perfect for a morning run, and there's a fantastic little Lebanese restaurant on the high street — try the lamb flatbread. If the weather's good, the Saturday market is well worth a visit too.

Have a great time, and help yourself to anything in the fridge!

Best wishes,
Alex`,
      examinerNotes: [
        "Template followed exactly: Para 1 = reason for writing; Paras 2–4 = one bullet each.",
        "Consistent informal tone: contractions, phrasal verbs ('topped up', 'getting out'), friendly opener and closer.",
        "Bullets fully extended with precise, practical details (number 12, one scoop, locked by eight).",
        "Natural informal vocabulary ('a huge weight off my mind', 'low-maintenance', 'well worth a visit').",
      ],
    },
    {
      id: "t2-w-2",
      task: 2,
      essayType: "discussion",
      prompt: "Some people think children should start formal education at a very young age, while others believe they should not begin school until they are at least seven years old. Discuss both views and give your own opinion.",
      minWords: 250,
      suggestedMinutes: 40,
      modelAnswer: `The age at which children should begin formal schooling varies considerably from one country to another. While some people argue that an early start gives children an academic advantage, others believe that young children benefit more from play. In my opinion, delaying formal lessons until around the age of seven is the wiser approach.

Those who favour an early start point out that young children absorb new information remarkably quickly. Beginning to read and count at four or five, they argue, gives pupils a head start that will benefit them throughout their education. Furthermore, early schooling can help children from disadvantaged families, whose parents may not have the time or resources to teach them at home. In the United Kingdom, for instance, children start school at four, partly so that every child has access to structured learning from an early age.

On the other hand, many educational experts argue that children under seven learn most effectively through play rather than formal lessons. Activities such as building, role-playing and outdoor games develop creativity, problem-solving and social skills, which form the foundation for later academic success. Pushing children to sit at desks too early may also cause stress and a negative attitude towards school. Finland is often cited as an example: children there do not start formal education until seven, yet the country consistently performs well in international comparisons.

In conclusion, although an early start may help some children academically, I believe that allowing them to learn through play until about seven produces more confident, well-rounded learners, as long as high-quality pre-school care is available to all families.`,
      examinerNotes: [
        "Discuss Both Views structure from your guide: Paraphrase → View 1 → View 2 → Your opinion.",
        "Body 1 presents view 1 fairly; Body 2 presents view 2 and links to the writer's own position.",
        "Each body paragraph has a topic sentence, explanation, further explanation and a specific example (UK, Finland).",
        "Conclusion uses 'although + view 1, I believe + view 2' — mirrors the populated structure in your guide.",
      ],
    },
  ],

  speaking: {
    part1: [
      { topic: "Free time", questions: ["What do you usually do in your free time?", "Do you prefer spending free time alone or with others?", "Is there a hobby you would like to try in the future?"] },
      { topic: "Shopping", questions: ["Do you enjoy shopping?", "Do you prefer shopping online or in stores?", "Has the way people shop in your country changed recently?"] },
      { topic: "Public transport", questions: ["How do you usually travel around your city?", "What do you think of the public transport where you live?", "What would encourage more people to use public transport?"] },
    ],
    part2: {
      cue: "Describe a time when you helped someone.",
      bullets: ["who you helped", "what the situation was", "how you helped them"],
      finalLine: "and explain how you felt about helping this person.",
      roundOff: "Do you often help people in this way?",
    },
    part3: [
      { theme: "Helping in the community", questions: ["Why do some people volunteer their time to help others?", "Should schools require students to do community service?", "Do people help their neighbours less than they did in the past?"] },
      { theme: "Responsibility", questions: ["Who should be responsible for looking after elderly people — families or the government?", "How can large companies contribute to the communities they operate in?", "Is it better to give money to charity or to give time?"] },
    ],
    modelPart2: `I'd like to talk about a time last winter when I helped my elderly neighbour, Mr Haddad, who lives alone in the flat below mine.

We'd had a really heavy snowstorm — the kind that shuts down the whole city for a couple of days. On the second morning I noticed his curtains were still closed at eleven o'clock, which was unusual because he's normally up at dawn. So I knocked on his door, and it turned out he'd slipped on some ice the previous evening and twisted his ankle. He hadn't wanted to bother anyone, so he'd been sitting there without proper food or his medication.

Straight away, I made him something hot to eat and called his doctor, who arranged a home visit. Then, because the pharmacy was a twenty-minute walk away through the snow, I went and collected his prescription. For the rest of that week I popped in every morning and evening, just to check on him and do a bit of shopping.

How did I feel? Honestly, a mixture of things. I was relieved that I'd noticed something was wrong, but I also felt slightly guilty that I hadn't checked on him the day before. Looking back, though, it was really rewarding, and we've become good friends since then — he's taught me how to play backgammon, and I'm still terrible at it.`,
  },
};

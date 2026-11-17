import type { VocabCard } from "@/lib/types";

const v = (topic: string, word: string, pos: string, meaning: string, collocations: string[], example: string, band6?: string): VocabCard => ({
  id: `${topic}-${word}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  topic, word, pos, meaning, collocations, example, band6,
});

export const TOPICS = ["Work", "Technology", "Environment", "Society", "Travel", "Health", "Education"] as const;

export const VOCAB: VocabCard[] = [
  // WORK
  v("Work", "workload", "n", "the amount of work a person has to do", ["heavy workload", "manage your workload", "reduce the workload"], "Hiring two assistants significantly reduced the team's workload.", "a lot of work"),
  v("Work", "remuneration", "n", "payment for work", ["competitive remuneration", "remuneration package"], "The position offers competitive remuneration and flexible hours.", "pay"),
  v("Work", "job security", "n phr", "confidence that you will keep your job", ["offer job security", "lack of job security"], "Many young workers value job security more than a high salary."),
  v("Work", "burnout", "n", "exhaustion caused by long-term stress at work", ["suffer from burnout", "prevent burnout"], "Unrealistic deadlines are a common cause of burnout.", "being very tired"),
  v("Work", "delegate", "v", "give part of your work to someone else", ["delegate tasks", "delegate responsibility"], "Good managers know how to delegate tasks effectively.", "give work to"),
  v("Work", "career prospects", "n phr", "chances of success in your career", ["improve career prospects", "limited career prospects"], "A second language can greatly improve your career prospects."),
  v("Work", "work–life balance", "n phr", "time divided well between job and personal life", ["achieve a healthy work–life balance"], "Remote work helps many parents achieve a better work–life balance."),
  v("Work", "productivity", "n", "how much is produced relative to effort or time", ["boost productivity", "a drop in productivity"], "Short breaks have been shown to boost productivity.", "how much work people do"),
  v("Work", "redundant", "adj", "no longer employed because the job is no longer needed", ["be made redundant"], "Hundreds of factory workers were made redundant when the plant closed.", "lose their job"),
  v("Work", "flexible working", "n phr", "arrangements allowing choice over when/where you work", ["request flexible working", "offer flexible working"], "Employers who offer flexible working find it easier to retain staff."),
  v("Work", "retain", "v", "keep (staff, customers)", ["retain staff", "retain talent"], "Mentoring schemes help companies retain new employees.", "keep"),

  // TECHNOLOGY
  v("Technology", "cutting-edge", "adj", "the most advanced", ["cutting-edge technology", "cutting-edge research"], "The hospital uses cutting-edge equipment for diagnosis.", "very new"),
  v("Technology", "obsolete", "adj", "no longer used because something newer exists", ["become obsolete", "obsolete technology"], "Many traditional jobs may become obsolete due to automation.", "old"),
  v("Technology", "automation", "n", "using machines to do work previously done by people", ["the rise of automation", "automation of tasks"], "Automation has transformed the manufacturing industry."),
  v("Technology", "digital literacy", "n phr", "ability to use digital tools effectively", ["improve digital literacy", "lack digital literacy"], "Libraries run courses to improve digital literacy among older adults."),
  v("Technology", "screen time", "n", "time spent looking at screens", ["limit screen time", "excessive screen time"], "Doctors recommend limiting children's screen time before bed."),
  v("Technology", "data privacy", "n phr", "protection of personal information", ["concerns about data privacy", "protect data privacy"], "Growing concerns about data privacy have led to stricter laws."),
  v("Technology", "revolutionise", "v", "change completely", ["revolutionise the way we…"], "Smartphones have revolutionised the way we shop.", "change a lot"),
  v("Technology", "user-friendly", "adj", "easy to use", ["user-friendly interface", "user-friendly design"], "The new app is far more user-friendly than the old website.", "easy"),
  v("Technology", "a double-edged sword", "idiom", "something with both good and bad effects", ["prove to be a double-edged sword"], "Social media is a double-edged sword for teenagers."),
  v("Technology", "breakthrough", "n", "an important discovery or development", ["a major breakthrough", "make a breakthrough"], "The vaccine was a major breakthrough in medicine.", "big discovery"),

  // ENVIRONMENT
  v("Environment", "carbon footprint", "n phr", "the amount of CO2 a person or activity produces", ["reduce your carbon footprint"], "Taking the train instead of flying reduces your carbon footprint."),
  v("Environment", "sustainable", "adj", "able to continue without damaging the environment", ["sustainable development", "sustainable energy"], "Governments must invest in sustainable energy sources.", "green"),
  v("Environment", "deplete", "v", "use up a resource", ["deplete natural resources", "depleted fish stocks"], "Overfishing has severely depleted fish stocks.", "use up"),
  v("Environment", "biodiversity", "n", "the variety of plants and animals in an area", ["loss of biodiversity", "protect biodiversity"], "Urban parks can play a role in protecting biodiversity."),
  v("Environment", "renewable", "adj", "naturally replaced; not running out", ["renewable energy", "renewable resources"], "Wind and solar are the fastest-growing renewable energy sources."),
  v("Environment", "emissions", "n", "gases released into the air", ["cut emissions", "carbon emissions", "vehicle emissions"], "Countries have pledged to cut carbon emissions by half.", "pollution"),
  v("Environment", "pose a threat", "v phr", "be a danger to", ["pose a serious threat to"], "Plastic waste poses a serious threat to marine life.", "be dangerous"),
  v("Environment", "irreversible", "adj", "cannot be changed back", ["irreversible damage"], "Some scientists fear the damage may be irreversible.", "permanent"),
  v("Environment", "conservation", "n", "protection of nature", ["wildlife conservation", "conservation efforts"], "Conservation efforts have saved the species from extinction."),
  v("Environment", "landfill", "n", "a place where waste is buried", ["end up in landfill", "landfill sites"], "Most household plastic still ends up in landfill."),

  // SOCIETY
  v("Society", "disadvantaged", "adj", "lacking money, education or opportunities", ["disadvantaged backgrounds", "disadvantaged communities"], "Free school meals support children from disadvantaged backgrounds.", "poor"),
  v("Society", "cohesion", "n", "the state of being united", ["social cohesion", "community cohesion"], "Local festivals strengthen community cohesion."),
  v("Society", "ageing population", "n phr", "a population with a growing proportion of older people", ["cope with an ageing population"], "An ageing population puts pressure on healthcare systems."),
  v("Society", "inequality", "n", "unfair difference between groups", ["income inequality", "reduce inequality"], "Income inequality has widened in many countries."),
  v("Society", "integrate", "v", "become part of a community", ["integrate into society", "help newcomers integrate"], "Language classes help immigrants integrate into society.", "fit in"),
  v("Society", "civic duty", "n phr", "a responsibility as a citizen", ["a sense of civic duty"], "Many volunteers say they act out of a sense of civic duty."),
  v("Society", "affordable housing", "n phr", "homes that people on average incomes can pay for", ["a shortage of affordable housing"], "A shortage of affordable housing forces young people to live with their parents."),
  v("Society", "vulnerable", "adj", "easily harmed", ["vulnerable groups", "the most vulnerable"], "Heatwaves are most dangerous for vulnerable groups such as the elderly.", "weak"),
  v("Society", "grassroots", "adj", "organised by ordinary people", ["grassroots campaign", "grassroots movement"], "A grassroots campaign persuaded the council to restore the park."),
  v("Society", "alleviate", "v", "make less severe", ["alleviate poverty", "alleviate pressure"], "Food banks help alleviate poverty in the short term.", "reduce"),

  // TRAVEL
  v("Travel", "off the beaten track", "idiom", "away from popular tourist areas", ["somewhere off the beaten track"], "We stayed in a village off the beaten track."),
  v("Travel", "itinerary", "n", "a planned route or schedule", ["a detailed itinerary", "plan an itinerary"], "Our itinerary included three nights in Lisbon.", "plan"),
  v("Travel", "breathtaking", "adj", "extremely beautiful", ["breathtaking views", "breathtaking scenery"], "The mountain road offers breathtaking views.", "very beautiful"),
  v("Travel", "overtourism", "n", "too many tourists in one place", ["suffer from overtourism", "tackle overtourism"], "Venice has introduced a fee to tackle overtourism."),
  v("Travel", "commute", "v/n", "travel regularly to work", ["a long commute", "commute to work"], "Remote work has eliminated her 90-minute commute."),
  v("Travel", "congestion", "n", "too much traffic", ["traffic congestion", "ease congestion"], "A new tram line has helped ease congestion in the centre.", "traffic"),
  v("Travel", "broaden your horizons", "idiom", "gain new experiences and knowledge", ["travel broadens your horizons"], "Living abroad really broadened my horizons."),
  v("Travel", "accommodation", "n (uncount.)", "a place to stay", ["budget accommodation", "book accommodation"], "Budget accommodation can be hard to find in summer.", "hotel"),
  v("Travel", "layover", "n", "a short stay between flights", ["a long layover in…"], "We had a six-hour layover in Dubai."),
  v("Travel", "picturesque", "adj", "visually charming", ["a picturesque village"], "The coast is dotted with picturesque fishing villages.", "pretty"),

  // HEALTH
  v("Health", "sedentary", "adj", "involving a lot of sitting", ["a sedentary lifestyle", "sedentary jobs"], "A sedentary lifestyle increases the risk of heart disease.", "inactive"),
  v("Health", "well-being", "n", "health and happiness", ["mental well-being", "promote well-being"], "Regular exercise promotes mental well-being."),
  v("Health", "preventable", "adj", "can be stopped from happening", ["preventable diseases"], "Many deaths from heart disease are preventable."),
  v("Health", "obesity", "n", "being very overweight", ["childhood obesity", "rates of obesity"], "Rates of childhood obesity have doubled in thirty years."),
  v("Health", "balanced diet", "n phr", "food with the right mix of nutrients", ["maintain a balanced diet"], "Maintaining a balanced diet is easier when you cook at home."),
  v("Health", "access to healthcare", "n phr", "ability to get medical treatment", ["unequal access to healthcare"], "Rural residents often have limited access to healthcare."),

  // EDUCATION
  v("Education", "curriculum", "n", "the subjects taught in a school", ["the national curriculum", "broaden the curriculum"], "Financial skills should be part of the school curriculum."),
  v("Education", "hands-on", "adj", "practical; learning by doing", ["hands-on experience", "hands-on learning"], "Apprenticeships provide valuable hands-on experience.", "practical"),
  v("Education", "rote learning", "n phr", "memorising without understanding", ["rely on rote learning"], "Critics argue the system relies too heavily on rote learning."),
  v("Education", "lifelong learning", "n phr", "continuing to learn throughout life", ["promote lifelong learning"], "Libraries play a key role in promoting lifelong learning."),
  v("Education", "tuition fees", "n phr", "money paid for teaching at university/college", ["abolish tuition fees", "pay tuition fees"], "Some countries have abolished tuition fees altogether."),
  v("Education", "well-rounded", "adj", "having a broad range of skills and experience", ["well-rounded individuals"], "Extracurricular activities help produce well-rounded students."),
];

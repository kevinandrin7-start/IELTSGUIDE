# CLB 9 Coach: IELTS General Training prep

A progressive web app for IELTS **General Training** candidates who need **CLB 9** for Canadian immigration:
Listening 8.0 (about 35–36/40), Reading 7.0 (about 34–35/40), Writing 7.0 and Speaking 7.0. Every skill has to clear its own benchmark, so the app tracks each one separately.

Built with Next.js (App Router), React, TypeScript, Tailwind CSS and Lucide icons. All progress is stored on the device (localStorage, plus IndexedDB for speaking recordings), so there is no account or database to set up.

## Features

| Area | What it does |
| --- | --- |
| Dashboard | CLB 9 gauges per skill, today's tasks, study streak, weak-area heatmap by question type, recent error log |
| Study plan | Exam date + hours per day + 12-question diagnostic + confidence check → day-by-day roadmap weighted toward the skills furthest from CLB 9 (Learn → Practise → Simulate phases, two full mocks scheduled) |
| Playbook | 25 lessons across the four skills: signposting, distractors, spelling, prediction; GT reading sections, TFNG vs YNNG, headings, summary; Task 1 four-paragraph letter template and tone matrix; five Task 2 essay blueprints, cohesion, lexical upgrades; Speaking Answer + Reason + Example, Part 2 PPF grid, Part 3 hedging |
| Cheat sheets | 15-20-25 reading rule, 20/40 writing split, paraphrase tables, pitfalls, panic button, score tables, test-day checklist |
| Drills | Short targeted drills filterable by skill and question type, auto-marked with explanations |
| Lexical bank | Topic vocabulary (Work, Technology, Environment, Society, Travel and more) with collocations, examples, pronunciation (text to speech) and SM-2 spaced repetition |
| Mock tests | Two full, original GT tests in a computer-delivered style: split screen, highlighting and notes (select + right-click), question palette (answered / unanswered / flagged), strict timers |
| Marking | Listening and Reading auto-marked with raw → band → CLB conversion and per-question explanations. Writing and Speaking use a band-descriptor rubric for self-assessment, plus optional AI marking |
| Progress | Band history per skill, accuracy by question type, full error log, export / reset |

Exam rules modelled: Listening has 4 parts / 40 questions with no pausing in exam mode and a 2-minute review at the end; Reading has 3 sections / 40 questions in 60 minutes; Writing shares one 60-minute timer with a live word count and spell-check turned off; Speaking runs Parts 1–3 with 1 minute of Part 2 preparation and a 2-minute talk, recorded with the microphone. Practice mode removes the timers and lets you replay audio and see the transcript.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production build
npm run validate   # checks every mock/drill answer key and question numbering
npm run lint
```

Listening audio is generated in the browser with the Web Speech API, using different voices for different speakers. Chrome, Edge and Safari have the best voice selection.

### Optional AI marking

Copy `.env.example` to `.env.local` and set `ANTHROPIC_API_KEY`. The Writing and Speaking result screens then show an **AI marking** button that returns band scores per criterion with feedback (`app/api/grade/route.ts`). Without a key, the app offers a ready-made marking prompt you can paste into any assistant.

### Publishing on GitHub Pages

`.github/workflows/pages.yml` builds a static version of the app and deploys it on every push to `main`.
One-time setup: in the repository go to **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.
The site is then served at `https://<user>.github.io/<repo>/`. To build the same static site locally:

```bash
STATIC_EXPORT=1 BASE_PATH=/IELTSGUIDE npm run build   # output in ./out (remove app/api first, as the workflow does)
```

GitHub Pages has no server, so on the hosted site AI marking uses the learner's own Anthropic API key, pasted into the "AI marking key" box on the Writing or Speaking results screen. The key is kept only in that browser.

## Project structure

```
app/
  (main)/            dashboard, planner, learn, drills, vocab, mock, cheatsheets, progress (with sidebar/bottom nav)
  exam/[id]/[skill]/ full-screen exam runner (reading, listening, writing, speaking)
  api/grade/         optional AI marking endpoint
components/          UI kit, exam chrome, reading passage with highlights, listening player, map, rubric
  exam/              ObjectiveExam (L/R), ObjectiveResults, WritingExam, SpeakingExam, ExamChrome
data/
  lessons/           Playbook lessons per skill (block-based content)
  mocks/             test1.ts, test2.ts: full original GT mock tests
  drills.ts, vocab.ts, cheatsheets.ts
lib/
  types.ts           all content and progress schemas
  scoring.ts         raw → band tables, CLB table, answer matching
  grade.ts           marking of question groups, error-log entries
  storage.ts         localStorage store (useSyncExternalStore) + IndexedDB recordings
  plan.ts            diagnostic and roadmap generator
  srs.ts, tts.ts, hooks.ts, analytics.ts, ai.ts
public/              PWA manifest, icons, service worker (offline after first visit)
scripts/validate-content.ts
```

### Content schema (short version)

- `MockTest` → `listening: ListeningSection[]` (script lines + question groups), `reading: ReadingSection[]` (texts + groups), `writing: WritingTask[]`, `speaking: SpeakingSet`.
- `QuestionGroup` has a `type` (`tfng`, `ynng`, `mcq`, `multi`, `matching`, `headings`, `gap`, `short`, `map`), instructions, optional options, and `questions` with `num`, `prompt` (`____` marks a gap), accepted `answer[]` and an `explanation`.
- `Lesson` is a list of typed `Block`s (paragraph, table, tip, example, blueprint, steps, checklist, compare).

To add a test, create `data/mocks/test3.ts` following `test1.ts`, add it to `data/mocks/index.ts`, and run `npm run validate`.

## Content and sources

All passages, recordings scripts, questions, sample answers and lessons are **original** and written for this app. No Cambridge or official IELTS test material is reproduced. Format facts, raw-score conversions and CLB equivalencies were checked against public information from ielts.org, IDP and IRCC; the score tables are approximations, since official conversions vary slightly between test versions.

IELTS is a registered trademark of the British Council, IDP and Cambridge University Press & Assessment. This project is not affiliated with or endorsed by them.

"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, GraduationCap, Timer } from "lucide-react";
import { useState } from "react";
import { getMock } from "@/data/mocks";
import { ObjectiveExam } from "@/components/exam/ObjectiveExam";
import { SpeakingExam } from "@/components/exam/SpeakingExam";
import { WritingExam } from "@/components/exam/WritingExam";
import { Card, cn } from "@/components/ui";
import { store } from "@/lib/storage";
import type { Attempt, Skill } from "@/lib/types";

const INFO: Record<Skill, { time: string; rules: string[] }> = {
  listening: {
    time: "≈30 minutes + 2 minutes review",
    rules: [
      "Four parts, 40 questions. The recording is played ONCE — you cannot pause it in Exam mode.",
      "You get reading time before each part. Answer while you listen.",
      "After Part 4 you have 2 minutes to check your answers, then the test submits automatically.",
      "Audio uses your device's speech engine with different voices per speaker.",
    ],
  },
  reading: {
    time: "60 minutes",
    rules: [
      "Three sections, 40 questions. Suggested split: 15 · 20 · 25 minutes.",
      "Passage on the left, questions on the right. Select text and right-click to highlight or add notes.",
      "Use the palette at the bottom to jump between questions and flag ones to revisit.",
      "The test submits automatically when time runs out.",
    ],
  },
  writing: {
    time: "60 minutes (shared)",
    rules: [
      "Task 1: a letter, at least 150 words (≈20 min). Task 2: an essay, at least 250 words (≈40 min).",
      "Spell-check and autocorrect are disabled, as in the real test.",
      "Your work is saved on this device as you type.",
      "Afterwards, score each task against the four criteria or use AI grading, and compare with a Band 8 model.",
    ],
  },
  speaking: {
    time: "11–14 minutes",
    rules: [
      "Part 1: short questions on familiar topics. Part 2: cue card with 1-minute preparation and up to 2 minutes' talk. Part 3: discussion.",
      "Questions are read aloud. Your answers are recorded for playback (allow microphone access).",
      "In Exam mode, the test moves on automatically when time is up.",
    ],
  },
};

export function ExamRunner({ id, skill }: { id: string; skill: Skill }) {
  const test = getMock(id)!;
  const search = useSearchParams();
  const reviewId = search.get("review");
  const [mode, setMode] = useState<"exam" | "practice" | null>(null);

  if (reviewId && (skill === "listening" || skill === "reading")) {
    const attempt = store.read<Attempt[]>("attempts", []).find((a) => a.id === reviewId);
    if (attempt?.answers) {
      const answers = Object.fromEntries(attempt.answers.map((r) => [r.qid, r.given]));
      return <ObjectiveExam test={test} skill={skill} mode="exam" reviewAnswers={answers} />;
    }
  }

  if (!mode) {
    const info = INFO[skill];
    return (
      <div className="min-h-dvh bg-bg p-4 sm:p-10">
        <div className="mx-auto max-w-2xl">
          <Link href="/mock" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ArrowLeft size={15} /> Mock tests</Link>
          <Card className="space-y-5">
            <div>
              <div className="text-sm text-muted">{test.title} · IELTS General Training</div>
              <h1 className="text-2xl font-semibold capitalize">{skill}</h1>
              <div className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Timer size={15} /> {info.time}</div>
            </div>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">{info.rules.map((r) => <li key={r}>{r}</li>)}</ul>
            <div className="grid gap-3 sm:grid-cols-2">
              {(["exam", "practice"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn("rounded-xl border p-4 text-left transition hover:border-accent", m === "exam" ? "border-ink/30" : "border-line")}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    {m === "exam" ? <Timer size={16} /> : <GraduationCap size={16} />} {m === "exam" ? "Exam mode" : "Practice mode"}
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {m === "exam"
                      ? "Strict timers, audio plays once, authentic test-day conditions."
                      : skill === "listening"
                        ? "Pause, change speed, show the transcript, replay any part. No timer."
                        : "No countdown and manual pacing. Ideal for learning the question types."}
                  </p>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (skill === "listening" || skill === "reading") return <ObjectiveExam test={test} skill={skill} mode={mode} />;
  if (skill === "writing") return <WritingExam test={test} mode={mode} />;
  return <SpeakingExam test={test} mode={mode} />;
}

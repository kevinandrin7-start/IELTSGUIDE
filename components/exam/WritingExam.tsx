"use client";
import { useEffect, useState } from "react";
import type { MockTest, WritingTask } from "@/lib/types";
import { WRITING_T1_CRITERIA, WRITING_T2_CRITERIA, buildWritingPrompt } from "@/lib/ai";
import { useCountdown } from "@/lib/hooks";
import { wordCount } from "@/lib/scoring";
import { addAttempt, store } from "@/lib/storage";
import { RubricAssessment } from "../RubricAssessment";
import { Badge, Card, Tabs, cn } from "../ui";
import { ExamHeader } from "./ExamChrome";

function Prompt({ task }: { task: WritingTask }) {
  return (
    <div className="space-y-3 text-[15px] leading-7">
      <div className="text-sm font-bold">Writing Task {task.task}</div>
      <p className="text-sm text-muted">You should spend about {task.suggestedMinutes} minutes on this task. Write at least {task.minWords} words.</p>
      <div className="rounded-lg border border-line bg-surface2 p-4">
        <p>{task.prompt}</p>
        {task.bullets && <ul className="mt-2 list-disc pl-6">{task.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
        {task.task === 1 && <p className="mt-3">Begin your letter as follows: <b>Dear {task.tone === "formal" ? "Sir or Madam" : task.tone === "informal" ? "……" : "Mr/Ms ……"},</b></p>}
        {task.task === 2 && <p className="mt-3">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>}
      </div>
    </div>
  );
}

export function WritingExam({ test, mode }: { test: MockTest; mode: "exam" | "practice" }) {
  const key = `draft:${test.id}:writing`;
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [tab, setTab] = useState(test.writing[0].id);
  const [finished, setFinished] = useState(false);
  const [saved, setSaved] = useState<Record<string, number>>({});

  useEffect(() => {
    const d = store.read<Record<string, string> | null>(key, null);
    if (d) setTexts(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (id: string, v: string) => setTexts((t) => {
    const n = { ...t, [id]: v };
    store.write(key, n);
    return n;
  });

  const submit = () => {
    setFinished(true);
    window.scrollTo(0, 0);
  };
  const timer = useCountdown(60 * 60, { running: !finished && mode === "exam", onExpire: submit });
  const task = test.writing.find((w) => w.id === tab)!;

  const saveScore = (t: WritingTask, scores: Record<string, number>, band: number) => {
    const next = { ...saved, [t.id]: band };
    setSaved(next);
    const t1 = next[test.writing[0].id];
    const t2 = next[test.writing[1].id];
    if (t1 != null && t2 != null) {
      // Task 2 counts double
      const overall = Math.round(((t1 + 2 * t2) / 3) * 2) / 2;
      addAttempt({ id: `${Date.now()}`, testId: test.id, kind: "mock", skill: "writing", date: Date.now(), band: overall, criteria: scores });
      store.write(key, null);
    }
  };

  if (finished) {
    return (
      <div className="exam-ui min-h-dvh bg-bg">
        <ExamHeader title={`${test.title} · Writing · Assessment`} mode={mode} />
        <div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6">
          <Card className="text-sm">
            Score each task against the four criteria (or use AI grading), then save. Your Writing band is calculated with Task 2 weighted double.
            {Object.keys(saved).length === 2 && <Badge tone="good" className="ml-2">Writing band saved: {(Math.round(((saved[test.writing[0].id] + 2 * saved[test.writing[1].id]) / 3) * 2) / 2).toFixed(1)}</Badge>}
          </Card>
          {test.writing.map((t) => {
            const ans = texts[t.id] ?? "";
            const wc = wordCount(ans);
            return (
              <section key={t.id} className="space-y-4">
                <h2 className="text-xl font-semibold">Task {t.task}</h2>
                <Prompt task={t} />
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card>
                    <div className="mb-2 flex items-center justify-between text-sm font-semibold">Your response <Badge tone={wc >= t.minWords ? "good" : "bad"}>{wc} words</Badge></div>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{ans || <span className="text-muted">(no response)</span>}</pre>
                  </Card>
                  <Card className="bg-accent-soft">
                    <div className="mb-2 text-sm font-semibold">Band 8+ model answer ({wordCount(t.modelAnswer)} words)</div>
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{t.modelAnswer}</pre>
                    <ul className="mt-3 list-disc space-y-1 border-t border-line pt-3 pl-5 text-xs">{t.examinerNotes.map((n) => <li key={n}>{n}</li>)}</ul>
                  </Card>
                </div>
                {wc < t.minWords && wc > 0 && <p className="text-sm text-bad">Under {t.minWords} words: examiners reduce the Task {t.task === 1 ? "Achievement" : "Response"} score.</p>}
                <RubricAssessment
                  kind="writing"
                  criteria={t.task === 1 ? WRITING_T1_CRITERIA : WRITING_T2_CRITERIA}
                  aiPrompt={buildWritingPrompt(t, ans)}
                  onSave={(s, b) => saveScore(t, s, b)}
                  saved={saved[t.id] != null}
                />
              </section>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="exam-ui flex min-h-dvh flex-col bg-bg">
      <ExamHeader title={`${test.title} · General Training Writing`} timeLeft={mode === "exam" ? timer.left : null} mode={mode} onSubmit={() => window.confirm("Finish the Writing test?") && submit()} />
      <div className="border-b border-line bg-surface px-4 py-2">
        <Tabs value={tab} onChange={setTab} items={test.writing.map((w) => ({ value: w.id, label: `Task ${w.task} · ${wordCount(texts[w.id] ?? "")} words` }))} />
      </div>
      <main className="grid flex-1 lg:grid-cols-2">
        <section className="border-b border-line bg-surface p-4 sm:p-6 lg:h-[calc(100dvh-110px)] lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <Prompt task={task} />
        </section>
        <section className="flex flex-col p-3 sm:p-5 lg:h-[calc(100dvh-110px)]">
          <textarea
            key={task.id}
            value={texts[task.id] ?? ""}
            onChange={(e) => update(task.id, e.target.value)}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            data-gramm="false"
            placeholder={task.task === 1 ? "Dear …" : "Start your essay here…"}
            className="min-h-[50vh] flex-1 resize-none rounded-lg border border-line bg-surface p-4 font-[Arial] text-[15px] leading-7 outline-none focus:border-accent"
            aria-label={`Task ${task.task} answer`}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted">Spell-check is off, as in the real test.</span>
            <span className={cn("font-semibold", wordCount(texts[task.id] ?? "") >= task.minWords ? "text-good" : "text-muted")}>
              Word count: {wordCount(texts[task.id] ?? "")}
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

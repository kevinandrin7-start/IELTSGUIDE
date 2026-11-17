"use client";
import { BookOpenText, ListChecks } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { MockTest } from "@/lib/types";
import { gradeGroups, toErrorEntries } from "@/lib/grade";
import { useCountdown } from "@/lib/hooks";
import { rawToBand } from "@/lib/scoring";
import { addAttempt, addErrors, store } from "@/lib/storage";
import { ExamPlayer, PracticePlayer } from "../ListeningPlayer";
import { QuestionGroupView } from "../QuestionGroupView";
import { ReadingPassage } from "../ReadingPassage";
import { cn } from "../ui";
import { ExamHeader, QuestionPalette, jumpTo } from "./ExamChrome";
import { ObjectiveResults } from "./ObjectiveResults";

export function ObjectiveExam({
  test,
  skill,
  mode,
  reviewAnswers,
}: {
  test: MockTest;
  skill: "listening" | "reading";
  mode: "exam" | "practice";
  reviewAnswers?: Record<string, string>;
}) {
  const sections = skill === "listening" ? test.listening : test.reading;
  const draftKey = `draft:${test.id}:${skill}`;
  const [answers, setAnswers] = useState<Record<string, string>>(() => reviewAnswers ?? {});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [part, setPart] = useState(0);
  const [finished, setFinished] = useState(!!reviewAnswers);
  const [audioDone, setAudioDone] = useState(false);
  const [mobilePane, setMobilePane] = useState<"text" | "questions">("questions");
  const [startedAt] = useState(Date.now());

  // Restore an unfinished attempt (e.g. accidental refresh)
  useEffect(() => {
    if (reviewAnswers) return;
    const d = store.read<Record<string, string> | null>(draftKey, null);
    if (d) setAnswers(d);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAnswer = useCallback(
    (qid: string, v: string) =>
      setAnswers((a) => {
        const n = { ...a, [qid]: v };
        store.write(draftKey, n);
        return n;
      }),
    [draftKey],
  );

  const submit = useCallback(() => {
    if (finished) return;
    const groups = sections.flatMap((s) => s.groups);
    const records = gradeGroups(groups, answers);
    const raw = records.filter((r) => r.correct).length;
    addAttempt({
      id: `${Date.now()}`,
      testId: test.id,
      kind: "mock",
      skill,
      date: Date.now(),
      raw,
      total: 40,
      band: rawToBand(skill, raw),
      answers: records,
      durationSec: Math.round((Date.now() - startedAt) / 1000),
    });
    addErrors(toErrorEntries(records, skill, `${test.title} ${skill === "listening" ? "Listening" : "Reading"}`));
    store.write(draftKey, null);
    setFinished(true);
    window.scrollTo(0, 0);
  }, [answers, draftKey, finished, sections, skill, startedAt, test.id, test.title]);

  // Timers: Reading = 60 min strict (exam) · Listening = 2-min review after audio (exam)
  const readingTimer = useCountdown(60 * 60, { running: !finished && skill === "reading" && mode === "exam", onExpire: submit });
  const reviewTimer = useCountdown(120, { running: !finished && skill === "listening" && mode === "exam" && audioDone, onExpire: submit });

  const parts = useMemo(
    () => sections.map((s, i) => ({ label: skill === "listening" ? `Part ${i + 1}` : `Section ${i + 1}`, groups: s.groups })),
    [sections, skill],
  );

  const confirmSubmit = () => {
    const unanswered = sections.flatMap((s) => s.groups.flatMap((g) => g.questions)).filter((q) => !answers[q.id]).length;
    if (unanswered && !window.confirm(`You have ${unanswered} unanswered question(s). Submit anyway?`)) return;
    submit();
  };

  if (finished) {
    return (
      <>
        <ExamHeader title={`${test.title} · ${skill === "listening" ? "Listening" : "Reading"} · Results`} mode={mode} />
        <ObjectiveResults skill={skill} sections={sections} answers={answers} retakeHref={`/exam/${test.id}/${skill}`} />
      </>
    );
  }

  const timeLeft = skill === "reading" ? (mode === "exam" ? readingTimer.left : null) : audioDone && mode === "exam" ? reviewTimer.left : null;
  const sec = sections[part];
  const toggleFlag = (id: string) => setFlagged((f) => { const n = new Set(f); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const jump = (qid: string, p: number) => { setPart(p); setMobilePane("questions"); jumpTo(qid); };

  return (
    <div className="exam-ui flex min-h-dvh flex-col bg-bg">
      <ExamHeader
        title={`${test.title} · ${skill === "listening" ? "Listening" : "General Training Reading"}`}
        timeLeft={timeLeft}
        mode={mode}
        onSubmit={confirmSubmit}
        extra={audioDone && skill === "listening" && mode === "exam" ? <span className="hidden text-xs text-white/70 sm:inline">Review time</span> : undefined}
      />

      {skill === "listening" ? (
        <main className="mx-auto w-full max-w-4xl flex-1 space-y-4 p-3 sm:p-6">
          {mode === "exam" ? (
            <ExamPlayer sections={test.listening} onPartChange={setPart} onFinished={() => setAudioDone(true)} />
          ) : (
            <PracticePlayer key={sec.id} section={test.listening[part]} />
          )}
          <div className="rounded-lg bg-surface2 px-4 py-2 text-sm"><b>{sec.title}</b></div>
          {sec.groups.map((g) => (
            <QuestionGroupView key={g.id} group={g} answers={answers} setAnswer={setAnswer} flagged={flagged} toggleFlag={toggleFlag} />
          ))}
        </main>
      ) : (
        <>
          <div className="flex border-b border-line bg-surface lg:hidden">
            {(["text", "questions"] as const).map((p) => (
              <button key={p} onClick={() => setMobilePane(p)} className={cn("flex flex-1 items-center justify-center gap-1.5 py-2 text-sm font-medium", mobilePane === p ? "border-b-2 border-accent text-accent" : "text-muted")}>
                {p === "text" ? <BookOpenText size={15} /> : <ListChecks size={15} />} {p === "text" ? "Passage" : "Questions"}
              </button>
            ))}
          </div>
          <main className="grid flex-1 lg:grid-cols-2">
            <section className={cn("h-[calc(100dvh-150px)] overflow-y-auto border-r border-line bg-surface px-4 pb-6 sm:px-6 scrollbar-thin lg:block", mobilePane === "text" ? "block" : "hidden")}>
              {test.reading.map((s, i) => (
                <div key={s.id} className={i === part ? "block" : "hidden"}>
                  <ReadingPassage texts={s.texts} />
                </div>
              ))}
            </section>
            <section className={cn("h-[calc(100dvh-150px)] space-y-4 overflow-y-auto p-3 sm:p-5 scrollbar-thin lg:block", mobilePane === "questions" ? "block" : "hidden")}>
              <div className="rounded-lg bg-surface2 px-4 py-2 text-sm"><b>{sec.title}</b> · Questions {sec.groups[0].questions[0].num}–{sec.groups.at(-1)!.questions.at(-1)!.num}</div>
              {sec.groups.map((g) => (
                <QuestionGroupView key={g.id} group={g} answers={answers} setAnswer={setAnswer} flagged={flagged} toggleFlag={toggleFlag} />
              ))}
            </section>
          </main>
        </>
      )}

      <QuestionPalette parts={parts} current={part} setCurrent={setPart} answers={answers} flagged={flagged} onJump={jump} />
    </div>
  );
}

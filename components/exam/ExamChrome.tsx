"use client";
import Link from "next/link";
import { Clock, X } from "lucide-react";
import type { QuestionGroup } from "@/lib/types";
import { fmtTime } from "@/lib/scoring";
import { cn } from "../ui";

export function ExamHeader({
  title,
  timeLeft,
  mode,
  onSubmit,
  submitLabel = "Submit",
  extra,
}: {
  title: string;
  timeLeft?: number | null;
  mode: "exam" | "practice";
  onSubmit?: () => void;
  submitLabel?: string;
  extra?: React.ReactNode;
}) {
  const low = timeLeft != null && timeLeft <= 300;
  return (
    <header className="exam-ui sticky top-0 z-40 flex items-center gap-3 bg-[#1f2937] px-3 py-2 text-white sm:px-5">
      <Link href="/mock" className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white" aria-label="Exit test"><X size={18} /></Link>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold">{title}</div>
        <div className="text-[11px] text-white/60">Test taker · {mode === "exam" ? "Exam mode" : "Practice mode"}</div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        {extra}
        {timeLeft != null && (
          <div className={cn("flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-sm tabular-nums", low ? "bg-red-600 animate-pulse" : "bg-white/10")} aria-live="polite">
            <Clock size={14} /> {fmtTime(timeLeft)}
          </div>
        )}
        {onSubmit && (
          <button onClick={onSubmit} className="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-[#1f2937] hover:bg-white/90">{submitLabel}</button>
        )}
      </div>
    </header>
  );
}

/** Bottom navigation palette: parts + numbered questions, answered / flagged states. */
export function QuestionPalette({
  parts,
  current,
  setCurrent,
  answers,
  flagged,
  onJump,
}: {
  parts: { label: string; groups: QuestionGroup[] }[];
  current: number;
  setCurrent: (i: number) => void;
  answers: Record<string, string>;
  flagged: Set<string>;
  onJump: (qid: string, part: number) => void;
}) {
  return (
    <nav className="exam-ui sticky bottom-0 z-30 border-t border-line bg-surface px-2 py-2 sm:px-4">
      <div className="flex gap-2 overflow-x-auto scrollbar-thin">
        {parts.map((p, i) => {
          const qs = p.groups.flatMap((g) => g.questions);
          const answered = qs.filter((q) => answers[q.id]).length;
          return (
            <div key={p.label} className={cn("flex shrink-0 items-center gap-1 rounded-lg border px-2 py-1", i === current ? "border-accent bg-accent-soft" : "border-line")}>
              <button onClick={() => setCurrent(i)} className="mr-1 whitespace-nowrap text-xs font-semibold">
                {p.label} <span className="font-normal text-muted">{answered}/{qs.length}</span>
              </button>
              {i === current &&
                qs.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => onJump(q.id, i)}
                    className={cn(
                      "relative grid h-7 w-7 shrink-0 place-items-center rounded text-xs font-semibold",
                      answers[q.id] ? "bg-[#1f2937] text-white dark:bg-ink dark:text-bg" : "border border-line bg-surface",
                    )}
                    aria-label={`Question ${q.num}${answers[q.id] ? " answered" : ""}${flagged.has(q.id) ? " flagged" : ""}`}
                  >
                    {q.num}
                    {flagged.has(q.id) && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-warn ring-2 ring-surface" />}
                  </button>
                ))}
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export function jumpTo(qid: string) {
  requestAnimationFrame(() => {
    const el = document.getElementById(`q-${qid}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    (el?.querySelector("input,select,textarea") as HTMLElement | null)?.focus({ preventScroll: true });
  });
}

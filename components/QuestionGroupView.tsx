"use client";
import { Check, Flag, X } from "lucide-react";
import type { Option, Question, QuestionGroup } from "@/lib/types";
import { gradeGroups } from "@/lib/grade";
import { MapSvg } from "./MapSvg";
import { cn } from "./ui";

interface Props {
  group: QuestionGroup;
  answers: Record<string, string>;
  setAnswer: (qid: string, v: string) => void;
  review?: boolean;
  flagged?: Set<string>;
  toggleFlag?: (qid: string) => void;
  onFocusQ?: (qid: string) => void;
}

function Feedback({ q, ok, given }: { q: Question; ok: boolean; given: string }) {
  return (
    <div className={cn("mt-2 rounded-lg border p-3 text-sm", ok ? "border-good/40 bg-good-soft" : "border-bad/40 bg-bad-soft")}>
      <div className="flex flex-wrap items-center gap-2 font-medium">
        {ok ? <Check size={15} className="text-good" /> : <X size={15} className="text-bad" />}
        {ok ? "Correct" : <>Your answer: <span className="font-mono">{given || "—"}</span></>}
        {!ok && <span>· Correct: <span className="font-mono">{q.answer.join(" / ")}</span></span>}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed">{q.explanation}</p>
    </div>
  );
}

function FlagBtn({ q, flagged, toggleFlag }: { q: Question; flagged?: Set<string>; toggleFlag?: (id: string) => void }) {
  if (!toggleFlag) return null;
  const on = flagged?.has(q.id);
  return (
    <button onClick={() => toggleFlag(q.id)} title="Flag for review" aria-pressed={on} className={cn("rounded p-1", on ? "text-warn" : "text-muted/50 hover:text-muted")}>
      <Flag size={14} fill={on ? "currentColor" : "none"} />
    </button>
  );
}

function OptionBank({ options, title }: { options: Option[]; title?: string }) {
  return (
    <div className="mb-3 rounded-lg border border-line bg-surface2 p-3 text-sm">
      {title && <div className="mb-1 font-semibold">{title}</div>}
      <ul className="grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
        {options.map((o) => (
          <li key={o.key}><span className="mr-2 font-semibold">{o.key}</span>{o.text}</li>
        ))}
      </ul>
    </div>
  );
}

export function QuestionGroupView({ group, answers, setAnswer, review, flagged, toggleFlag, onFocusQ }: Props) {
  const results = review ? Object.fromEntries(gradeGroups([group], answers).map((r) => [r.qid, r])) : {};
  const first = group.questions[0].num;
  const last = group.questions[group.questions.length - 1].num;
  const inputCls = "rounded-md border border-line bg-surface px-2 py-1 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

  const qWrap = (q: Question, children: React.ReactNode) => (
    <div key={q.id} id={`q-${q.id}`} className="scroll-mt-24 py-2" onFocus={() => onFocusQ?.(q.id)}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 grid h-6 min-w-6 place-items-center rounded border border-ink/70 px-1 text-xs font-bold">{q.num}</span>
        <div className="flex-1">{children}</div>
        <FlagBtn q={q} flagged={flagged} toggleFlag={toggleFlag} />
      </div>
      {review && results[q.id] && <div className="ml-8"><Feedback q={q} ok={results[q.id].correct} given={results[q.id].given} /></div>}
    </div>
  );

  let body: React.ReactNode;

  switch (group.type) {
    case "gap":
    case "short":
      body = group.questions.map((q) => {
        const parts = q.prompt.split("____");
        const input = (
          <input
            aria-label={`Question ${q.num}`}
            value={answers[q.id] ?? ""}
            disabled={review}
            onChange={(e) => setAnswer(q.id, e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            className={cn(inputCls, "mx-1 w-40 max-w-full")}
          />
        );
        return qWrap(
          q,
          parts.length > 1 ? (
            <div className="leading-8">{parts[0]}{input}{parts[1]}</div>
          ) : (
            <div><div className="mb-1">{q.prompt}</div>{input}</div>
          ),
        );
      });
      break;

    case "tfng":
    case "ynng":
    case "mcq":
      body = group.questions.map((q) => {
        const options = group.type === "mcq" ? group.questionOptions?.[q.id] ?? [] : group.options ?? [];
        return qWrap(
          q,
          <fieldset>
            <legend className="mb-1.5">{q.prompt}</legend>
            <div className={cn("flex gap-1.5", group.type === "mcq" ? "flex-col" : "flex-wrap")}>
              {options.map((o) => {
                const sel = (answers[q.id] ?? "") === o.key;
                return (
                  <label key={o.key} className={cn("flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-1.5 text-sm transition", sel ? "border-accent bg-accent-soft" : "border-line hover:bg-surface2", review && "cursor-default")}>
                    <input type="radio" name={q.id} className="mt-1 accent-[var(--accent)]" checked={sel} disabled={review} onChange={() => setAnswer(q.id, o.key)} />
                    {group.type === "mcq" ? <span><b className="mr-1.5">{o.key}</b>{o.text}</span> : <span className="font-medium">{o.text}</span>}
                  </label>
                );
              })}
            </div>
          </fieldset>,
        );
      });
      break;

    case "matching":
    case "headings":
    case "map":
      body = (
        <>
          {group.type === "map" && group.mapId && <MapSvg id={group.mapId} />}
          {group.type !== "map" && group.options && <OptionBank options={group.options} title={group.type === "headings" ? "List of headings" : undefined} />}
          {group.questions.map((q) =>
            qWrap(
              q,
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex-1">{q.prompt.includes("____") ? q.prompt.replace("____", "…") : q.prompt}</span>
                <select
                  aria-label={`Question ${q.num}`}
                  value={answers[q.id] ?? ""}
                  disabled={review}
                  onChange={(e) => setAnswer(q.id, e.target.value)}
                  className={cn(inputCls, "min-w-20")}
                >
                  <option value="">—</option>
                  {group.options?.map((o) => (
                    <option key={o.key} value={o.key}>{group.type === "map" ? o.key : `${o.key}`}</option>
                  ))}
                </select>
              </div>,
            ),
          )}
        </>
      );
      break;

    case "multi": {
      const ids = group.questions.map((q) => q.id);
      const selected = ids.map((id) => answers[id]).filter(Boolean);
      const toggle = (key: string) => {
        let next = selected.includes(key) ? selected.filter((k) => k !== key) : [...selected, key];
        if (next.length > ids.length) next = next.slice(next.length - ids.length);
        next.sort();
        ids.forEach((id, i) => setAnswer(id, next[i] ?? ""));
      };
      body = (
        <div id={`q-${ids[0]}`} className="scroll-mt-24">
          <div className="mb-2 flex items-center gap-2">
            {group.questions.map((q) => (
              <span key={q.id} id={`q-${q.id}`} className="grid h-6 min-w-6 place-items-center rounded border border-ink/70 px-1 text-xs font-bold">{q.num}</span>
            ))}
            <span className="text-sm text-muted">Choose {ids.length} ({selected.length}/{ids.length} selected)</span>
            {toggleFlag && <FlagBtn q={group.questions[0]} flagged={flagged} toggleFlag={toggleFlag} />}
          </div>
          <div className="flex flex-col gap-1.5">
            {group.options?.map((o) => {
              const sel = selected.includes(o.key);
              return (
                <label key={o.key} className={cn("flex cursor-pointer items-start gap-2 rounded-lg border px-3 py-1.5 text-sm", sel ? "border-accent bg-accent-soft" : "border-line hover:bg-surface2")}>
                  <input type="checkbox" className="mt-1 accent-[var(--accent)]" checked={sel} disabled={review} onChange={() => toggle(o.key)} />
                  <span><b className="mr-1.5">{o.key}</b>{o.text}</span>
                </label>
              );
            })}
          </div>
          {review && (
            <div className="mt-2 space-y-1">
              {group.questions.map((q) => results[q.id] && <Feedback key={q.id} q={q} ok={results[q.id].correct} given={results[q.id].given} />).slice(0, 1)}
              <p className="text-xs text-muted">Score: {group.questions.filter((q) => results[q.id]?.correct).length}/{ids.length}</p>
            </div>
          )}
        </div>
      );
      break;
    }
  }

  return (
    <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <h3 className="text-sm font-bold">Questions {first}{last !== first ? `–${last}` : ""}</h3>
      <p className="mb-3 mt-1 text-sm italic text-muted">{group.instructions}</p>
      {group.title && <div className="mb-2 text-center font-semibold">{group.title}</div>}
      <div className="divide-y divide-line/60">{body}</div>
    </section>
  );
}

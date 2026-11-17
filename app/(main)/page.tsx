"use client";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, ClipboardCheck, Flame, Target } from "lucide-react";
import { useMemo } from "react";
import { Badge, Card, Gauge, LinkButton, PageHeader, cn } from "@/components/ui";
import { SKILLS, heatColor, latestBand, qtypeAccuracy } from "@/lib/analytics";
import { daysUntil, generatePlan } from "@/lib/plan";
import { TARGET, TARGET_RAW, bandToClb } from "@/lib/scoring";
import { streak, today, useAttempts, useDoneTasks, useErrors, usePlan, useStudyDays } from "@/lib/storage";

const LABEL = { listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking" };

export default function Dashboard() {
  const [attempts] = useAttempts();
  const [plan] = usePlan();
  const [days] = useStudyDays();
  const [done, setDone] = useDoneTasks();
  const [errors] = useErrors();

  const tasks = useMemo(() => (plan ? generatePlan(plan).filter((t) => t.date === today()) : []), [plan]);
  const heat = useMemo(() => qtypeAccuracy(attempts), [attempts]);
  const s = streak(days);

  const bands = SKILLS.map((sk) => {
    const a = latestBand(attempts, sk);
    return { skill: sk, band: a?.band ?? plan?.diagnostic[sk] ?? null, source: a ? "mock" : plan ? "diagnostic" : "none", raw: a?.raw };
  });
  const metCount = bands.filter((b) => b.band != null && b.band >= TARGET[b.skill]).length;

  // last 28 days activity strip
  const strip = Array.from({ length: 28 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (27 - i));
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return { k, on: days.includes(k) };
  });

  return (
    <>
      <PageHeader title="Your CLB 9 dashboard" subtitle="Every skill must reach its own benchmark: Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0.">
        {plan ? (
          <Badge tone="accent"><CalendarDays size={13} /> Exam in {Math.max(0, daysUntil(plan.examDate))} days</Badge>
        ) : (
          <LinkButton href="/planner">Take the diagnostic <ArrowRight size={16} /></LinkButton>
        )}
      </PageHeader>

      <Card className="mb-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 font-semibold"><Target size={18} className="text-accent" /> CLB 9 score tracker</h2>
          <span className="text-sm text-muted">{metCount}/4 skills at CLB 9</span>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {bands.map((b) => (
            <div key={b.skill}>
              <Gauge
                value={b.band}
                target={TARGET[b.skill]}
                label={LABEL[b.skill]}
                sub={
                  b.source === "none"
                    ? `Target ${TARGET[b.skill].toFixed(1)}`
                    : `${b.raw != null ? `${b.raw}/40 · ` : ""}CLB ${bandToClb(b.skill, b.band!)}${b.source === "diagnostic" ? " (est.)" : ""}`
                }
              />
              {(b.skill === "listening" || b.skill === "reading") && (
                <div className="mt-1 text-center text-[11px] text-muted">Need {TARGET_RAW[b.skill]}</div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Today&apos;s plan</h2>
            <Link href="/planner" className="text-sm text-accent hover:underline">Full roadmap</Link>
          </div>
          {!plan && (
            <div className="rounded-xl border border-dashed border-line p-6 text-center">
              <p className="text-sm text-muted">Take the 5-minute diagnostic and set your exam date to get a day-by-day plan weighted towards your weakest skills.</p>
              <LinkButton href="/planner" className="mt-3">Start diagnostic</LinkButton>
            </div>
          )}
          <ul className="space-y-2">
            {tasks.map((t) => {
              const isDone = done.includes(t.id);
              return (
                <li key={t.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <button
                    aria-label={isDone ? "Mark not done" : "Mark done"}
                    onClick={() => setDone((d) => (isDone ? d.filter((x) => x !== t.id) : [...d, t.id]))}
                    className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-md border", isDone ? "border-good bg-good text-white" : "border-line")}
                  >
                    {isDone && <Check size={13} />}
                  </button>
                  <Link href={t.href} className={cn("flex-1 text-sm hover:text-accent", isDone && "text-muted line-through")}>{t.title}</Link>
                  <Badge>{t.minutes} min</Badge>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card>
          <h2 className="mb-3 flex items-center gap-2 font-semibold"><Flame size={18} className="text-warn" /> Streak</h2>
          <div className="text-4xl font-bold">{s} <span className="text-base font-medium text-muted">day{s === 1 ? "" : "s"}</span></div>
          <div className="mt-4 grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
            {strip.map((d) => (
              <div key={d.k} title={d.k} className={cn("aspect-square rounded-sm", d.on ? "bg-accent" : "bg-surface2")} />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">Last 28 days. Any lesson, drill, flashcard review or test counts.</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-1 font-semibold">Weak-area heatmap</h2>
          <p className="mb-4 text-xs text-muted">Accuracy by question type across all tests and drills. Red = focus here.</p>
          {heat.length === 0 ? (
            <p className="text-sm text-muted">Complete a drill or mock test to see your heatmap.</p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2">
              {heat.map((h) => {
                const acc = h.correct / h.total;
                return (
                  <div key={h.skill + h.label} className="flex items-center gap-3 rounded-lg border border-line p-2.5">
                    <span className="h-8 w-8 shrink-0 rounded-md" style={{ background: heatColor(acc), opacity: 0.85 }} />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{h.label}</div>
                      <div className="text-xs text-muted">{LABEL[h.skill]} · {Math.round(acc * 100)}% ({h.correct}/{h.total})</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Recent error log</h2>
            <Link href="/progress" className="text-sm text-accent hover:underline">View all</Link>
          </div>
          {errors.length === 0 ? (
            <p className="text-sm text-muted">Mistakes from drills and mock tests are logged here automatically.</p>
          ) : (
            <ul className="divide-y divide-line">
              {errors.slice(0, 6).map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-2 py-2 text-sm">
                  <span className="min-w-0 truncate"><b>{e.qtype}</b> · {e.source}</span>
                  <span className="shrink-0 text-xs text-muted">{e.note}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-accent-soft">
        <div>
          <h2 className="font-semibold">Ready for a full test?</h2>
          <p className="text-sm text-muted">Computer-delivered format with strict timers, a question palette, highlighting and notes.</p>
        </div>
        <LinkButton href="/mock"><ClipboardCheck size={16} /> Open mock tests</LinkButton>
      </Card>
    </>
  );
}

"use client";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, PageHeader, cn } from "@/components/ui";
import { DIAGNOSTIC, daysUntil, estimateBand, generatePlan } from "@/lib/plan";
import { TARGET, bandToClb } from "@/lib/scoring";
import { addAttempt, today, useDoneTasks, usePlan } from "@/lib/storage";
import { speak } from "@/lib/tts";
import type { Skill, StudyPlan } from "@/lib/types";

const SKILLS: Skill[] = ["listening", "reading", "writing", "speaking"];

function Diagnostic({ onDone }: { onDone: (p: StudyPlan) => void }) {
  const [step, setStep] = useState(0);
  const inSix = new Date(Date.now() + 42 * 86_400_000).toISOString().slice(0, 10);
  const [examDate, setExamDate] = useState(inSix);
  const [hours, setHours] = useState(1.5);
  const [prev, setPrev] = useState<Partial<Record<Skill, string>>>({});
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [self, setSelf] = useState<Record<Skill, number>>({ listening: 6.5, reading: 6.5, writing: 6, speaking: 6.5 });

  const finish = () => {
    const diagnostic = Object.fromEntries(
      SKILLS.map((s) => {
        const items = DIAGNOSTIC.filter((d) => d.skill === s);
        const correct = items.filter((d) => picks[d.id] === d.answer).length;
        const p = prev[s] ? Number(prev[s]) : undefined;
        return [s, estimateBand(correct, items.length, self[s], p && p > 0 ? p : undefined)];
      }),
    ) as Record<Skill, number>;
    const weak = SKILLS.filter((s) => diagnostic[s] < TARGET[s]).sort((a, b) => TARGET[b] - diagnostic[b] - (TARGET[a] - diagnostic[a]));
    SKILLS.forEach((s) => addAttempt({ id: `${Date.now()}-${s}`, testId: "diagnostic", kind: "diagnostic", skill: s, date: Date.now(), band: diagnostic[s] }));
    onDone({ examDate, hoursPerDay: hours, weak, createdAt: Date.now(), diagnostic });
  };

  return (
    <Card className="mx-auto max-w-2xl">
      <div className="mb-4 flex gap-1">{[0, 1, 2].map((i) => <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= step ? "bg-accent" : "bg-surface2")} />)}</div>
      {step === 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">1 · Your exam</h2>
          <label className="block text-sm">Exam date
            <input type="date" value={examDate} min={today()} onChange={(e) => setExamDate(e.target.value)} className="mt-1 block w-full rounded-lg border border-line bg-surface px-3 py-2" />
          </label>
          <label className="block text-sm">Study time per day: <b>{hours} h</b>
            <input type="range" min={0.5} max={4} step={0.5} value={hours} onChange={(e) => setHours(Number(e.target.value))} className="mt-1 block w-full accent-[var(--accent)]" />
          </label>
          <div className="text-sm">Previous IELTS scores (optional)
            <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SKILLS.map((s) => (
                <label key={s} className="text-xs capitalize text-muted">{s}
                  <input inputMode="decimal" placeholder="e.g. 6.5" value={prev[s] ?? ""} onChange={(e) => setPrev((p) => ({ ...p, [s]: e.target.value }))} className="mt-0.5 block w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-sm text-ink" />
                </label>
              ))}
            </div>
          </div>
          <Button onClick={() => setStep(1)}>Next <ArrowRight size={16} /></Button>
        </div>
      )}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">2 · Quick diagnostic (12 questions)</h2>
          {DIAGNOSTIC.map((d, n) => (
            <div key={d.id} className="rounded-xl border border-line p-3">
              <div className="mb-1 flex items-center gap-2 text-xs uppercase text-muted"><span>{n + 1}. {d.skill}</span>
                {d.audio && <button onClick={() => speak(d.audio!)} className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2 py-0.5 normal-case text-accent"><Volume2 size={13} /> Play audio</button>}
              </div>
              <p className="mb-2 whitespace-pre-wrap text-sm">{d.prompt}</p>
              <div className="flex flex-col gap-1.5">
                {d.choices.map((c, i) => (
                  <button key={c} onClick={() => setPicks((p) => ({ ...p, [d.id]: i }))} className={cn("rounded-lg border px-3 py-1.5 text-left text-sm", picks[d.id] === i ? "border-accent bg-accent-soft" : "border-line hover:bg-surface2")}>{c}</button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)} disabled={Object.keys(picks).length < DIAGNOSTIC.length}>Next <ArrowRight size={16} /></Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">3 · How confident are you?</h2>
          <p className="text-sm text-muted">Rate where you think you are now. This is blended with your quiz answers and any previous scores.</p>
          {SKILLS.map((s) => (
            <label key={s} className="block text-sm capitalize">{s}: <b>{self[s].toFixed(1)}</b> <span className="text-xs text-muted normal-case">(target {TARGET[s].toFixed(1)})</span>
              <input type="range" min={4.5} max={8.5} step={0.5} value={self[s]} onChange={(e) => setSelf((x) => ({ ...x, [s]: Number(e.target.value) }))} className="block w-full accent-[var(--accent)]" />
            </label>
          ))}
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={finish}><Check size={16} /> Build my plan</Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function PlannerPage() {
  const [plan, setPlan] = usePlan();
  const [done, setDone] = useDoneTasks();
  const [redo, setRedo] = useState(false);
  const tasks = useMemo(() => (plan ? generatePlan(plan) : []), [plan]);

  if (!plan || redo) {
    return (
      <>
        <PageHeader title="Diagnostic & study roadmap" subtitle="Three quick steps: your exam date, a 12-question diagnostic, and a confidence check. Your plan is weighted toward the skills furthest from CLB 9." />
        <Diagnostic onDone={(p) => { setPlan(p); setRedo(false); }} />
      </>
    );
  }

  const byDate = new Map<string, typeof tasks>();
  tasks.forEach((t) => byDate.set(t.date, [...(byDate.get(t.date) ?? []), t]));
  const dates = [...byDate.keys()];
  const weeks: string[][] = [];
  dates.forEach((d, i) => { if (i % 7 === 0) weeks.push([]); weeks[weeks.length - 1].push(d); });
  const completion = Math.round((tasks.filter((t) => done.includes(t.id)).length / tasks.length) * 100);

  return (
    <>
      <PageHeader title="Your study roadmap" subtitle={`Exam on ${new Date(plan.examDate + "T00:00:00").toDateString()} · ${Math.max(0, daysUntil(plan.examDate))} days to go · ${plan.hoursPerDay} h/day`}>
        <Button variant="secondary" onClick={() => setRedo(true)}><RotateCcw size={15} /> Retake diagnostic</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => {
          const b = plan.diagnostic[s];
          const gap = TARGET[s] - b;
          return (
            <Card key={s} className="p-4">
              <div className="text-sm capitalize text-muted">{s}</div>
              <div className="text-2xl font-bold">{b.toFixed(1)} <span className="text-sm font-normal text-muted">→ {TARGET[s].toFixed(1)}</span></div>
              <Badge tone={gap <= 0 ? "good" : gap >= 1 ? "bad" : "warn"} className="mt-1">{gap <= 0 ? `CLB ${bandToClb(s, b)} — maintain` : `${gap.toFixed(1)} band gap`}</Badge>
            </Card>
          );
        })}
      </div>
      {plan.weak.length > 0 && <p className="mb-4 text-sm">Priority order: <b className="capitalize">{plan.weak.join(" → ")}</b>. These skills appear 2–3× more often in your schedule.</p>}
      <p className="mb-6 text-sm text-muted">Phases: <b>Learn</b> (lessons, first 40%) → <b>Practise</b> (drills + two full mocks) → <b>Simulate</b> (timed sections, final 15%). {completion}% of tasks done.</p>

      <div className="space-y-6">
        {weeks.map((w, wi) => (
          <Card key={wi}>
            <h2 className="mb-3 font-semibold">Week {wi + 1}</h2>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {w.map((d) => (
                <div key={d} className={cn("rounded-xl border p-3", d === today() ? "border-accent bg-accent-soft" : "border-line")}>
                  <div className="mb-2 text-xs font-semibold text-muted">{new Date(d + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}{d === today() && " · Today"}</div>
                  <ul className="space-y-1.5">
                    {byDate.get(d)!.map((t) => {
                      const isDone = done.includes(t.id);
                      return (
                        <li key={t.id} className="flex items-start gap-2 text-sm">
                          <button onClick={() => setDone((x) => (isDone ? x.filter((y) => y !== t.id) : [...x, t.id]))} className={cn("mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border", isDone ? "border-good bg-good text-white" : "border-line")} aria-label="Toggle done">
                            {isDone && <Check size={11} />}
                          </button>
                          <Link href={t.href} className={cn("hover:text-accent", isDone && "text-muted line-through")}>{t.title}</Link>
                          <span className="ml-auto shrink-0 text-xs text-muted">{t.minutes}m</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

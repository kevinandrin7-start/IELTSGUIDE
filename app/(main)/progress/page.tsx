"use client";
import Link from "next/link";
import { Download, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge, Button, Card, PageHeader, Tabs } from "@/components/ui";
import { SKILLS, heatColor, qtypeAccuracy } from "@/lib/analytics";
import { TARGET, bandToClb } from "@/lib/scoring";
import { exportAll, resetAll, useAttempts, useErrors } from "@/lib/storage";
import type { Skill } from "@/lib/types";

export default function ProgressPage() {
  const [attempts] = useAttempts();
  const [errors, setErrors] = useErrors();
  const [skill, setSkill] = useState<Skill | "all">("all");
  const heat = useMemo(() => qtypeAccuracy(attempts), [attempts]);
  const mocks = attempts.filter((a) => a.kind === "mock").sort((a, b) => a.date - b.date);
  const errs = errors.filter((e) => skill === "all" || e.skill === skill);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    errs.forEach((e) => m.set(e.qtype, (m.get(e.qtype) ?? 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [errs]);
  const max = counts[0]?.[1] ?? 1;

  const download = () => {
    const blob = new Blob([exportAll()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `clb9-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <>
      <PageHeader title="Progress & error log" subtitle="Band history per skill, accuracy by question type, and every question you've missed.">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={download}><Download size={15} /> Export</Button>
          <Button variant="ghost" onClick={() => { if (confirm("Delete ALL progress on this device? This cannot be undone.")) resetAll(); }}><Trash2 size={15} /> Reset</Button>
        </div>
      </PageHeader>

      <Card className="mb-6">
        <h2 className="mb-4 font-semibold">Band history</h2>
        {mocks.length === 0 ? (
          <p className="text-sm text-muted">No mock results yet. <Link href="/mock" className="text-accent underline">Take a mock test</Link>.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {SKILLS.map((s) => {
              const pts = mocks.filter((a) => a.skill === s && a.band != null);
              const W = 300, H = 110, pad = 18;
              const x = (i: number) => pad + (pts.length <= 1 ? (W - 2 * pad) / 2 : (i * (W - 2 * pad)) / (pts.length - 1));
              const y = (b: number) => H - pad - ((b - 4) / 5) * (H - 2 * pad);
              return (
                <div key={s}>
                  <div className="mb-1 flex items-center justify-between text-sm"><span className="font-medium capitalize">{s}</span><span className="text-xs text-muted">target {TARGET[s].toFixed(1)}</span></div>
                  <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-lg bg-surface2" role="img" aria-label={`${s} band history`}>
                    <line x1={pad} x2={W - pad} y1={y(TARGET[s])} y2={y(TARGET[s])} stroke="var(--good)" strokeDasharray="4 4" />
                    <text x={W - pad} y={y(TARGET[s]) - 4} textAnchor="end" fontSize="9" fill="var(--good)">CLB 9</text>
                    {pts.length > 1 && <polyline fill="none" stroke="var(--accent)" strokeWidth="2" points={pts.map((p, i) => `${x(i)},${y(p.band!)}`).join(" ")} />}
                    {pts.map((p, i) => (
                      <g key={p.id}>
                        <circle cx={x(i)} cy={y(p.band!)} r="4" fill="var(--accent)" />
                        <text x={x(i)} y={y(p.band!) - 8} textAnchor="middle" fontSize="9" fill="var(--ink)">{p.band!.toFixed(1)}</text>
                      </g>
                    ))}
                    {pts.length === 0 && <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="10" fill="var(--muted)">No results yet</text>}
                  </svg>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">Accuracy by question type</h2>
          {heat.length === 0 && <p className="text-sm text-muted">Complete drills or tests to populate this.</p>}
          <ul className="space-y-2">
            {heat.map((h) => {
              const acc = h.correct / h.total;
              return (
                <li key={h.skill + h.label} className="text-sm">
                  <div className="flex justify-between"><span>{h.label} <span className="text-xs capitalize text-muted">· {h.skill}</span></span><span>{Math.round(acc * 100)}%</span></div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface2"><div className="h-full rounded-full" style={{ width: `${acc * 100}%`, background: heatColor(acc) }} /></div>
                </li>
              );
            })}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">Most-missed question types</h2>
          {counts.length === 0 && <p className="text-sm text-muted">No errors logged yet.</p>}
          <ul className="space-y-2">
            {counts.map(([k, n]) => (
              <li key={k} className="flex items-center gap-2 text-sm">
                <span className="w-44 shrink-0 truncate">{k}</span>
                <div className="h-4 flex-1 overflow-hidden rounded bg-surface2"><div className="h-full bg-bad/70" style={{ width: `${(n / max) * 100}%` }} /></div>
                <span className="w-6 text-right text-xs">{n}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Error log ({errs.length})</h2>
          <div className="flex items-center gap-2">
            <Tabs value={skill} onChange={setSkill} items={[{ value: "all", label: "All" }, ...SKILLS.map((s) => ({ value: s, label: <span className="capitalize">{s}</span> }))]} />
            {errors.length > 0 && <Button variant="ghost" onClick={() => confirm("Clear the error log?") && setErrors([])}>Clear</Button>}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="text-xs text-muted"><tr><th className="py-2">Date</th><th>Skill</th><th>Question type</th><th>Source</th><th>Note</th></tr></thead>
            <tbody>
              {errs.slice(0, 150).map((e) => (
                <tr key={e.id} className="border-t border-line">
                  <td className="py-2 pr-2 text-xs text-muted">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="capitalize">{e.skill}</td>
                  <td><Badge>{e.qtype}</Badge></td>
                  <td>{e.source}</td>
                  <td className="text-xs text-muted">{e.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6">
        <h2 className="mb-3 font-semibold">All attempts</h2>
        <ul className="divide-y divide-line text-sm">
          {[...attempts].reverse().slice(0, 40).map((a) => (
            <li key={a.id} className="flex flex-wrap items-center gap-2 py-2">
              <span className="w-24 text-xs text-muted">{new Date(a.date).toLocaleDateString()}</span>
              <Badge>{a.kind}</Badge>
              <span className="capitalize">{a.skill}</span>
              <span className="text-muted">{a.testId}</span>
              <span className="ml-auto">
                {a.raw != null && `${a.raw}/${a.total} `}
                {a.band != null && <b>Band {a.band.toFixed(1)} · CLB {bandToClb(a.skill, a.band)}</b>}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}

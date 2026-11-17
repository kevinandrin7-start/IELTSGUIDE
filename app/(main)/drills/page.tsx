"use client";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useState } from "react";
import { DRILLS } from "@/data/drills";
import { Badge, Card, PageHeader, Tabs } from "@/components/ui";
import { useAttempts } from "@/lib/storage";
import type { Skill } from "@/lib/types";

export default function DrillsPage() {
  const [skill, setSkill] = useState<Skill | "all">("all");
  const [qtype, setQtype] = useState("all");
  const [attempts] = useAttempts();
  const pool = DRILLS.filter((d) => skill === "all" || d.skill === skill);
  const types = [...new Set(pool.map((d) => d.qtype))];
  const list = pool.filter((d) => qtype === "all" || d.qtype === qtype);
  return (
    <>
      <PageHeader title="Micro-drills" subtitle="5–10 minute targeted practice, filterable by skill and question type. Results feed your weak-area heatmap." />
      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          value={skill}
          onChange={(v) => { setSkill(v); setQtype("all"); }}
          items={[{ value: "all", label: "All" }, ...(["listening", "reading", "writing", "speaking"] as const).map((s) => ({ value: s, label: <span className="capitalize">{s}</span> }))]}
        />
        <select value={qtype} onChange={(e) => setQtype(e.target.value)} className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" aria-label="Question type">
          <option value="all">All question types</option>
          {types.map((t) => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => {
          const best = attempts.filter((a) => a.testId === d.id && a.total).map((a) => a.raw! / a.total!);
          return (
            <Link key={d.id} href={`/drills/${d.id}`} className="group">
              <Card className="flex h-full flex-col transition group-hover:border-accent">
                <div className="mb-2 flex flex-wrap gap-1.5">
                  <Badge className="capitalize">{d.skill}</Badge>
                  <Badge tone="accent">{d.qtype}</Badge>
                  <Badge><Clock size={11} /> {d.minutes}m</Badge>
                </div>
                <h3 className="font-semibold group-hover:text-accent">{d.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted">{d.description}</p>
                {best.length > 0 && <div className="mt-3 text-xs text-muted">Best: {Math.round(Math.max(...best) * 100)}% · {best.length} attempt{best.length > 1 ? "s" : ""}</div>}
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

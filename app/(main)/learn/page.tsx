"use client";
import Link from "next/link";
import { CheckCircle2, Clock, Headphones, BookOpenText, PenLine, Mic, Target } from "lucide-react";
import { useState } from "react";
import { LESSONS } from "@/data/lessons";
import { Badge, Card, PageHeader, Progress, Tabs } from "@/components/ui";
import { useLessonsDone } from "@/lib/storage";
import type { Skill } from "@/lib/types";
import { TARGET } from "@/lib/scoring";

const ICON = { listening: Headphones, reading: BookOpenText, writing: PenLine, speaking: Mic };

export default function LearnPage() {
  const [skill, setSkill] = useState<Skill>("listening");
  const [done] = useLessonsDone();
  const list = LESSONS.filter((l) => l.skill === skill);
  const pct = (list.filter((l) => done.includes(l.id)).length / list.length) * 100;
  const Icon = ICON[skill];
  return (
    <>
      <PageHeader title="CLB 9 Playbook" subtitle="Bite-sized strategy lessons for each module, with the specific moves that take you from Band 6.5 to your CLB 9 targets." />
      <Tabs
        value={skill}
        onChange={setSkill}
        items={(["listening", "reading", "writing", "speaking"] as Skill[]).map((s) => ({ value: s, label: <span className="capitalize">{s}</span> }))}
      />
      <Card className="mt-5 flex flex-wrap items-center gap-4">
        <Icon className="text-accent" />
        <div className="flex-1">
          <div className="text-sm font-semibold capitalize">{skill} · target {TARGET[skill].toFixed(1)}</div>
          <Progress value={pct} className="mt-2" />
        </div>
        <span className="text-sm text-muted">{Math.round(pct)}% complete</span>
      </Card>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {list.map((l) => (
          <Link key={l.id} href={`/learn/${l.id}`} className="group">
            <Card className="h-full transition group-hover:border-accent">
              <div className="mb-2 flex items-center gap-2">
                {l.level === "clb9" && <Badge tone="accent"><Target size={12} /> CLB 9 jump</Badge>}
                <Badge><Clock size={12} /> {l.minutes} min</Badge>
                {done.includes(l.id) && <CheckCircle2 size={18} className="ml-auto text-good" />}
              </div>
              <h3 className="font-semibold group-hover:text-accent">{l.title}</h3>
              <p className="mt-1 text-sm text-muted">{l.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}

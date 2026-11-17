"use client";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Target } from "lucide-react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Badge, Button } from "@/components/ui";
import { LESSONS, getLesson } from "@/data/lessons";
import { DRILLS } from "@/data/drills";
import { markStudied, useLessonsDone } from "@/lib/storage";

export function LessonView({ id }: { id: string }) {
  const lesson = getLesson(id)!;
  const [done, setDone] = useLessonsDone();
  const siblings = LESSONS.filter((l) => l.skill === lesson.skill);
  const i = siblings.findIndex((l) => l.id === id);
  const prev = siblings[i - 1];
  const next = siblings[i + 1];
  const isDone = done.includes(id);
  const related = DRILLS.filter((d) => d.skill === lesson.skill).slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl">
      <Link href="/learn" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ArrowLeft size={15} /> Playbook</Link>
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <Badge className="capitalize">{lesson.skill}</Badge>
        <Badge><Clock size={12} /> {lesson.minutes} min</Badge>
        {lesson.level === "clb9" && <Badge tone="accent"><Target size={12} /> CLB 9 jump</Badge>}
      </div>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{lesson.title}</h1>
      <p className="mb-8 mt-2 text-muted">{lesson.summary}</p>

      <BlockRenderer blocks={lesson.blocks} />

      <div className="mt-10 rounded-2xl border border-line bg-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            variant={isDone ? "secondary" : "primary"}
            onClick={() => {
              if (!isDone) markStudied();
              setDone((d) => (isDone ? d.filter((x) => x !== id) : [...d, id]));
            }}
          >
            <Check size={16} /> {isDone ? "Completed" : "Mark as complete"}
          </Button>
          <div className="flex gap-2">
            {prev && <Link href={`/learn/${prev.id}`} className="inline-flex items-center gap-1 rounded-xl border border-line px-3 py-2 text-sm hover:bg-surface2"><ArrowLeft size={15} /> Previous</Link>}
            {next && <Link href={`/learn/${next.id}`} className="inline-flex items-center gap-1 rounded-xl border border-line px-3 py-2 text-sm hover:bg-surface2">Next <ArrowRight size={15} /></Link>}
          </div>
        </div>
        <div className="mt-4 border-t border-line pt-4">
          <div className="mb-2 text-sm font-semibold">Practise this now</div>
          <div className="flex flex-wrap gap-2">
            {related.map((d) => (
              <Link key={d.id} href={`/drills/${d.id}`} className="rounded-lg bg-surface2 px-3 py-1.5 text-sm hover:text-accent">{d.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

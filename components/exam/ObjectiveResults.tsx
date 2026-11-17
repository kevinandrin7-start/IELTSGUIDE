"use client";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";
import type { ListeningSection, ReadingSection } from "@/lib/types";
import { QTYPE_LABEL, gradeGroups } from "@/lib/grade";
import { TARGET, bandToClb, rawToBand } from "@/lib/scoring";
import { QuestionGroupView } from "../QuestionGroupView";
import { ReadingPassage } from "../ReadingPassage";
import { Badge, Card, LinkButton, Tabs, cn } from "../ui";

export function ObjectiveResults({
  skill,
  sections,
  answers,
  retakeHref,
}: {
  skill: "listening" | "reading";
  sections: (ListeningSection | ReadingSection)[];
  answers: Record<string, string>;
  retakeHref: string;
}) {
  const groups = sections.flatMap((s) => s.groups);
  const records = useMemo(() => gradeGroups(groups, answers), [groups, answers]);
  const raw = records.filter((r) => r.correct).length;
  const band = rawToBand(skill, raw);
  const clb = bandToClb(skill, band);
  const met = band >= TARGET[skill];
  const [part, setPart] = useState(0);
  const [filter, setFilter] = useState<"all" | "wrong">("wrong");

  const byType = useMemo(() => {
    const m = new Map<string, { c: number; t: number }>();
    records.forEach((r) => {
      const k = QTYPE_LABEL[r.qtype];
      const cur = m.get(k) ?? { c: 0, t: 0 };
      cur.t++;
      if (r.correct) cur.c++;
      m.set(k, cur);
    });
    return [...m.entries()];
  }, [records]);

  const sec = sections[part];
  const wrongIds = new Set(records.filter((r) => !r.correct).map((r) => r.qid));
  const visibleGroups = sec.groups.filter((g) => filter === "all" || g.questions.some((q) => wrongIds.has(q.id)));

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      <Card className={cn("border-2", met ? "border-good" : "border-warn")}>
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-sm text-muted capitalize">{skill} result</div>
            <div className="text-5xl font-bold">{band.toFixed(1)}</div>
          </div>
          <div className="space-y-1 text-sm">
            <div><b>{raw}/40</b> correct</div>
            <div>CLB {clb} · target band {TARGET[skill].toFixed(1)}</div>
            <Badge tone={met ? "good" : "warn"}>{met ? "CLB 9 level reached" : `${skill === "listening" ? 35 - raw : 34 - raw} more correct answers needed for CLB 9`}</Badge>
          </div>
          <div className="ml-auto flex gap-2">
            <LinkButton href={retakeHref} variant="secondary"><RotateCcw size={15} /> Retake</LinkButton>
            <LinkButton href="/progress">Error log</LinkButton>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map((s, i) => {
            const qs = s.groups.flatMap((g) => g.questions);
            const c = qs.filter((q) => !wrongIds.has(q.id)).length;
            return <div key={s.id} className="rounded-lg bg-surface2 p-3 text-sm"><div className="text-muted">{"part" in s ? `Part ${s.part}` : `Section ${i + 1}`}</div><b>{c}/{qs.length}</b></div>;
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {byType.map(([k, v]) => (
            <Badge key={k} tone={v.c / v.t >= 0.85 ? "good" : v.c / v.t >= 0.7 ? "warn" : "bad"}>{k}: {v.c}/{v.t}</Badge>
          ))}
        </div>
      </Card>

      <div className="flex flex-wrap items-center gap-3">
        <Tabs value={String(part)} onChange={(v) => setPart(Number(v))} items={sections.map((s, i) => ({ value: String(i), label: skill === "listening" ? `Part ${s.part}` : `Section ${i + 1}` }))} />
        <Tabs value={filter} onChange={setFilter} items={[{ value: "wrong", label: "Mistakes only" }, { value: "all", label: "All questions" }]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="lg:sticky lg:top-4 lg:max-h-[85vh] lg:overflow-y-auto scrollbar-thin">
          {skill === "reading" ? (
            <Card><ReadingPassage texts={(sec as ReadingSection).texts} /></Card>
          ) : (
            <Card>
              <div className="mb-2 font-semibold">Transcript — {(sec as ListeningSection).title}</div>
              <div className="space-y-1.5 text-sm">
                {(sec as ListeningSection).script.map((l, i) => <p key={i}><b className="text-muted">{l.speaker}:</b> {l.text}</p>)}
              </div>
            </Card>
          )}
        </div>
        <div className="space-y-4">
          {visibleGroups.length === 0 && <Card className="text-sm text-muted">No mistakes in this part. 🎯</Card>}
          {visibleGroups.map((g) => (
            <QuestionGroupView key={g.id} group={g} answers={answers} setAnswer={() => {}} review />
          ))}
          <Link href="/mock" className="block text-center text-sm text-muted hover:text-ink">Back to mock tests</Link>
        </div>
      </div>
    </div>
  );
}

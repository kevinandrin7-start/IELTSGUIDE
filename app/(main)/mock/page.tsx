"use client";
import Link from "next/link";
import { BookOpenText, Headphones, Mic, PenLine } from "lucide-react";
import { MOCKS } from "@/data/mocks";
import { Badge, Card, PageHeader } from "@/components/ui";
import { TARGET, bandToClb } from "@/lib/scoring";
import { useAttempts } from "@/lib/storage";
import type { Skill } from "@/lib/types";

const SKILLS: { skill: Skill; label: string; icon: typeof Headphones; time: string; detail: string }[] = [
  { skill: "listening", label: "Listening", icon: Headphones, time: "32 min", detail: "4 parts · 40 Qs" },
  { skill: "reading", label: "Reading", icon: BookOpenText, time: "60 min", detail: "3 sections · 40 Qs" },
  { skill: "writing", label: "Writing", icon: PenLine, time: "60 min", detail: "Letter + essay" },
  { skill: "speaking", label: "Speaking", icon: Mic, time: "11–14 min", detail: "3 parts · recorded" },
];

export default function MockPage() {
  const [attempts] = useAttempts();
  return (
    <>
      <PageHeader title="Mock tests" subtitle="Full-length, original IELTS General Training tests in the computer-delivered format. Take one skill at a time or all four in a row." />
      <div className="space-y-6">
        {MOCKS.map((m) => {
          const mine = attempts.filter((a) => a.testId === m.id && a.kind === "mock").sort((a, b) => b.date - a.date);
          return (
            <Card key={m.id}>
              <h2 className="text-xl font-semibold">{m.title}</h2>
              <p className="mt-1 max-w-3xl text-sm text-muted">{m.blurb}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SKILLS.map(({ skill, label, icon: Icon, time, detail }) => {
                  const last = mine.find((a) => a.skill === skill);
                  return (
                    <Link key={skill} href={`/exam/${m.id}/${skill}`} className="group rounded-xl border border-line p-4 transition hover:border-accent hover:bg-accent-soft">
                      <div className="flex items-center gap-2 font-semibold group-hover:text-accent"><Icon size={17} /> {label}</div>
                      <div className="mt-1 text-xs text-muted">{detail} · {time}</div>
                      <div className="mt-3">
                        {last?.band != null ? (
                          <Badge tone={last.band >= TARGET[skill] ? "good" : "warn"}>Last: {last.band.toFixed(1)}{last.raw != null && ` (${last.raw}/40)`} · CLB {bandToClb(skill, last.band)}</Badge>
                        ) : (
                          <Badge>Not attempted</Badge>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
              {mine.some((a) => a.answers) && (
                <div className="mt-4 border-t border-line pt-3">
                  <div className="mb-2 text-xs font-semibold uppercase text-muted">Review past attempts</div>
                  <div className="flex flex-wrap gap-2">
                    {mine.filter((a) => a.answers).slice(0, 8).map((a) => (
                      <Link key={a.id} href={`/exam/${m.id}/${a.skill}?review=${a.id}`} className="rounded-lg bg-surface2 px-3 py-1.5 text-xs hover:text-accent">
                        <span className="capitalize">{a.skill}</span> · {new Date(a.date).toLocaleDateString()} · {a.raw}/40
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-muted">All passages, recordings, prompts and model answers are original practice material written in the style of the official test. They are not official IELTS papers.</p>
    </>
  );
}

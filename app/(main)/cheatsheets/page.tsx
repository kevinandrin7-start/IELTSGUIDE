"use client";
import { CalendarCheck, Gauge, ListChecks, Repeat, Siren, Timer, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { Card, PageHeader, cn } from "@/components/ui";
import { CHEATSHEETS } from "@/data/cheatsheets";

const ICONS: Record<string, LucideIcon> = { Timer, Repeat, ListChecks, Siren, Gauge, CalendarCheck };

export default function CheatSheets() {
  const [id, setId] = useState(CHEATSHEETS[0].id);
  const sheet = CHEATSHEETS.find((c) => c.id === id)!;
  return (
    <>
      <PageHeader title="Exam shortcuts & cheat sheets" subtitle="Quick-reference vault: time splits, paraphrase tables, pitfalls, panic-button strategies and score conversions." />
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
          {CHEATSHEETS.map((c) => {
            const Icon = ICONS[c.icon] ?? ListChecks;
            return (
              <button
                key={c.id}
                onClick={() => setId(c.id)}
                className={cn("flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-medium", id === c.id ? "border-accent bg-accent-soft text-accent" : "border-line bg-surface hover:bg-surface2")}
              >
                <Icon size={16} /> {c.title}
              </button>
            );
          })}
        </nav>
        <Card>
          <h2 className="mb-4 text-xl font-semibold">{sheet.title}</h2>
          <BlockRenderer blocks={sheet.blocks} />
        </Card>
      </div>
    </>
  );
}

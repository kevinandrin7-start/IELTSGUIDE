"use client";
import { AlertTriangle, Check, Lightbulb, Target } from "lucide-react";
import { useState } from "react";
import type { Block } from "@/lib/types";
import { cn } from "./ui";

const ROW_COLORS: Record<string, string> = {
  teal: "bg-[var(--teal-soft)] border-l-[#0f766e]",
  rose: "bg-[var(--rose-soft)] border-l-[#f28b82]",
  green: "bg-[var(--green-soft)] border-l-[#7cc35a]",
  amber: "bg-[var(--amber-soft)] border-l-[#e0a526]",
  slate: "bg-[var(--slate-soft)] border-l-[#8b93a1]",
};

function Checklist({ groups }: { groups: { title: string; items: string[] }[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {groups.map((g) => (
        <div key={g.title} className="rounded-xl border border-line bg-surface p-4">
          <div className="mb-2 text-sm font-semibold">{g.title}</div>
          <ul className="space-y-1.5">
            {g.items.map((it) => {
              const k = g.title + it;
              return (
                <li key={k}>
                  <button onClick={() => setDone((d) => ({ ...d, [k]: !d[k] }))} className="flex w-full items-start gap-2 text-left text-sm">
                    <span className={cn("mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded border", done[k] ? "border-good bg-good text-white" : "border-line")}>
                      {done[k] && <Check size={12} />}
                    </span>
                    <span className={cn(done[k] && "text-muted line-through")}>{it}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-lesson space-y-5">
      {blocks.map((b, i) => {
        switch (b.kind) {
          case "p":
            return <p key={i} className="text-[15px]">{b.text}</p>;
          case "h":
            return <h3 key={i} className="pt-2 text-lg font-semibold">{b.text}</h3>;
          case "list": {
            const L = b.ordered ? "ol" : "ul";
            return (
              <L key={i} className={cn("space-y-1.5 pl-5 text-[15px]", b.ordered ? "list-decimal" : "list-disc")}>
                {b.items.map((it, j) => <li key={j}>{it}</li>)}
              </L>
            );
          }
          case "tip": {
            const tone = b.tone ?? "tip";
            const Icon = tone === "warn" ? AlertTriangle : tone === "clb9" ? Target : Lightbulb;
            const cls = tone === "warn" ? "border-warn/40 bg-warn-soft" : tone === "clb9" ? "border-accent/40 bg-accent-soft" : "border-line bg-surface2";
            return (
              <div key={i} className={cn("flex gap-3 rounded-xl border p-4", cls)}>
                <Icon size={18} className={cn("mt-0.5 shrink-0", tone === "warn" ? "text-warn" : "text-accent")} />
                <div className="text-sm">
                  {b.title && <div className="mb-0.5 font-semibold">{b.title}</div>}
                  {b.text}
                </div>
              </div>
            );
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-line scrollbar-thin">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="bg-surface2">
                    <tr>{b.head.map((h, j) => <th key={j} className="px-3 py-2 font-semibold">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-line align-top">
                        {r.map((c, k) => <td key={k} className={cn("px-3 py-2", k === 0 && "font-medium")}>{c}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "example":
            return (
              <figure key={i} className="rounded-xl border border-line bg-surface p-4">
                {b.title && <figcaption className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{b.title}</figcaption>}
                <pre className="whitespace-pre-wrap font-sans text-[14.5px] leading-relaxed">{b.text}</pre>
                {b.note && <p className="mt-3 border-t border-line pt-2 text-xs text-muted">{b.note}</p>}
              </figure>
            );
          case "blueprint":
            return (
              <div key={i} className="rounded-xl border border-line bg-surface p-4">
                <div className="mb-3 text-sm font-semibold">{b.title}</div>
                <div className="space-y-2">
                  {b.rows.map((r, j) => (
                    <div key={j} className={cn("rounded-lg border-l-4 p-3", ROW_COLORS[r.color] ?? ROW_COLORS.slate)}>
                      <div className="text-xs font-semibold uppercase tracking-wide">{r.label}</div>
                      <ul className="mt-1 flex flex-wrap gap-1.5">
                        {r.items.map((it, k) => (
                          <li key={k} className="rounded-md bg-surface/70 px-2 py-0.5 text-sm">{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "steps":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((s, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-accent-ink">{j + 1}</span>
                    <div>
                      <div className="font-medium">{s.title.replace(/^\d+\.\s*/, "")}</div>
                      <div className="text-sm text-muted">{s.text}</div>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "checklist":
            return <Checklist key={i} groups={b.groups} />;
          case "compare":
            return (
              <div key={i} className="grid gap-3 md:grid-cols-2">
                {[b.left, b.right].map((s, j) => (
                  <div key={j} className={cn("rounded-xl border p-4", j === 0 ? "border-line bg-surface2" : "border-accent/40 bg-accent-soft")}>
                    <div className="mb-1 text-sm font-semibold">{s.title}</div>
                    <p className="whitespace-pre-wrap text-sm">{s.text}</p>
                  </div>
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}

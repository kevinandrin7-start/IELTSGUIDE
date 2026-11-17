"use client";
import { Layers, RotateCcw, Volume2 } from "lucide-react";
import { useMemo, useState } from "react";
import { TOPICS, VOCAB } from "@/data/vocab";
import { Badge, Button, Card, PageHeader, Tabs, cn } from "@/components/ui";
import { isDue, label, review } from "@/lib/srs";
import { markStudied, useSrs } from "@/lib/storage";
import { speak } from "@/lib/tts";
import type { VocabCard } from "@/lib/types";

function Flashcards({ cards, onEmpty }: { cards: VocabCard[]; onEmpty: () => void }) {
  const [srs, setSrs] = useSrs();
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const queue = cards;
  const card = queue[idx];

  if (!card) {
    return (
      <Card className="text-center">
        <p className="text-lg font-semibold">All caught up 🎉</p>
        <p className="mt-1 text-sm text-muted">No cards due in this deck. Come back tomorrow or browse the list.</p>
        <Button variant="secondary" className="mt-4" onClick={onEmpty}>Browse words</Button>
      </Card>
    );
  }

  const grade = (g: 0 | 1 | 2 | 3) => {
    setSrs((s) => ({ ...s, [card.id]: review(s[card.id], g) }));
    markStudied();
    setFlipped(false);
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-2 flex justify-between text-xs text-muted"><span>{card.topic}</span><span>{idx + 1} / {queue.length}</span></div>
      <button
        onClick={() => setFlipped((f) => !f)}
        className="block min-h-72 w-full rounded-2xl border border-line bg-surface p-6 text-left shadow-sm transition hover:border-accent"
        aria-label="Flip card"
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-2xl font-semibold">{card.word}</div>
            <div className="text-sm italic text-muted">{card.pos}</div>
          </div>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); speak(card.word, { rate: 0.85 }); }}
            onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); speak(card.word); } }}
            className="rounded-lg p-2 text-muted hover:bg-surface2"
            aria-label="Pronounce"
          >
            <Volume2 size={18} />
          </span>
        </div>
        {!flipped ? (
          <p className="mt-16 text-center text-sm text-muted">Recall the meaning and a collocation, then tap to flip</p>
        ) : (
          <div className="mt-4 space-y-3 text-sm">
            <p className="text-base">{card.meaning}</p>
            <div className="flex flex-wrap gap-1.5">{card.collocations.map((c) => <Badge key={c} tone="accent">{c}</Badge>)}</div>
            <p className="italic">“{card.example}”</p>
            {card.band6 && <p className="text-xs text-muted">Upgrade from Band 6: <s>{card.band6}</s> → <b>{card.word}</b></p>}
          </div>
        )}
      </button>
      {flipped && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {([[0, "Again", "danger"], [1, "Hard", "secondary"], [2, "Good", "secondary"], [3, "Easy", "primary"]] as const).map(([g, l, v]) => (
            <Button key={l} variant={v} onClick={() => grade(g)} className="flex-col gap-0 py-2">
              <span>{l}</span>
              <span className="text-[10px] opacity-70">{label(g, srs[card.id])}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function VocabPage() {
  const [topic, setTopic] = useState<string>("All");
  const [mode, setMode] = useState<"study" | "browse">("study");
  const [srs, setSrs] = useSrs();
  const [session, setSession] = useState(0);
  const deck = useMemo(() => VOCAB.filter((v) => topic === "All" || v.topic === topic), [topic]);
  // freeze the due queue at session start so cards don't jump around while grading
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const due = useMemo(() => deck.filter((c) => isDue(srs[c.id])).slice(0, 20), [deck, session]);
  const learned = deck.filter((c) => (srs[c.id]?.reps ?? 0) >= 2).length;

  return (
    <>
      <PageHeader title="CLB 9 Lexical Bank" subtitle="Topic vocabulary with collocations, example sentences and pronunciation, scheduled with spaced repetition.">
        <div className="flex gap-2">
          <Badge tone="accent"><Layers size={12} /> {deck.filter((c) => isDue(srs[c.id])).length} due</Badge>
          <Badge tone="good">{learned}/{deck.length} learned</Badge>
        </div>
      </PageHeader>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Tabs value={mode} onChange={setMode} items={[{ value: "study", label: "Study" }, { value: "browse", label: "Browse" }]} />
        <select value={topic} onChange={(e) => { setTopic(e.target.value); setSession((s) => s + 1); }} className="rounded-xl border border-line bg-surface px-3 py-2 text-sm" aria-label="Topic">
          <option>All</option>
          {TOPICS.map((t) => <option key={t}>{t}</option>)}
        </select>
        {mode === "study" && <Button variant="ghost" onClick={() => setSession((s) => s + 1)}><RotateCcw size={15} /> New session</Button>}
      </div>

      {mode === "study" ? (
        <Flashcards key={`${topic}-${session}`} cards={due} onEmpty={() => setMode("browse")} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {deck.map((c) => (
            <Card key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-semibold">{c.word}</span> <span className="text-xs italic text-muted">{c.pos}</span>
                  {c.band6 && <span className="ml-2 text-xs text-muted">(≈ {c.band6})</span>}
                </div>
                <div className="flex items-center gap-1">
                  {srs[c.id] && <span className={cn("h-2 w-2 rounded-full", srs[c.id].reps >= 2 ? "bg-good" : "bg-warn")} />}
                  <button onClick={() => speak(c.word, { rate: 0.85 })} className="rounded p-1 text-muted hover:bg-surface2" aria-label={`Pronounce ${c.word}`}><Volume2 size={15} /></button>
                </div>
              </div>
              <p className="mt-1 text-sm">{c.meaning}</p>
              <p className="mt-1 text-xs text-muted">{c.collocations.join(" · ")}</p>
              <p className="mt-1 text-sm italic">“{c.example}”</p>
            </Card>
          ))}
          <div className="md:col-span-2">
            <Button variant="ghost" onClick={() => { if (confirm("Reset all flashcard progress?")) setSrs({}); }}>Reset flashcard progress</Button>
          </div>
        </div>
      )}
    </>
  );
}

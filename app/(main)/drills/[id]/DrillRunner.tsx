"use client";
import Link from "next/link";
import { ArrowLeft, Check, Mic, RotateCcw, Square, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getDrill } from "@/data/drills";
import { PracticePlayer } from "@/components/ListeningPlayer";
import { QuestionGroupView } from "@/components/QuestionGroupView";
import { ReadingPassage } from "@/components/ReadingPassage";
import { Badge, Button, Card, cn } from "@/components/ui";
import { gradeGroups, toErrorEntries } from "@/lib/grade";
import { useRecorder } from "@/lib/hooks";
import { fmtTime } from "@/lib/scoring";
import { addAttempt, addErrors, markStudied } from "@/lib/storage";
import { speak } from "@/lib/tts";
import type { Drill, Skill } from "@/lib/types";

export function DrillRunner({ id }: { id: string }) {
  const drill = getDrill(id)!;
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [round, setRound] = useState(0);

  const reset = () => { setAnswers({}); setChecked(false); setRound((r) => r + 1); };

  const check = () => {
    if (!drill.groups) return;
    const recs = gradeGroups(drill.groups, answers);
    const raw = recs.filter((r) => r.correct).length;
    addAttempt({ id: `${Date.now()}`, testId: drill.id, kind: "drill", skill: drill.skill, date: Date.now(), raw, total: recs.length, answers: recs });
    addErrors(toErrorEntries(recs, drill.skill, `Drill: ${drill.title}`));
    setChecked(true);
  };

  const score = checked && drill.groups ? gradeGroups(drill.groups, answers).filter((r) => r.correct).length : 0;
  const total = drill.groups?.reduce((a, g) => a + g.questions.length, 0) ?? 0;

  return (
    <div key={round}>
      <Link href="/drills" className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-ink"><ArrowLeft size={15} /> Drills</Link>
      <div className="mb-1 flex flex-wrap gap-1.5"><Badge className="capitalize">{drill.skill}</Badge><Badge tone="accent">{drill.qtype}</Badge></div>
      <h1 className="text-2xl font-semibold">{drill.title}</h1>
      <p className="mb-6 mt-1 text-muted">{drill.description}</p>

      {drill.groups && (
        <div className={cn("grid gap-6", drill.passage && "lg:grid-cols-2")}>
          {drill.passage && <Card className="lg:sticky lg:top-6 lg:max-h-[80vh] lg:overflow-y-auto scrollbar-thin"><ReadingPassage texts={[drill.passage]} /></Card>}
          <div className="space-y-4">
            {drill.listening && <PracticePlayer section={drill.listening} />}
            {drill.groups.map((g) => (
              <QuestionGroupView key={g.id} group={g} answers={answers} setAnswer={(q, v) => setAnswers((a) => ({ ...a, [q]: v }))} review={checked} />
            ))}
            <div className="flex items-center gap-3">
              {!checked ? <Button onClick={check}><Check size={16} /> Check answers</Button> : <Button variant="secondary" onClick={reset}><RotateCcw size={16} /> Try again</Button>}
              {checked && <Badge tone={score / total >= 0.85 ? "good" : "warn"}>{score}/{total} correct</Badge>}
            </div>
          </div>
        </div>
      )}

      {drill.classify && <Classify drillId={drill.id} skill={drill.skill} data={drill.classify} />}
      {drill.rewrite && <Rewrite data={drill.rewrite} />}
      {drill.speak && <Speak data={drill.speak} />}
    </div>
  );
}

function Classify({ drillId, skill, data }: { drillId: string; skill: Skill; data: NonNullable<Drill["classify"]> }) {
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const score = data.items.filter((it, i) => picks[i] === it.answer).length;
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{data.prompt}</p>
      {data.items.map((it, i) => (
        <Card key={i} className="p-4">
          <p className="mb-2">{it.text}</p>
          <div className="flex flex-wrap gap-2">
            {data.choices.map((c) => (
              <button
                key={c}
                disabled={checked}
                onClick={() => setPicks((p) => ({ ...p, [i]: c }))}
                className={cn(
                  "rounded-lg border px-3 py-1 text-sm capitalize",
                  picks[i] === c ? "border-accent bg-accent-soft" : "border-line",
                  checked && c === it.answer && "border-good bg-good-soft",
                  checked && picks[i] === c && c !== it.answer && "border-bad bg-bad-soft",
                )}
              >
                {c.replace("-", " ")}
              </button>
            ))}
          </div>
          {checked && <p className="mt-2 text-xs text-muted">{picks[i] === it.answer ? "✓ " : "✗ "}{it.why}</p>}
        </Card>
      ))}
      <div className="flex items-center gap-3">
        {!checked ? (
          <Button onClick={() => {
            setChecked(true);
            addAttempt({ id: `${Date.now()}`, testId: drillId, kind: "drill", skill, date: Date.now(), raw: score, total: data.items.length });
          }}><Check size={16} /> Check</Button>
        ) : (
          <Button variant="secondary" onClick={() => { setPicks({}); setChecked(false); }}><RotateCcw size={16} /> Again</Button>
        )}
        {checked && <Badge tone={score === data.items.length ? "good" : "warn"}>{score}/{data.items.length}</Badge>}
      </div>
    </div>
  );
}

function Rewrite({ data }: { data: NonNullable<Drill["rewrite"]> }) {
  const [vals, setVals] = useState<Record<number, string>>({});
  const [shown, setShown] = useState<Record<number, boolean>>({});
  useEffect(() => markStudied(), []);
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">{data.prompt}</p>
      {data.items.map((it, i) => (
        <Card key={i} className="space-y-2 p-4">
          <p className="text-sm"><Badge>Band 6</Badge> <span className="ml-1">{it.from}</span></p>
          <textarea rows={2} value={vals[i] ?? ""} onChange={(e) => setVals((v) => ({ ...v, [i]: e.target.value }))} className="w-full rounded-lg border border-line bg-surface p-2 text-sm" placeholder="Your Band 8 version…" />
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-muted">Hint: {it.hint}</span>
            <button className="ml-auto text-accent underline" onClick={() => setShown((s) => ({ ...s, [i]: !s[i] }))}>{shown[i] ? "Hide" : "Show"} model</button>
          </div>
          {shown[i] && <p className="rounded-lg bg-good-soft p-2 text-sm"><Badge tone="good">Band 8</Badge> <span className="ml-1">{it.model}</span></p>}
        </Card>
      ))}
    </div>
  );
}

function Speak({ data }: { data: NonNullable<Drill["speak"]> }) {
  const [qi, setQi] = useState(0);
  const [left, setLeft] = useState<number | null>(null);
  const [clips, setClips] = useState<{ q: string; url: string }[]>([]);
  const rec = useRecorder();
  const t = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCard = data.seconds >= 120;

  const stopNow = async () => {
    if (t.current) clearInterval(t.current);
    setLeft(null);
    const b = await rec.stop();
    if (b) setClips((c) => [...c, { q: data.questions[qi], url: URL.createObjectURL(b) }]);
    markStudied();
  };

  const begin = async () => {
    await rec.start();
    let l = data.seconds;
    setLeft(l);
    t.current = setInterval(() => {
      l -= 1;
      setLeft(l);
      if (l <= 0) stopNow();
    }, 1000);
  };

  useEffect(() => () => { if (t.current) clearInterval(t.current); }, []);

  return (
    <div className="space-y-4">
      <Card className="bg-accent-soft text-sm"><b>Formula:</b> {data.formula}</Card>
      <Card className="space-y-4 text-center">
        <div className="text-xs text-muted">{isCard ? "Cue card" : `Question ${qi + 1} of ${data.questions.length}`}</div>
        <div className="text-lg font-medium">{isCard ? data.prompt : data.questions[qi]}</div>
        <div className="flex flex-wrap justify-center gap-2">
          <Button variant="secondary" onClick={() => speak(isCard ? data.prompt : data.questions[qi])}><Volume2 size={16} /> Hear question</Button>
          {left == null ? (
            <Button onClick={begin}><Mic size={16} /> Record ({data.seconds}s)</Button>
          ) : (
            <Button variant="danger" onClick={stopNow}><Square size={14} /> Stop · {fmtTime(left)}</Button>
          )}
          {!isCard && <Button variant="ghost" disabled={qi >= data.questions.length - 1} onClick={() => setQi((q) => q + 1)}>Next question</Button>}
        </div>
        {rec.error && <p className="text-sm text-warn">{rec.error}</p>}
      </Card>
      {clips.length > 0 && (
        <Card>
          <div className="mb-2 text-sm font-semibold">Play back and check: did you use every step of the formula?</div>
          <div className="space-y-2">
            {clips.map((c, i) => (
              <div key={i} className="flex flex-wrap items-center gap-3 text-sm">
                <span className="min-w-0 flex-1 truncate">{c.q}</span>
                <audio controls src={c.url} className="h-8" />
                <button onClick={() => setClips((cl) => cl.filter((_, j) => j !== i))} aria-label="Delete recording"><X size={15} /></button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

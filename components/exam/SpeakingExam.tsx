"use client";
import { Mic, MicOff, SkipForward } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MockTest, SpeakingSet } from "@/lib/types";
import { SPEAKING_CRITERIA, buildSpeakingPrompt } from "@/lib/ai";
import { useRecorder } from "@/lib/hooks";
import { fmtTime } from "@/lib/scoring";
import { addAttempt, saveRecording } from "@/lib/storage";
import { loadVoices, speak, stopSpeech } from "@/lib/tts";
import { RubricAssessment } from "../RubricAssessment";
import { Badge, Button, Card, cn } from "../ui";
import { ExamHeader } from "./ExamChrome";

type Step =
  | { part: 1 | 3; kind: "q"; text: string; topic: string; seconds: number }
  | { part: 2; kind: "prep"; seconds: number }
  | { part: 2; kind: "talk"; seconds: number }
  | { part: 2; kind: "q"; text: string; topic: string; seconds: number };

function buildSteps(s: SpeakingSet): Step[] {
  const steps: Step[] = [];
  s.part1.forEach((t) => t.questions.forEach((q) => steps.push({ part: 1, kind: "q", text: q, topic: t.topic, seconds: 30 })));
  steps.push({ part: 2, kind: "prep", seconds: 60 });
  steps.push({ part: 2, kind: "talk", seconds: 120 });
  steps.push({ part: 2, kind: "q", text: s.part2.roundOff, topic: "Round-off", seconds: 20 });
  s.part3.forEach((t) => t.questions.forEach((q) => steps.push({ part: 3, kind: "q", text: q, topic: t.theme, seconds: 60 })));
  return steps;
}

export function SpeakingExam({ test, mode }: { test: MockTest; mode: "exam" | "practice" }) {
  const steps = useMemo(() => buildSteps(test.speaking), [test]);
  const [i, setI] = useState(-1); // -1 = intro
  const [left, setLeft] = useState(0);
  const [speaking, setSpeaking] = useState(false); // examiner talking
  const [notes, setNotes] = useState("");
  const [clips, setClips] = useState<{ part: number; url: string }[]>([]);
  const [done, setDone] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [saved, setSaved] = useState(false);
  const rec = useRecorder();
  const recPart = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[i];
  const card = test.speaking.part2;

  const finishClip = async () => {
    const blob = await rec.stop();
    if (blob && recPart.current != null) {
      const part = recPart.current;
      setClips((c) => [...c, { part, url: URL.createObjectURL(blob) }]);
      saveRecording(`${test.id}-speaking-p${part}-${Date.now()}`, blob).catch(() => {});
    }
    recPart.current = null;
  };

  const ensureRecording = async (part: number) => {
    if (recPart.current === part) return;
    if (recPart.current != null) await finishClip();
    const ok = await rec.start();
    if (ok) recPart.current = part;
  };

  const startTimer = (secs: number, onEnd: () => void) => {
    if (timer.current) clearInterval(timer.current);
    let l = secs;
    setLeft(l);
    timer.current = setInterval(() => {
      l -= 1;
      setLeft(l);
      if (l <= 0) {
        clearInterval(timer.current!);
        onEnd();
      }
    }, 1000);
  };

  const go = async (idx: number) => {
    stopSpeech();
    if (timer.current) clearInterval(timer.current);
    if (idx >= steps.length) {
      await finishClip();
      setDone(true);
      speak("Thank you. That is the end of the speaking test.", { gender: "female" });
      return;
    }
    setI(idx);
    const s = steps[idx];
    const auto = () => mode === "exam" && go(idx + 1);
    if (s.kind === "prep") {
      if (recPart.current != null) await finishClip();
      setSpeaking(true);
      speak(`Now I'm going to give you a topic, and I'd like you to talk about it for one to two minutes. You have one minute to think about what you are going to say. ${card.cue}`, {
        gender: "female",
        onEnd: () => { setSpeaking(false); startTimer(s.seconds, () => go(idx + 1)); },
      });
      return;
    }
    if (s.kind === "talk") {
      await ensureRecording(2);
      setSpeaking(true);
      speak("Please start speaking now.", { gender: "female", onEnd: () => { setSpeaking(false); startTimer(s.seconds, () => go(idx + 1)); } });
      return;
    }
    await ensureRecording(s.part);
    setSpeaking(true);
    speak(s.text, { gender: "female", onEnd: () => { setSpeaking(false); startTimer(s.seconds, auto); } });
  };

  useEffect(() => () => { stopSpeech(); if (timer.current) clearInterval(timer.current); }, []);

  if (done) {
    return (
      <div className="exam-ui min-h-dvh bg-bg">
        <ExamHeader title={`${test.title} · Speaking · Review`} mode={mode} />
        <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
          <Card>
            <h2 className="mb-3 font-semibold">Your recordings</h2>
            {clips.length === 0 && <p className="text-sm text-muted">No recordings (microphone not available). You can still self-assess below.</p>}
            <div className="grid gap-3 sm:grid-cols-3">
              {clips.map((c, k) => (
                <div key={k} className="rounded-lg bg-surface2 p-3">
                  <div className="mb-1 text-sm font-medium">Part {c.part}</div>
                  <audio controls src={c.url} className="w-full" />
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">Recordings are stored only on this device (IndexedDB).</p>
          </Card>
          <Card className="bg-accent-soft">
            <h2 className="mb-2 font-semibold">Band 8 model — Part 2: {card.cue}</h2>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{test.speaking.modelPart2}</pre>
          </Card>
          <Card>
            <h2 className="mb-2 font-semibold">Transcript for AI feedback (optional)</h2>
            <p className="mb-2 text-sm text-muted">Listen back and type (or paste from your phone&apos;s dictation) what you said in Part 2 or 3. The AI examiner prompt uses this text.</p>
            <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={6} className="w-full rounded-lg border border-line bg-surface p-3 text-sm" />
          </Card>
          <RubricAssessment
            kind="speaking"
            criteria={SPEAKING_CRITERIA}
            aiPrompt={buildSpeakingPrompt(transcript || "(no transcript provided)", "Part 2 long turn and Part 3 discussion")}
            saved={saved}
            onSave={(scores, band) => {
              addAttempt({ id: `${Date.now()}`, testId: test.id, kind: "mock", skill: "speaking", date: Date.now(), band, criteria: scores });
              setSaved(true);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="exam-ui flex min-h-dvh flex-col bg-bg">
      <ExamHeader
        title={`${test.title} · Speaking`}
        mode={mode}
        timeLeft={step ? left : null}
        extra={rec.recording ? <Badge tone="bad" className="animate-pulse"><Mic size={12} /> REC</Badge> : undefined}
      />
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-8">
        {i === -1 ? (
          <Card className="space-y-4">
            <h1 className="text-xl font-semibold">Speaking simulator</h1>
            <ul className="list-disc space-y-1 pl-5 text-sm">
              <li><b>Part 1</b> ({test.speaking.part1.reduce((a, t) => a + t.questions.length, 0)} questions): the examiner reads each question; you have 30 seconds to answer.</li>
              <li><b>Part 2</b>: cue card, 1 minute to prepare (notes allowed), then speak for up to 2 minutes.</li>
              <li><b>Part 3</b>: discussion questions, about 60 seconds each.</li>
              <li>Each part is recorded so you can play it back and score yourself.</li>
            </ul>
            {mode === "practice" && <p className="text-sm text-muted">Practice mode: Part 1 and 3 timers don&apos;t move on automatically — press Next when you finish.</p>}
            {rec.error && <p className="text-sm text-warn">{rec.error}</p>}
            <Button onClick={async () => { await loadVoices(); go(0); }}><Mic size={16} /> Start speaking test</Button>
          </Card>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Badge tone="accent">Part {step.part}</Badge>
              {"topic" in step && step.topic && <span>{step.topic}</span>}
              <span className="ml-auto">{i + 1}/{steps.length}</span>
            </div>

            {(step.kind === "prep" || step.kind === "talk") && (
              <Card className="border-2 border-ink/20">
                <div className="text-lg font-semibold">{card.cue}</div>
                <div className="mt-2 text-sm">You should say:</div>
                <ul className="list-disc pl-6 text-sm">{card.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="mt-1 text-sm">{card.finalLine}</div>
              </Card>
            )}
            {step.kind === "prep" && (
              <div>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">Notes — try the PPF grid: Past · Present · Future</span>
                  <span className="font-mono">{speaking ? "…" : fmtTime(left)}</span>
                </div>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} className="w-full rounded-lg border border-line bg-surface p-3 text-sm" placeholder={"PAST:\nPRESENT:\nFUTURE:"} />
              </div>
            )}
            {step.kind === "talk" && notes && (
              <pre className="whitespace-pre-wrap rounded-lg bg-surface2 p-3 font-sans text-sm">{notes}</pre>
            )}
            {step.kind === "q" && (
              <Card className="text-center">
                <div className={cn("text-xl font-medium", speaking && "text-accent")}>{step.text}</div>
              </Card>
            )}

            <div className="flex flex-col items-center gap-3">
              <div className={cn("text-5xl font-bold tabular-nums", left <= 10 && !speaking && step.kind !== "prep" ? "text-bad" : "")}>{speaking ? "…" : fmtTime(left)}</div>
              <div className="text-sm text-muted">
                {speaking ? "Examiner speaking…" : step.kind === "prep" ? "Preparation time" : "Your answer"}
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => go(i + 1)}><SkipForward size={16} /> {step.kind === "prep" ? "Start speaking now" : "Next"}</Button>
                {!rec.recording && step.kind !== "prep" && <Badge tone="warn"><MicOff size={12} /> not recording</Badge>}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

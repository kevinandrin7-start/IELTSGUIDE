"use client";
import { Eye, EyeOff, Pause, Play, Square, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ListeningSection } from "@/lib/types";
import { createScriptPlayer, loadVoices, speak, stopSpeech, ttsSupported, type ScriptPlayer } from "@/lib/tts";
import { Button, cn } from "./ui";

/**
 * PRACTICE player: pause, speed, transcript sync, click-to-seek.
 */
export function PracticePlayer({ section, defaultTranscript = false }: { section: ListeningSection; defaultTranscript?: boolean }) {
  const [line, setLine] = useState(-1);
  const [state, setState] = useState<"stopped" | "playing" | "paused">("stopped");
  const [rate, setRate] = useState(1);
  const [show, setShow] = useState(defaultTranscript);
  const player = useRef<ScriptPlayer | null>(null);
  const supported = typeof window === "undefined" ? true : ttsSupported();

  useEffect(() => {
    player.current = createScriptPlayer(section.script, section.speakers, { onLine: setLine, onDone: () => setState("stopped") }, rate);
    return () => player.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [section]);

  useEffect(() => player.current?.setRate(rate), [rate]);

  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <div className="flex flex-wrap items-center gap-2">
        {state === "playing" ? (
          <Button variant="secondary" onClick={() => { player.current?.pause(); setState("paused"); }}><Pause size={16} /> Pause</Button>
        ) : (
          <Button onClick={() => { if (state === "paused") player.current?.resume(); else player.current?.play(); setState("playing"); }}>
            <Play size={16} /> {state === "paused" ? "Resume" : "Play"}
          </Button>
        )}
        <Button variant="ghost" onClick={() => { player.current?.stop(); setState("stopped"); setLine(-1); }}><Square size={15} /> Stop</Button>
        <label className="ml-auto flex items-center gap-2 text-sm text-muted">
          Speed
          <select value={rate} onChange={(e) => setRate(Number(e.target.value))} className="rounded-md border border-line bg-surface px-2 py-1 text-ink">
            {[0.75, 0.9, 1, 1.1, 1.25, 1.5].map((r) => <option key={r} value={r}>{r}×</option>)}
          </select>
        </label>
        <Button variant="ghost" onClick={() => setShow((s) => !s)}>{show ? <EyeOff size={15} /> : <Eye size={15} />} Transcript</Button>
      </div>
      {!supported && <p className="mt-2 text-sm text-warn">Your browser has no speech engine — use the transcript instead.</p>}
      <p className="mt-3 text-sm text-muted">{section.context}</p>
      {show && (
        <ol className="mt-3 max-h-72 space-y-1 overflow-y-auto rounded-lg bg-surface2 p-3 text-sm scrollbar-thin">
          {section.script.map((l, i) => (
            <li key={i}>
              <button
                onClick={() => { player.current?.seek(i); setLine(i); }}
                className={cn("w-full rounded px-2 py-1 text-left transition", i === line ? "bg-accent-soft text-ink" : "hover:bg-surface")}
              >
                <b className="mr-1.5 text-muted">{l.speaker}:</b>{l.text}
              </button>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

/**
 * EXAM player: plays every section once, in order, with reading time before
 * each part and no pause button — just like test day.
 */
export function ExamPlayer({
  sections,
  prepSeconds = 30,
  onPartChange,
  onFinished,
}: {
  sections: ListeningSection[];
  prepSeconds?: number;
  onPartChange?: (i: number) => void;
  onFinished: () => void;
}) {
  const [phase, setPhase] = useState<"idle" | "intro" | "prep" | "audio" | "done">("idle");
  const [part, setPart] = useState(0);
  const [prepLeft, setPrepLeft] = useState(prepSeconds);
  const [line, setLine] = useState(0);
  const [fallback, setFallback] = useState(false);
  const player = useRef<ScriptPlayer | null>(null);
  const cancelled = useRef(false);

  useEffect(() => () => { cancelled.current = true; player.current?.stop(); stopSpeech(); }, []);

  const runPart = (i: number) => {
    if (cancelled.current) return;
    if (i >= sections.length) {
      setPhase("done");
      onFinished();
      return;
    }
    setPart(i);
    onPartChange?.(i);
    setPhase("intro");
    const s = sections[i];
    speak(`Part ${s.part}. ${s.context}`, {
      gender: "male",
      onEnd: () => {
        if (cancelled.current) return;
        setPhase("prep");
        let left = prepSeconds;
        setPrepLeft(left);
        const t = setInterval(() => {
          left -= 1;
          setPrepLeft(left);
          if (left <= 0) {
            clearInterval(t);
            if (cancelled.current) return;
            setPhase("audio");
            setLine(0);
            player.current = createScriptPlayer(s.script, s.speakers, {
              onLine: setLine,
              onDone: () => {
                speak(`That is the end of Part ${s.part}.`, { gender: "male", onEnd: () => setTimeout(() => runPart(i + 1), 1500) });
              },
            });
            player.current.play();
          }
        }, 1000);
      },
    });
  };

  const start = async () => {
    await loadVoices();
    runPart(0);
  };

  const s = sections[part];
  const pct = phase === "audio" ? Math.round(((line + 1) / s.script.length) * 100) : phase === "done" ? 100 : 0;

  return (
    <div className="rounded-lg border border-line bg-surface p-3 text-sm">
      {phase === "idle" ? (
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={start}><Volume2 size={16} /> Start audio</Button>
          <span className="text-muted">The recording plays once. You cannot pause it. Check your volume first.</span>
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <Volume2 size={16} className={cn(phase === "audio" && "animate-pulse text-accent")} />
          <span className="font-semibold">Part {s.part}</span>
          <span className="text-muted">
            {phase === "intro" && "Introduction…"}
            {phase === "prep" && `Reading time: ${prepLeft}s — look at the questions`}
            {phase === "audio" && "Recording playing"}
            {phase === "done" && "Recording finished — check your answers"}
          </span>
          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface2"><div className="h-full bg-accent" style={{ width: `${pct}%` }} /></div>
          <button className="ml-auto text-xs text-muted underline" onClick={() => setFallback((f) => !f)}>Audio not working?</button>
        </div>
      )}
      {fallback && (
        <div className="mt-3 max-h-48 overflow-y-auto rounded bg-surface2 p-2 text-xs scrollbar-thin">
          <p className="mb-1 font-semibold text-warn">Transcript fallback (use only if your device has no speech engine)</p>
          {s.script.map((l, i) => <p key={i} className={cn(i === line && phase === "audio" && "bg-accent-soft")}><b>{l.speaker}:</b> {l.text}</p>)}
        </div>
      )}
    </div>
  );
}

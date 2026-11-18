"use client";
import { Copy, KeyRound, Save, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account";
import { type AiGrade, type Criterion, getUserApiKey, gradeWithAI, setUserApiKey } from "@/lib/ai";
import { overallBand } from "@/lib/scoring";
import { Badge, Button, cn } from "./ui";

export function RubricAssessment({
  criteria,
  aiPrompt,
  kind,
  onSave,
  saved,
}: {
  criteria: Criterion[];
  aiPrompt: string;
  kind: "writing" | "speaking";
  onSave: (scores: Record<string, number>, band: number) => void;
  saved?: boolean;
}) {
  const [scores, setScores] = useState<Record<string, number>>(() => Object.fromEntries(criteria.map((c) => [c.key, 6.5])));
  const [copied, setCopied] = useState(false);
  const [ai, setAi] = useState<AiGrade | null>(null);
  const [aiErr, setAiErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [hasKey, setHasKey] = useState(false);
  const acct = useAccount();
  useEffect(() => setHasKey(!!getUserApiKey()), []);
  const overall = overallBand(Object.values(scores));

  const runAI = async () => {
    setLoading(true);
    setAiErr(null);
    const res = await gradeWithAI(kind, aiPrompt);
    setLoading(false);
    if ("error" in res) setAiErr(res.error);
    else {
      setAi(res);
      setScores((s) => {
        const next = { ...s };
        res.criteria.forEach((c) => {
          const key = c.key === "TR" || c.key === "TA" ? criteria[0].key : c.key;
          if (key in next) next[key] = c.band;
        });
        return next;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {criteria.map((c) => {
          const val = scores[c.key];
          const desc = [...c.bands].reverse().find((b) => val >= b.band) ?? c.bands[0];
          return (
            <div key={c.key} className="rounded-xl border border-line bg-surface p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">{c.name}</span>
                <Badge tone={val >= 7 ? "good" : "warn"}>{val.toFixed(1)}</Badge>
              </div>
              <input
                type="range"
                min={4}
                max={9}
                step={0.5}
                value={val}
                onChange={(e) => setScores((s) => ({ ...s, [c.key]: Number(e.target.value) }))}
                className="mt-3 w-full accent-[var(--accent)]"
                aria-label={c.name}
              />
              <p className="mt-2 text-xs text-muted"><b>Band {desc.band}:</b> {desc.text}</p>
              {val < 7 && (
                <ul className="mt-2 list-disc space-y-0.5 pl-4 text-xs">
                  {c.upgrade.map((u) => <li key={u}>{u}</li>)}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-surface2 p-4">
        <div>
          <div className="text-xs text-muted">Estimated band</div>
          <div className={cn("text-3xl font-bold", overall >= 7 ? "text-good" : "text-warn")}>{overall.toFixed(1)}</div>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="secondary" onClick={() => { navigator.clipboard?.writeText(aiPrompt); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
            <Copy size={15} /> {copied ? "Copied" : "Copy AI examiner prompt"}
          </Button>
          <Button variant="secondary" onClick={runAI} disabled={loading}><Sparkles size={15} /> {loading ? "Grading…" : "Grade with AI"}</Button>
          <Button onClick={() => onSave(scores, overall)} disabled={saved}><Save size={15} /> {saved ? "Saved" : "Save score"}</Button>
        </div>
      </div>
      {aiErr && <p className="text-sm text-warn">{aiErr} You can also paste the copied prompt into any AI assistant.</p>}

      <details className="rounded-xl border border-line p-3 text-sm" open={!!aiErr && !hasKey}>
        <summary className="flex cursor-pointer items-center gap-2 font-medium"><KeyRound size={15} /> AI marking key {hasKey ? <Badge tone="good">saved on this device</Badge> : <span className="text-xs font-normal text-muted">(optional)</span>}</summary>
        <p className="mt-2 text-xs text-muted">
          {acct.user ? (
            <>{hasKey ? "Your key is saved to your account." : "A key you save here is stored in your account."} You can also manage it on your <Link href="/profile" className="text-accent underline">Profile</Link> page.</>
          ) : (
            <>Paste an Anthropic API key from console.anthropic.com to use “Grade with AI”. It is stored only in this browser and sent only to Anthropic.{acct.enabled && <> <Link href="/signup" className="text-accent underline">Create an account</Link> to keep it on every device.</>}</>
          )}{" "}
          Each grading uses a small amount of API credit.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <input type="password" autoComplete="off" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} placeholder={hasKey ? "••••••••  (replace key)" : "sk-ant-…"} className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-1.5" aria-label="Anthropic API key" />
          <Button variant="secondary" onClick={() => { setUserApiKey(keyInput.trim()); setHasKey(!!keyInput.trim()); setKeyInput(""); setAiErr(null); }} disabled={!keyInput.trim()}>Save key</Button>
          {hasKey && <Button variant="ghost" onClick={() => { setUserApiKey(""); setHasKey(false); }}>Remove</Button>}
        </div>
      </details>

      {ai && (
        <div className="space-y-3 rounded-xl border border-accent/40 bg-accent-soft p-4 text-sm">
          <div className="font-semibold">AI examiner feedback · overall {ai.overall.toFixed(1)}</div>
          <ul className="space-y-1">{ai.criteria.map((c) => <li key={c.key}><b>{c.key} {c.band}</b> — {c.comment}</li>)}</ul>
          {ai.improvements.length > 0 && (<><div className="font-semibold">Top improvements</div><ol className="list-decimal space-y-1 pl-5">{ai.improvements.map((i) => <li key={i}>{i}</li>)}</ol></>)}
          {ai.rewrites.length > 0 && (
            <>
              <div className="font-semibold">Band 7+ rewrites</div>
              {ai.rewrites.map((r, i) => (
                <div key={i} className="rounded-lg bg-surface p-2"><p className="text-bad line-through decoration-1">{r.original}</p><p className="text-good">{r.improved}</p></div>
              ))}
            </>
          )}
          {ai.errors.length > 0 && (<><div className="font-semibold">Errors</div><ul className="list-disc pl-5">{ai.errors.map((e, i) => <li key={i}>{e.error} → <b>{e.correction}</b></li>)}</ul></>)}
        </div>
      )}
    </div>
  );
}

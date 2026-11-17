import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

// Optional AI grading endpoint. Set ANTHROPIC_API_KEY in .env.local to enable.
// Without a key the app falls back to self-assessment + a copyable examiner prompt.

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["overall", "criteria", "improvements", "rewrites", "errors"],
  properties: {
    overall: { type: "number" },
    criteria: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["key", "band", "comment"],
        properties: { key: { type: "string" }, band: { type: "number" }, comment: { type: "string" } },
      },
    },
    improvements: { type: "array", items: { type: "string" } },
    rewrites: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["original", "improved"],
        properties: { original: { type: "string" }, improved: { type: "string" } },
      },
    },
    errors: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["error", "correction"],
        properties: { error: { type: "string" }, correction: { type: "string" } },
      },
    },
  },
} as const;

export async function POST(req: Request) {
  const hasCreds = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN;
  if (!hasCreds) {
    return NextResponse.json(
      { error: "AI grading is not configured. Add ANTHROPIC_API_KEY to .env.local and restart the server." },
      { status: 501 },
    );
  }
  const { prompt, kind } = (await req.json()) as { prompt?: string; kind?: string };
  if (!prompt || prompt.length > 30_000) {
    return NextResponse.json({ error: "Missing or oversized prompt." }, { status: 400 });
  }

  const client = new Anthropic();
  try {
    const params = {
      model: process.env.CLAUDE_MODEL || "claude-opus-5-5",
      max_tokens: 16000,
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: "medium", format: { type: "json_schema", schema: SCHEMA } },
      system:
        "You are a strict but fair IELTS examiner. Criterion keys must be TA or TR, CC, LR, GRA for writing and FC, LR, GRA, P for speaking. Bands are multiples of 0.5. Reply only with the JSON object.",
      messages: [{ role: "user", content: `${prompt}\n\n(kind: ${kind})` }],
    };
    // Cast: beta-only fields (fallbacks) may be newer than the installed SDK typings.
    const response = await client.beta.messages.create(params as unknown as Parameters<typeof client.beta.messages.create>[0]);
    const msg = response as Anthropic.Beta.BetaMessage;
    if (msg.stop_reason === "refusal") {
      return NextResponse.json({ error: "The model declined to grade this response." }, { status: 422 });
    }
    const text = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "Invalid API key." }, { status: 401 });
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: "Rate limited — try again in a minute." }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return NextResponse.json({ error: `API error ${err.status}: ${err.message}` }, { status: 502 });
    }
    return NextResponse.json({ error: "Could not parse AI response." }, { status: 500 });
  }
}

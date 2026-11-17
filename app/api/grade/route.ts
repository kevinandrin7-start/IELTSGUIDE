import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { DEFAULT_MODEL, runGrade } from "@/lib/aiGrade";

// Optional AI grading endpoint for server deployments. Set ANTHROPIC_API_KEY in .env.local to enable.
// Static builds (GitHub Pages) leave this route out and call the API from the browser instead.

export async function POST(req: Request) {
  const hasCreds = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN;
  if (!hasCreds) {
    return NextResponse.json(
      { error: "AI grading is not configured. Add ANTHROPIC_API_KEY to .env.local and restart the server, or add your own key below." },
      { status: 501 },
    );
  }
  const { prompt, kind } = (await req.json()) as { prompt?: string; kind?: string };
  const res = await runGrade(Anthropic, new Anthropic(), prompt ?? "", kind ?? "", process.env.CLAUDE_MODEL || DEFAULT_MODEL);
  if ("status" in res) return NextResponse.json({ error: res.error }, { status: res.status });
  return NextResponse.json(res);
}

import type Anthropic from "@anthropic-ai/sdk";
import type { AiGrade } from "./ai";

// Shared by the /api/grade route (server deployments) and the in-browser path
// (static hosting such as GitHub Pages, where the learner supplies their own key).

export const DEFAULT_MODEL = "claude-opus-5-5";

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

export type GradeResult = AiGrade | { error: string; status: number };

/** Sends one marking request and maps every failure to a readable error. */
export async function runGrade(
  AnthropicCtor: typeof Anthropic,
  client: Anthropic,
  prompt: string,
  kind: string,
  model = DEFAULT_MODEL,
): Promise<GradeResult> {
  if (!prompt || prompt.length > 30_000) return { error: "Missing or oversized prompt.", status: 400 };
  try {
    const params = {
      model,
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
    if (msg.stop_reason === "refusal") return { error: "The model declined to grade this response.", status: 422 };
    const text = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return JSON.parse(text) as AiGrade;
  } catch (err) {
    if (err instanceof AnthropicCtor.AuthenticationError) return { error: "Invalid API key.", status: 401 };
    if (err instanceof AnthropicCtor.RateLimitError) return { error: "Rate limited. Try again in a minute.", status: 429 };
    if (err instanceof AnthropicCtor.APIError) return { error: `API error ${err.status}: ${err.message}`, status: 502 };
    return { error: "Could not parse the AI response.", status: 500 };
  }
}

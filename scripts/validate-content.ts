// Validates mock test data: question numbering, answer keys, option references.
// Run: npx tsx scripts/validate-content.ts
import { MOCKS } from "../data/mocks";
import { DRILLS } from "../data/drills";
import { gradeGroups } from "../lib/grade";
import type { QuestionGroup } from "../lib/types";

let failures = 0;
const fail = (m: string) => { failures++; console.error("✗", m); };

function checkGroups(label: string, groups: QuestionGroup[], expectCount?: number) {
  const nums = groups.flatMap((g) => g.questions.map((q) => q.num));
  if (expectCount && nums.length !== expectCount) fail(`${label}: ${nums.length} questions, expected ${expectCount}`);
  nums.forEach((n, i) => { if (i && n !== nums[i - 1] + 1) fail(`${label}: numbering jumps ${nums[i - 1]} → ${n}`); });
  for (const g of groups) {
    for (const q of g.questions) {
      const keys = g.type === "mcq" ? g.questionOptions?.[q.id]?.map((o) => o.key) : g.options?.map((o) => o.key);
      if (["mcq", "matching", "headings", "map", "multi", "tfng", "ynng"].includes(g.type)) {
        if (!keys) fail(`${label} Q${q.num}: no options`);
        else q.answer.forEach((a) => { if (!keys.includes(a)) fail(`${label} Q${q.num}: answer ${a} not in options`); });
      }
    }
  }
  // Perfect answers must score 100%
  const perfect: Record<string, string> = {};
  for (const g of groups) {
    if (g.type === "multi") g.questions.forEach((q, i) => (perfect[q.id] = [...q.answer].sort()[i]));
    else g.questions.forEach((q) => (perfect[q.id] = q.answer[0]));
  }
  const recs = gradeGroups(groups, perfect);
  const wrong = recs.filter((r) => !r.correct);
  if (wrong.length) fail(`${label}: perfect answers marked wrong: ${wrong.map((w) => w.num).join(",")}`);
}

for (const m of MOCKS) {
  checkGroups(`${m.id} listening`, m.listening.flatMap((s) => s.groups), 40);
  checkGroups(`${m.id} reading`, m.reading.flatMap((s) => s.groups), 40);
  for (const s of m.listening) {
    const names = new Set(s.speakers.map((x) => x.name));
    s.script.forEach((l) => { if (!names.has(l.speaker)) fail(`${s.id}: unknown speaker ${l.speaker}`); });
  }
}
for (const d of DRILLS) if (d.groups) checkGroups(`drill ${d.id}`, d.groups);

console.log(failures ? `${failures} problem(s)` : "All content checks passed");
process.exit(failures ? 1 : 0);

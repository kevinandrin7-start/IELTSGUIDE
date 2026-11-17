import type { MockTest, QuestionGroup } from "@/lib/types";
import { test1 } from "./test1";
import { test2 } from "./test2";

export const MOCKS: MockTest[] = [test1, test2];

export function getMock(id: string) {
  return MOCKS.find((m) => m.id === id);
}

export function allGroups(sections: { groups: QuestionGroup[] }[]) {
  return sections.flatMap((s) => s.groups);
}

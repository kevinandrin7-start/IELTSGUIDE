import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MOCKS, getMock } from "@/data/mocks";
import { ExamRunner } from "./ExamRunner";

const SKILLS = ["listening", "reading", "writing", "speaking"] as const;

export function generateStaticParams() {
  return MOCKS.flatMap((m) => SKILLS.map((skill) => ({ id: m.id, skill })));
}

export default async function ExamPage({ params }: { params: Promise<{ id: string; skill: string }> }) {
  const { id, skill } = await params;
  if (!getMock(id) || !SKILLS.includes(skill as (typeof SKILLS)[number])) notFound();
  return (
    <Suspense>
      <ExamRunner id={id} skill={skill as (typeof SKILLS)[number]} />
    </Suspense>
  );
}

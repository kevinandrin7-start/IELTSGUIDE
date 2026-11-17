import { notFound } from "next/navigation";
import { LESSONS, getLesson } from "@/data/lessons";
import { LessonView } from "./LessonView";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  return <LessonView id={id} />;
}

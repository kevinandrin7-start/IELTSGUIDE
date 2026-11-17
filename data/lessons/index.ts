import type { Lesson, Skill } from "@/lib/types";
import { listeningLessons } from "./listening";
import { readingLessons } from "./reading";
import { speakingLessons } from "./speaking";
import { writingLessons } from "./writing";

export const LESSONS: Lesson[] = [...listeningLessons, ...readingLessons, ...writingLessons, ...speakingLessons];

export const lessonsFor = (s: Skill) => LESSONS.filter((l) => l.skill === s);
export const getLesson = (id: string) => LESSONS.find((l) => l.id === id);

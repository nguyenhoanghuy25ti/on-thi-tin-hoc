import { GRADE_10_CURRICULUM } from "./curriculum-g10";
import { GRADE_11_CURRICULUM } from "./curriculum-g11";
import { GRADE_12_CURRICULUM } from "./curriculum-g12";
import type { GradeCurriculum } from "./curriculum-types";

export type {
  CurriculumOrientation,
  LessonExample,
  LessonSection,
  LessonItem,
  ChapterItem,
  GradeCurriculum,
} from "./curriculum-types";

export const CURRICULUM: GradeCurriculum[] = [
  GRADE_10_CURRICULUM,
  GRADE_11_CURRICULUM,
  GRADE_12_CURRICULUM,
];

export const ALL_CHAPTERS = CURRICULUM.flatMap((g) =>
  g.chapters.map((c) => ({ ...c, grade: g.grade }))
);

export const ALL_LESSONS = ALL_CHAPTERS.flatMap((c) =>
  c.lessons.map((l) => ({
    ...l,
    grade: c.grade,
    chapterTitle: c.title,
    topicCode: c.topicCode,
    chapterOrientation: c.orientation,
  }))
);

export const TOTAL_LESSONS_COUNT = ALL_LESSONS.length;

export function getCurriculumByGrade(grade: number | string): GradeCurriculum {
  return CURRICULUM.find((g) => g.grade === Number(grade)) || CURRICULUM[0];
}

export function getLessonById(lessonId: string) {
  return ALL_LESSONS.find((l) => l.id === lessonId) || null;
}

export function getChapterByLessonId(lessonId: string) {
  return ALL_CHAPTERS.find((c) => c.lessons.some((l) => l.id === lessonId)) || null;
}

export function getNextLesson(lessonId: string) {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  return idx >= 0 && idx < ALL_LESSONS.length - 1 ? ALL_LESSONS[idx + 1] : null;
}

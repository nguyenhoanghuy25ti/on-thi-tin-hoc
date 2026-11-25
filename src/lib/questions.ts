import { G10_SETS } from "./questions-g10";
import { G11_SETS } from "./questions-g11";
import { G12_SETS } from "./questions-g12";
import { ALL_CHAPTERS } from "./curriculum";

export interface McqQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface TrueFalseStatement {
  text: string;
  answer: boolean;
}

export interface TrueFalseQuestion {
  id: string;
  prompt: string;
  statements: TrueFalseStatement[];
  explain: string;
}

export interface ShortQuestion {
  id: string;
  prompt: string;
  answers: string[];
  explain: string;
}

export interface PracticeSet {
  id: string;
  grade: number;
  chapterId: string;
  title: string;
  desc: string;
  mcq: McqQuestion[];
  truefalse: TrueFalseQuestion[];
  short: ShortQuestion[];
}

export type PracticeQuestionType = "mcq" | "truefalse" | "short";

export const QUESTION_TYPES: { key: PracticeQuestionType; label: string; full: string }[] = [
  { key: "mcq", label: "Trắc nghiệm nhiều lựa chọn", full: "Trắc nghiệm nhiều lựa chọn (A, B, C, D)" },
  { key: "truefalse", label: "Đúng / Sai", full: "Trắc nghiệm Đúng / Sai" },
  { key: "short", label: "Tự luận", full: "Câu hỏi Tự luận & Trả lời ngắn" },
];

export const LESSON_PRACTICE_SETS: PracticeSet[] = [...G10_SETS, ...G11_SETS, ...G12_SETS];

// Also support chapter-level aggregated sets (p10-1 .. p12-4) for links from chapter cards
export const CHAPTER_PRACTICE_SETS: PracticeSet[] = ALL_CHAPTERS.map((ch) => {
  const childSets = LESSON_PRACTICE_SETS.filter((s) => s.chapterId === ch.id);
  return {
    id: ch.practiceId,
    grade: ch.grade,
    chapterId: ch.id,
    title: `Tổng hợp chuyên đề: ${ch.title}`,
    desc: ch.desc,
    mcq: childSets.flatMap((s) => s.mcq),
    truefalse: childSets.flatMap((s) => s.truefalse),
    short: childSets.flatMap((s) => s.short),
  };
});

export const PRACTICE_SETS: PracticeSet[] = LESSON_PRACTICE_SETS;

export const TOTAL_QUESTIONS_COUNT = LESSON_PRACTICE_SETS.reduce(
  (sum, s) => sum + s.mcq.length + s.truefalse.length + s.short.length,
  0
);

export function getPracticeSetsByGrade(grade: number | string): PracticeSet[] {
  return LESSON_PRACTICE_SETS.filter((s) => s.grade === Number(grade));
}

export function getPracticeSetById(setId: string): PracticeSet | null {
  return (
    LESSON_PRACTICE_SETS.find((s) => s.id === setId) ||
    CHAPTER_PRACTICE_SETS.find((s) => s.id === setId) ||
    null
  );
}

export function normalizeAnswer(val: string): string {
  return String(val).toLowerCase().normalize("NFC").replace(/\s+/g, " ").trim();
}

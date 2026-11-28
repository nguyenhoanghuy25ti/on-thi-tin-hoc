export type CurriculumOrientation = "CHUNG" | "ICT" | "CS" | "ICT_CS";

export interface LessonExample {
  title: string;
  code?: string;
  language?: string;
  explanation: string;
  steps?: string[];
}

export interface LessonSection {
  title: string;
  content: string;
}

export interface LessonItem {
  id: string;
  title: string;
  minutes: number;
  orientation?: CurriculumOrientation;
  tags: string[];
  intro?: string;
  objectives: string[];
  bullets: string[];
  sections?: LessonSection[];
  example: LessonExample;
  examples?: LessonExample[];
  commonMistakes?: string[];
  note: string;
}

export interface ChapterItem {
  id: string;
  topicCode: string;
  orientation: CurriculumOrientation;
  title: string;
  desc: string;
  practiceId: string;
  lessons: LessonItem[];
}

export interface GradeCurriculum {
  grade: number;
  headline: string;
  summary: string;
  intro: string;
  sgk: string;
  chapters: ChapterItem[];
}

export type UserRole = "STUDENT" | "ADMIN";
export type Orientation = "CS" | "ICT";
export type SectionType = "COMMON" | "CS" | "ICT";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  orientationPreference?: Orientation;
}

export interface QuestionOption {
  id: "A" | "B" | "C" | "D";
  text: string;
}

export interface SubQuestionItem {
  id: "a" | "b" | "c" | "d";
  text: string;
  isTrue: boolean;
  explanation?: string;
}

export interface QuestionData {
  id: string;
  examId: string;
  part: number; // 1 or 2
  sectionType: SectionType; // COMMON | CS | ICT
  topicTag?: string;
  contentMarkdown: string;
  codeSnippet?: string | null;
  optionsJson?: string | null; // JSON string of QuestionOption[]
  correctOption?: string | null; // "A" | "B" | "C" | "D"
  subQuestionsJson?: string | null; // JSON string of SubQuestionItem[]
  explanation: string;
  orderIndex: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tag?: string;
}

export interface ExamSubmission {
  examId: string;
  selectedOrientation: Orientation;
  timeSpentSeconds: number;
  // Part 1 answers: { [questionId: string]: "A" | "B" | "C" | "D" }
  // Part 2 answers: { [questionId: string]: { a?: boolean; b?: boolean; c?: boolean; d?: boolean } }
  answers: {
    part1: Record<string, string>;
    part2: Record<string, Record<string, boolean>>;
  };
}

export interface QuestionScoreResult {
  questionId: string;
  orderIndex: number;
  part: number;
  sectionType: SectionType;
  topicTag?: string;
  contentMarkdown: string;
  codeSnippet?: string | null;
  options?: QuestionOption[];
  maxScore: number;
  earnedScore: number;
  userAnswer: any;
  correctAnswer: any;
  subResults?: {
    id: "a" | "b" | "c" | "d";
    text: string;
    userAnswer?: boolean;
    correctAnswer: boolean;
    isCorrect: boolean;
    explanation?: string;
  }[];
  explanation: string;
}

export interface ScoreBreakdown {
  part1Score: number;
  part2Score: number;
  totalScore: number;
  maxTotalScore: number;
  part1CorrectCount: number;
  part1TotalCount: number;
  part2Details: {
    questionId: string;
    subCorrectCount: number;
    score: number;
  }[];
  questionResults: QuestionScoreResult[];
}

import {
  Orientation,
  QuestionData,
  QuestionOption,
  SubQuestionItem,
  ScoreBreakdown,
  QuestionScoreResult,
} from "./types";

/**
 * Progressive scoring table for Part II according to Ministry of Education guidelines:
 * - 1 proposition correct: 0.1 point
 * - 2 propositions correct: 0.25 point
 * - 3 propositions correct: 0.5 point
 * - 4 propositions correct: 1.0 point
 * - 0 correct: 0.0 point
 */
export function calculatePart2QuestionScore(correctCount: number): number {
  switch (correctCount) {
    case 1:
      return 0.1;
    case 2:
      return 0.25;
    case 3:
      return 0.5;
    case 4:
      return 1.0;
    default:
      return 0.0;
  }
}

export function gradeExam(
  questions: QuestionData[],
  selectedOrientation: Orientation,
  answers: {
    part1: Record<string, string>;
    part2: Record<string, Record<string, boolean>>;
  }
): ScoreBreakdown {
  let part1Score = 0;
  let part1CorrectCount = 0;
  let part1TotalCount = 0;

  let part2Score = 0;
  const part2Details: ScoreBreakdown["part2Details"] = [];
  const questionResults: QuestionScoreResult[] = [];

  // Filter Part 2 questions to only include COMMON + student's selected branch
  const activeQuestions = questions.filter((q) => {
    if (q.part === 1) return true;
    if (q.part === 2) {
      return q.sectionType === "COMMON" || q.sectionType === selectedOrientation;
    }
    return false;
  });

  // Sort by orderIndex
  activeQuestions.sort((a, b) => a.orderIndex - b.orderIndex);

  for (const q of activeQuestions) {
    if (q.part === 1) {
      part1TotalCount++;
      const userChoice = answers.part1[q.id]?.toUpperCase();
      const isCorrect = userChoice && q.correctOption && userChoice === q.correctOption.toUpperCase();
      const earned = isCorrect ? 0.25 : 0;
      if (isCorrect) {
        part1CorrectCount++;
        part1Score += 0.25;
      }

      let options: QuestionOption[] = [];
      try {
        options = q.optionsJson ? JSON.parse(q.optionsJson) : [];
      } catch {
        options = [];
      }

      questionResults.push({
        questionId: q.id,
        orderIndex: q.orderIndex,
        part: 1,
        sectionType: q.sectionType,
        topicTag: q.topicTag || "Chung",
        contentMarkdown: q.contentMarkdown,
        codeSnippet: q.codeSnippet,
        options,
        maxScore: 0.25,
        earnedScore: earned,
        userAnswer: userChoice || null,
        correctAnswer: q.correctOption || null,
        explanation: q.explanation || "",
      });
    } else if (q.part === 2) {
      // Part 2 True/False cluster question
      let subItems: SubQuestionItem[] = [];
      try {
        subItems = q.subQuestionsJson ? JSON.parse(q.subQuestionsJson) : [];
      } catch (err) {
        subItems = [];
      }

      const userSubAnswers = answers.part2[q.id] || {};
      let correctSubCount = 0;

      const subResults = subItems.map((item) => {
        const userVal = userSubAnswers[item.id];
        const isMatched = typeof userVal === "boolean" && userVal === item.isTrue;
        if (isMatched) {
          correctSubCount++;
        }
        return {
          id: item.id,
          text: item.text,
          userAnswer: userVal,
          correctAnswer: item.isTrue,
          isCorrect: isMatched,
          explanation: item.explanation,
        };
      });

      const qScore = calculatePart2QuestionScore(correctSubCount);
      part2Score += qScore;

      part2Details.push({
        questionId: q.id,
        subCorrectCount: correctSubCount,
        score: qScore,
      });

      questionResults.push({
        questionId: q.id,
        orderIndex: q.orderIndex,
        part: 2,
        sectionType: q.sectionType,
        topicTag: q.topicTag || "Chung",
        contentMarkdown: q.contentMarkdown,
        codeSnippet: q.codeSnippet,
        maxScore: 1.0,
        earnedScore: qScore,
        userAnswer: userSubAnswers,
        correctAnswer: subItems.map((s) => ({ id: s.id, isTrue: s.isTrue })),
        subResults,
        explanation: q.explanation || "",
      });
    }
  }

  // Round scores to 2 decimals
  const roundedPart1 = Math.round(part1Score * 100) / 100;
  const roundedPart2 = Math.round(part2Score * 100) / 100;
  const totalScore = Math.round((roundedPart1 + roundedPart2) * 100) / 100;

  return {
    part1Score: roundedPart1,
    part2Score: roundedPart2,
    totalScore,
    maxTotalScore: 10.0,
    part1CorrectCount,
    part1TotalCount,
    part2Details,
    questionResults,
  };
}

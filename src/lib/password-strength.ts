export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  textColor: string;
}

/**
 * Evaluates password strength across length and character diversity criteria.
 */
export function evaluatePasswordStrength(pwd: string): PasswordStrength {
  if (!pwd) {
    return {
      score: 0,
      label: "",
      color: "bg-secondary",
      textColor: "text-muted-foreground",
    };
  }

  let score = 0;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;

  if (score <= 1) {
    return {
      score: 1,
      label: "Yếu (tối thiểu 6 ký tự)",
      color: "bg-rose-500",
      textColor: "text-rose-600 dark:text-rose-400",
    };
  }
  if (score === 2) {
    return {
      score: 2,
      label: "Trung bình",
      color: "bg-amber-500",
      textColor: "text-amber-600 dark:text-amber-400",
    };
  }
  if (score === 3) {
    return {
      score: 3,
      label: "Khá tốt",
      color: "bg-teal-500",
      textColor: "text-teal-600 dark:text-teal-400",
    };
  }
  return {
    score: 4,
    label: "Mạnh",
    color: "bg-emerald-500",
    textColor: "text-emerald-600 dark:text-emerald-400",
  };
}

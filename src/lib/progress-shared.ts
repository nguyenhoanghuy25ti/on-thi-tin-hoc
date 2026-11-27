export interface PracticeRecord {
  setId: string;
  type: string;
  title: string;
  grade: number;
  score: number;
  total: number;
  at: number;
}

export interface StudentProfile {
  studentName: string;
  track: "CS" | "ICT";
  targetScore: number;
  focusGrade: number;
}

export interface ProgressState {
  lessons: Record<string, boolean>;
  videos: Record<string, boolean>;
  practice: PracticeRecord[];
  profile: StudentProfile;
}

export const DEFAULT_PROFILE: StudentProfile = {
  studentName: "Bạn học sinh",
  track: "CS",
  targetScore: 8.5,
  focusGrade: 12,
};

export const DEFAULT_PROGRESS_STATE: ProgressState = {
  lessons: {},
  videos: {},
  practice: [],
  profile: DEFAULT_PROFILE,
};

function pickBooleanMap(input: unknown): Record<string, boolean> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const result: Record<string, boolean> = {};
  for (const [key, val] of Object.entries(input as Record<string, unknown>)) {
    if (val === true && typeof key === "string" && key.trim()) {
      result[key] = true;
    }
  }
  return result;
}

function pickPracticeList(input: unknown): PracticeRecord[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const valid: PracticeRecord[] = [];
  for (const item of input) {
    if (!item || typeof item !== "object") continue;
    const rec = item as Record<string, unknown>;
    if (typeof rec.setId !== "string" || typeof rec.type !== "string") continue;
    const at = typeof rec.at === "number" && Number.isFinite(rec.at) ? rec.at : Date.now();
    const dedupKey = `${rec.setId}:${rec.type}:${at}`;
    if (seen.has(dedupKey)) continue;
    seen.add(dedupKey);
    valid.push({
      setId: rec.setId,
      type: rec.type,
      title: typeof rec.title === "string" ? rec.title : rec.setId,
      grade: typeof rec.grade === "number" && [10, 11, 12].includes(rec.grade) ? rec.grade : 12,
      score: typeof rec.score === "number" && Number.isFinite(rec.score) ? rec.score : 0,
      total: typeof rec.total === "number" && Number.isFinite(rec.total) ? rec.total : 0,
      at,
    });
  }
  return valid.sort((a, b) => b.at - a.at).slice(0, 40);
}

export function normalizeProgressState(
  raw: unknown,
  profileOverrides?: Partial<StudentProfile>
): ProgressState {
  const obj = raw && typeof raw === "object" && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};
  const rawProfile =
    obj.profile && typeof obj.profile === "object" && !Array.isArray(obj.profile)
      ? (obj.profile as Record<string, unknown>)
      : {};

  const track =
    profileOverrides?.track ||
    (rawProfile.track === "ICT" ? "ICT" : rawProfile.track === "CS" ? "CS" : DEFAULT_PROFILE.track);

  const focusGradeRaw = profileOverrides?.focusGrade ?? rawProfile.focusGrade;
  const focusGrade =
    typeof focusGradeRaw === "number" && [10, 11, 12].includes(focusGradeRaw)
      ? focusGradeRaw
      : DEFAULT_PROFILE.focusGrade;

  const targetScoreRaw = profileOverrides?.targetScore ?? rawProfile.targetScore;
  const targetScore =
    typeof targetScoreRaw === "number" && [7.5, 8.5, 9.5].includes(targetScoreRaw)
      ? targetScoreRaw
      : DEFAULT_PROFILE.targetScore;

  const studentNameRaw =
    profileOverrides?.studentName ??
    (typeof rawProfile.studentName === "string" ? rawProfile.studentName : undefined);

  return {
    lessons: pickBooleanMap(obj.lessons),
    videos: pickBooleanMap(obj.videos),
    practice: pickPracticeList(obj.practice),
    profile: {
      studentName:
        studentNameRaw && studentNameRaw.trim() ? studentNameRaw.trim() : DEFAULT_PROFILE.studentName,
      track,
      targetScore,
      focusGrade,
    },
  };
}

export function mergeProgressStates(
  primary: ProgressState,
  secondary: ProgressState,
  profileOverrides?: Partial<StudentProfile>
): ProgressState {
  const lessons: Record<string, boolean> = { ...secondary.lessons, ...primary.lessons };
  const videos: Record<string, boolean> = { ...secondary.videos, ...primary.videos };
  const practice = pickPracticeList([...primary.practice, ...secondary.practice]);

  return normalizeProgressState(
    {
      lessons,
      videos,
      practice,
      profile: {
        ...secondary.profile,
        ...primary.profile,
      },
    },
    profileOverrides
  );
}

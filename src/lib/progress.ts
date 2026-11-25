"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "tinhoc-progress-v1";

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

const DEFAULT_PROFILE: StudentProfile = {
  studentName: "Bạn học sinh",
  track: "CS",
  targetScore: 8.5,
  focusGrade: 12,
};

const DEFAULT_STATE: ProgressState = {
  lessons: {},
  videos: {},
  practice: [],
  profile: DEFAULT_PROFILE,
};

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      lessons: parsed && typeof parsed.lessons === "object" && parsed.lessons ? parsed.lessons : {},
      videos: parsed && typeof parsed.videos === "object" && parsed.videos ? parsed.videos : {},
      practice: parsed && Array.isArray(parsed.practice) ? parsed.practice : [],
      profile:
        parsed && typeof parsed.profile === "object" && parsed.profile
          ? { ...DEFAULT_PROFILE, ...parsed.profile }
          : DEFAULT_PROFILE,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function writeProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event("tinhoc-progress"));
}

export function toggleLessonDone(lessonId: string): ProgressState {
  const current = readProgress();
  const nextLessons = { ...current.lessons };
  if (nextLessons[lessonId]) {
    delete nextLessons[lessonId];
  } else {
    nextLessons[lessonId] = true;
  }
  const next = { ...current, lessons: nextLessons };
  writeProgress(next);
  return next;
}

export function toggleVideoWatched(videoId: string): ProgressState {
  const current = readProgress();
  const nextVideos = { ...current.videos };
  if (nextVideos[videoId]) {
    delete nextVideos[videoId];
  } else {
    nextVideos[videoId] = true;
  }
  const next = { ...current, videos: nextVideos };
  writeProgress(next);
  return next;
}

export function markVideoWatched(videoId: string): ProgressState {
  const current = readProgress();
  if (current.videos[videoId]) return current;
  const next = { ...current, videos: { ...current.videos, [videoId]: true } };
  writeProgress(next);
  return next;
}

export function updateStudentProfile(patch: Partial<StudentProfile>): ProgressState {
  const current = readProgress();
  const next = {
    ...current,
    profile: { ...current.profile, ...patch },
  };
  writeProgress(next);
  return next;
}

export function recordPracticeResult(record: PracticeRecord): ProgressState {
  const current = readProgress();
  const next: ProgressState = {
    ...current,
    practice: [record, ...current.practice].slice(0, 40),
  };
  writeProgress(next);
  return next;
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);

  useEffect(() => {
    setState(readProgress());
    const sync = () => setState(readProgress());
    window.addEventListener("tinhoc-progress", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tinhoc-progress", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const isLessonDone = useCallback((id: string) => !!state.lessons[id], [state.lessons]);
  const isVideoWatched = useCallback((id: string) => !!state.videos[id], [state.videos]);
  const doneCount = Object.keys(state.lessons).length;
  const watchedVideosCount = Object.keys(state.videos).length;
  const averageScore = state.practice.length
    ? Math.round(
        state.practice.reduce(
          (acc, item) => acc + (item.total ? (item.score / item.total) * 100 : 0),
          0
        ) / state.practice.length
      )
    : 0;

  return {
    ...state,
    isLessonDone,
    isVideoWatched,
    doneCount,
    watchedVideosCount,
    averageScore,
  };
}

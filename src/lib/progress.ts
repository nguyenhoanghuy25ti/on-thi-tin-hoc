"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DEFAULT_PROFILE,
  DEFAULT_PROGRESS_STATE,
  PracticeRecord,
  ProgressState,
  StudentProfile,
  normalizeProgressState,
} from "./progress-shared";

export type { PracticeRecord, StudentProfile, ProgressState };

const GUEST_STORAGE_KEY = "tinhoc-progress-v1";
const userStorageKey = (userId: string) => `tinhoc-progress-user-${userId}`;

export type SyncStatus = "local" | "syncing" | "saved" | "error";

let activeUserId: string | null = null;
let syncStatus: SyncStatus = "local";
let syncTimer: ReturnType<typeof setTimeout> | null = null;

function notifyProgressChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("tinhoc-progress"));
}

function setSyncStatus(next: SyncStatus) {
  syncStatus = next;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("tinhoc-progress-sync"));
  }
}

function getActiveStorageKey(): string {
  return activeUserId ? userStorageKey(activeUserId) : GUEST_STORAGE_KEY;
}

export function readGuestProgress(): ProgressState {
  if (typeof window === "undefined") return DEFAULT_PROGRESS_STATE;
  try {
    const raw = window.localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS_STATE;
    return normalizeProgressState(JSON.parse(raw));
  } catch {
    return DEFAULT_PROGRESS_STATE;
  }
}

export function hasProgressData(state: ProgressState): boolean {
  return (
    Object.keys(state.lessons).length > 0 ||
    Object.keys(state.videos).length > 0 ||
    state.practice.length > 0
  );
}

export function readProgress(): ProgressState {
  if (typeof window === "undefined") return DEFAULT_PROGRESS_STATE;
  try {
    const raw = window.localStorage.getItem(getActiveStorageKey());
    if (!raw) return DEFAULT_PROGRESS_STATE;
    return normalizeProgressState(JSON.parse(raw));
  } catch {
    return DEFAULT_PROGRESS_STATE;
  }
}

async function pushProgressToCloud(state: ProgressState) {
  if (!activeUserId) {
    setSyncStatus("local");
    return;
  }
  setSyncStatus("syncing");
  try {
    const res = await fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: "replace", progress: state }),
    });
    if (!res.ok) {
      setSyncStatus("error");
      return;
    }
    setSyncStatus("saved");
  } catch {
    setSyncStatus("error");
  }
}

function scheduleCloudSync(state: ProgressState) {
  if (!activeUserId) {
    setSyncStatus("local");
    return;
  }
  setSyncStatus("syncing");
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    void pushProgressToCloud(state);
  }, 350);
}

function writeProgress(state: ProgressState, options?: { skipCloudSync?: boolean }) {
  if (typeof window === "undefined") return;
  const normalized = normalizeProgressState(state);
  window.localStorage.setItem(getActiveStorageKey(), JSON.stringify(normalized));
  notifyProgressChange();
  if (!options?.skipCloudSync) {
    scheduleCloudSync(normalized);
  }
}

export async function activateUserProgress(
  user: { id: string; name: string; orientationPreference?: "CS" | "ICT" },
  options?: { mergeGuest?: boolean }
) {
  if (typeof window === "undefined") return;
  activeUserId = user.id;

  const guestProgress = readGuestProgress();
  const shouldMergeGuest = !!options?.mergeGuest && hasProgressData(guestProgress);

  setSyncStatus("syncing");
  try {
    let cloudState: ProgressState | null = null;

    if (shouldMergeGuest) {
      const res = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "merge", progress: guestProgress }),
      });
      if (res.ok) {
        const data = await res.json();
        cloudState = normalizeProgressState(data.progress, {
          studentName: user.name,
          track: user.orientationPreference === "CS" ? "CS" : "ICT",
        });
        window.localStorage.removeItem(GUEST_STORAGE_KEY);
      }
    } else {
      const res = await fetch("/api/progress", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        cloudState = normalizeProgressState(data.progress, {
          studentName: user.name,
          track: user.orientationPreference === "CS" ? "CS" : "ICT",
        });
      }
    }

    if (cloudState) {
      writeProgress(cloudState, { skipCloudSync: true });
      setSyncStatus("saved");
      return;
    }

    // Fallback to existing cached user progress if cloud unavailable
    const existingLocal = readProgress();
    const fallback = normalizeProgressState(existingLocal, {
      studentName: user.name,
      track: user.orientationPreference === "CS" ? "CS" : DEFAULT_PROFILE.track,
    });
    writeProgress(fallback, { skipCloudSync: true });
    setSyncStatus("error");
  } catch {
    setSyncStatus("error");
  }
}

export function deactivateUserProgress() {
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
  activeUserId = null;
  setSyncStatus("local");
  notifyProgressChange();
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
  const [state, setState] = useState<ProgressState>(DEFAULT_PROGRESS_STATE);
  const [status, setStatus] = useState<SyncStatus>(syncStatus);

  useEffect(() => {
    setState(readProgress());
    setStatus(syncStatus);
    const sync = () => setState(readProgress());
    const onSyncStatus = () => setStatus(syncStatus);
    window.addEventListener("tinhoc-progress", sync);
    window.addEventListener("tinhoc-progress-sync", onSyncStatus);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tinhoc-progress", sync);
      window.removeEventListener("tinhoc-progress-sync", onSyncStatus);
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
    syncStatus: status,
  };
}

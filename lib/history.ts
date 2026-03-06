import type { HistoryEntry } from "@/types/research";

const HISTORY_KEY = "ask-the-hub-history";

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveToHistory(
  entry: Omit<HistoryEntry, "id" | "createdAt">
): HistoryEntry {
  const newEntry: HistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    createdAt: Date.now(),
  };
  const history = getHistory();
  const updated = [newEntry, ...history].slice(0, 50);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return newEntry;
}

export function toggleBookmark(id: string): HistoryEntry[] {
  const history = getHistory();
  const updated = history.map((h) =>
    h.id === id ? { ...h, bookmarked: !h.bookmarked } : h
  );
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteHistoryEntry(id: string): HistoryEntry[] {
  const history = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return history;
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

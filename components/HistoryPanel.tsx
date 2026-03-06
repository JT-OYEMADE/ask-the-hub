"use client";

import { useMemo, useState } from "react";
import { X, Star, Trash2 } from "lucide-react";
import type { HistoryEntry } from "@/types/research";
import { timeAgo } from "@/lib/time";
import {
  toggleBookmark,
  deleteHistoryEntry,
  clearHistory,
} from "@/lib/history";

const DEPTH_LABELS: Record<string, string> = {
  summary: "Summary",
  detailed: "Detailed",
  expert: "Expert",
};

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntry: (entry: HistoryEntry) => void;
  history: HistoryEntry[];
  onHistoryChange: () => void;
}

export function HistoryPanel({
  isOpen,
  onClose,
  onSelectEntry,
  history,
  onHistoryChange,
}: HistoryPanelProps) {
  const [activeTab, setActiveTab] = useState<"all" | "bookmarked">("all");

  const filtered = useMemo(() => {
    if (activeTab === "bookmarked") return history.filter((h) => h.bookmarked);
    return history;
  }, [history, activeTab]);

  const handleToggleBookmark = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    toggleBookmark(id);
    onHistoryChange();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteHistoryEntry(id);
    onHistoryChange();
  };

  const handleClearAll = () => {
    clearHistory();
    onHistoryChange();
  };

  const handleSelect = (entry: HistoryEntry) => {
    onSelectEntry(entry);
    onClose();
  };

  return (
    <>
      <div
        className={`history-overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
        aria-hidden
      />
      <div className={`history-panel ${isOpen ? "open" : ""}`}>
        <div className="history-header">
          <div className="history-header-top">
            <h2 className="history-title">Search History</h2>
            <button
              type="button"
              onClick={onClose}
              className="history-icon-btn"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
          <div className="history-tabs">
            <button
              type="button"
              className={`history-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`history-tab ${activeTab === "bookmarked" ? "active" : ""}`}
              onClick={() => setActiveTab("bookmarked")}
            >
              Bookmarked
            </button>
          </div>
        </div>
        <div className="history-body">
          {filtered.length === 0 ? (
            <div className="history-empty">
              <span className="history-empty-icon">📋</span>
              <p>
                {activeTab === "bookmarked"
                  ? "No bookmarked searches yet. Star any result to save it here."
                  : "No search history yet. Your recent searches will appear here."}
              </p>
            </div>
          ) : (
            filtered.map((entry) => (
              <div
                key={entry.id}
                className="history-card"
                onClick={() => handleSelect(entry)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(entry);
                  }
                }}
              >
                <div className="history-card-top">
                  <span className="history-card-query">{entry.query}</span>
                  <button
                    type="button"
                    className={`history-icon-btn ${entry.bookmarked ? "bookmarked" : ""}`}
                    onClick={(e) => handleToggleBookmark(e, entry.id)}
                    title={entry.bookmarked ? "Remove bookmark" : "Bookmark this"}
                    aria-label={entry.bookmarked ? "Remove bookmark" : "Bookmark"}
                  >
                    <Star
                      size={16}
                      fill={entry.bookmarked ? "#ffc832" : "none"}
                      color={entry.bookmarked ? "#ffc832" : "currentColor"}
                    />
                  </button>
                </div>
                <div className="history-card-bottom">
                  <span className="depth-pill">
                    {DEPTH_LABELS[entry.depth] ?? entry.depth}
                  </span>
                  <span className="history-card-time">
                    {timeAgo(entry.createdAt)}
                  </span>
                  <div className="history-card-actions">
                    <button
                      type="button"
                      className="history-icon-btn delete"
                      onClick={(e) => handleDelete(e, entry.id)}
                      aria-label="Delete entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="history-footer">
          {history.length > 0 && (
            <button
              type="button"
              className="clear-btn"
              onClick={handleClearAll}
            >
              Clear all history
            </button>
          )}
        </div>
      </div>
    </>
  );
}

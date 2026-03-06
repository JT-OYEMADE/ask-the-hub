"use client";

import { Clock } from "lucide-react";

interface HeaderProps {
  onOpenHistory?: () => void;
}

export function Header({ onOpenHistory }: HeaderProps) {
  return (
    <header className="relative z-10 max-w-[860px] mx-auto px-6 pt-9">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-[38px] h-[38px] rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#d4ff5c" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <span className="font-display font-extrabold text-lg tracking-tight text-text">
            Ask The{" "}
            <span style={{ color: "#d4ff5c" }}>Hub</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {onOpenHistory && (
            <button
              type="button"
              className="history-trigger"
              onClick={onOpenHistory}
              aria-label="Search history"
            >
              <Clock size={16} />
              <span>History</span>
            </button>
          )}
          <div
            className="text-[10px] uppercase tracking-wider text-muted px-3 py-1.5 rounded-full border"
            style={{
              background: "rgba(212,255,92,0.1)",
              borderColor: "rgba(212,255,92,0.2)",
            }}
          >
            Free · AI Powered
          </div>
        </div>
      </div>
    </header>
  );
}

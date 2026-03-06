"use client";

import { useState, useCallback } from "react";
import { MessageSquare } from "lucide-react";
import type { DepthMode } from "@/types/research";

interface SearchPanelProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit: (query: string, depth: DepthMode) => void;
  loading: boolean;
}

const DEPTH_OPTIONS: { value: DepthMode; label: string }[] = [
  { value: "summary", label: "Summary" },
  { value: "detailed", label: "Detailed" },
  { value: "expert", label: "Expert" },
];

export function SearchPanel({
  value = "",
  onChange,
  onSubmit,
  loading,
}: SearchPanelProps) {
  const [query, setQuery] = useState(value);
  const [depth, setDepth] = useState<DepthMode>("detailed");
  const isControlled = onChange !== undefined;
  const displayValue = isControlled ? value : query;
  const setDisplayValue = isControlled ? onChange! : setQuery;

  const handleSubmit = useCallback(() => {
    const trimmed = displayValue.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed, depth);
  }, [displayValue, depth, loading, onSubmit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="content-container relative z-10 max-w-[860px] mx-auto px-6">
      <div
        className="search-panel relative rounded-[20px] p-7 border"
        style={{
          background: "#111119",
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px rounded-t-[20px] opacity-40"
          style={{
            background: "linear-gradient(90deg, transparent, #d4ff5c, transparent)",
          }}
        />
        <textarea
          value={displayValue}
          onChange={(e) => setDisplayValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Renewable energy adoption in Nigeria, or AI regulation in the EU…"
          disabled={loading}
          className="search-textarea w-full font-sans text-base font-light leading-relaxed rounded-xl border min-h-[100px] p-[18px_20px] resize-none placeholder:text-muted focus:outline-none focus:ring-[3px] transition-colors disabled:opacity-50"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderColor: "rgba(255,255,255,0.06)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(212,255,92,0.3)";
            e.target.style.boxShadow = "0 0 0 3px rgba(212,255,92,0.05)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(255,255,255,0.06)";
            e.target.style.boxShadow = "none";
          }}
        />
        <div className="depth-row mt-5">
          <label className="depth-label block text-[10px] uppercase tracking-wider text-muted mb-2">
            Depth
          </label>
          <div className="depth-buttons flex flex-wrap gap-2">
            {DEPTH_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDepth(opt.value)}
                disabled={loading}
                className="depth-btn px-3.5 py-1.5 rounded-lg border text-sm transition-colors disabled:opacity-50 hover:border-[rgba(212,255,92,0.3)] hover:text-white"
                style={
                  depth === opt.value
                    ? {
                        background: "#d4ff5c",
                        borderColor: "rgba(255,255,255,0.06)",
                        color: "#000",
                      }
                    : {
                        background: "transparent",
                        borderColor: "rgba(255,255,255,0.06)",
                        color: "var(--muted)",
                      }
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!displayValue.trim() || loading}
          className="search-submit-btn w-full mt-6 flex items-center justify-center gap-2 rounded-xl py-4 font-display font-bold text-base text-black transition-all disabled:opacity-50 disabled:transform-none hover:-translate-y-px hover:shadow-lg"
          style={{
            background: "#d4ff5c",
            boxShadow: "none",
          }}
          onMouseEnter={(e) => {
            if (!displayValue.trim() || loading) return;
            e.currentTarget.style.background = "#e8ff80";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(212,255,92,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#d4ff5c";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <MessageSquare className="w-5 h-5" />
          Ask The Hub
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Copy, Star, Download } from "lucide-react";
import type { ResearchResult } from "@/types/research";
import { LoadingState } from "./LoadingState";
import { OverviewSection } from "./sections/OverviewSection";
import { StatsSection } from "./sections/StatsSection";
import { InsightsSection } from "./sections/InsightsSection";
import { TrendsSection } from "./sections/TrendsSection";
import { ChallengesSection } from "./sections/ChallengesSection";
import { ActionSection } from "./sections/ActionSection";
import { LinksSection } from "./sections/LinksSection";
import { downloadResultAsPDF } from "@/lib/download";

interface ResultDrawerProps {
  isOpen: boolean;
  isLoading: boolean;
  result: ResearchResult | null;
  query: string;
  onClose: () => void;
  onCopy: () => void;
  currentEntryBookmarked?: boolean;
  onToggleBookmark?: () => void;
  onDownloadStart?: () => void;
}

function ResultSections({ result }: { result: ResearchResult }) {
  return (
    <div className="flex flex-col gap-6">
      {result.overview && <OverviewSection overview={result.overview} />}
      {result.stats && result.stats.length > 0 && (
        <StatsSection stats={result.stats} />
      )}
      {result.insights && result.insights.length > 0 && (
        <InsightsSection insights={result.insights} />
      )}
      {result.trends && <TrendsSection trends={result.trends} />}
      {result.challenges && (
        <ChallengesSection challenges={result.challenges} />
      )}
      {result.action && <ActionSection action={result.action} />}
      {result.links && result.links.length > 0 && (
        <LinksSection links={result.links} />
      )}
    </div>
  );
}

export function ResultDrawer({
  isOpen,
  isLoading,
  result,
  query,
  onClose,
  onCopy,
  currentEntryBookmarked = false,
  onToggleBookmark,
  onDownloadStart,
}: ResultDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Delay visible state so CSS transition runs on open
  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }
    const t = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  const handleCopy = useCallback(() => {
    if (!result) return;
    const raw = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(raw).then(() => onCopy());
  }, [result, onCopy]);

  const handleDownload = useCallback(async () => {
    onDownloadStart?.();
    await downloadResultAsPDF(query);
  }, [query, onDownloadStart]);

  return (
    <div
      className="fixed inset-0 z-40"
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
      aria-hidden={!isOpen}
    >
      <div
        className={`drawer-overlay ${isVisible ? "visible" : ""}`}
        onClick={onClose}
        aria-hidden
      />
      <div className={`drawer ${isVisible ? "open" : ""}`}>
        <div className="drawer-handle" />
        <div className="drawer-header">
          <div className="drawer-header-left">
            <span className="drawer-eyebrow">Research Result</span>
            <h2 className="drawer-title">{query}</h2>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className="icon-btn"
              aria-label="Copy result"
            >
              <Copy size={15} />
            </button>
            {onToggleBookmark && (
              <button
                type="button"
                className={`icon-btn ${currentEntryBookmarked ? "bookmarked" : ""}`}
                onClick={onToggleBookmark}
                title={currentEntryBookmarked ? "Remove bookmark" : "Bookmark this"}
                aria-label={currentEntryBookmarked ? "Remove bookmark" : "Bookmark"}
              >
                <Star
                  size={15}
                  fill={currentEntryBookmarked ? "#ffc832" : "none"}
                  color={currentEntryBookmarked ? "#ffc832" : "currentColor"}
                />
              </button>
            )}
            <button
              type="button"
              className="icon-btn"
              onClick={handleDownload}
              title="Download as PDF"
              disabled={isLoading || !result}
            >
              <Download size={15} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="drawer-close"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="drawer-body">
          {isLoading ? (
            <LoadingState />
          ) : result ? (
            <ResultSections result={result} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

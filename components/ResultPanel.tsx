"use client";

import { Copy, RotateCcw } from "lucide-react";
import type { ResearchResult } from "@/types/research";
import { OverviewSection } from "./sections/OverviewSection";
import { StatsSection } from "./sections/StatsSection";
import { InsightsSection } from "./sections/InsightsSection";
import { TrendsSection } from "./sections/TrendsSection";
import { ChallengesSection } from "./sections/ChallengesSection";
import { ActionSection } from "./sections/ActionSection";
import { LinksSection } from "./sections/LinksSection";

interface ResultPanelProps {
  result: ResearchResult;
  query: string;
  onReset: () => void;
  onCopy: () => void;
}

export function ResultPanel({
  result,
  query,
  onReset,
  onCopy,
}: ResultPanelProps) {
  const handleCopy = () => {
    const raw = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(raw).then(() => {
      onCopy();
    });
  };

  return (
    <div className="relative z-10 max-w-[860px] mx-auto px-6 animate-slide-up">
      <div className="pt-6 pb-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h2 className="font-display font-bold text-[1.4rem] tracking-[-0.02em] text-text flex-1 min-w-0 truncate">
            {query}
          </h2>
          <button
            type="button"
            onClick={handleCopy}
            className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-muted hover:border-accent hover:text-white transition-colors flex-shrink-0"
            aria-label="Copy result"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>

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

        <footer
          className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] pb-16"
          style={{ borderTopColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-muted text-[0.75rem]">
            ✦ Powered by Claude AI · Always verify with authoritative sources
          </p>
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[rgba(255,255,255,0.06)] text-sm text-muted hover:border-accent hover:text-accent transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Research
          </button>
        </footer>
      </div>
    </div>
  );
}

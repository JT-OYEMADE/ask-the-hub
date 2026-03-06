"use client";

import { useState, useCallback, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BackgroundEffects } from "@/components/BackgroundEffects";
import { SearchPanel } from "@/components/SearchPanel";
import { ExampleChips } from "@/components/ExampleChips";
import { ResultDrawer } from "@/components/ResultDrawer";
import { HistoryPanel } from "@/components/HistoryPanel";
import { useToast } from "@/components/Toaster";
import type { DepthMode, ResearchResult, HistoryEntry } from "@/types/research";
import { getHistory, saveToHistory, toggleBookmark } from "@/lib/history";

const DRAWER_CLOSE_DELAY_MS = 400;

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [activeQuery, setActiveQuery] = useState("");
  const [activeDepth, setActiveDepth] = useState<DepthMode>("detailed");
  const [searchInput, setSearchInput] = useState("");
  const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const { showToast } = useToast();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const refreshHistory = useCallback(() => {
    setHistory(getHistory());
  }, []);

  const currentEntry = currentEntryId
    ? history.find((h) => h.id === currentEntryId)
    : null;
  const currentEntryBookmarked = currentEntry?.bookmarked ?? false;

  const handleSearch = useCallback(
    async (query: string, depth: DepthMode) => {
      setActiveQuery(query);
      setActiveDepth(depth);
      setDrawerOpen(true);
      setIsLoading(true);
      setResult(null);
      setCurrentEntryId(null);

      try {
        const res = await fetch("/api/research", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, depth }),
        });
        const data = await res.json();
        if (!res.ok) {
          showToast(
            data.error || "Something went wrong. Please try again."
          );
          setDrawerOpen(false);
          setTimeout(() => {
            setResult(null);
            setActiveQuery("");
            setIsLoading(false);
          }, DRAWER_CLOSE_DELAY_MS);
          return;
        }
        setResult(data as ResearchResult);
        const entry = saveToHistory({
          query,
          depth,
          result: data as ResearchResult,
          bookmarked: false,
        });
        setCurrentEntryId(entry.id);
        refreshHistory();
      } catch {
        showToast("Something went wrong. Please try again.");
        setDrawerOpen(false);
        setTimeout(() => {
          setResult(null);
          setActiveQuery("");
          setIsLoading(false);
        }, DRAWER_CLOSE_DELAY_MS);
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [showToast, refreshHistory]
  );

  const handleClose = useCallback(() => {
    setDrawerOpen(false);
    setTimeout(() => {
      setResult(null);
      setActiveQuery("");
      setIsLoading(false);
      setCurrentEntryId(null);
    }, DRAWER_CLOSE_DELAY_MS);
  }, []);

  const handleExampleSelect = useCallback((text: string) => {
    setSearchInput(text);
  }, []);

  const handleCopy = useCallback(() => {
    showToast("Copied to clipboard ✓");
  }, [showToast]);

  const handleSelectHistoryEntry = useCallback((entry: HistoryEntry) => {
    setActiveQuery(entry.query);
    setActiveDepth(entry.depth);
    setResult(entry.result);
    setCurrentEntryId(entry.id);
    setDrawerOpen(true);
  }, []);

  const handleToggleBookmark = useCallback(() => {
    if (!currentEntryId) return;
    toggleBookmark(currentEntryId);
    refreshHistory();
    showToast(currentEntryBookmarked ? "Bookmark removed" : "Bookmarked ✓");
  }, [currentEntryId, currentEntryBookmarked, refreshHistory, showToast]);

  const handleDownloadStart = useCallback(() => {
    showToast("Downloading…");
  }, [showToast]);

  return (
    <>
      <BackgroundEffects />
      <Header onOpenHistory={() => setHistoryPanelOpen(true)} />

      <Hero />
      <SearchPanel
        value={searchInput}
        onChange={setSearchInput}
        onSubmit={handleSearch}
        loading={isLoading}
      />
      <ExampleChips onSelect={handleExampleSelect} />

      <ResultDrawer
        isOpen={drawerOpen}
        isLoading={isLoading}
        result={result}
        query={activeQuery}
        onClose={handleClose}
        onCopy={handleCopy}
        currentEntryBookmarked={currentEntryBookmarked}
        onToggleBookmark={currentEntryId ? handleToggleBookmark : undefined}
        onDownloadStart={handleDownloadStart}
      />

      <HistoryPanel
        isOpen={historyPanelOpen}
        onClose={() => setHistoryPanelOpen(false)}
        onSelectEntry={handleSelectHistoryEntry}
        history={history}
        onHistoryChange={refreshHistory}
      />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";

const STEPS = [
  "Scanning global knowledge sources…",
  "Extracting key insights…",
  "Structuring your research report…",
  "Adding deep analysis…",
];

const DELAY_MS = 900;

export function LoadingState() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleCount((c) => c + 1), (i + 1) * DELAY_MS)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative z-10 py-16 flex flex-col items-center justify-center">
      <div
        className="w-12 h-12 rounded-full border-2 border-[rgba(255,255,255,0.06)] border-t-accent animate-spin-slow"
        style={{ borderTopColor: "#d4ff5c" }}
      />
      <p className="mt-4 text-muted text-[0.85rem] font-light">
        Researching your topic…
      </p>
      <div className="mt-8 flex flex-col gap-2">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className={`flex items-center gap-2 ${
              i < visibleCount ? "animate-fade-in" : "opacity-0"
            }`}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#d4ff5c" }}
            />
            <span className="text-sm text-muted">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

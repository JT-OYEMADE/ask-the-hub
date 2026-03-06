"use client";

import type { StatItem } from "@/types/research";

interface StatsSectionProps {
  stats: StatItem[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <div
      className="rounded-2xl border overflow-hidden"
      style={{
        background: "#111119",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="result-section-header flex items-center gap-3 px-5 py-4 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
          style={{ background: "rgba(92,255,205,0.1)" }}
        >
          📊
        </div>
        <h2
          className="font-display font-bold text-sm"
          style={{ color: "#5cffcd" }}
        >
          Key Statistics & Data
        </h2>
      </div>
      <div className="stat-row result-section-body px-5 py-5 flex flex-wrap gap-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className="stat-item flex-1 min-w-[130px] rounded-[10px] border px-4 py-2.5"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="stat-value font-display font-bold text-[1.1rem]"
              style={{ color: "#d4ff5c" }}
            >
              {item.value}
            </div>
            <div className="stat-label text-[0.73rem] text-muted uppercase tracking-wider mt-0.5">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

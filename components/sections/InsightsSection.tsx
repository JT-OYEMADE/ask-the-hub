"use client";

interface InsightsSectionProps {
  insights: string[];
}

export function InsightsSection({ insights }: InsightsSectionProps) {
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
          style={{ background: "rgba(255,107,53,0.12)" }}
        >
          💡
        </div>
        <h2
          className="font-display font-bold text-sm"
          style={{ color: "#ff6b35" }}
        >
          Deep Insights
        </h2>
      </div>
      <div className="result-section-body grid grid-cols-1 min-[500px]:grid-cols-2 gap-3 px-5 py-5">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="rounded-[10px] border px-3.5 py-3 text-[0.82rem]"
            style={{
              background: "rgba(92,255,205,0.04)",
              borderColor: "rgba(92,255,205,0.12)",
              color: "#a0c0b8",
            }}
          >
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}

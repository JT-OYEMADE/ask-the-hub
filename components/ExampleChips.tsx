"use client";

const CHIPS = [
  "🌾 Agriculture in Kano State",
  "💳 Fintech industry overview",
  "🎓 Scholarships for African students",
  "🚀 Startup ecosystem in Lagos",
  "🌍 Climate change impact in West Africa",
];

function chipToQuery(text: string): string {
  return text.replace(/^[^\s]+\s/, "").trim();
}

interface ExampleChipsProps {
  onSelect: (text: string) => void;
}

export function ExampleChips({ onSelect }: ExampleChipsProps) {
  return (
    <div className="relative z-10 max-w-[860px] mx-auto px-6 pt-6 pb-12">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-[10px] uppercase tracking-wider text-muted">
          Try:
        </span>
        {CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSelect(chipToQuery(chip))}
            className="rounded-full text-[0.8rem] px-3.5 py-1.5 border text-muted transition-colors hover:bg-[rgba(212,255,92,0.07)] hover:border-[rgba(212,255,92,0.25)] hover:text-white"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

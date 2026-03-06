"use client";

interface ActionSectionProps {
  action: string;
}

export function ActionSection({ action }: ActionSectionProps) {
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
          ✅
        </div>
        <h2
          className="font-display font-bold text-sm"
          style={{ color: "#5cffcd" }}
        >
          What You Should Know / Do
        </h2>
      </div>
      <div
        className="result-section-body section-body px-5 py-5 text-[0.93rem] leading-relaxed font-light"
        style={{ color: "#c0c0cc" }}
        dangerouslySetInnerHTML={{ __html: action }}
      />
    </div>
  );
}

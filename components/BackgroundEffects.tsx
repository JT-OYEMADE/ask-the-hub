"use client";

export function BackgroundEffects() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(212,255,92,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,255,92,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    >
      {/* Orb 1 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 600,
          height: 600,
          top: -200,
          left: -200,
          background: "rgba(212,255,92,0.05)",
          filter: "blur(120px)",
        }}
      />
      {/* Orb 2 */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          bottom: -100,
          right: -100,
          background: "rgba(92,255,205,0.04)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero-section content-container relative z-10 text-center px-6 pt-20 pb-12">
      <div
        className="hero-pill inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-wider text-muted mb-8"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot"
          style={{ background: "#d4ff5c" }}
        />
        Deep Research, Instantly
      </div>
      <h1
        className="hero-title font-display font-extrabold leading-[1.05] tracking-[-0.03em] mx-auto max-w-[860px]"
        style={{
          fontSize: "clamp(2.8rem, 7vw, 5rem)",
        }}
      >
        Your AI Research
        <br />
        <span style={{ color: "#d4ff5c" }}>Intelligence Hub</span>
      </h1>
      <p className="hero-subtext font-sans font-light text-[1.05rem] text-muted max-w-[520px] mx-auto mt-6 leading-[1.7]">
        Type any topic — get structured overviews, key stats, insights, trends,
        and actionable next steps. Powered by Claude.
      </p>
    </section>
  );
}

"use client";

import type { LinkItem } from "@/types/research";

interface LinksSectionProps {
  links: LinkItem[];
}

export function LinksSection({ links }: LinksSectionProps) {
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
          🔗
        </div>
        <h2
          className="font-display font-bold text-sm"
          style={{ color: "#ff6b35" }}
        >
          Key Resources & Links
        </h2>
      </div>
      <div className="result-section-body links-list px-5 py-5 flex flex-col gap-2">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-item flex items-center gap-3 px-4 py-3.5 rounded-[10px] border cursor-pointer transition-colors hover:border-[rgba(212,255,92,0.2)] hover:bg-[rgba(212,255,92,0.03)]"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="w-[30px] h-[30px] rounded-md flex items-center justify-center text-sm flex-shrink-0"
              style={{ background: "rgba(212,255,92,0.1)" }}
            >
              {link.icon || "🔗"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="link-item-title text-[0.87rem] font-medium text-white truncate">
                {link.title}
              </div>
              <div className="link-item-desc text-[0.75rem] text-muted truncate">
                {link.desc}
              </div>
            </div>
            <span className="text-muted flex-shrink-0">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

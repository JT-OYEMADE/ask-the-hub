import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import type { DepthMode, ResearchResult } from "@/types/research";

const DEPTH_INSTRUCTIONS: Record<DepthMode, string> = {
  summary:
    "Provide a concise summary with the most important points.",
  detailed:
    "Provide thorough, well-structured content with enough depth for someone making a real decision.",
  expert:
    "Provide expert-level, comprehensive analysis as if written for a professional researcher or investor.",
};

const SYSTEM_PROMPT = `You are Ask The Hub — a world-class AI research analyst. When given a research topic, you return a deeply structured JSON object covering all key dimensions of that topic.

Your JSON must have EXACTLY these keys (include all that are relevant):
- overview: HTML string with <p> and <strong> tags — a thorough overview paragraph(s)
- stats: array of { value: string, label: string } — 4–8 key statistics or facts
- insights: array of 4–6 short insight strings (1–2 sentences each)
- trends: HTML string with <h3> subheadings and <p> paragraphs describing trends and opportunities
- challenges: HTML string with <h3> subheadings and <p> about risks and challenges
- action: HTML string with <p> and <ul><li> bullet points — actionable next steps or things to know
- links: array of { title, url, desc, icon } — 4–8 real, useful resource links with real URLs

IMPORTANT: Return ONLY valid JSON, no markdown fences, no preamble. All HTML values must be valid inline HTML.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, depth = "detailed" } = body as {
      query?: string;
      depth?: DepthMode;
    };

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { error: "Missing or invalid query" },
        { status: 400 }
      );
    }

    const validDepth: DepthMode[] = ["summary", "detailed", "expert"];
    const depthMode: DepthMode = validDepth.includes(depth) ? depth : "detailed";
    const depthInstruction = DEPTH_INSTRUCTIONS[depthMode];

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const fullSystem = `${SYSTEM_PROMPT}\n\n[DEPTH_INSTRUCTION]: ${depthInstruction}`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 3000,
      system: fullSystem,
      messages: [
        {
          role: "user",
          content: `Research this topic and return the JSON object only:\n\n${query.trim()}`,
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      return NextResponse.json(
        { error: "Invalid response from AI" },
        { status: 502 }
      );
    }

    let raw = textBlock.text.trim();
    // Strip markdown code fences if present
    if (raw.startsWith("```")) {
      raw = raw.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    }
    const result: ResearchResult = JSON.parse(raw);

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in AI response" },
        { status: 502 }
      );
    }
    console.error("Research API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export type DepthMode = "summary" | "detailed" | "expert";

export interface StatItem {
  value: string;
  label: string;
}

export interface LinkItem {
  title: string;
  url: string;
  desc: string;
  icon: string;
}

export interface ResearchResult {
  overview?: string;
  stats?: StatItem[];
  insights?: string[];
  trends?: string;
  challenges?: string;
  action?: string;
  links?: LinkItem[];
}

export interface HistoryEntry {
  id: string;
  query: string;
  depth: DepthMode;
  result: ResearchResult;
  bookmarked: boolean;
  createdAt: number;
}

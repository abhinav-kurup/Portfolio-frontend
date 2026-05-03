// ─── Experience ─────────────────────────────────────────────
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  impact: string;
  stack: string[];
}

// ─── Projects ───────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  impact: string;
  description: string;
  stack: string[];
  category: string;
  links: {
    github?: string;
    live?: string;
    deepDive?: string;
  };
}

// ─── Skills ─────────────────────────────────────────────────
export interface Skill {
  name: string;
  category: string;
  inProduction: boolean;
}

// ─── Blog / Writing ─────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  slug: string;
  publishedAt: string;
}

// ─── About value cards ─────────────────────────────────────
export interface ValueCard {
  title: string;
  description: string;
  icon: string; // lucide icon name
}

// ─── Stats ──────────────────────────────────────────────────
export interface Stat {
  label: string;
  value: string;
  description?: string;
}

// ─── Nav link ───────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── Social link ────────────────────────────────────────────
export interface SocialLink {
  label: string;
  href: string;
  icon: string; // lucide icon name
}

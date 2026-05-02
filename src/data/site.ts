import type { NavLink, SocialLink, Stat, ValueCard } from "@/lib/types";

// ─── Personal info ──────────────────────────────────────────
export const siteConfig = {
  name: "Abhinav",
  role: "Backend Engineer",
  tagline: "I build robust, scalable backend systems that power real products.",
  description:
    "Backend-focused engineer specializing in Python, FastAPI, and distributed systems. I design APIs, architect data pipelines, and ship production-grade infrastructure.",
  email: "abhinav@example.com",
  resumeUrl: "/resume.pdf",
};

// ─── Navigation ─────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

// ─── Socials ────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
  { label: "Email", href: "mailto:abhinav@example.com", icon: "Mail" },
];

// ─── About section value cards ──────────────────────────────
export const valueCards: ValueCard[] = [
  {
    title: "Backend Architecture",
    description: "Designing scalable APIs and microservices with Python & FastAPI.",
    icon: "Server",
  },
  {
    title: "System Design",
    description: "Building distributed systems with caching, queues, and event-driven patterns.",
    icon: "Network",
  },
  {
    title: "DevOps & Infra",
    description: "Docker, CI/CD pipelines, and cloud infrastructure as code.",
    icon: "Container",
  },
  {
    title: "AI / RAG Systems",
    description: "Production RAG pipelines with LangChain, vector stores, and LLM orchestration.",
    icon: "Brain",
  },
];

// ─── Quick stats ────────────────────────────────────────────
export const stats: Stat[] = [
  { label: "Projects Shipped", value: "8+" },
  { label: "Backend Systems", value: "5+" },
  { label: "Tech Stack Depth", value: "15+" },
  { label: "Articles Written", value: "4+" },
];

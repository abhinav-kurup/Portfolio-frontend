import type { NavLink, SocialLink, Stat, ValueCard } from "@/lib/types";

// ─── Personal info ──────────────────────────────────────────
export const siteConfig = {
  name: "Abhinav",
  role: "Backend Engineer",
  tagline: "I build robust, scalable backend systems that power real products.",
  description:
    "Backend-focused engineer specializing in Python, FastAPI, AI systems, APIs, automation workflows, and shipping production-grade backend infrastructure.",
  email: "abhinavkurup00@gmail.com",
  phone: "+91 9404504260",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/remove1.png",
};

// ─── Navigation ─────────────────────────────────────────────
export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  // { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

// ─── Socials ────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/abhinav-kurup/", icon: "Github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/abhinav-kurup/", icon: "Linkedin" },
  { label: "Email", href: "mailto:abhinavkurup11@gmail.com", icon: "Mail" },
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
  { label: "Projects Shipped", value: "3" },
  { label: "Backend Systems", value: "15+" },
  { label: "GitHub Commits", value: "400+" },
  {
    label: "AVG RESPONSE TIME",
    value: "200ms",
    description: "(emotionally unavailable, technically fast)",
  },
];

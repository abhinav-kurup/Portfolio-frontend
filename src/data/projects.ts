import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "DocuMind",
    impact: "RAG-powered document intelligence with 95% retrieval accuracy",
    description:
      "A production RAG system using LangGraph, ChromaDB, and FastAPI for intelligent document Q&A with streaming responses.",
    stack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "React"],
    category: "AI/ML",
    links: {
      github: "https://github.com",
      deepDive: "/projects/documind",
    },
  },
  {
    id: "proj-2",
    title: "CollabWrite",
    impact: "Real-time collaborative editor supporting 50+ concurrent users",
    description:
      "A Google Docs-style collaborative writing platform with operational transform, WebSocket sync, and rich text editing.",
    stack: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Redis"],
    category: "Full-Stack",
    links: {
      github: "https://github.com",
      live: "https://collabwrite.dev",
      deepDive: "/projects/collabwrite",
    },
  },
  {
    id: "proj-3",
    title: "EMS Backend",
    impact: "Automated HR workflows saving 20+ hours/week in admin tasks",
    description:
      "Enterprise employee management system with Celery task queues, automated reporting, and role-based access control.",
    stack: ["Python", "Django", "Celery", "PostgreSQL", "Docker"],
    category: "Backend",
    links: {
      github: "https://github.com",
      deepDive: "/projects/ems-backend",
    },
  },
  {
    id: "proj-4",
    title: "Portfolio Website",
    impact: "Sub-second load times with 95+ Lighthouse score",
    description:
      "This portfolio — built with Next.js 15 App Router, Tailwind CSS, and a FastAPI RAG chatbot for interactive exploration.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI"],
    category: "Full-Stack",
    links: {
      github: "https://github.com",
    },
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

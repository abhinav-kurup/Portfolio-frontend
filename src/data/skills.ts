import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", inProduction: true },
  { name: "TypeScript", category: "Languages", inProduction: true },
  { name: "JavaScript", category: "Languages", inProduction: true },
  { name: "SQL", category: "Languages", inProduction: true },

  // Frameworks
  { name: "FastAPI", category: "Frameworks", inProduction: true },
  { name: "Django", category: "Frameworks", inProduction: true },
  { name: "Next.js", category: "Frameworks", inProduction: true },
  { name: "LangChain", category: "Frameworks", inProduction: true },
  { name: "LangGraph", category: "Frameworks", inProduction: true },
  { name: "Celery", category: "Frameworks", inProduction: true },

  // Databases & Storage
  { name: "PostgreSQL", category: "Databases", inProduction: true },
  { name: "Redis", category: "Databases", inProduction: true },
  { name: "ChromaDB", category: "Databases", inProduction: true },
  { name: "MongoDB", category: "Databases", inProduction: false },

  // DevOps & Tools
  { name: "Docker", category: "DevOps", inProduction: true },
  { name: "Git", category: "DevOps", inProduction: true },
  { name: "GitHub Actions", category: "DevOps", inProduction: true },
  { name: "Linux", category: "DevOps", inProduction: true },
  { name: "Nginx", category: "DevOps", inProduction: false },
];

export const skillCategories = [
  "All",
  ...Array.from(new Set(skills.map((s) => s.category))),
];

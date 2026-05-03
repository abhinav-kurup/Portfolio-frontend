import type { Skill } from "@/lib/types";

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", inProduction: true },
  { name: "SQL", category: "Languages", inProduction: true },
  { name: "C", category: "Languages", inProduction: false },
  { name: "C++", category: "Languages", inProduction: false },

  // Frameworks
  { name: "FastAPI", category: "Frameworks", inProduction: true },
  { name: "Django", category: "Frameworks", inProduction: true },
  { name: "Flask", category: "Frameworks", inProduction: true },
  { name: "LangChain", category: "Frameworks", inProduction: true },
  { name: "LangGraph", category: "Frameworks", inProduction: true },
  { name: "Celery", category: "Frameworks", inProduction: true },

  // Databases & Storage
  { name: "PostgreSQL", category: "Databases", inProduction: true },
  { name: "MySQL", category: "Databases", inProduction: false },
  { name: "Redis", category: "Databases", inProduction: true },
  { name: "ChromaDB", category: "Databases", inProduction: true },
  { name: "MongoDB", category: "Databases", inProduction: false },

  // DevOps & Tools
  { name: "Docker", category: "DevOps", inProduction: true },
  { name: "Git", category: "DevOps", inProduction: true },
  { name: "GitHub Actions", category: "DevOps", inProduction: true },
  { name: "Jenkins", category: "DevOps", inProduction: false },
  { name: "Linux", category: "DevOps", inProduction: true },
  { name: "Nginx", category: "DevOps", inProduction: true },

  // Cloud
  { name: "AWS", category: "Cloud", inProduction: true },
  { name: "Azure", category: "Cloud", inProduction: false },

];

export const skillCategories = [
  "All",
  ...Array.from(new Set(skills.map((s) => s.category))),
];

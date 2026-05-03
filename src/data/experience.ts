import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Associate Software Engineer",
    company: "Infuse Consultancy",
    period: "August 2024 – Present",
    impact:
      "Built and maintained Python backend systems for enterprise automation workflows, with a focus on reliability and scalability. Designed automation frameworks and CI/CD pipelines to improve delivery stability, release consistency, and operational efficiency.",
    stack: ["Python", "AWS", "Docker", "Jenkins", "Pytest"],
  },
  {
    id: "exp-2",
    role: "Backend Engineer (Freelance)",
    company: "BlueSkript",
    period: "July 2025 – Jan 2026",
    impact:
      "Built and shipped backend systems for cloud-based operational platforms used in live business environments, with ownership across backend architecture, core service design, and production delivery. Designed scalable backend workflows, asynchronous processing pipelines, and deployment infrastructure to support reliable operations at scale.",
    stack: ["Django", "AWS Lambda", "SQS", "ECS", "PostgreSQL"],
  },
  {
    id: "exp-3",
    role: "Lead Backend Developer",
    company: "Goa Police",
    period: "July 2023 – Dec 2023",
    impact:
      "Led the backend development of a cloud-based operational platform for large-scale field coordination and workflow management. Built backend systems supporting geospatial workflows, reporting, and real-time operational visibility in live field environments.",
    stack: ["Python", "Django", "PostgreSQL", "PostGIS", "GeoServer"],
  },
];

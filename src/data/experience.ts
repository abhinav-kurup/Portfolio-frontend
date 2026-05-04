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
      "Built and owned the backend for a live, cloud-based business platform — from architecture and core service design to production deployment. This included scalable Django APIs, an asynchronous messaging pipeline on AWS processing thousands of messages daily, and containerized deployment on ECS.",
    stack: ["Django", "AWS Lambda", "SQS", "ECS", "PostgreSQL"],
  },
  {
    id: "exp-3",
    role: "Backend Developer",
    company: "Goa Police",
    period: "July 2023 – Dec 2023",
    impact:
      "Led the backend development of a cloud-based operational platform for large-scale field coordination and workflow management. Built backend systems supporting geospatial workflows, reporting, and real-time operational visibility in live field environments.",
    stack: ["Python", "Django", "PostgreSQL", "PostGIS", "GeoServer"],
  },
];

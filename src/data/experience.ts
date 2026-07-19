import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Associate Software Engineer",
    company: "Infuse",
    period: "August 2024 - Present",
    impact:
      "Developed and maintained a scalable enterprise automation platform while building AI-powered solutions using LLMs, RAG, and multi-agent workflows. Worked across the full backend lifecycle, from designing Python microservices and document processing pipelines to deploying cloud-native applications on AWS.",
    stack: ["Python", "Automation", "RAG", "Multi-agent", "AWS", "Docker"],
  },
  {
    id: "exp-2",
    role: "Python Backend Engineer",
    company: "BlueSkript",
    period: "Jan 2024 - Jul 2024",
    impact:
      "Built and owned the backend for a live, cloud-based business platform, from architecture and core service design to production deployment. Developed an AI-powered chatbot, scalable Django APIs, an asynchronous AWS messaging pipeline processing thousands of messages daily, and containerized deployments on Amazon ECS.",
    stack: ["RAG", "LLM", "Django", "AWS", "SQS", "ECS", "PostgreSQL", "Redis",],
  },
  {
    id: "exp-3",
    role: "Backend Developer",
    company: "Goa Police",
    period: "July 2023 - Dec 2023",
    impact:
      "Led the backend development of a cloud-based operational platform for large-scale field coordination and workflow management. Built backend systems supporting geospatial workflows, reporting, and real-time operational visibility in live field environments.",
    stack: ["Python", "Django", "PostgreSQL", "PostGIS", "GeoServer", "Firebase"],
  },
];

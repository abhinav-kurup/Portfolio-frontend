import type { Experience } from "@/lib/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Associate Software Engineer",
    company: "Infuse Consultancy",
    period: "August 2024 – Present",
    impact: [
      "Developed and maintained enterprise automation platform, focusing on performance and scalability.",
      "Built a BFF-based identity security layer using AWS API Gateway Authorizers to manage JWT lifecycle server-side.",
      "Built a Python-based automation framework, achieving an 85% defect detection rate.",
      "Maintained Jenkins CI/CD pipelines with Docker; integrated Allure dashboards for centralized reporting.",
    ],
    stack: ["Python", "AWS", "Docker", "Jenkins", "Pytest"],
  },
  {
    id: "exp-2",
    role: "Backend Engineer (Freelance)",
    company: "BlueSkript",
    period: "July 2025 – Jan 2026",
    impact: [
      "Architected an event-driven serverless pipeline using AWS SQS and Lambda for WhatsApp integration.",
      "Implemented a Blue/Green deployment strategy on AWS ECS, achieving zero-downtime releases.",
      "Designed and deployed a scalable backend using Django REST Framework and PostgreSQL.",
    ],
    stack: ["Django", "AWS Lambda", "SQS", "ECS", "PostgreSQL"],
  },
  {
    id: "exp-3",
    role: "Lead Backend Developer",
    company: "Goa Police",
    period: "July 2023 – Dec 2023",
    impact: [
      "Transformed legacy beat-book system into scalable cloud-based mobile/web platforms for 1,000+ field officers across Goa, under a state initiative backed by the Chief Minister’s office.",
      "Engineered geospatial APIs using Django, PostgreSQL, and PostGIS for real-time tracking and optimized spatial queries for officers in the field.",
    ],
    stack: ["Python", "Django", "PostgreSQL", "PostGIS", "GeoServer"],
  },
];

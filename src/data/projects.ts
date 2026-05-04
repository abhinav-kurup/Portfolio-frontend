import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "DocuMind",
    impact: "RAG-powered document intelligence with 95% retrieval accuracy",
    description:
      "A production RAG system using LangGraph, ChromaDB, and FastAPI for intelligent document Q&A with streaming responses.",
    stack: ["Python", "FastAPI", "LangGraph", "ChromaDB", "React"],
    category: "AI",
    links: {
      github: "https://github.com/abhinav-kurup/Documind",
      deepDive: "/projects/documind",
    },
  },
  {
    id: "proj-2",
    title: "CollabWrite",
    impact: "Real-time collaborative editor supporting 50+ concurrent users",
    description:
      "A collaborative writing platform with CRDT-based conflict resolution, WebSocket sync, and rich text editing for Google Docs-style multi-user collaboration.",
    stack: ["Python", "FastAPI", "WebSockets", "PostgreSQL", "Redis"],
    category: "Backend",
    links: {
      github: "https://github.com/abhinav-kurup/CollabWrite",
      deepDive: "/projects/collabwrite",
    },
  },
  {
    id: "proj-3",
    title: "QR Security Scanner",
    impact: "AI-powered protection against QR Phishing (Quishing)",
    description:
      "An end-to-end security portal that decodes QR codes, performs reputation checks via VirusTotal, and generates plain-English safety reports with Google Gemini. Features a scalable audit trail with Apache Cassandra.",
    stack: ["Python", "Streamlit", "Cassandra", "Gemini AI", "VirusTotal", "Docker"],
    category: "AI",
    links: {
      github: "https://github.com/abhinav-kurup/QR-Security-Scanner",
    },
  },
  // {
  //   id: "proj-4",
  //   title: "EMS Backend",
  //   impact: "Unified HR and event orchestration saving 25+ hours/week with automated notifications",
  //   description:
  //     "Enterprise employee management system featuring unified employee and event management, Celery-driven task queues for automated reporting, RBAC, and WhatsApp broadcasting for instant event notifications.",
  //   stack: ["Python", "Django", "Celery", "PostgreSQL", "Twilio", "Docker"],
  //   category: "Backend",
  //   links: {
  //     deepDive: "/projects/ems-backend",
  //   },
  // },
  {
    id: "proj-5",
    title: "Portfolio Website",
    impact: "FastAPI-powered portfolio with integrated RAG agent",
    description:
      "A static frontend layered over a robust backend AI service. Built with Next.js 15, integrating a custom FastAPI application for real-time, context-aware chatbot inference.",
    stack: ["FastAPI", "Python", "Next.js", "TypeScript"],
    category: "Backend",
    links: {
      github: "https://github.com/abhinav-kurup/Portfolio-backend",
    },
  },
  {
    id: "proj-6",
    title: "Django ECS Cluster",
    impact: "ECS + EC2 Cluster for Django Application",
    description:
      "Deployed a scalable ECS cluster on EC2 instances to run a containerized Django application hosted on Amazon ECR. The infrastructure is provisioned using AWS CloudFormation, ensuring a robust and automated deployment process.",
    stack: ["AWS ECS", "AWS EC2", "CloudFormation", "Django", "Docker"],
    category: "DevOps",
    links: {},
  },
  {
    id: "proj-7",
    title: "MediAssist AI",
    impact: "AI-POWERED SYMPTOM ANALYSIS SYSTEM",
    description:
      "Built an AI-assisted symptom analysis system using LangChain, Qdrant, and a quantized Llama 2 model to generate preliminary condition predictions from user-reported symptoms. Designed for lightweight local inference with retrieval-backed medical context and low-latency response generation.",
    stack: ["Python", "Flask", "LangChain", "Llama 2"],
    category: "AI",
    links: {
      github: "https://github.com/abhinav-kurup/ibw-medbot",
    },
  },
];

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
];

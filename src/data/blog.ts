import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Building a Production RAG System with LangGraph",
    excerpt:
      "A deep dive into architecting a retrieval-augmented generation pipeline with LangGraph, ChromaDB, and FastAPI.",
    tags: ["RAG", "LangGraph", "Python"],
    readingTime: "8 min read",
    slug: "building-production-rag-system",
    publishedAt: "2026-04-15",
  },
  {
    id: "post-2",
    title: "Caching Strategies for FastAPI Applications",
    excerpt:
      "How to implement Redis-backed caching layers that reduce API latency by 40% without sacrificing data freshness.",
    tags: ["FastAPI", "Redis", "Performance"],
    readingTime: "6 min read",
    slug: "caching-strategies-fastapi",
    publishedAt: "2026-03-20",
  },
  {
    id: "post-3",
    title: "Event-Driven Architecture with Celery and Redis",
    excerpt:
      "Designing background task systems that scale — from simple async jobs to complex multi-step workflows.",
    tags: ["Celery", "Architecture", "Python"],
    readingTime: "7 min read",
    slug: "event-driven-architecture-celery",
    publishedAt: "2026-02-10",
  },
];

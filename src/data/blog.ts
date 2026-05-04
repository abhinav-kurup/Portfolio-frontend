import type { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Building a Production RAG System with LangGraph",
    excerpt:
      "A deep dive into architecting a retrieval-augmented generation pipeline with LangGraph, ChromaDB, and FastAPI.",
    content: `
      <p>My first RAG pipeline was a disaster.</p>
      <p>It answered questions confidently. Completely wrong ones. Users were getting hallucinated data served as facts. That's when I realised — building a RAG system and building a production RAG system are two entirely different problems.</p>
      <p>Here's what actually works.</p>
      <p>The core stack I landed on: LangGraph for orchestration, ChromaDB for vector storage, FastAPI to expose it. LangGraph was the real game changer — it lets you build stateful, multi-step retrieval flows instead of one-shot chains. You can retry, re-rank, and branch logic based on retrieval confidence.</p>
      <p>Three things that broke everything before I fixed them:</p>
      <ul>
        <li><strong>Chunk size matters more than you think.</strong> Too large = irrelevant context. Too small = missing context. 512 tokens with 50-token overlap worked best for my docs.</li>
        <li><strong>Embed at write time, not query time.</strong> Obvious in hindsight.</li>
        <li><strong>Add a re-ranker after retrieval.</strong> Raw cosine similarity is not enough.</li>
      </ul>
      <p>The result? Hallucinations dropped by ~70%. Response relevance went up noticeably.</p>
      <p>RAG isn't magic. It's plumbing. Get the plumbing right.</p>
    `,
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
    content: `
      <p>FastAPI is fast — until it isn’t.</p>
      <p>That’s the trap.</p>
      <p>You build your API, benchmark a few endpoints, see sub-100ms responses, and everything feels great. Locally it flies. Staging looks solid. Production behaves. Then traffic grows, usage patterns change, and suddenly the same app that felt instant starts dragging.</p>
      <p>One day your endpoints are clean and predictable. Next day your database is getting hammered, response times are spiking, and your CPU graphs look like a stress test.</p>
      <p>Most teams respond the same way: scale horizontally, add more replicas, increase DB resources, throw hardware at the problem.</p>
      <p>Sometimes that helps. Most of the time, it just delays the real fix.</p>
      <p>The bottleneck usually isn’t your framework. It’s repeated work.</p>
      <p>That’s the part that matters.</p>
      <p>FastAPI is rarely the thing slowing you down. Your API is slow because it keeps doing the same expensive work over and over again — hitting the same tables, running the same joins, recomputing the same aggregations, serializing the same payloads, asking the same questions on every request.</p>
      <p>That’s what kills performance at scale.</p>
      <p>The fix usually isn’t more servers.</p>
      <p>It’s caching.</p>
      <p>And for FastAPI, Redis is usually the first thing that meaningfully changes the performance curve.</p>
      <p>Not because it makes your code “faster,” but because it makes your system do less work.</p>
      <p>That distinction matters.</p>
      <ul>
        <li>The fastest database query is the one you never run.</li>
        <li>The fastest serializer is the one you never invoke.</li>
        <li>The fastest endpoint is the one that returns before your application has to think too hard.</li>
      </ul>
      <p>That’s what good caching does. It removes repeated work from the hot path.</p>
      <p>Over time, I’ve found most high-impact API caching falls into three layers. Different tradeoffs, different use cases, but together they cover most of what actually matters in production.</p>

      <h2>Layer 1 — Response caching</h2>
      <p>This is the easiest place to start and usually the highest ROI.</p>
      <p>Cache the full API response for read-heavy endpoints and return it directly when the same request comes in again. If the output is identical for most users and doesn’t change every second, response caching is usually the first win.</p>
      <p>Think:</p>
      <ul>
        <li>product listings</li>
        <li>category pages</li>
        <li>search suggestions</li>
        <li>public metadata</li>
        <li>dashboards with delayed freshness tolerance</li>
        <li>configuration endpoints</li>
        <li>feature flags</li>
        <li>pricing catalogs</li>
      </ul>
      <p>These endpoints are often hit constantly, but the underlying data changes infrequently relative to read volume. That makes them perfect cache candidates.</p>
      <p>Instead of doing: <code>request → route → service → DB → serializer → response</code>, you do: <code>request → Redis → response</code>.</p>
      <p>That cuts out almost the entire request pipeline. A simple 5-minute TTL on something like <code>/products</code> can dramatically reduce database load because most clients are repeatedly asking for the same data.</p>
      <p>We’ve seen endpoints drop database traffic by more than half with nothing more than short-lived response caching. Not because the code got better. Because the code stopped running.</p>
      <p>Response caching is blunt, but it’s extremely effective. The tradeoff is obvious: coarse invalidation. You’re caching the entire output, so if anything inside that response changes, the whole cache is now stale.</p>
      <p>Don’t overcomplicate it early. A slightly stale response returned in 20ms is often better than a perfectly fresh one returned in 700ms. Users notice latency before they notice mild staleness.</p>

      <h2>Layer 2 — Query result caching</h2>
      <p>Response caching works well until different endpoints start reusing the same underlying data. That’s where query result caching becomes more useful. Instead of caching the final HTTP response, cache the result of the expensive database query itself.</p>
      <p>This gives you more granular reuse. Two different endpoints might shape the response differently, but still depend on the same expensive query. For example, <code>/products</code>, <code>/products/featured</code>, <code>/homepage</code>, and <code>/recommendations</code> all may depend on some shared “active products” query.</p>
      <p>If you cache the raw query result once, multiple endpoints can reuse it and shape it however they need. That gives you more flexibility than response caching and usually better cache efficiency across the system.</p>
      <p>This layer is especially useful when multiple endpoints share the same read model, query cost is high, or data is reusable but not always presented the same way.</p>
      <p>It also tends to age better as systems grow. Response caching is great at the edge; query caching is better inside the service layer. Instead of treating caching as an HTTP concern, you start treating it as a data access concern. That usually scales better architecturally.</p>
      <p>The tradeoff is complexity. Now you need to think about cache keys at the query level, parameter normalization, and how to avoid accidentally caching too much cardinality. Still worth it. Done well, query caching reduces duplicate reads across the application, not just duplicate requests.</p>

      <h2>Layer 3 — Computed value caching</h2>
      <p>This is where caching becomes less about database protection and more about protecting compute. Some values are expensive even after the query is done, such as analytics aggregations, reporting summaries, or ML inference results.</p>
      <p>These are the operations that make one innocent-looking request suddenly take 900ms. Not because the DB is slow, but because your application is doing expensive work after the data arrives.</p>
      <p>Cache the expensive result of the computation and reuse it until something relevant changes. This is often the highest-value cache in systems with analytics, personalization, or inference workloads. The performance gains can be massive because you’re skipping CPU-heavy work, not just I/O.</p>
      <p>Unlike raw response caching, computed caches often map cleanly to business events. If a new order comes in, invalidate sales aggregates. If a product changes, invalidate pricing projections. That makes this layer powerful — and dangerous, because this is where cache invalidation gets real.</p>

      <h2>The hard part — cache invalidation</h2>
      <p>Everyone likes caching until they have to invalidate it. That’s where most caching systems become fragile. The joke that there are only two hard things in computer science — cache invalidation and naming things — survives for a reason.</p>
      <p>The common failure mode is trying to be too clever too early. Teams build elaborate invalidation trees and dependency graphs long before they’ve measured whether the complexity is worth it. Now the cache is harder to reason about than the system it was supposed to optimize.</p>
      <p>My rule is simple: If you’re not completely sure when to invalidate, don’t pretend you are. Use short TTLs. Cache aggressively. Accept bounded staleness. Keep invalidation boring.</p>
      <p>A short TTL with aggressive caching is often more reliable than a theoretically perfect invalidation strategy nobody fully trusts. Perfect freshness is expensive. Predictable staleness is manageable. Choose manageable.</p>

      <h2>What caching really gives you</h2>
      <p>Caching is not just about speed. It’s about stability. A well-cached API doesn’t just respond faster under normal load; it degrades better under abnormal load. That matters more.</p>
      <p>Without caching, traffic spikes go straight to your database. With caching, traffic spikes get absorbed by memory. That changes the shape of failure. Instead of melting the DB, you serve slightly stale data. That’s a much better failure mode.</p>
      <p>Users rarely notice “this number updated 30 seconds late.” They absolutely notice timeouts.</p>
      <p>Caching buys you margin — margin on latency, infrastructure, traffic spikes, and bad queries. That’s why caching matters. Not because it makes FastAPI fast (FastAPI was already fast), but because caching is what keeps it fast when the rest of the system stops being cheap.</p>
      <p>Fast APIs aren’t just built. They’re built, measured, and cached.</p>
    `,
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
    content: `
      <p>Synchronous code has a ceiling.</p>
      <p>You hit it the moment a user clicks "send email" and stares at a spinner for 3 seconds while your server does SMTP. Or when a webhook fires and your API blocks waiting for a third-party response.</p>
      <p>The fix: stop doing things immediately. Queue them.</p>
      <p>Celery + Redis changed how I think about backend systems. Redis acts as the message broker — fast, reliable, already in your stack. Celery workers pick up tasks asynchronously. Your API responds in milliseconds. The work happens in the background.</p>
      <p>Here's what I now run through Celery without thinking twice:</p>
      <ul>
        <li>Email and notification delivery</li>
        <li>PDF/report generation</li>
        <li>Third-party API calls (Stripe webhooks, Slack alerts)</li>
        <li>Data aggregation jobs</li>
      </ul>
      <p>The architecture shift that mattered most: moving from "do it now" to "schedule it, retry it, monitor it." Celery gives you retries with exponential backoff out of the box. One config line. That alone has saved me from 3AM incidents.</p>
      <p>Async isn't complexity. It's resilience.</p>
    `,
    tags: ["Celery", "Architecture", "Python"],
    readingTime: "7 min read",
    slug: "event-driven-architecture-celery",
    publishedAt: "2026-02-10",
  },
  {
    id: "post-4",
    title: "Scaling WhatsApp Notifications with Celery and Twilio",
    excerpt:
      "Implementing a resilient broadcasting system for enterprise event management using Django and background workers.",
    content: `
      <p>Notifications are easy until they're not.</p>
      <p>Sending one WhatsApp message is a simple API call. Sending 1,000 messages for an enterprise event while ensuring delivery, handling rate limits, and keeping your API responsive? That's an engineering challenge.</p>
      <p>In my recent work on the Employee Management System (EMS), I had to build a broadcasting layer that could handle instant event alerts for thousands of employees.</p>
      <p>The architecture relies on three pillars:</p>
      <ul>
        <li><strong>Django Signals:</strong> To trigger notification workflows whenever a new event is created or updated.</li>
        <li><strong>Celery Task Queue:</strong> To offload the heavy lifting. We don't want the event creation request to hang while waiting for the Twilio API.</li>
        <li><strong>Twilio WhatsApp API:</strong> The delivery mechanism.</li>
      </ul>
      <p>One critical lesson: <strong>Batching is your friend, but retries are your lifesaver.</strong> We implemented exponential backoff for failed deliveries to handle intermittent network issues without overloading the API.</p>
      <p>The result is a system that feels instantaneous to the admin, while the background workers quietly handle the orchestration of thousands of messages.</p>
    `,
    tags: ["Twilio", "Django", "Celery", "WhatsApp"],
    readingTime: "5 min read",
    slug: "scaling-whatsapp-notifications-celery",
    publishedAt: "2026-05-01",
  },
];

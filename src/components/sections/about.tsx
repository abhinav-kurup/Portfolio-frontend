"use client";

import { motion } from "framer-motion";
import { Server, Network, Container, Brain } from "lucide-react";
import { siteConfig, valueCards } from "@/data/site";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={24} className="text-white" />,
  Network: <Network size={24} className="text-white" />,
  Container: <Container size={24} className="text-white" />,
  Brain: <Brain size={24} className="text-white" />,
};

export function AboutSection() {
  return (
    <section id="about" className="px-6 pt-12 pb-20 md:pt-20 md:pb-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-[1400px]"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-14 border-b border-white/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
            <span>// 01.</span>
            <span>CAPABILITIES & ARCHITECTURE</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Engineering Capabilities
          </h2>
          <p className="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed text-zinc-400">
            {siteConfig.description} Specializing in event-driven microservices, high-throughput REST APIs, vector search infrastructure, and deterministic LLM tool calling.
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {valueCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeIn}
              className="group relative rounded-2xl border border-white/15 bg-zinc-950/80 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            >
              <TechCorners />
              <div className="mb-3 font-mono text-xs text-zinc-500 font-bold">
                [ MODULE_0{i + 1} ]
              </div>
              <div className="mb-5 inline-flex rounded-xl border border-white/20 bg-zinc-900 p-3.5 shadow-inner transition-colors group-hover:bg-white group-hover:text-black">
                {iconMap[card.icon] ?? null}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                {card.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-zinc-400">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}



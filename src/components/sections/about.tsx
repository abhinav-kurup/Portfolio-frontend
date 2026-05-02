"use client";

import { motion } from "framer-motion";
import { Server, Network, Container, Brain } from "lucide-react";
import { siteConfig, valueCards, stats } from "@/data/site";
import { fadeIn, staggerContainer } from "@/lib/motion";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server size={20} />,
  Network: <Network size={20} />,
  Container: <Container size={20} />,
  Brain: <Brain size={20} />,
};

export function AboutSection() {
  return (
    <section id="about" className="px-6 pt-8 pb-16 md:pt-12 md:pb-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-6xl"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            About
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            What I do
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground/80">
            {siteConfig.description}
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeIn}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {iconMap[card.icon] ?? null}
              </div>
              <h3 className="text-base font-bold text-foreground">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground/80">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

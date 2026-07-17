"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-6xl"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-12">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground font-mono">
            [02] Skills
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Tech I work with
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeIn}
          className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${activeCategory === cat
                  ? "border-foreground/20 bg-foreground text-background"
                  : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skill badges */}
        <motion.div
          variants={fadeIn}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="relative group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40 hover:bg-muted/30"
            >
              <TechCorners />
              <span className="text-sm font-medium text-foreground">
                {skill.name}
              </span>
              {skill.inProduction && (
                <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" title="Used in production" />
              )}
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div variants={fadeIn} className="mt-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-xs text-muted-foreground">
            Used in production
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

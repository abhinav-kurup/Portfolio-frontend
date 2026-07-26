"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "@/data/skills";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";
import { Cpu } from "lucide-react";

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
        className="mx-auto max-w-[1400px]"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-10 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
            <span>// 02.</span>
            <span>TECH STACK MATRIX</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Core Technologies
          </h2>
          <p className="mt-2 text-sm font-mono text-zinc-400">
            [TOTAL SKILLS: {skills.length}] // Filtered by technology domain
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeIn}
          className="mb-8 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none font-mono text-xs"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-lg border px-4 py-2 transition-all ${
                activeCategory === cat
                  ? "border-white bg-white font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "border-white/15 bg-zinc-950/80 text-zinc-400 hover:border-white/40 hover:text-white"
              }`}
            >
              [ {cat.toUpperCase()} ]
            </button>
          ))}
        </motion.div>

        {/* Skill badges grid */}
        <motion.div
          variants={fadeIn}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        >
          {filtered.map((skill) => (
            <div
              key={skill.name}
              className="relative group flex items-center justify-between rounded-xl border border-white/15 bg-zinc-950/80 px-4 py-4 backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-zinc-900/90 hover:scale-[1.02]"
            >
              <TechCorners />
              <div className="flex items-center gap-2.5">
                <Cpu size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
                <span className="font-mono text-xs font-bold text-zinc-200 group-hover:text-white transition-colors">
                  {skill.name}
                </span>
              </div>
              {skill.inProduction ? (
                <span
                  className="rounded border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-400"
                  title="Used in production systems"
                >
                  PROD
                </span>
              ) : (
                <span
                  className="rounded border border-white/10 bg-zinc-900 px-1.5 py-0.5 font-mono text-[9px] text-zinc-500"
                >
                  DEV
                </span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div variants={fadeIn} className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PROD = Deployed in production</span>
          </div>
          <span>//</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-zinc-600" />
            <span>DEV = Advanced architecture expertise</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}



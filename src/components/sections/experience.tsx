"use client";

import { motion } from "framer-motion";
import { Briefcase, Terminal } from "lucide-react";
import { experiences } from "@/data/experience";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-[1400px]"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
            <span>// 04.</span>
            <span>CAREER LOG & EXECUTION</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Professional Experience
          </h2>
          <p className="mt-2 text-sm font-mono text-zinc-400">
            Track record of engineering scalable backends, automated pipelines, and field ops software
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-white/20 md:before:left-[9px]">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeIn}
              className="relative pl-10 md:pl-12"
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-black md:h-5 md:w-5 shadow-[0_0_10px_rgba(255,255,255,0.4)]">
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              </div>

              {/* Experience Card */}
              <div className="group relative rounded-2xl border border-white/15 bg-zinc-950/80 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]">
                <TechCorners />
                
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-zinc-400 mt-1">
                      @ {exp.company.toUpperCase()}
                    </p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/15 bg-zinc-900 px-3.5 py-1.5 font-mono text-xs font-bold text-zinc-300">
                    <Terminal size={13} className="text-zinc-500" />
                    {exp.period}
                  </span>
                </div>

                {/* Impact description */}
                <div className="mt-6 space-y-2">
                  <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                    <span className="font-mono text-emerald-400 font-bold mr-2">+</span>
                    {exp.impact}
                  </p>
                </div>

                {/* Stack tags */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5">
                  <span className="font-mono text-xs text-zinc-500 font-bold mr-1">STACK:</span>
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/15 bg-zinc-900 px-3 py-1 font-mono text-xs font-semibold text-zinc-300 group-hover:border-white/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}



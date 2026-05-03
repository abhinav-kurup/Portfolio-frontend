"use client";

import { motion } from "framer-motion";
import { Briefcase, MessageSquare } from "lucide-react";
import { experiences } from "@/data/experience";
import { fadeIn, staggerContainer } from "@/lib/motion";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding">
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
            Experience
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Where I&apos;ve worked
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border/60 md:before:left-[9px]">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              variants={fadeIn}
              className="relative pl-10 md:pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-border bg-background md:h-5 md:w-5">
                <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
              </div>

              {/* Card */}
              <div className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {exp.company}
                    </p>
                  </div>
                </div>

                {/* Impact bullets */}
                <ul className="mt-5 space-y-3">
                  {exp.impact.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground/80"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40 group-hover:bg-primary/60 transition-colors" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Stack tags + Ask AI */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/40 pt-5">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-muted/50 border border-border/40 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
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

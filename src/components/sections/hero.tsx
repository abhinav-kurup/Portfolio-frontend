"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, stats } from "@/data/site";
import { fadeIn, fadeInDelay, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-start px-6 pt-20 pb-12 md:pt-32 md:pb-20"
    >
      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-6xl"
      >
        {/* Status badge */}
        <motion.div variants={fadeIn} className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeIn}
          className="max-w-3xl font-heading text-6xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
        >
          <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            {siteConfig.name}
          </span>
          <span className="text-primary">.</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={fadeInDelay(0.1)}
          className="mt-3 text-xl font-medium text-muted-foreground sm:text-2xl"
        >
          {siteConfig.role}
        </motion.p>

        {/* Value prop */}
        <motion.p
          variants={fadeInDelay(0.2)}
          className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground/80"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInDelay(0.3)}
          className="mt-12 flex flex-col gap-5 sm:flex-row"
        >
          <Button
            size="lg"
            className="group/btn h-14 min-w-[220px] rounded-xl px-8 text-base shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <a href="#projects" className="flex items-center justify-center gap-2">
              View Projects
              <ArrowDown size={20} className="transition-transform group-hover/btn:translate-y-1" />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-14 min-w-[220px] rounded-xl border-border/60 bg-background/50 px-8 text-base backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-muted/30 hover:scale-[1.02] active:scale-[0.98]"
            asChild
          >
            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <FileText size={20} />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Trust strip / stats */}
        <motion.div
          variants={fadeInDelay(0.4)}
          className="mt-16 grid grid-cols-2 gap-8 border-t border-border/40 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="group/stat transition-transform hover:-translate-y-1">
              <p className="text-4xl font-bold text-foreground group-hover/stat:text-primary transition-colors sm:text-5xl">{stat.value}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 group-hover/stat:text-muted-foreground transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

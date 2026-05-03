"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileText, MessageSquare } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { siteConfig, stats } from "@/data/site";
import { fadeIn, fadeInDelay, staggerContainer } from "@/lib/motion";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-start px-6 pt-12 pb-12 md:pt-20 md:pb-20"
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

        {/* Terminal Status Badges */}
        <motion.div variants={fadeIn} className="mb-10 flex flex-wrap items-center gap-4">
          <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-primary/20 bg-[#0a0a0a] px-4 py-2 font-mono text-xs tracking-tight text-primary/90 shadow-2xl">
            <span className="text-emerald-500">$</span>
            <span className="text-muted-foreground">status</span>
            <span className="text-primary/40">→</span>
            <span className="animate-pulse text-emerald-400">available_for_opportunities</span>
          </div>

          <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-white/5 bg-[#0a0a0a] px-4 py-2 font-mono text-xs tracking-tight text-muted-foreground/80 shadow-2xl">
            <span className="text-blue-500">$</span>
            <span className="text-muted-foreground/60">currently_building</span>
            <span className="text-primary/40">→</span>
            <span className="text-blue-400/80">ai_chat_backend</span>
          </div>
        </motion.div>

        {/* Headline & Photo */}
        <div className="flex flex-col items-start gap-12 md:flex-row md:items-center lg:gap-24">
          <div className="flex-1">
            <motion.h1
              variants={fadeIn}
              className="font-heading text-7xl font-bold leading-[1.0] tracking-tight text-foreground sm:text-8xl lg:text-9xl"
            >
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary/50 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              <span className="text-primary">.</span>
            </motion.h1>

            {/* Role & Secondary Role */}
            <motion.div
              variants={fadeInDelay(0.1)}
              className="mt-6 flex items-center gap-4 text-xl font-medium sm:text-2xl"
            >
              <span className="text-foreground">{siteConfig.role}</span>
              <div className="h-[2px] w-8 bg-primary/40" />
              <span className="text-muted-foreground/60 font-normal">API Architect</span>
            </motion.div>

            {/* Value prop */}
            <motion.p
              variants={fadeInDelay(0.2)}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground/80"
            >
              I build robust, scalable backend systems that power real products. Clean code. Real impact.
            </motion.p>
          </div>

          {/* Photo with Ring & Experience */}
          <motion.div
            variants={fadeInDelay(0.1)}
            className="relative flex-shrink-0"
          >
            {/* Rotating Ring */}
            <div className="absolute -inset-4 animate-[spin_8s_linear_infinite] rounded-full border-2 border-transparent border-t-primary/30 border-r-primary/10" />

            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-background bg-muted shadow-2xl sm:h-56 sm:w-56 md:h-72 md:w-72 lg:h-80 lg:w-80">
              <Image
                src={siteConfig.avatarUrl}
                alt={siteConfig.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
                priority
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 288px, 320px"
              />
            </div>

            {/* Experience Badge */}
            <div className="absolute -right-2 bottom-6 md:right-4 md:bottom-10">
              <div className="flex items-center gap-2 rounded-xl border border-primary/20 bg-background/90 px-4 py-2 font-mono text-xs backdrop-blur-md shadow-xl">
                <span className="text-primary/40">{"{"}</span>
                <span className="text-primary font-bold">2yrs exp</span>
                <span className="text-primary/40">{"}"}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTAs */}
        <motion.div
          variants={fadeInDelay(0.3)}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch"
        >
          <a 
            href="#projects" 
            className={cn(
              buttonVariants({ size: "lg" }),
              "group/btn w-full sm:w-[210px] h-auto py-3.5 rounded-xl px-6 text-sm font-semibold shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            )}
          >
            View Projects
            <ArrowDown size={18} className="transition-transform group-hover/btn:translate-y-1" />
          </a>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-[320px] h-auto py-3.5 rounded-xl border-border/60 bg-background/50 px-5 text-left whitespace-normal backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-muted/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-start gap-3"
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageSquare size={20} />
            </div>
            <div className="flex flex-col gap-1 items-start">
              <span className="text-sm font-bold leading-none text-foreground">Ask My AI</span>
              <span className="text-[10px] sm:text-[11px] leading-tight text-muted-foreground/70 font-mono tracking-tight text-left">Powered by RAG and production-grade overthinking.</span>
            </div>
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
              <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70 group-hover/stat:text-muted-foreground transition-colors">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-1 text-xs italic text-muted-foreground/50 group-hover/stat:text-muted-foreground/70 transition-colors">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

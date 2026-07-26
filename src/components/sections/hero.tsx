"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, FileText, MessageSquare, Terminal, Copy, Check, Shield, Cpu, Activity } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { siteConfig, stats } from "@/data/site";
import { fadeIn, fadeInDelay, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "contact">("profile");
  const [timeString, setTimeString] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST time format
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTimeString(now.toLocaleTimeString("en-US", options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const terminalCommand =
    activeTab === "profile"
      ? `cat ~/candidate_profile.spec`
      : `cat ~/contact_channels.txt`;

  const fullCandidateInfo = `Name: Abhinav Kurup
Role: AI & Backend Engineer (2+ Yrs Experience)
BASE: India (Open to Remote / Relocation)
Email: abhinavkurup00@gmail.com
LinkedIn: https://linkedin.com/in/abhinav-kurup
GitHub: https://github.com/abhinav-kurup
Core Technologies: Python 3.12, FastAPI, LangGraph, LangChain, Celery, Redis, PostgreSQL, AWS, Docker`;

  const copyAllCandidateInfo = () => {
    navigator.clipboard.writeText(fullCandidateInfo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-start px-6 pt-16 pb-12 md:pt-24 md:pb-24 overflow-hidden"
    >
      {/* Background radial spotlights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[700px] w-[1000px] rounded-full bg-white/[0.035] blur-[150px]" />
      </div>

      {/* Engineering Blueprint Annotation Header */}
      <div className="mx-auto w-full max-w-[1400px] mb-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-500 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Activity size={13} className="text-emerald-400 animate-pulse" />
            <span className="font-bold text-white">PORTFOLIO // V2.5</span>
          </span>
          <span>//</span>
          <span>GOA_IN ({timeString ? `${timeString} IST` : "15.29°N 74.12°E"})</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>BUILD: STABLE</span>
          <span>STACK: FASTAPI + LANGGRAPH</span>
          <span className="text-emerald-400 font-bold">● LIVE</span>
        </div>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-[1400px]"
      >
        {/* Terminal Status Badges */}
        <motion.div variants={fadeIn} className="mb-10 flex flex-wrap items-center gap-3">
          <div className="relative group inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-zinc-950/80 px-4 py-2 font-mono text-xs text-white shadow-lg backdrop-blur-md">
            <TechCorners />
            <span className="text-emerald-400 font-bold">$</span>
            <span className="text-zinc-400">status</span>
            <span className="text-zinc-600">→</span>
            <span className="text-emerald-400 font-medium tracking-tight">available_for_opportunities</span>
          </div>

          <div className="relative group inline-flex items-center gap-2.5 rounded-lg border border-white/15 bg-zinc-950/80 px-4 py-2 font-mono text-xs text-white shadow-lg backdrop-blur-md">
            <TechCorners />
            <span className="text-white font-bold">$</span>
            <span className="text-zinc-400">focus</span>
            <span className="text-zinc-600">→</span>
            <span className="text-white font-medium tracking-tight">ai_integrated_backends</span>
          </div>
        </motion.div>

        {/* Headline & Photo Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <motion.h1
              variants={fadeIn}
              className="font-heading text-6xl font-extrabold leading-[0.95] tracking-tighter text-white sm:text-7xl lg:text-8xl xl:text-9xl"
            >
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
              <span className="text-white">.</span>
            </motion.h1>

            {/* Role & Secondary Role */}
            <motion.div
              variants={fadeInDelay(0.1)}
              className="mt-6 flex flex-wrap items-center gap-4 text-xl font-mono sm:text-2xl"
            >
              <span className="font-bold text-white">{siteConfig.role}</span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400">LLM & API Architect</span>
            </motion.div>

            {/* Value prop */}
            <motion.p
              variants={fadeInDelay(0.2)}
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400"
            >
              {siteConfig.tagline} Building production RAG pipelines, asynchronous microservices, and high-performance Python backends.
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              variants={fadeInDelay(0.3)}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group/btn w-full sm:w-auto py-4 rounded-xl px-8 text-sm font-bold bg-white text-black hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)] border border-white"
                )}
              >
                [ VIEW_PROJECTS ]
                <ArrowDown size={16} className="transition-transform group-hover/btn:translate-y-1" />
              </a>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto py-4 rounded-xl border border-white/20 bg-zinc-950/80 px-7 font-mono text-xs text-white backdrop-blur-md transition-all hover:border-white hover:bg-zinc-900 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2.5"
                onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
              >
                <MessageSquare size={16} className="text-white" />
                <span>&gt;_ ASK_AI_AGENT</span>
              </Button>
            </motion.div>
          </div>

          {/* Avatar Viewport & Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              variants={fadeInDelay(0.1)}
              className="relative"
            >
              {/* Tech Viewport Box */}
              <div className="relative p-3.5 rounded-2xl border border-white/15 bg-zinc-950/90 shadow-2xl backdrop-blur-xl group">
                <TechCorners />

                <div className="relative h-64 w-64 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 sm:h-72 sm:w-72 lg:h-80 lg:w-80">
                  <Image
                    src={siteConfig.avatarUrl}
                    alt={siteConfig.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 256px, (max-width: 1024px) 288px, 320px"
                  />
                  {/* Subtle scanline overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] opacity-20" />
                </div>

                {/* AWS Certified Pill Badge */}
                <a
                  href="#certifications"
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 w-max cursor-pointer"
                >
                  <div className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-950/95 px-4 py-2 backdrop-blur-xl shadow-xl transition-all hover:border-white hover:scale-105">
                    <Shield size={14} className="text-white" />
                    <span className="font-mono text-[10px] font-bold tracking-wider text-white">AWS_CERTIFIED_SOLUTIONS</span>
                  </div>
                </a>

                {/* Experience Floating Badge */}
                <div className="absolute -left-6 top-6 z-20">
                  <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-zinc-950/95 px-3.5 py-2 font-mono text-xs shadow-2xl backdrop-blur-xl">
                    <Cpu size={14} className="text-white" />
                    <span className="text-white font-bold">2+ YRS EXP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Interactive CLI / Terminal Console Simulator Block */}
        <motion.div variants={fadeInDelay(0.35)} className="mt-16">
          <div className="relative rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl overflow-hidden">
            <TechCorners />

            {/* Terminal Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/60 px-5 py-3 font-mono text-xs">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                  <div className="h-3 w-3 rounded-full bg-zinc-700" />
                </div>
                <span className="ml-2 text-zinc-400 font-bold">abhinav@dev-workstation:~</span>
              </div>

              {/* Terminal Tabs & Copy All Button */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={cn(
                    "px-3 py-1 rounded transition-colors text-xs font-mono",
                    activeTab === "profile" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                  )}
                >
                  profile
                </button>
                <button
                  onClick={() => setActiveTab("contact")}
                  className={cn(
                    "px-3 py-1 rounded transition-colors text-xs font-mono",
                    activeTab === "contact" ? "bg-white text-black font-bold" : "text-zinc-400 hover:text-white"
                  )}
                >
                  contact
                </button>

                <button
                  onClick={copyAllCandidateInfo}
                  className="ml-2 flex items-center gap-1.5 rounded-lg border border-white/20 bg-zinc-900 px-3 py-1 font-mono text-xs font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all shadow-sm"
                  title="Copy Candidate Profile & Details"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-bold">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY_ALL_INFO</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-4 bg-black/60">
              <div className="flex items-center gap-2 text-zinc-400">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-white font-semibold">{terminalCommand}</span>
              </div>

              {activeTab === "profile" && (
                <div className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    <p><span className="text-zinc-500 font-bold">NAME        :</span> <span className="text-white font-bold">Abhinav Kurup</span></p>
                    <p><span className="text-zinc-500 font-bold">ROLE        :</span> <span className="text-white font-bold">AI & Backend Engineer</span></p>
                    <p><span className="text-zinc-500 font-bold">EXPERIENCE  :</span> <span className="text-white font-bold">2+ Years Production</span></p>
                    <p><span className="text-zinc-500 font-bold">BASE    :</span> <span className="text-white font-bold">India (Open to Remote / Relocation)</span></p>
                    <p><span className="text-zinc-500 font-bold">EMAIL       :</span> <a href="mailto:abhinavkurup00@gmail.com" className="text-emerald-400 hover:underline font-bold">abhinavkurup00@gmail.com</a></p>
                    <p><span className="text-zinc-500 font-bold">LINKEDIN    :</span> <a href="https://linkedin.com/in/abhinav-kurup" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">linkedin.com/in/abhinav-kurup</a></p>
                    <p><span className="text-zinc-500 font-bold">GITHUB      :</span> <a href="https://github.com/abhinav-kurup" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">github.com/abhinav-kurup</a></p>
                    <p><span className="text-zinc-500 font-bold">STATUS      :</span> <span className="text-emerald-400 font-bold">Open to Backend & AI Roles</span></p>
                  </div>
                  <div className="border-t border-white/10 pt-3">
                    <p><span className="text-zinc-500 font-bold">FOCUS       :</span> <span className="text-zinc-200">Production RAG Systems, High-Performance FastAPI Microservices, Celery Queues, & Multi-Agent LLM Orchestration</span></p>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-3 pt-1 text-zinc-300">
                  <p className="text-zinc-400">Direct Contact Details & Social Links:</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a
                      href="mailto:abhinavkurup00@gmail.com"
                      className="rounded-lg border border-white/20 bg-zinc-900 px-4 py-2 font-mono text-xs font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all"
                    >
                      [ EMAIL: abhinavkurup00@gmail.com ]
                    </a>
                    <a
                      href="https://linkedin.com/in/abhinav-kurup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/20 bg-zinc-900 px-4 py-2 font-mono text-xs font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all"
                    >
                      [ LINKEDIN ]
                    </a>
                    <a
                      href="https://github.com/abhinav-kurup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/20 bg-zinc-900 px-4 py-2 font-mono text-xs font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all"
                    >
                      [ GITHUB ]
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Strip */}
        <motion.div
          variants={fadeInDelay(0.45)}
          className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className="group relative rounded-xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-zinc-900/60"
            >
              <TechCorners />
              <div className="font-mono text-[10px] text-zinc-500 mb-1">0{idx + 1}_METRIC</div>
              <p className="text-3xl font-extrabold text-white transition-colors group-hover:text-white sm:text-4xl lg:text-5xl font-mono">
                {stat.value}
              </p>
              <p className="mt-2.5 font-mono text-xs font-bold tracking-widest text-zinc-400 group-hover:text-white transition-colors uppercase">
                {stat.label}
              </p>
              {stat.description && (
                <p className="mt-1 text-xs italic text-zinc-500">
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



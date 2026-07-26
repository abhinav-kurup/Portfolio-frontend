"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Command } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-8">
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between rounded-full border border-white/15 bg-zinc-950/80 px-6 sm:px-8 backdrop-blur-xl shadow-2xl transition-all">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white text-black font-extrabold text-xs">
              A
            </div>
            <span>{siteConfig.name}</span>
            <span className="rounded border border-white/20 bg-zinc-900 px-1.5 py-0.5 text-[10px] text-zinc-400">.DEV</span>
          </a>

          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              ONLINE <span className="text-zinc-600">//</span> 200ms
            </span>
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button / Terminal Trigger */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-4 py-1.5 font-mono text-xs text-zinc-200 hover:border-white hover:bg-white hover:text-black transition-all group shadow-sm"
          >
            <Terminal size={13} className="text-zinc-400 group-hover:text-black transition-colors" />
            <span>ASK_AI</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded bg-zinc-800 group-hover:bg-zinc-200 px-1 text-[9px] text-zinc-400 group-hover:text-zinc-700">
              <Command size={10} />K
            </kbd>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-[1400px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 p-4 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1 font-mono text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-4 py-3 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    window.dispatchEvent(new CustomEvent("open-chat"));
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white py-2.5 font-bold text-black text-xs"
                >
                  <Terminal size={14} />
                  ASK_AI_AGENT
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}



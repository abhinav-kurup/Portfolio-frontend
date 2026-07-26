"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Link, Code, FileText, Loader2, CheckCircle2, AlertCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/data/site";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrorMessage("");

    try {
      let baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/chat\/?$/, "") || "http://127.0.0.1:8000/api";
      
      const response = await fetch(`${baseUrl}/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="section-padding">
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
            <span>// 06.</span>
            <span>DIRECT TRANSMISSION & TERMINAL</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Initiate Contact
          </h2>
          <p className="mt-2 text-sm font-mono text-zinc-400 max-w-xl">
            Have an open role, engineering proposal, or technical inquiry? Transmit a message below or connect via direct channels.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Contact form - Terminal Input Box */}
          <motion.div variants={fadeIn} className="lg:col-span-7">
            <div className="relative rounded-2xl border border-white/15 bg-zinc-950/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
              <TechCorners />

              <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">TRANSMISSION_FORM_V1.0</span>
                </div>
                <span>ENCRYPTED_TLS</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block font-bold text-zinc-300"
                    >
                      &gt; INPUT_NAME:
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm font-sans text-white placeholder:text-zinc-600 backdrop-blur-sm transition-all focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block font-bold text-zinc-300"
                    >
                      &gt; INPUT_EMAIL:
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm font-sans text-white placeholder:text-zinc-600 backdrop-blur-sm transition-all focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                      placeholder="you@domain.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block font-bold text-zinc-300"
                  >
                    &gt; MESSAGE_PAYLOAD:
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-none rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-sm font-sans text-white placeholder:text-zinc-600 backdrop-blur-sm transition-all focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                    placeholder="Describe project details, roles, or inquiries..."
                  />
                </div>

                <div className="flex flex-col gap-4 pt-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 w-full sm:w-auto px-8 font-mono text-xs font-bold bg-white text-black hover:bg-zinc-200 transition-all active:scale-[0.98] border border-white shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                    {isSubmitting ? "[ TRANSMITTING... ]" : "[ TRANSMIT_MESSAGE ]"}
                  </Button>

                  {/* Status Messages */}
                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-4 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30"
                      >
                        <CheckCircle2 size={18} />
                        [ TRANSMISSION_SUCCESSFUL ] Thank you for reaching out! I&apos;ll respond promptly.
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-xs font-mono font-bold text-red-400 border border-red-500/30"
                      >
                        <AlertCircle size={18} />
                        [ ERROR ]: {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Quick links & Direct Email */}
          <motion.div variants={fadeIn} className="lg:col-span-5 space-y-4">
            {/* Email Card with Copy Button */}
            <div className="group relative flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-zinc-950/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90">
              <TechCorners />
              <div className="flex items-center gap-4">
                <div className="rounded-xl border border-white/20 bg-zinc-900 p-3.5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="font-mono text-xs font-bold text-white">DIRECT_EMAIL</p>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5">
                    {siteConfig.email}
                  </p>
                </div>
              </div>
              <button
                onClick={copyEmailToClipboard}
                className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-zinc-900 px-3 py-1.5 font-mono text-xs font-bold text-white hover:border-white hover:bg-white hover:text-black transition-all"
                title="Copy Email"
              >
                {copiedEmail ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* GitHub Card */}
            <a
              href="https://github.com/abhinav-kurup"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 rounded-2xl border border-white/15 bg-zinc-950/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90"
            >
              <TechCorners />
              <div className="rounded-xl border border-white/20 bg-zinc-900 p-3.5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                <Code size={22} />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs font-bold text-white">GITHUB_PROFILE</p>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">github.com/abhinav-kurup</p>
              </div>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">&rarr;</span>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/abhinav-kurup"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 rounded-2xl border border-white/15 bg-zinc-950/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90"
            >
              <TechCorners />
              <div className="rounded-xl border border-white/20 bg-zinc-900 p-3.5 text-white transition-colors group-hover:bg-white group-hover:text-black">
                <Link size={22} />
              </div>
              <div className="flex-1">
                <p className="font-mono text-xs font-bold text-white">LINKEDIN_NETWORK</p>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">linkedin.com/in/abhinav-kurup</p>
              </div>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}



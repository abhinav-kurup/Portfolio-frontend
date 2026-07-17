"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Link, Code, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    setErrorMessage("");

    try {
      // Get base URL from env or default to local
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
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    } catch (err: any) {
      console.error("Contact submission error:", err);
      setStatus("error");
      setErrorMessage(err.message || "Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
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
            [07] Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s connect
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground/80">
            Have a project in mind or want to chat? Reach out through the form
            below or connect directly.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Contact form */}
          <motion.form
            variants={fadeIn}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold tracking-tight text-foreground"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 backdrop-blur-sm transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold tracking-tight text-foreground"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 backdrop-blur-sm transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-semibold tracking-tight text-foreground"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-none rounded-xl border border-border/50 bg-card/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 backdrop-blur-sm transition-all focus:border-primary/50 focus:ring-4 focus:ring-primary/5 focus:outline-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <div className="flex flex-col gap-4">
              <Button 
                type="submit" 
                size="lg" 
                className="h-12 w-full rounded-xl sm:w-auto px-8 transition-all active:scale-[0.98]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="mr-2 animate-spin" />
                ) : (
                  <Send size={16} className="mr-2" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {/* Status Messages */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-xl bg-emerald-500/10 p-4 text-sm font-medium text-emerald-500 border border-emerald-500/20"
                  >
                    <CheckCircle2 size={18} />
                    Thanks for reaching out! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-xl bg-destructive/10 p-4 text-sm font-medium text-destructive border border-destructive/20"
                  >
                    <AlertCircle size={18} />
                    {errorMessage}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          {/* Quick links */}
          <motion.div variants={fadeIn} className="space-y-4 lg:mt-[-190px]">
            <div className="group relative flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card hover:shadow-md">
              <TechCorners />
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Email</p>
                <p className="text-xs font-medium text-muted-foreground/70">
                  {siteConfig.email}
                </p>
              </div>
            </div>

            <a
              href="https://github.com/abhinav-kurup"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
            >
              <TechCorners />
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Code size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">GitHub</p>
                <p className="text-xs font-medium text-muted-foreground/70">github.com/abhinav-kurup</p>
              </div>
            </a>

            <a
              href="https://linkedin.com/in/abhinav-kurup"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-4 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-card hover:shadow-md"
            >
              <TechCorners />
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Link size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">LinkedIn</p>
                <p className="text-xs font-medium text-muted-foreground/70">linkedin.com/in/abhinav-kurup</p>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

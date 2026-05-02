"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Link, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/data/site";
import { fadeIn, staggerContainer } from "@/lib/motion";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire up to backend or email service
    console.log("Contact form submitted:", formData);
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
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Let&apos;s connect
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground/80">
            Have a project in mind or want to chat? Reach out through the form
            below or connect directly.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
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
            <Button type="submit" size="lg" className="h-12 w-full rounded-xl sm:w-auto px-8">
              <Send size={16} className="mr-2" />
              Send Message
            </Button>
          </motion.form>

          {/* Quick links */}
          <motion.div variants={fadeIn} className="space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Email</p>
                <p className="text-xs font-medium text-muted-foreground/70">
                  {siteConfig.email}
                </p>
              </div>
            </a>

            {socialLinks.map((link) => {
              const Icon =
                link.icon === "Github"
                  ? Code
                  : link.icon === "Linkedin"
                    ? Link
                    : Mail;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      {link.label}
                    </p>
                    <p className="text-xs font-medium text-muted-foreground/70">{link.href}</p>
                  </div>
                </a>
              );
            })}

            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="rounded-xl bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <FileText size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Resume</p>
                <p className="text-xs font-medium text-muted-foreground/70">Download PDF</p>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { fadeIn, staggerContainer } from "@/lib/motion";

export function WritingSection() {
  return (
    <section id="writing" className="section-padding">
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
            Writing
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            How I think
          </h2>
        </motion.div>

        {/* Post cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <motion.a
              key={post.id}
              variants={fadeIn}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-primary/5 border border-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                {post.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/40">
                <span className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-widest">
                  {post.readingTime}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:opacity-80">
                  Read More
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { TechCorners } from "@/components/tech-corners";

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    icon: "/aws-clf02.png",
    link: "https://drive.google.com/file/d/1JS_n-VeABG7yLbOH2oB3UF9NX4CU4vJA/view?usp=sharing",
    type: "image"
  },
  {
    title: "The Complete Cyber Security Course : Hackers Exposed!",
    organization: "Udemy",
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1pYUeUsAiFnFXfuYFXGRJA7yrJ3iyNo0n/view?usp=sharing",
    type: "icon",
    color: "text-purple-500"
  }
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="section-padding">
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
            [03] Certifications
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Professional Credentials
          </h2>
        </motion.div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <TechCorners />
              {/* Subtle glow effect */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-[100px] transition-all group-hover:bg-primary/10" />

              <div className="flex h-full flex-col items-start gap-6 sm:flex-row sm:items-start">
                {/* Badge Icon / Image */}
                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-white/5 transition-all group-hover:bg-white/10 sm:h-20 sm:w-20">
                  {cert.type === "image" ? (
                    <div className="relative h-full w-full p-3">
                      <Image
                        src={cert.icon as string}
                        alt={cert.title}
                        fill
                        className="object-contain grayscale transition-all group-hover:grayscale-0"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <cert.icon className={`h-10 w-10 ${cert.color} sm:h-12 sm:w-12`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col self-stretch">
                  <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-base font-medium text-muted-foreground/60">
                    {cert.organization}
                  </p>
 
                  {/* Certificate Button */}
                  <div className="mt-auto pt-6">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary transition-all hover:border-primary hover:bg-primary/20"
                    >
                      <ExternalLink size={16} />
                      Certificate
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

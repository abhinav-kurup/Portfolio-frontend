"use client";

import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { ExternalLink, ShieldCheck, Award } from "lucide-react";
import { TechCorners } from "@/components/tech-corners";

const certifications = [
  {
    title: "AWS Cloud Practitioner",
    organization: "Amazon Web Services",
    icon: "/aws-clf02.png",
    link: "https://drive.google.com/file/d/1JS_n-VeABG7yLbOH2oB3UF9NX4CU4vJA/view?usp=sharing",
    type: "image",
    credentialId: "AWS-CLF-02 // VERIFIED",
  },
  {
    title: "The Complete Cyber Security Course : Hackers Exposed!",
    organization: "Udemy",
    icon: ShieldCheck,
    link: "https://drive.google.com/file/d/1pYUeUsAiFnFXfuYFXGRJA7yrJ3iyNo0n/view?usp=sharing",
    type: "icon",
    color: "text-white",
    credentialId: "UDEMY-SEC-01 // VERIFIED",
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
        className="mx-auto max-w-[1400px]"
      >
        {/* Section header */}
        <motion.div variants={fadeIn} className="mb-12 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
            <span>// 03.</span>
            <span>VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Professional Certifications
          </h2>
          <p className="mt-2 text-sm font-mono text-zinc-400">
            Official cloud and security certifications verified by accredited issuers
          </p>
        </motion.div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeIn}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/80 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
            >
              <TechCorners />
              {/* Subtle monochrome ambient glow */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/[0.03] blur-[100px] transition-all group-hover:bg-white/[0.08]" />

              <div className="flex h-full flex-col items-start gap-6 sm:flex-row sm:items-start">
                {/* Badge Icon / Image */}
                <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-white/20 bg-zinc-900 shadow-xl transition-all group-hover:scale-105 sm:h-20 sm:w-20">
                  {cert.type === "image" ? (
                    <div className="relative h-full w-full p-3">
                      <Image
                        src={cert.icon as string}
                        alt={cert.title}
                        fill
                        className="object-contain filter grayscale group-hover:grayscale-0 transition-all"
                        sizes="80px"
                      />
                    </div>
                  ) : (
                    <cert.icon className={`h-10 w-10 text-white sm:h-12 sm:w-12`} />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col self-stretch">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-zinc-400">
                      {cert.credentialId}
                    </span>
                    <Award size={16} className="text-zinc-500 group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl group-hover:text-white transition-colors">
                    {cert.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-semibold text-zinc-400">
                    ISSUER: {cert.organization.toUpperCase()}
                  </p>

                  {/* Certificate Button */}
                  <div className="mt-auto pt-6">
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-zinc-900/90 px-4 py-2 font-mono text-xs font-bold text-white transition-all hover:border-white hover:bg-white hover:text-black shadow-md"
                    >
                      <ExternalLink size={14} />
                      VERIFY_CERTIFICATE
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



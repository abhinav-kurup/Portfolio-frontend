"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code, ExternalLink, Terminal, Cpu } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { TechCorners } from "@/components/tech-corners";

import { projects, projectCategories } from "@/data/projects";

export function ProjectsSection() {
	const [activeCategory, setActiveCategory] = useState("All");
	const sliderRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const filtered =
		activeCategory === "All"
			? projects
			: projects.filter((p) => p.category === activeCategory);

	// Only duplicate if 4 or more projects to enable infinite carousel without showing duplicate cards side-by-side
	const displayProjects = filtered.length >= 4 ? [...filtered, ...filtered] : filtered;

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.scrollLeft = 0;
		}
	}, [activeCategory]);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider || filtered.length < 4) return;

		let animationFrameId: number;
		let lastTime = performance.now();
		const speed = 35; // Pixels per second

		const step = (time: number) => {
			const deltaTime = (time - lastTime) / 1000;
			lastTime = time;

			if (!isHovered && slider.children.length > filtered.length) {
				const firstDup = slider.children[filtered.length] as HTMLElement;
				const firstOrig = slider.children[0] as HTMLElement;
				if (firstDup && firstOrig) {
					const resetDistance = firstDup.offsetLeft - firstOrig.offsetLeft;
					if (resetDistance > slider.clientWidth) {
						let currentScroll = slider.scrollLeft;
						if (currentScroll >= resetDistance) {
							currentScroll = currentScroll - resetDistance;
						} else if (currentScroll < 0) {
							currentScroll = 0;
						}
						slider.scrollLeft = currentScroll + speed * deltaTime;
					}
				}
			}

			animationFrameId = requestAnimationFrame(step);
		};

		animationFrameId = requestAnimationFrame(step);

		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [isHovered, filtered.length]);

	return (
		<section id="projects" className="section-padding relative overflow-hidden">
			{/* Background radial glow */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[140px]" />
			</div>

			<motion.div
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="mx-auto max-w-[1400px] px-6"
			>
				{/* Section header */}
				<motion.div variants={fadeIn} className="mb-10 border-b border-white/10 pb-6">
					<div className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
						<span>// 05.</span>
						<span>FEATURED DEPLOYMENTS & ARCHITECTURE</span>
					</div>
					<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
						Selected Work
					</h2>
					<p className="mt-2 text-sm font-mono text-zinc-400 max-w-2xl">
						Production AI agents, asynchronous engines, and scalable microservices built with Python & FastAPI
					</p>
				</motion.div>

				{/* Filter tabs */}
				<motion.div
					variants={fadeIn}
					className="mb-8 flex gap-2.5 overflow-x-auto pb-2 scrollbar-none font-mono text-xs"
				>
					{projectCategories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`shrink-0 rounded-lg border px-4 py-2 transition-all ${
								activeCategory === cat
									? "border-white bg-white font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]"
									: "border-white/15 bg-zinc-950/80 text-zinc-400 hover:border-white/40 hover:text-white"
							}`}
						>
							[ {cat.toUpperCase()} ]
						</button>
					))}
				</motion.div>

				{/* Project cards slider */}
				<div
					ref={sliderRef}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onTouchStart={() => setIsHovered(true)}
					onTouchEnd={() => setIsHovered(false)}
					className="relative flex overflow-x-auto gap-6 pb-8 scrollbar-none"
				>
					{displayProjects.map((project, i) => (
						<motion.div
							key={`${project.id}-${i}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: (i % filtered.length) * 0.08 }}
							className="group relative flex flex-none basis-[calc(100%-24px)] sm:basis-[calc(50%-16px)] lg:basis-[calc(33.333%-20px)] xl:basis-[calc(33.333%-24px)] flex-col rounded-2xl border border-white/15 bg-zinc-950/80 p-7 sm:p-8 backdrop-blur-xl transition-all duration-300 hover:border-white/50 hover:bg-zinc-900/90 hover:shadow-[0_0_30px_rgba(255,255,255,0.06)]"
						>
							<TechCorners />
							
							<div className="flex items-center justify-between gap-2 font-mono text-[10px] text-zinc-400 mb-2">
								<span>[ID: {project.id.toUpperCase()}]</span>
								<span className="rounded bg-white/10 px-2 py-0.5 text-white font-bold">{project.category}</span>
							</div>

							{/* Title */}
							<h3 className="text-2xl font-bold text-white group-hover:text-white transition-colors">
								{project.title}
							</h3>

							{/* Impact Badge */}
							<div className="mt-3 rounded-lg border border-white/15 bg-zinc-900/90 px-3.5 py-2 font-mono text-xs font-bold text-zinc-200">
								⚡ {project.impact}
							</div>

							{/* Description */}
							<p className="mt-4 text-sm leading-relaxed text-zinc-400">
								{project.description}
							</p>

							{/* Stack tags */}
							<div className="mt-auto pt-6 flex flex-wrap gap-2">
								{project.stack.map((tech) => (
									<span
										key={tech}
										className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[10px] font-medium text-zinc-300"
									>
										{tech}
									</span>
								))}
							</div>

							{/* Actions */}
							<div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
								{project.links.github ? (
									<a
										href={project.links.github}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 font-bold text-white transition-colors hover:text-zinc-300"
									>
										<Code size={14} />
										SOURCE_CODE &rarr;
									</a>
								) : (
									<span className="text-zinc-400 italic font-mono text-[11px]">PROPRIETARY / INTERNAL</span>
								)}

								{project.isDeployed ? (
									<span className="text-[10px] text-emerald-400 font-mono font-bold tracking-wider">● DEPLOYED</span>
								) : (
									<span className="text-[10px] text-zinc-600 font-mono">ARCHIVED</span>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}



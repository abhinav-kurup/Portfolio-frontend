"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/motion";

import { projects, projectCategories } from "@/data/projects";

export function ProjectsSection() {
	const [activeCategory, setActiveCategory] = useState("All");
	const sliderRef = useRef<HTMLDivElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	const filtered =
		activeCategory === "All"
			? projects
			: projects.filter((p) => p.category === activeCategory);

	// Duplicate list to support seamless infinite scrolling loop
	const duplicated = [...filtered, ...filtered];

	useEffect(() => {
		if (sliderRef.current) {
			sliderRef.current.scrollLeft = 0;
		}
	}, [activeCategory]);

	useEffect(() => {
		const slider = sliderRef.current;
		if (!slider) return;

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
			{/* Background glow */}
			<div className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
			</div>

			<motion.div
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="mx-auto max-w-6xl px-6"
			>
				{/* Section header */}
				<motion.div variants={fadeIn} className="mb-12">
					<p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
						Portfolio
					</p>
					<h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Selected Work
					</h2>
					<p className="mt-4 max-w-2xl text-base text-muted-foreground/80">
						A showcase of my work, featuring projects that demonstrate my skills
						and expertise in AI engineering and backend systems.
					</p>
				</motion.div>

				{/* Filter tabs */}
				<motion.div
					variants={fadeIn}
					className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none"
				>
					{projectCategories.map((cat) => (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`shrink-0 rounded-full border px-5 py-1.5 text-sm font-medium transition-all ${activeCategory === cat
								? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
								: "border-border/60 text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/30"
								}`}
						>
							{cat}
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
					{duplicated.map((project, i) => (
						<motion.div
							key={`${project.id}-${i}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut", delay: (i % filtered.length) * 0.08 }}
							className="group flex flex-none basis-[calc(100%-24px)] sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)] flex-col rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/5"
						>
							{/* Title */}
							<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
								{project.title}
							</h3>

							{/* Impact */}
							<p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary">
								{project.impact}
							</p>

							{/* Description */}
							<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
								{project.description}
							</p>

							{/* Stack tags */}
							<div className="mt-auto pt-6 flex flex-wrap gap-2">
								{project.stack.map((tech) => (
									<span
										key={tech}
										className="rounded-md bg-muted/50 border border-border/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
									>
										{tech}
									</span>
								))}
							</div>

							{/* Actions */}
							<div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/40 pt-4">
								{project.links.github && (
									<a
										href={project.links.github}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
									>
										<Code size={14} />
										Code
									</a>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}

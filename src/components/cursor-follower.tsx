"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
	const [mounted, setMounted] = useState(false);
	const [hasFinePointer, setHasFinePointer] = useState(false);

	const mouseX = useMotionValue(-200);
	const mouseY = useMotionValue(-200);

	// Spring physics configuration for a smooth lagging/smudge trail effect
	const springConfig = { damping: 35, stiffness: 220, mass: 0.6 };
	const followerX = useSpring(mouseX, springConfig);
	const followerY = useSpring(mouseY, springConfig);

	useEffect(() => {
		setMounted(true);
		
		// Only show on devices with a fine pointer (mouse/trackpad)
		const mediaQuery = window.matchMedia("(pointer: fine)");
		setHasFinePointer(mediaQuery.matches);

		const handleMouseMove = (e: MouseEvent) => {
			// Center the smudge (160px width / 2 = 80px)
			mouseX.set(e.clientX - 80);
			mouseY.set(e.clientY - 80);
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [mouseX, mouseY]);

	if (!mounted || !hasFinePointer) return null;

	return (
		<motion.div
			style={{
				x: followerX,
				y: followerY,
			}}
			className="pointer-events-none fixed top-0 left-0 z-[9999] h-[160px] w-[160px]"
		>
			{/* Multi-layered smudge glow for premium visual depth */}
			{/* Outer soft glow */}
			<div className="absolute inset-0 rounded-full bg-primary/5 blur-[40px]" />
			{/* Inner core smudge */}
			<div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-[20px]" />
		</motion.div>
	);
}

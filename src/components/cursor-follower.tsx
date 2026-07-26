"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorFollower() {
	const [mounted, setMounted] = useState(false);
	const [hasFinePointer, setHasFinePointer] = useState(false);

	const mouseX = useMotionValue(-200);
	const mouseY = useMotionValue(-200);

	// Physics configuration for target tracking
	const springConfig = { damping: 30, stiffness: 240, mass: 0.5 };
	const followerX = useSpring(mouseX, springConfig);
	const followerY = useSpring(mouseY, springConfig);

	useEffect(() => {
		setMounted(true);
		
		const mediaQuery = window.matchMedia("(pointer: fine)");
		setHasFinePointer(mediaQuery.matches);

		const handleMouseMove = (e: MouseEvent) => {
			mouseX.set(e.clientX - 100);
			mouseY.set(e.clientY - 100);
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
			className="pointer-events-none fixed top-0 left-0 z-[9999] h-[200px] w-[200px]"
		>
			{/* Soft white ambient radial glow */}
			<div className="absolute inset-0 rounded-full bg-white/[0.035] blur-[50px]" />
			{/* Inner core target smudge */}
			<div className="absolute top-1/3 left-1/3 h-1/3 w-1/3 rounded-full bg-white/[0.07] blur-[25px]" />
		</motion.div>
	);
}


/**
 * Shared Framer Motion variants.
 * Per PRD: only animate opacity + transform (translateY).
 * Keep motion light — fade-in and slight upward reveal only.
 */

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

export const fadeInDelay = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  },
} as const);

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

export const subtleHover = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
} as const;

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  revealContainerVariants,
  revealItemVariants,
} from "@/lib/motion-presets";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Section-level fade + slide-in reveal. Direct children wrapped in
 *  <RevealItem> (or a motion.* element using revealItemVariants) are
 *  staggered by 0.08s. Re-fires every time the section crosses the
 *  reveal threshold — scroll up out of view and back down and the
 *  elements fade back in. */
export function SectionReveal({ children, className }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={revealContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-15% 0px" }}
    >
      {children}
    </motion.div>
  );
}

/** Direct child of <SectionReveal>. Renders a plain <div> under reduced
 *  motion so nothing is left hidden waiting for a transition that will
 *  never play. For non-<div> semantics (e.g. <li>), use motion.li with
 *  revealItemVariants directly. */
export function RevealItem({ children, className }: Props) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={revealItemVariants}>
      {children}
    </motion.div>
  );
}

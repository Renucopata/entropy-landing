import type { Transition, Variants } from "motion/react";

// power2.out — matches the GSAP ease used in the intro so scroll reveals
// feel like the same hand.
const easeOut = [0.25, 1, 0.5, 1] as const;

export const MOTION = {
  reveal: {
    duration: 0.6,
    ease: easeOut,
  } satisfies Transition,

  interactionSpring: {
    type: "spring",
    stiffness: 300,
    damping: 24,
  } satisfies Transition,

  fastFade: {
    duration: 0.2,
    ease: "easeOut",
  } satisfies Transition,
} as const;

// Container: stagger children by 0.08s on the way in; fade out together
// (no reverse-stagger) so scrolling back up doesn't feel choreographed.
export const revealContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// Child of a reveal container: fade + short upward slide. Transition
// declared on BOTH states so re-entry (visible) and exit (hidden) share
// the same eased motion — otherwise Motion would fall back to a default
// spring on the hide direction and it wouldn't match.
export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: 12, transition: MOTION.reveal },
  visible: { opacity: 1, y: 0, transition: MOTION.reveal },
};

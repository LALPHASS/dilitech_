"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin once at module level
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const ANIMATION_DEFAULTS = {
  fadeInUp: { y: 40, opacity: 0, duration: 0.8, ease: "power2.out" },
  fadeOut: { opacity: 0, duration: 0.6, ease: "power2.in" },
  stagger: 0.15,
  heroPin: {
    trigger: "#hero",
    start: "top top",
    end: "+=300%",
    pin: true,
    scrub: 1,
  },
} as const;

/**
 * Creates a reduced-motion-aware GSAP animation context.
 * When `prefers-reduced-motion: reduce` is active, animations run with
 * duration 0 (instant) so content reaches its final state without motion.
 */
export function createMotionSafeAnimation(
  callback: (context: gsap.Context, isReduced: boolean) => void
): gsap.Context {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      callback(ctx, false);
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      callback(ctx, true);
    });
  });

  return ctx;
}

/**
 * Returns the story phase index (0–3) for a given scroll progress (0–1).
 * Progress is divided into equal quarters.
 */
export function getPhaseFromProgress(progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped >= 1) return 3;
  return Math.floor(clamped * 4);
}

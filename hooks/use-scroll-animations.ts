"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

/**
 * Wraps GSAP ScrollTrigger setup with gsap.context() for proper cleanup.
 * The callback receives the gsap.Context and should create all animations.
 * Everything is automatically reverted on unmount.
 */
export function useScrollAnimations(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    });

    return () => {
      ctxRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLoadingProgress } from "@/hooks/use-loading-progress";
import { gsap } from "@/lib/animations";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const MIN_DISPLAY_MS = 1500;

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { progress, isComplete } = useLoadingProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mountTimeRef = useRef(0);
  const calledRef = useRef(false);

  // Entrance animation
  useEffect(() => {
    if (!logoRef.current || !progressRef.current || !textRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
      .fromTo(progressRef.current,
        { width: 0, opacity: 0 },
        { width: "16rem", opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(textRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );

      // Subtle pulse animation on logo
      gsap.to(logoRef.current, {
        scale: 1.02,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
    
    return () => ctx.revert();
  }, []);

  // Capture mount time
  useEffect(() => {
    mountTimeRef.current = performance.now();
  }, []);

  const triggerFadeOut = useCallback(() => {
    if (calledRef.current || !containerRef.current) return;
    calledRef.current = true;
    
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: onLoadingComplete,
    });
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!isComplete) return;

    const mountTime = mountTimeRef.current || performance.now();
    const elapsed = performance.now() - mountTime;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    const timer = setTimeout(triggerFadeOut, remaining);
    return () => clearTimeout(timer);
  }, [isComplete, triggerFadeOut]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background"
      aria-live="polite"
      role="status"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(2, 163, 218, 0.4) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />

      <div ref={logoRef} className="mb-8 opacity-0 relative z-10">
        <Image
          src="/logo.webp"
          alt="Dilitech"
          width={160}
          height={60}
          priority
          className="object-contain"
        />
      </div>

      <div ref={progressRef} className="relative h-1.5 rounded-full bg-white/10 overflow-hidden opacity-0 z-10">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: "var(--dilitech-gradient)",
            boxShadow: "0 0 20px rgba(2, 163, 218, 0.5)",
          }}
        />
      </div>

      <p ref={textRef} className="mt-4 text-sm text-muted-foreground opacity-0 z-10">
        Chargement{progress < 100 ? `… ${progress}%` : " terminé"}
      </p>
    </div>
  );
}

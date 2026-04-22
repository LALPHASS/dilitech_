"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useLoadingProgress } from "@/hooks/use-loading-progress";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const MIN_DISPLAY_MS = 1500;
const FADE_OUT_MS = 800;

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { progress, isComplete } = useLoadingProgress();
  const [fadingOut, setFadingOut] = useState(false);
  const mountTimeRef = useRef(0);
  const calledRef = useRef(false);

  // Capture mount time once on mount
  useEffect(() => {
    mountTimeRef.current = performance.now();
  }, []);

  const triggerFadeOut = useCallback(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    setFadingOut(true);
    setTimeout(() => {
      onLoadingComplete();
    }, FADE_OUT_MS);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!isComplete) return;

    // If mountTimeRef hasn't been set yet, use MIN_DISPLAY_MS as fallback
    const mountTime = mountTimeRef.current || performance.now();
    const elapsed = performance.now() - mountTime;
    const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

    const timer = setTimeout(triggerFadeOut, remaining);
    return () => clearTimeout(timer);
  }, [isComplete, triggerFadeOut]);

  return (
    <div
      className={`fixed inset-0 z-100 flex flex-col items-center justify-center
        bg-background transition-opacity ${fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ transitionDuration: `${FADE_OUT_MS}ms` }}
      aria-live="polite"
      role="status"
    >
      <div className="animate-fade-in mb-8">
        <Image
          src="/logo.png"
          alt="Dilitech"
          width={160}
          height={60}
          priority
          className="object-contain"
        />
      </div>

      <div className="w-64 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: "var(--dilitech-gradient)",
          }}
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Chargement{progress < 100 ? `… ${progress}%` : " terminé"}
      </p>
    </div>
  );
}

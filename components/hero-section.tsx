"use client";

import { useEffect, useRef, useState } from "react";
import { ThreeDViewer } from "./three-d-viewer-dynamic";
import { STORY_PHASES } from "@/lib/constants";
import { gsap, ScrollTrigger, getPhaseFromProgress } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the hero and scrub through phases
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          setCurrentPhase(getPhaseFromProgress(self.progress));
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const phase = STORY_PHASES[currentPhase] ?? STORY_PHASES[0];

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* 3D Viewer — fills the section */}
      <div className="absolute inset-0">
        <ThreeDViewer currentPhase={currentPhase} reducedMotion={reducedMotion} />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
        <div key={phase.id} className="animate-fade-in max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 drop-shadow-lg">
            {phase.heading}
          </h1>
          {phase.description && (
            <p className="text-base md:text-lg text-foreground/80 mb-8 drop-shadow-md">
              {phase.description}
            </p>
          )}
        </div>

        {/* CTA buttons — only in intro phase */}
        {currentPhase === 0 && (
          <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto animate-fade-in">
            <a
              href="#produits"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#produits")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3 rounded-md text-sm font-medium text-white
                cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--dilitech-gradient)" }}
            >
              Explorer
            </a>
            <a
              href="https://wa.me/22371927198"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-md text-sm font-medium text-white
                cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--dilitech-gradient)" }}
            >
              Acheter maintenant
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

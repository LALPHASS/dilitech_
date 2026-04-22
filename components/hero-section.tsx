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
      className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]"
    >
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(ellipse at center, rgba(2, 163, 218, 0.5) 0%, rgba(2, 163, 218, 0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] opacity-30"
          style={{
            background: "radial-gradient(ellipse at bottom right, rgba(2, 130, 174, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Split layout: Text left, 3D model right */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Text content */}
          <div className="text-left pt-40 lg:pt-12">
            <div key={phase.id} className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                {phase.heading}
              </h1>
              {phase.description && (
                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg">
                  {phase.description}
                </p>
              )}

              {/* CTA buttons */}
              {currentPhase === 0 && (
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                  <a
                    href="#produits"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector("#produits")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-8 py-3 rounded-full text-sm font-medium text-white text-center
                      cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(2,163,218,0.4)]"
                    style={{ background: "var(--dilitech-gradient)" }}
                  >
                    Explorer
                  </a>
                  <a
                    href="https://wa.me/22371927198"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full text-sm font-medium text-white/90 border border-white/20 text-center
                      cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-white/40
                      backdrop-blur-sm"
                  >
                    Acheter maintenant
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right side - 3D Viewer */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <ThreeDViewer currentPhase={currentPhase} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

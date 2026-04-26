"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { ThreeDViewer } from "./three-d-viewer-dynamic";
import { STORY_PHASES } from "@/lib/constants";
import { gsap, ScrollTrigger, getPhaseFromProgress } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import ShinyText from "./ShinyText";
import { PremiumCTAButton } from "./ui/premium-cta-button";
import { AuroraBackground } from "./ui/aurora-background";

// Floating particles component
function FloatingParticles({ count = 20, reducedMotion = false }: { count?: number; reducedMotion?: boolean }) {
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    })),
    [count]
  );

  if (reducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-[#02a3da]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `float-particle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Subtle grid pattern
function GridPattern() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(2, 163, 218, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(2, 163, 218, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// Animated gradient orbs
function GradientOrbs({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Top left orb */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 ${!reducedMotion ? 'animate-pulse' : ''}`}
        style={{
          background: 'radial-gradient(circle, rgba(2, 163, 218, 0.4) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '4s',
        }}
      />
      {/* Bottom right orb */}
      <div
        className={`absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-15 ${!reducedMotion ? 'animate-pulse' : ''}`}
        style={{
          background: 'radial-gradient(circle, rgba(1, 90, 122, 0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animationDuration: '6s',
          animationDelay: '2s',
        }}
      />
    </div>
  );
}

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
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Aurora Background */}
      <AuroraBackground className="absolute inset-0" showRadialGradient={true}>
        <></>
      </AuroraBackground>

      {/* Subtle grid pattern */}
      <GridPattern />

      {/* Floating particles */}
      <FloatingParticles count={25} reducedMotion={reducedMotion} />

      {/* Gradient orbs */}
      <GradientOrbs reducedMotion={reducedMotion} />

      {/* Additional ambient light effects */}
      <div className="absolute inset-0 pointer-events-none z-1">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, rgba(2, 163, 218, 0.5) 0%, rgba(2, 163, 218, 0.1) 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] opacity-25"
          style={{
            background: "radial-gradient(ellipse at bottom right, rgba(2, 130, 174, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal accent line */}
        <div 
          className="absolute top-1/3 left-0 w-32 h-px opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent, #02a3da, transparent)',
          }}
        />
        {/* Vertical accent line */}
        <div 
          className="absolute top-0 left-1/4 w-px h-24 opacity-10"
          style={{
            background: 'linear-gradient(180deg, transparent, #02a3da, transparent)',
          }}
        />
      </div>

      {/* Split layout: Text left, 3D model right */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left side - Text content */}
          <div className="text-left pt-40 lg:pt-12">
            <div key={phase.id} className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                <ShinyText 
                  text={phase.heading}
                  color="#b5b5b5"
                  shineColor="#ffffff"
                  speed={3}
                  spread={90}
                />
              </h1>
              {phase.description && (
                <p className="text-lg md:text-xl text-white/70 mb-8 max-w-lg">
                  {phase.description}
                </p>
              )}

              {/* CTA buttons */}
              {currentPhase === 0 && (
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                  <PremiumCTAButton
                    href="#produits"
                    onClick={(e) => {
                      e?.preventDefault?.();
                      document.querySelector("#produits")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    variant="primary"
                  >
                    Explorer
                  </PremiumCTAButton>
                  <PremiumCTAButton
                    href="https://wa.me/22371927198"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                  >
                    Acheter maintenant
                  </PremiumCTAButton>
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

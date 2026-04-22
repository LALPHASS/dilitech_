"use client";

import { useRef, useEffect } from "react";
import { SERVICES } from "@/lib/constants";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll("[data-card]");
      gsap.set(cards, { y: ANIMATION_DEFAULTS.fadeInUp.y, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: ANIMATION_DEFAULTS.fadeInUp.duration,
            ease: ANIMATION_DEFAULTS.fadeInUp.ease,
            stagger: 0.2,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 px-4 md:px-6 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
        Nos Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              data-card
              className="flex flex-col items-center text-center p-8 rounded-xl
                bg-card border border-border transition-all duration-200
                hover:shadow-lg cursor-pointer"
            >
              <div
                className="size-14 rounded-full flex items-center justify-center mb-6"
                style={{ background: "var(--dilitech-gradient)" }}
              >
                <Icon className="size-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

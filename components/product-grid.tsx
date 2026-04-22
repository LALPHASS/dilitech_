"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { BRAND_CARDS } from "@/lib/constants";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";

export function ProductGrid() {
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
            stagger: ANIMATION_DEFAULTS.stagger,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="produits"
      className="py-24 px-4 md:px-6 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground">
        Nos Marques
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {BRAND_CARDS.map((card) => (
          <div
            key={card.name}
            data-card
            className="group rounded-xl overflow-hidden bg-card border border-border
              cursor-pointer transition-all duration-200
              hover:scale-[1.03] hover:shadow-2xl"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={card.image}
                alt={card.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {card.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {card.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full
                      bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

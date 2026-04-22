"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/lib/constants";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoAdvance = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
  }, []);

  const stopAutoAdvance = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    startAutoAdvance();
    return stopAutoAdvance;
  }, [startAutoAdvance, stopAutoAdvance]);

  // GSAP entrance
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll("[data-animate]");
      gsap.set(els, { y: ANIMATION_DEFAULTS.fadeInUp.y, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(els, {
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

  const goTo = (index: number) => {
    setActive(index);
    stopAutoAdvance();
    startAutoAdvance();
  };

  const testimonial = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      id="temoignages"
      className="py-24 px-4 md:px-6 max-w-4xl mx-auto text-center"
    >
      <h2
        data-animate
        className="text-3xl md:text-4xl font-bold text-foreground mb-16"
      >
        Ce que disent nos clients
      </h2>

      {/* Active testimonial */}
      <div data-animate className="flex flex-col items-center mb-10">
        <div className="relative size-20 rounded-full overflow-hidden mb-6 ring-2 ring-primary/30">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <blockquote className="max-w-xl text-foreground/90 text-base md:text-lg leading-relaxed italic mb-4">
          &ldquo;{testimonial.review}&rdquo;
        </blockquote>
        <p className="text-sm font-semibold text-foreground">
          {testimonial.name}
        </p>
      </div>

      {/* Navigation dots */}
      <div data-animate className="flex items-center justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => goTo(i)}
            className={`size-3 rounded-full cursor-pointer transition-all duration-200
              ${i === active ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
            aria-label={`Témoignage de ${t.name}`}
          />
        ))}
      </div>
    </section>
  );
}

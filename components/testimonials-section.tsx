"use client";

import { useRef, useEffect } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";
import { CircularTestimonials } from "./circular-testimonials";

// Transform testimonials data to match CircularTestimonials format
const circularTestimonials = TESTIMONIALS.map((t) => ({
  quote: t.review,
  name: t.name,
  designation: "Client Dilitech",
  src: t.image,
}));

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      id="temoignages"
      className="py-24 px-4 md:px-6"
    >
      <h2
        data-animate
        className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8"
      >
        Ce que disent nos clients
      </h2>

      <div data-animate className="flex justify-center">
        <CircularTestimonials
          testimonials={circularTestimonials}
          autoplay={true}
          colors={{
            name: "#f7f7ff",
            designation: "#a1a1aa",
            testimony: "#e4e4e7",
            arrowBackground: "#02a3da",
            arrowForeground: "#ffffff",
            arrowHoverBackground: "#33b5e3",
          }}
          fontSizes={{
            name: "1.5rem",
            designation: "0.925rem",
            quote: "1.125rem",
          }}
        />
      </div>
    </section>
  );
}

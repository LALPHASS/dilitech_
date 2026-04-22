"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { MapPin, Users, Award } from "lucide-react";

const STATS = [
  { icon: MapPin, value: "Bamako", label: "Mali" },
  { icon: Users, value: "500+", label: "Clients satisfaits" },
  { icon: Award, value: "5 ans", label: "D'expertise" },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animated line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Title with clip reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Text paragraph
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Stats with stagger
      const statItems = statsRef.current?.querySelectorAll("[data-stat]");
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 60, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.15,
            delay: 0.5,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Counter animation for numbers
        statItems.forEach((item) => {
          const valueEl = item.querySelector("[data-value]");
          if (valueEl && valueEl.textContent?.includes("+")) {
            const num = parseInt(valueEl.textContent);
            gsap.fromTo(
              { val: 0 },
              { val: num },
              {
                duration: 2,
                ease: "power2.out",
                delay: 0.8,
                scrollTrigger: {
                  trigger: statsRef.current,
                  start: "top 85%",
                  once: true,
                },
                onUpdate: function () {
                  valueEl.textContent = Math.floor(this.targets()[0].val) + "+";
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="a-propos"
      className="relative py-32 px-4 md:px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(2, 163, 218, 0.4) 0%, transparent 60%)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Animated line */}
        <div
          ref={lineRef}
          className="w-20 h-1 mx-auto mb-8 origin-left"
          style={{ background: "var(--dilitech-gradient)" }}
        />

        {/* Title */}
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white mb-8"
        >
          À Propos
        </h2>

        {/* Short description */}
        <p
          ref={textRef}
          className="text-lg md:text-xl text-white/70 text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Votre partenaire informatique de confiance au Mali. 
          Des solutions premium HP, Lenovo et Mac avec un service d&apos;exception.
        </p>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                data-stat
                className="group relative p-8 rounded-2xl text-center
                  bg-white/3 border border-white/8 backdrop-blur-sm
                  hover:bg-white/6 hover:border-white/15 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center
                    bg-white/5 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon className="size-6 text-[#02a3da]" />
                </div>

                {/* Value */}
                <div
                  data-value
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-sm text-white/50">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

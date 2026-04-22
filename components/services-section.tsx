"use client";

import { useRef, useEffect } from "react";
import { SERVICES } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation - split text effect
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Cards animation - staggered with rotation
      const cards = cardsRef.current?.querySelectorAll("[data-card]");
      if (cards) {
        gsap.fromTo(
          cards,
          { 
            y: 80, 
            opacity: 0, 
            rotateX: 15,
            scale: 0.9
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Hover animations for each card
        cards.forEach((card) => {
          const icon = card.querySelector("[data-icon]");
          const content = card.querySelector("[data-content]");

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out",
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1.1,
                rotate: 5,
                duration: 0.3,
                ease: "back.out(1.7)",
              });
            }
            if (content) {
              gsap.to(content, {
                y: -4,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
            if (icon) {
              gsap.to(icon, {
                scale: 1,
                rotate: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
            if (content) {
              gsap.to(content, {
                y: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });
        });
      }

      // Floating background elements animation
      const floatingEls = sectionRef.current?.querySelectorAll("[data-float]");
      if (floatingEls) {
        floatingEls.forEach((el, i) => {
          gsap.to(el, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-32 px-4 md:px-6 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          data-float
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(2, 163, 218, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          data-float
          className="absolute bottom-20 right-[15%] w-48 h-48 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(2, 130, 174, 0.4) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          data-float
          className="absolute top-1/2 right-[5%] w-32 h-32 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Service Après-Vente
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            Nous restons à vos côtés après l'achat pour garantir votre satisfaction
          </p>
        </div>

        {/* Service cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                data-card
                className="group relative p-8 rounded-2xl cursor-pointer
                  bg-white/3 border border-white/8
                  backdrop-blur-sm transition-colors duration-300
                  hover:bg-white/6 hover:border-white/15"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at 50% 0%, rgba(2, 163, 218, 0.15) 0%, transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  data-icon
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                    shadow-lg shadow-cyan-500/20"
                  style={{ background: "var(--dilitech-gradient)" }}
                >
                  <Icon className="size-8 text-white" />
                </div>

                {/* Content */}
                <div data-content className="relative">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Number indicator */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-white/3 select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

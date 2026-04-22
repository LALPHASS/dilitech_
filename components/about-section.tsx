"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";

export function AboutSection() {
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
      id="a-propos"
      className="py-24 px-4 md:px-6 max-w-3xl mx-auto"
    >
      <h2
        data-animate
        className="text-3xl md:text-4xl font-bold text-center text-foreground mb-8"
      >
        À Propos de Dilitech
      </h2>

      <div data-animate className="space-y-6 text-foreground/85 leading-relaxed text-base md:text-lg">
        <p>
          Dilitech est votre partenaire informatique de confiance au Mali. Basée à Bamako,
          notre entreprise se consacre à fournir des solutions informatiques premium
          adaptées aux besoins des professionnels et des particuliers.
        </p>
        <p>
          Nous proposons une sélection rigoureuse d&apos;ordinateurs des plus grandes marques
          — HP, Lenovo et Mac — accompagnée d&apos;un service après-vente d&apos;exception.
          Notre mission : rendre la technologie accessible tout en garantissant
          une expérience client irréprochable.
        </p>
        <p>
          Chez Dilitech, chaque client est unique. Notre équipe d&apos;experts vous accompagne
          dans le choix de la machine idéale, de l&apos;achat à la maintenance, pour que
          votre investissement technologique soit toujours à la hauteur de vos ambitions.
        </p>
      </div>
    </section>
  );
}

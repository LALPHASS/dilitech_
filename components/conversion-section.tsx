"use client";

import { useRef, useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { USAGE_CATEGORIES } from "@/lib/constants";
import { gsap, ScrollTrigger, ANIMATION_DEFAULTS } from "@/lib/animations";

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const selectedLabel = USAGE_CATEGORIES.find((c) => c.id === selectedCategory)?.label;

  const whatsappText = selectedLabel
    ? `Bonjour Dilitech, je recherche un ordinateur pour : ${selectedLabel}. Pouvez-vous me conseiller ?`
    : "Bonjour Dilitech, je recherche un ordinateur. Pouvez-vous me conseiller ?";

  const whatsappUrl = `https://wa.me/22371927198?text=${encodeURIComponent(whatsappText)}`;

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-6 max-w-4xl mx-auto text-center"
    >
      <h2
        data-animate
        className="text-3xl md:text-4xl font-bold text-foreground mb-4"
      >
        Obtenez la machine idéale pour vos besoins
      </h2>
      <p data-animate className="text-muted-foreground mb-10">
        Sélectionnez votre usage principal et recevez une recommandation personnalisée.
      </p>

      {/* Category chips */}
      <div data-animate className="flex flex-wrap justify-center gap-3 mb-10">
        {USAGE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium
                cursor-pointer transition-all duration-200 border
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-foreground border-border hover:border-primary/50"
                }`}
            >
              <Icon className="size-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* CTA buttons */}
      <div data-animate className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          className="px-8 py-3 rounded-md text-sm font-medium text-white
            cursor-pointer transition-opacity duration-200 hover:opacity-90"
          style={{ background: "var(--dilitech-gradient)" }}
        >
          Demander une recommandation
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md text-sm font-medium
            text-white bg-[#25D366] cursor-pointer transition-opacity duration-200 hover:opacity-90"
        >
          <MessageCircle className="size-4" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { BRAND_CARDS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { Pause, Play } from "lucide-react";

export function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = BRAND_CARDS.length;

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  // Autoplay
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, nextSlide]);

  // GSAP entrance animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-animate]", { y: 40, opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to("[data-animate]", {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeCard = BRAND_CARDS[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="produits"
      className="relative w-full bg-[#0a0a0a] overflow-hidden"
    >
      {/* Section header with spacing */}
      <div className="pt-24 pb-12 px-6 md:px-12 lg:px-24 text-center">
        <h2 data-animate className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Nos Produits
        </h2>
        <p data-animate className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
          Découvrez notre sélection premium d&apos;ordinateurs des plus grandes marques mondiales
        </p>
      </div>

      {/* Image slider - contained width */}
      <div className="relative w-full max-w-6xl mx-auto h-[80vh] px-6 rounded-2xl overflow-hidden">
        {BRAND_CARDS.map((card, index) => (
          <div
            key={card.name}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              ${index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Image
              src={card.image}
              alt={card.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
          </div>
        ))}

        {/* Text overlay - positioned left */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 lg:p-24">
          <div className="max-w-xl">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {activeCard.name}
            </h3>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
              {activeCard.description}
            </p>
            
            {/* Models */}
            <div>
              <p className="text-sm text-white/50 mb-2">Modèles disponibles</p>
              <div className="flex flex-wrap gap-2">
                {activeCard.models.map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1 text-sm font-medium rounded-full
                      bg-white/5 text-white/70 border border-white/10"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom slider controls - Apple style */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
          {/* Dots/progress indicators */}
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2.5">
            {BRAND_CARDS.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsPlaying(false);
                }}
                className={`transition-all duration-300 rounded-full cursor-pointer
                  ${index === activeIndex 
                    ? "w-8 h-2 bg-white" 
                    : "w-2 h-2 bg-white/40 hover:bg-white/60"
                  }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center
              text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
          </button>
        </div>
      </div>
    </section>
  );
}

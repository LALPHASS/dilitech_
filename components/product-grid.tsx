"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_CARDS } from "@/lib/constants";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

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

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
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
      <div className="relative w-full max-w-6xl mx-auto h-[80vh] px-6 rounded-2xl overflow-hidden group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeCard.image}
              alt={activeCard.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        <button
          onClick={() => { prevSlide(); setIsPlaying(false); }}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-black/30 backdrop-blur-md flex items-center justify-center
            text-white/60 hover:text-white hover:bg-black/50
            transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          onClick={() => { nextSlide(); setIsPlaying(false); }}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full
            bg-black/30 backdrop-blur-md flex items-center justify-center
            text-white/60 hover:text-white hover:bg-black/50
            transition-all duration-300 cursor-pointer opacity-0 group-hover:opacity-100"
          aria-label="Slide suivant"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Text overlay - positioned left */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 lg:p-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl"
            >
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
                  {activeCard.models.map((model, i) => (
                    <motion.span
                      key={model}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      className="px-3 py-1 text-sm font-medium rounded-full
                        bg-white/5 text-white/70 border border-white/10
                        hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                    >
                      {model}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
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
                className="relative cursor-pointer"
                aria-label={`Aller au slide ${index + 1}`}
              >
                <motion.div
                  className="rounded-full bg-white/40"
                  animate={{
                    width: index === activeIndex ? 32 : 8,
                    height: 8,
                    backgroundColor: index === activeIndex ? "#ffffff" : "rgba(255,255,255,0.4)",
                  }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.6)" }}
                />
              </button>
            ))}
          </div>

          {/* Play/Pause button */}
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center
              text-white/80 hover:text-white transition-colors duration-200 cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPlaying ? "pause" : "play"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 ml-0.5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </section>
  );
}

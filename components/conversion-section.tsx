"use client";

import { useRef, useEffect, useState } from "react";
import { MessageCircle, Sparkles, Send } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations";
import { FloatingInput, FloatingTextarea } from "./ui/floating-input";
import { PremiumCTAButton } from "./ui/premium-cta-button";

export function ConversionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const [workDescription, setWorkDescription] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation with scale
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
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

      // Form fields
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // CTA button
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
            delay: 0.6,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Floating background elements
      const floats = sectionRef.current?.querySelectorAll("[data-float]");
      if (floats) {
        floats.forEach((el, i) => {
          gsap.to(el, {
            y: "random(-15, 15)",
            x: "random(-10, 10)",
            rotation: "random(-5, 5)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.3,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Build WhatsApp message
  const buildWhatsAppMessage = () => {
    let message = "Bonjour Dilitech,\n\n";
    message += "Je recherche un ordinateur.\n\n";
    
    if (workDescription.trim()) {
      message += `💼 Description du travail : ${workDescription.trim()}\n`;
    }
    
    if (budget.trim()) {
      message += `💰 Budget : ${budget.trim()}\n`;
    }
    
    message += "\nPouvez-vous me conseiller ?";
    
    return message;
  };

  const whatsappUrl = `https://wa.me/22371927198?text=${encodeURIComponent(buildWhatsAppMessage())}`;

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-4 md:px-6 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          data-float
          className="absolute top-20 left-[15%] w-32 h-32 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(2, 163, 218, 0.4) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          data-float
          className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(37, 211, 102, 0.3) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
        <div
          data-float
          className="absolute top-1/2 right-[20%] w-24 h-24 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <Sparkles className="size-4 text-[#02a3da]" />
          <span className="text-sm text-white/70">Recommandation personnalisée</span>
        </div>

        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
        >
          Obtenez la machine idéale
          <br />
          <span className="text-[#02a3da]">pour vos besoins</span>
        </h2>
        
        <p ref={subtitleRef} className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
          Décrivez votre usage et votre budget, nous vous conseillerons la meilleure machine.
        </p>

        {/* Form inputs */}
        <div ref={formRef} className="space-y-5 mb-8">
          {/* Work description */}
          <FloatingTextarea
            label="Décrivez le travail que vous allez faire"
            value={workDescription}
            onChange={(e) => setWorkDescription(e.target.value)}
            rows={3}
          />

          {/* Budget */}
          <FloatingInput
            label="Votre budget (en FCFA)"
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        {/* WhatsApp CTA button */}
        <div ref={ctaRef}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-medium
              text-white bg-[#25D366] cursor-pointer overflow-hidden transition-all duration-300
              hover:shadow-[0_0_40px_rgba(37,211,102,0.5)] hover:scale-105 relative"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <MessageCircle className="size-5 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
            <span className="relative z-10">Envoyer via WhatsApp</span>
            <Send className="size-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, Mail, Clock, MapPin, Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/animations";

// Custom social icons
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Logo animation
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Animated line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1,
            ease: "power3.inOut",
            delay: 0.3,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Columns stagger
      const columns = footerRef.current!.querySelectorAll("[data-col]");
      gsap.fromTo(
        columns,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Social icons bounce in
      const socialIcons = socialRef.current?.querySelectorAll("a");
      if (socialIcons) {
        gsap.fromTo(
          socialIcons,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1,
            delay: 0.6,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Hover animations
        socialIcons.forEach((icon) => {
          icon.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.2, duration: 0.2, ease: "back.out(1.7)" });
          });
          icon.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, duration: 0.2, ease: "power2.out" });
          });
        });
      }

      // Bottom bar slide up
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.8,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="contact" className="relative bg-[#0a0a0a] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at bottom, rgba(2, 163, 218, 0.3) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        {/* Top section with logo */}
        <div ref={logoRef} className="flex flex-col items-center mb-10">
          <Image
            src="/logo.webp"
            alt="Dilitech"
            width={120}
            height={45}
            className="object-contain mb-3"
          />
          <p className="text-white/50 text-sm text-center">
            Votre partenaire informatique de confiance au Mali
          </p>
        </div>

        {/* Animated divider */}
        <div
          ref={lineRef}
          className="w-full max-w-xs mx-auto h-px mb-10 origin-center"
          style={{ background: "linear-gradient(90deg, transparent, rgba(2, 163, 218, 0.5), transparent)" }}
        />

        {/* Main grid - better spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-10">
          {/* Location */}
          <div data-col>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <MapPin className="size-4 text-[#02a3da]" />
              Emplacement
            </h3>
            <div className="rounded-xl overflow-hidden border border-white/10 aspect-video">
              <iframe
                title="Dilitech — Bamako, Mali"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.1!2d-8.0006!3d12.6393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe51cd0e4b5b6e93%3A0x5f5f5f5f5f5f5f5f!2z!5e0!3m2!1sfr!2sml!4v1714000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact */}
          <div data-col>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <Phone className="size-4 text-[#02a3da]" />
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://wa.me/22371927198"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 border border-white/8
                    hover:bg-white/6 hover:border-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="size-8 rounded-md bg-[#25D366]/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="size-4 text-[#25D366]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/50">WhatsApp</p>
                    <p className="text-sm text-white font-medium truncate">+223 71 92 71 98</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@dilitech.ml"
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-white/3 border border-white/8
                    hover:bg-white/6 hover:border-white/15 transition-all duration-300 cursor-pointer"
                >
                  <div className="size-8 rounded-md bg-[#02a3da]/20 flex items-center justify-center shrink-0">
                    <Mail className="size-4 text-[#02a3da]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-white/50">Email</p>
                    <p className="text-sm text-white font-medium truncate">contact@dilitech.ml</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div data-col>
            <h3 className="text-sm font-semibold text-white mb-3">
              Suivez-nous
            </h3>
            <div ref={socialRef} className="flex gap-2">
              <a
                href="https://facebook.com/dilitech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-10 rounded-lg flex items-center justify-center
                  bg-white/5 border border-white/10 text-white/60
                  hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/30
                  transition-all duration-300 cursor-pointer"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href="https://instagram.com/dilitech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-10 rounded-lg flex items-center justify-center
                  bg-white/5 border border-white/10 text-white/60
                  hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:border-[#E4405F]/30
                  transition-all duration-300 cursor-pointer"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href="https://x.com/dilitech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="size-10 rounded-lg flex items-center justify-center
                  bg-white/5 border border-white/10 text-white/60
                  hover:bg-white/20 hover:text-white hover:border-white/30
                  transition-all duration-300 cursor-pointer"
              >
                <XIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Hours */}
          <div data-col>
            <h3 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
              <Clock className="size-4 text-[#02a3da]" />
              Horaires
            </h3>
            <div className="space-y-1.5 p-3 rounded-lg bg-white/3 border border-white/8">
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Lun – Ven</span>
                <span className="text-white font-medium">8h – 18h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Samedi</span>
                <span className="text-white font-medium">9h – 14h</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/50">Dimanche</span>
                <span className="text-[#E4405F] font-medium">Fermé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="pt-6 border-t border-white/10 text-center"
        >
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Dilitech. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}

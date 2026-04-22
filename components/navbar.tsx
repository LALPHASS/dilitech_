"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { gsap } from "@/lib/animations";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    },
    []
  );

  // Navbar entrance animation
  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  // Trap focus when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [mobileMenuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;
    if (mobileMenuOpen) {
      const links = menuRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08 }
      );
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating pill navbar */}
      <div ref={navRef} className="fixed top-4 left-4 right-4 z-50 flex justify-center opacity-0">
        <nav
          className="w-full max-w-5xl rounded-full backdrop-blur-xl
            bg-white/6 border border-white/8 px-4 py-2.5 md:px-6
            shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          role="navigation"
          aria-label="Navigation principale"
        >
          <div className="flex items-center justify-between">
            {/* Logo + brand name */}
            <a href="#accueil" className="flex items-center gap-2 shrink-0">
              <Image
                src="/logo.png"
                alt="Dilitech"
                width={28}
                height={28}
                priority
                className="object-contain"
              />
              <span className="text-sm font-semibold text-foreground tracking-tight">
                Dilitech
              </span>
            </a>

            {/* Desktop nav links — centered */}
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm text-foreground/60 hover:text-foreground
                    transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center px-5 py-1.5 rounded-full text-sm
                  font-medium text-white cursor-pointer transition-opacity duration-200
                  hover:opacity-90"
                style={{ background: "var(--dilitech-gradient)" }}
              >
                Contact
              </a>

              {/* Hamburger */}
              <button
                ref={toggleRef}
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="md:hidden size-9 flex items-center justify-center rounded-full
                  text-foreground/80 hover:text-foreground hover:bg-white/10
                  transition-colors duration-200 cursor-pointer"
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8
            bg-background/95 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 size-9 flex items-center justify-center
              rounded-full text-foreground/80 hover:text-foreground cursor-pointer"
            aria-label="Fermer le menu"
          >
            <X className="size-5" />
          </button>

          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-2xl font-medium text-foreground/80 hover:text-foreground
                transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center px-6 py-3 rounded-full text-base
              font-medium text-white cursor-pointer transition-opacity duration-200 hover:opacity-90"
            style={{ background: "var(--dilitech-gradient)" }}
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}

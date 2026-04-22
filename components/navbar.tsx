"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl
          bg-black/20 border-b border-white/10"
        role="navigation"
        aria-label="Navigation principale"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <a href="#accueil" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Dilitech"
              width={120}
              height={40}
              priority
              className="object-contain"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-foreground/70 hover:text-foreground
                  transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: contact CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-md text-sm
                font-medium text-white cursor-pointer transition-opacity duration-200 hover:opacity-90"
              style={{ background: "var(--dilitech-gradient)" }}
            >
              Contact
            </a>

            {/* Hamburger */}
            <button
              ref={toggleRef}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden size-9 flex items-center justify-center rounded-md
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

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8
            bg-background/95 backdrop-blur-xl animate-slide-in"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
        >
          {/* Close button at top-right */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 size-9 flex items-center justify-center
              rounded-md text-foreground/80 hover:text-foreground cursor-pointer"
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
            className="inline-flex items-center px-6 py-3 rounded-md text-base
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

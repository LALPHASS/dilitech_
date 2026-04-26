"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PremiumCTAButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary";
}

export function PremiumCTAButton({
  children,
  onClick,
  className,
  href,
  target,
  rel,
  variant = "primary",
}: PremiumCTAButtonProps) {
  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full",
    "text-sm font-medium text-white cursor-pointer",
    "transform transition-all duration-300",
    "hover:scale-105 active:scale-95",
    "overflow-hidden group",
    className
  );

  const content = (
    <>
      {/* Glow effect */}
      {variant === "primary" && (
        <span
          className="absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, #02a3da 0%, #015a7a 100%)" }}
        />
      )}

      {/* Button background */}
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300",
          variant === "primary"
            ? "bg-gradient-to-r from-[#02a3da] to-[#015a7a]"
            : "bg-white/5 border border-white/20 group-hover:bg-white/10 group-hover:border-white/40"
        )}
      />

      {/* Shine effect */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}

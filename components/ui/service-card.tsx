"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon: Icon,
  index,
  className,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative p-8 rounded-2xl cursor-pointer overflow-hidden",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm" />

      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, #02a3da 0%, #015a7a 50%, #02a3da 100%)`,
          backgroundSize: "200% 200%",
          padding: "1px",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{
          backgroundPosition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Mouse follow glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(2, 163, 218, 0.25) 0%, transparent 50%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with glow */}
        <motion.div
          className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: "linear-gradient(135deg, #02a3da 0%, #015a7a 100%)" }}
          animate={{
            boxShadow: isHovered
              ? "0 0 30px rgba(2, 163, 218, 0.6)"
              : "0 0 15px rgba(2, 163, 218, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="size-8 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

        {/* Description */}
        <p className="text-white/60 leading-relaxed">{description}</p>

        {/* Number indicator */}
        <div className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03] select-none">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Sparkle particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#02a3da] rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

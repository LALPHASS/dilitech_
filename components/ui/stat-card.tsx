"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ icon: Icon, value, label, className }: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animate numbers if value contains digits
  useEffect(() => {
    if (!isInView) return;

    const numMatch = value.match(/(\d+)/);
    if (numMatch) {
      const targetNum = parseInt(numMatch[1]);
      const prefix = value.slice(0, value.indexOf(numMatch[1]));
      const suffix = value.slice(value.indexOf(numMatch[1]) + numMatch[1].length);
      
      let current = 0;
      const duration = 2000;
      const steps = 60;
      const increment = targetNum / steps;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(`${prefix}${Math.floor(current)}${suffix}`);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "group relative p-8 rounded-2xl text-center cursor-pointer overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-sm" />

      {/* Animated border */}
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

      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(2, 163, 218, 0.2) 0%, transparent 60%)",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center bg-white/5"
          animate={{
            scale: isHovered ? 1.1 : 1,
            boxShadow: isHovered
              ? "0 0 20px rgba(2, 163, 218, 0.4)"
              : "0 0 0px rgba(2, 163, 218, 0)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="size-6 text-[#02a3da]" />
        </motion.div>

        {/* Value */}
        <motion.div
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayValue}
        </motion.div>

        {/* Label */}
        <motion.div
          className="text-sm text-white/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {label}
        </motion.div>
      </div>
    </motion.div>
  );
}

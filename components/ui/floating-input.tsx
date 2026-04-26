"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue);
    }, [props.value, props.defaultValue]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const isFloating = isFocused || hasValue;

    return (
      <div className="relative w-full group">
        {/* Glow effect on focus */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-0 blur transition-opacity duration-300",
            isFocused && "opacity-50"
          )}
          style={{ background: "linear-gradient(135deg, #02a3da 0%, #015a7a 100%)" }}
        />
        
        <input
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "peer relative w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-white",
            "transition-all duration-300 ease-out",
            "focus:outline-none focus:border-[#02a3da]/50 focus:bg-white/8",
            "placeholder-transparent",
            className
          )}
          placeholder=" "
        />
        <label
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 text-white/40",
            "transition-all duration-300 ease-out pointer-events-none",
            "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-[#02a3da]",
            isFloating && "top-2.5 translate-y-0 text-xs",
            isFloating && !isFocused && "text-white/50"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export const FloatingTextarea = React.forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    useEffect(() => {
      setHasValue(!!props.value || !!props.defaultValue);
    }, [props.value, props.defaultValue]);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      props.onBlur?.(e);
    };

    const isFloating = isFocused || hasValue;

    return (
      <div className="relative w-full group">
        {/* Glow effect on focus */}
        <div
          className={cn(
            "absolute -inset-0.5 rounded-xl opacity-0 blur transition-opacity duration-300",
            isFocused && "opacity-50"
          )}
          style={{ background: "linear-gradient(135deg, #02a3da 0%, #015a7a 100%)" }}
        />
        
        <textarea
          ref={ref}
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "peer relative w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-6 pb-2 text-white",
            "transition-all duration-300 ease-out",
            "focus:outline-none focus:border-[#02a3da]/50 focus:bg-white/8",
            "placeholder-transparent resize-none min-h-[100px]",
            className
          )}
          placeholder=" "
        />
        <label
          className={cn(
            "absolute left-4 top-5 text-white/40",
            "transition-all duration-300 ease-out pointer-events-none",
            "peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-[#02a3da]",
            isFloating && "top-2.5 text-xs",
            isFloating && !isFocused && "text-white/50"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FloatingTextarea.displayName = "FloatingTextarea";

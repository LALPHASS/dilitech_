"use client";

import { useState, useEffect, useRef } from "react";

interface LoadingProgress {
  progress: number;
  isComplete: boolean;
}

/**
 * Tracks font, image, and 3D model loading state.
 * Returns a progress value (0–100) and an isComplete boolean.
 *
 * Each of the three asset groups (fonts, images, model) contributes
 * roughly one-third of the total progress. A safety timeout ensures
 * the loading screen always completes even if an asset tracker stalls.
 */
export function useLoadingProgress(): LoadingProgress {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const done = useRef({ fonts: false, images: false, model: false });

  useEffect(() => {
    let cancelled = false;

    const update = () => {
      if (cancelled) return;
      const { fonts, images, model } = done.current;
      let total = 0;
      if (fonts) total += 34;
      if (images) total += 33;
      if (model) total += 33;
      setProgress(total);
      if (total >= 100) setIsComplete(true);
    };

    // 1. Fonts
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        done.current.fonts = true;
        update();
      });
    } else {
      done.current.fonts = true;
    }

    // 2. Images — wait for every <img> currently in the DOM.
    //    Re-query after a micro-tick so Next.js <Image> elements are mounted.
    requestAnimationFrame(() => {
      if (cancelled) return;
      const imgs = Array.from(document.querySelectorAll("img"));
      if (imgs.length === 0) {
        done.current.images = true;
        update();
        return;
      }

      let loaded = 0;
      const check = () => {
        loaded++;
        if (loaded >= imgs.length) {
          done.current.images = true;
          update();
        }
      };

      imgs.forEach((img) => {
        if (img.complete && img.naturalWidth > 0) {
          check();
        } else {
          img.addEventListener("load", check, { once: true });
          img.addEventListener("error", check, { once: true });
        }
      });
    });

    // 3. 3D model — the actual model is loaded by R3F Suspense;
    //    we approximate readiness with a short delay.
    const modelTimer = setTimeout(() => {
      done.current.model = true;
      update();
    }, 800);

    // 4. Safety net — guarantee completion within 4 seconds no matter what.
    const safetyTimer = setTimeout(() => {
      done.current.fonts = true;
      done.current.images = true;
      done.current.model = true;
      update();
    }, 4000);

    return () => {
      cancelled = true;
      clearTimeout(modelTimer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return { progress, isComplete };
}

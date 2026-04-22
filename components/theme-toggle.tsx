"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useSyncExternalStore } from "react";

// Always returns true on server, false on client after hydration
const subscribe = (cb: () => void) => { cb(); return () => {}; };
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <button
        className="relative size-9 rounded-md cursor-pointer"
        aria-label="Changer le thème"
        disabled
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative size-9 flex items-center justify-center rounded-md cursor-pointer
        text-foreground/80 hover:text-foreground hover:bg-white/10
        transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
    >
      <Sun
        className={`size-5 transition-all duration-300 ${
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        } absolute`}
      />
      <Moon
        className={`size-5 transition-all duration-300 ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"
        } absolute`}
      />
    </button>
  );
}

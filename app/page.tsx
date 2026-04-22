"use client";

import { useState } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ProductGrid } from "@/components/product-grid";
import { ConversionSection } from "@/components/conversion-section";
import { ServicesSection } from "@/components/services-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <LoadingScreen onLoadingComplete={() => setIsLoaded(true)} />
      )}

      <div
        className="flex flex-col min-h-screen overflow-x-hidden"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <ProductGrid />
          <ConversionSection />
          <ServicesSection />
          <TestimonialsSection />
          <AboutSection />
        </main>
        <Footer />
      </div>
    </>
  );
}

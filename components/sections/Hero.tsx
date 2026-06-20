"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero"className="relative min-h-screen flex items-center bg-charcoal overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #2d7a55 0px,
              #2d7a55 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* Green accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-forest-green" />

      <div className="container-max section-padding relative z-10 w-full">
        <div className="max-w-3xl">
         

          {/* Headline */}
          <h1
            className={`font-cormorant font-semibold text-white leading-tight mb-6 transition-all duration-700 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            Your Rights.
            <br />
            <span className="text-sage-green">Our Resolve.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`font-outfit text-lg text-white/70 leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Njoroge Kiriro Advocates is a Nairobi-based law firm delivering
            insightful, results-driven legal counsel to individuals and
            businesses across Kenya.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap gap-4 transition-all duration-700 delay-500 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button size="lg" onClick={() => scrollTo("#contact")}>
              Book a Consultation
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => scrollTo("#practice-areas")}
            >
              Our Practice Areas
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warm-white to-transparent" />
    </section>
  );
}
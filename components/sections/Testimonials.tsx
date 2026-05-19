"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/constants";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="bg-charcoal section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="Client Reviews"
          title="What Our Clients Say"
          subtitle="We measure our success by the outcomes we achieve and the trust our clients place in us."
          light
        />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {testimonials.map((t, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`p-6 border transition-all duration-300 cursor-pointer ${
                active === index
                  ? "border-forest-green bg-forest-green/10"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <Quote
                size={24}
                className="text-sage-green mb-4"
              />
              <p className="font-cormorant text-lg italic text-white/90 leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <p className="font-outfit text-sm font-semibold text-white">
                  {t.name}
                </p>
                <p className="font-outfit text-xs text-sage-green uppercase tracking-wider mt-1">
                  {t.matter}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                active === index
                  ? "w-8 h-2 bg-forest-green"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Building2,
  Heart,
  Scale,
  Users,
  Globe,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { practiceAreas } from "@/lib/constants";

const iconMap: Record<string, React.ReactNode> = {
  Briefcase: <Briefcase size={28} />,
  Building2: <Building2 size={28} />,
  Heart: <Heart size={28} />,
  Scale: <Scale size={28} />,
  Users: <Users size={28} />,
  Globe: <Globe size={28} />,
};

export default function PracticeAreas() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="practice-areas" className="bg-light-grey section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Areas of Practice"
          subtitle="We offer comprehensive legal services across six core areas, giving individuals and businesses in Kenya access to expert counsel under one roof."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => (
            <div
              key={area.title}
              className={`bg-warm-white p-8 border-b-2 border-transparent hover:border-forest-green transition-all duration-500 group ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-forest-green mb-5 group-hover:text-sage-green transition-colors duration-300">
                {iconMap[area.icon]}
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-3">
                {area.title}
              </h3>
              <p className="font-outfit text-sm text-muted leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
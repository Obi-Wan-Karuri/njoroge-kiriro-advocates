"use client";

import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

const stats = [
  { value: 5, suffix: "+", label: "Years of Experience" },
  { value: 300, suffix: "+", label: "Cases Handled" },
  { value: 9, suffix: "", label: "Areas of Practice" },
  { value: 100, suffix: "%", label: "Client Confidentiality" },
];

function AnimatedStat({
  value,
  suffix,
  label,
  triggered,
}: {
  value: number;
  suffix: string;
  label: string;
  triggered: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, value]);

  return (
    <div className="text-center md:text-left">
      <p className="font-cormorant text-5xl font-bold text-forest-green">
        {count}
        {suffix}
      </p>
      <p className="font-outfit text-sm text-muted mt-1 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-warm-white section-padding">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionHeading
              eyebrow="About the Firm"
              title=" "
              subtitle="Founded on the belief that every client deserves effective legal representation, Njoroge Kiriro Advocates has built a reputation for integrity and excellence across Kenya."
              align="left"
            />
            <p className="font-outfit text-base text-muted leading-relaxed mb-6">
              Our team brings deep expertise across a broad range of practice
              areas, serving individuals and businesses with the same high
              level of dedication and attention to detail. We take the time to
              understand your situation fully before charting the best path
              forward.
            </p>
            <p className="font-outfit text-base text-muted leading-relaxed">
              As members of the Law Society of Kenya, we uphold the highest
              standards of professional conduct. When you engage Njoroge Kiriro
              Advocates, you engage a firm that is as invested in your outcome
              as you are.
            </p>
          </div>

          {/* Stats */}
          <div ref={ref}>
            <div className="grid grid-cols-2 gap-10 p-10 bg-light-grey">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} triggered={triggered} />
              ))}
            </div>
            <div className="mt-6 p-6 border-l-4 border-forest-green bg-light-grey">
              <p className="font-cormorant text-xl italic text-charcoal leading-relaxed">
                "We do not just handle your case — we stand with you through
                every step of the legal process."
              </p>
              <p className="font-outfit text-sm text-muted mt-3 uppercase tracking-wider">
                — Njoroge Kiriro, Managing Partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
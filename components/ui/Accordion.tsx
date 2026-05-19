"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-light-grey">
      {items.map((item, index) => (
        <div key={index} className="py-5">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
          >
            <span className="font-cormorant text-xl font-semibold text-charcoal group-hover:text-forest-green transition-colors duration-200">
              {item.question}
            </span>
            <ChevronDown
              size={20}
              className={`shrink-0 text-forest-green transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-96 opacity-100 mt-3"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="font-outfit text-base text-muted leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
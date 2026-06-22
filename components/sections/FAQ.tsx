import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/lib/constants";

export default function FAQ() {
  return (
    <section id="faq" className="bg-warm-white section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          subtitle="Answers to the questions we hear most often. If you don't find what you're looking for, feel free to get in touch."
        />
        <div className="w-full max-w-3xl mx-auto px-0">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
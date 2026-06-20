"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { practiceAreas } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(20, "Please enter at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full font-outfit text-sm text-charcoal bg-warm-white border border-light-grey px-4 py-3 outline-none focus:border-forest-green transition-colors duration-200 placeholder:text-muted";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="bg-light-grey section-padding">
      <div className="container-max">
        <SectionHeading
          eyebrow="Get in Touch"
          title="Contact Us"
          subtitle="Ready to discuss your legal matter? Reach out and we will get back to you."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-6">Our Details</h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <Phone size={20} className="text-forest-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-outfit text-xs text-muted uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:+254705269529" className="font-outfit text-base text-charcoal hover:text-forest-green transition-colors">+254 705 269 529</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail size={20} className="text-forest-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-outfit text-xs text-muted uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:nkiriro@proton.me" className="font-outfit text-base text-charcoal hover:text-forest-green transition-colors">nkiriro@proton.me</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin size={20} className="text-forest-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-outfit text-xs text-muted uppercase tracking-wider mb-1">Address</p>
                    <p className="font-outfit text-base text-charcoal">Kikinga House Annex, 6th Floor, suite 603, Kiambu</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MessageCircle size={20} className="text-forest-green mt-0.5 shrink-0" />
                  <div>
                    <p className="font-outfit text-xs text-muted uppercase tracking-wider mb-1">WhatsApp</p>
                    <a href="https://wa.me/254705269529" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-outfit text-sm text-white bg-forest-green hover:bg-sage-green px-4 py-2 transition-colors duration-200">Chat on WhatsApp</a>
                  </div>
                </li>
              </ul>
            </div>
           
          </div>
          <div className="bg-warm-white p-8">
            <h3 className="font-cormorant text-2xl font-semibold text-charcoal mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <input {...register("name")} placeholder="Full Name" className={inputClass} />
                {errors.name?.message && (
                  <p className="font-outfit text-xs text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <input {...register("email")} placeholder="Email Address" type="email" className={inputClass} />
                {errors.email?.message && (
                  <p className="font-outfit text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <input {...register("phone")} placeholder="Phone Number" type="tel" className={inputClass} />
                {errors.phone?.message && (
                  <p className="font-outfit text-xs text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
              <div>
                <select {...register("subject")} className={inputClass}>
                  <option value="">Select a Practice Area</option>
                  {practiceAreas.map((area) => (
                    <option key={area.title} value={area.title}>{area.title}</option>
                  ))}
                </select>
                {errors.subject?.message && (
                  <p className="font-outfit text-xs text-red-500 mt-1">{errors.subject.message}</p>
                )}
              </div>
              <div>
                <textarea {...register("message")} placeholder="Briefly describe your legal matter..." rows={5} className={`${inputClass} resize-none`} />
                {errors.message?.message && (
                  <p className="font-outfit text-xs text-red-500 mt-1">{errors.message.message}</p>
                )}
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                <Send size={16} className="mr-2" />
                {status === "loading" ? "Sending..." : "Send Message"}
              </Button>
              {status === "success" && (
                <p className="font-outfit text-sm text-forest-green text-center">Message sent successfully. We will be in touch shortly.</p>
              )}
              {status === "error" && (
                <p className="font-outfit text-sm text-red-500 text-center">Something went wrong. Please try again or email us directly.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
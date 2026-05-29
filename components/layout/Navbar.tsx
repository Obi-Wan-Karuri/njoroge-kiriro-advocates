"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-charcoal shadow-lg" : "bg-transparent"}`}>
      <div className="container-max px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo_white.png" alt="Njoroge Kiriro & Company Advocates Logo" width={48} height={48} className="object-contain" />
            <div className="flex flex-col leading-tight">
              <span className="font-cormorant text-xl font-semibold text-white tracking-wide">NJOROGE KIRIRO & COMPANY</span>
              <span className="font-cormorant text-xl font-semibold text-sage-green tracking-wide">ADVOCATES</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => handleNavClick(link.href)} className="font-outfit text-sm text-white/80 hover:text-white tracking-wide transition-colors duration-200 cursor-pointer">
                {link.label}
              </button>
            ))}
            <Button size="sm" onClick={() => handleNavClick("#contact")}>Book a Consultation</Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden bg-charcoal transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-screen py-6" : "max-h-0"}`}>
        <nav className="flex flex-col gap-6 px-6">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => handleNavClick(link.href)} className="font-outfit text-base text-white/80 hover:text-white text-left tracking-wide transition-colors duration-200 cursor-pointer">
              {link.label}
            </button>
          ))}
          <Button onClick={() => handleNavClick("#contact")} className="w-full">Book a Consultation</Button>
        </nav>
      </div>
    </header>
  );
}
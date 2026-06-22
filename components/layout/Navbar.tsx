"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-charcoal shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-max px-4 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 group min-w-0">
            <Image
              src="/logo_white.png"
              alt="Njoroge Kiriro & Company Advocates Logo"
              width={56}
              height={56}
              className="h-10 md:h-14 w-auto object-contain shrink-0"
              priority
            />
            <div className="flex flex-col leading-tight min-w-0">
              <span className="font-cormorant text-sm md:text-xl font-semibold text-white tracking-wide truncate group-hover:text-white/80 transition-colors duration-200">
                NJOROGE KIRIRO & COMPANY
              </span>
              <span className="font-cormorant text-sm md:text-xl font-semibold text-sage-green tracking-wide group-hover:text-sage-green/80 transition-colors duration-200">
                ADVOCATES
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-outfit text-sm text-white/80 hover:text-white tracking-wide transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <Button size="sm" onClick={() => handleNavClick("#contact")}>
              Book a Consultation
            </Button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white cursor-pointer p-2 shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-charcoal transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-screen py-6" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-5 px-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-outfit text-base text-white/80 hover:text-white text-left tracking-wide transition-colors duration-200 cursor-pointer py-1 border-b border-white/10 last:border-0"
            >
              {link.label}
            </button>
          ))}
          <Button onClick={() => handleNavClick("#contact")} className="w-full mt-2">
            Book a Consultation
          </Button>
        </nav>
      </div>
    </header>
  );
}
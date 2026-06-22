import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal">
      <div className="container-max px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pb-10 md:pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group w-fit">
              <Image
                src="/logo_white.png"
                alt="Njoroge Kiriro & Company Advocates Logo"
                width={48}
                height={48}
                className="h-12 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-cormorant text-base md:text-xl font-semibold text-white tracking-wide group-hover:text-white/80 transition-colors duration-200">
                  NJOROGE KIRIRO & COMPANY
                </span>
                <span className="font-cormorant text-base md:text-xl font-semibold text-sage-green tracking-wide group-hover:text-sage-green/80 transition-colors duration-200">
                  ADVOCATES
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-outfit text-xs font-semibold text-white uppercase tracking-widest mb-4 md:mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2 md:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-outfit text-xs font-semibold text-white uppercase tracking-widest mb-4 md:mb-5">
              Connect
            </h4>
            <ul className="space-y-2 md:space-y-3 mb-5 md:mb-6">
              <li>
                <a
                  href="tel:+254705269529"
                  className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200"
                >
                  0705 269 529
                </a>
              </li>
              <li>
                <a
                  href="mailto:nkiriro@proton.me"
                  className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200 break-all"
                >
                  nkiriro@proton.me
                </a>
              </li>
              <li>
                <span className="font-outfit text-sm text-white/50 leading-relaxed">
                  Kikinga House Annex,{" "}
                  <br className="hidden sm:block" />
                  6th Floor, Suite 603, Kiambu
                </span>
              </li>
            </ul>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/njoroge-kiriro-company-advocates/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="font-outfit text-xs text-white/40 hover:text-sage-green transition-colors duration-200 uppercase tracking-wider"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-outfit text-xs text-white/30 text-center md:text-left">
            © {currentYear} Njoroge Kiriro & Company Advocates. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
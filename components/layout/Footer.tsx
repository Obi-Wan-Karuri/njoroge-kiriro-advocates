import { navLinks } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-charcoal">
      <div className="container-max px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div>
            <div className="flex flex-col leading-tight mb-4">
              <span className="font-cormorant text-xl font-semibold text-white tracking-wide">NJOROGE KIRIRO</span>
              <span className="font-outfit text-xs text-sage-green tracking-widest uppercase">Advocates</span>
            </div>
            <p className="font-outfit text-sm text-white/50 leading-relaxed max-w-xs">Principled legal counsel for individuals and businesses across Kenya. Your rights. Our resolve.</p>
          </div>
          <div>
            <h4 className="font-outfit text-xs font-semibold text-white uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-outfit text-xs font-semibold text-white uppercase tracking-widest mb-5">Connect</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="tel:+254700000000" className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200">+254 700 000 000</a>
              </li>
              <li>
                <a href="mailto:nkiriro@proton.me" className="font-outfit text-sm text-white/50 hover:text-white transition-colors duration-200">nkiriro@proton.me</a>
              </li>
              <li>
                <span className="font-outfit text-sm text-white/50">Nairobi, Kenya</span>
              </li>
            </ul>
            <div className="flex gap-4">
              <a href="#" aria-label="LinkedIn" className="font-outfit text-xs text-white/40 hover:text-sage-green transition-colors duration-200 uppercase tracking-wider">LinkedIn</a>
              <a href="#" aria-label="Twitter" className="font-outfit text-xs text-white/40 hover:text-sage-green transition-colors duration-200 uppercase tracking-wider">Twitter</a>
              <a href="#" aria-label="Facebook" className="font-outfit text-xs text-white/40 hover:text-sage-green transition-colors duration-200 uppercase tracking-wider">Facebook</a>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-outfit text-xs text-white/30">© {currentYear} Njoroge Kiriro Advocates. All Rights Reserved.</p>
          <p className="font-outfit text-xs text-white/30 text-center">Regulated by the <span className="text-white/50">Law Society of Kenya</span></p>
        </div>
      </div>
    </footer>
  );
}
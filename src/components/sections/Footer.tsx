import { Instagram, Linkedin, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[var(--charcoal-deep)] text-white/80 relative grain">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-[var(--gold)]/30 reveal">
          <div className="font-display uppercase text-white text-[28px] lg:text-[40px]" style={{ letterSpacing: "0.12em" }}>
            Sukrit Infrastructure Pvt Ltd
          </div>
          <div className="flex flex-col lg:items-center mt-1">
            <a
              href="/Sukrit%20Infrastructure%20-%20(Residential%20Construcion)%20-%20OneXmedia%20_20251222_191544_0000.pdf"
              download="Sukrit_Infrastructure_Catalogue.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] hover:text-[#d4b870] transition-colors mb-2 font-medium flex items-center gap-1.5"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Our Catalogue
            </a>
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              CIN U41001AS2026PTC029861 <span className="mx-2 opacity-50">|</span> UNIT OF AB GROUP
            </div>
          </div>
          <div className="text-white/50 text-[12px] uppercase tracking-[0.3em]">
            Building Assam's Tomorrow, Today.
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-16 reveal">
          <div>
            <div className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6">Connect</div>
            <p className="text-[14px] leading-[1.8] text-white/60 max-w-[240px]">
              A real estate house from Assam, building landmark homes since 2005.
            </p>
            <div className="flex gap-4 mt-6 text-white/70">
              <a href="https://www.instagram.com/sukrit.infrastructure/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[var(--gold)] transition-colors"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-[var(--gold)] transition-colors"><Linkedin size={18} /></a>
              <a href="#" aria-label="YouTube" className="hover:text-[var(--gold)] transition-colors"><Youtube size={18} /></a>
            </div>
          </div>

          <FooterCol title="Quick Links" items={["Home", "Projects", "About", "Contact"]} />
          <FooterCol title="Locations" items={["Guwahati", "Jorhat", "Dibrugarh", "Tezpur"]} />

          <div>
            <div className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6">Reach Us</div>
            <div className="text-[13px] leading-[1.9] text-white/60">
              +91 91010 02790<br />
              hello@sukritinfrastructure.in<br />
              Jorhat · Assam
            </div>
            <a
              href="https://wa.me/919101002790?text=Hi%2C%20I%20would%20like%20to%20know%20more%20about%20Sukrit%20Infrastructure%20projects."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.25em] hover:opacity-90 transition-opacity"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[12px] text-white/40 reveal">
          <div>© 2025 Sukrit Infrastructure Pvt Ltd. All Rights Reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[var(--gold)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--gold)] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-[var(--gold)] text-[10px] uppercase tracking-[0.3em] mb-6">{title}</div>
      <ul className="space-y-3 text-[13px] text-white/60">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="story-link !text-white/70 !text-[13px] !tracking-[0.05em] !normal-case">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

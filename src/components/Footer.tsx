import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerLinks = {
    [lang === "de" ? "Navigation" : "Navigation"]: [
      { label: lang === "de" ? "Anwendungsfälle" : "Use Cases", href: "#use-cases" },
      { label: lang === "de" ? "Kundenstimmen" : "Testimonials", href: "#testimonials" },
      { label: lang === "de" ? "Preise" : "Pricing", href: "#pricing" },
      { label: lang === "de" ? "Kontakt" : "Contact", href: "#contact" },
    ],
    [lang === "de" ? "Produkt" : "Product"]: [
      { label: lang === "de" ? "KI-Anrufassistent" : "AI Call Assistant", href: "#use-cases" },
      { label: lang === "de" ? "Integrationen" : "Integrations", href: "#integrations" },
      { label: lang === "de" ? "Demo buchen" : "Book a Demo", href: "#booking" },
      { label: "FAQ", href: "#faq" },
    ],
    [lang === "de" ? "Rechtliches" : "Legal"]: [
      { label: lang === "de" ? "Datenschutzerklärung" : "Privacy Policy", href: "/privacy" },
      { label: lang === "de" ? "KI-Offenlegung" : "AI Disclosure", href: "/privacy#ai-disclosure" },
      { label: lang === "de" ? "DSGVO" : "GDPR", href: "/privacy" },
    ],
  };

  return (
    <footer className="vox-section-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <span className="text-[15px] font-medium tracking-[-0.02em]">
              Voxalio<span className="vox-gradient-text">.de</span>
            </span>
            <p className="mt-3 text-[13px] font-normal opacity-35 leading-[1.7] tracking-normal">{t("hero.badge")}</p>

            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="Twitter">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            <p className="mt-5 text-[11px] font-normal opacity-25 tracking-normal">{t("footer.powered")}</p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium text-[13px] mb-4 text-white/80">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] font-normal opacity-40 hover:opacity-80 transition-all duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-normal opacity-35">{t("footer.rights")}</p>
          <p className="text-[12px] font-normal opacity-25">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

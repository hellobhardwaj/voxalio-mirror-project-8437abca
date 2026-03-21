import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  const { t, lang } = useLanguage();

  const columns = [
    {
      title: lang === "de" ? "Navigation" : "Navigation",
      links: [
        { label: lang === "de" ? "Anwendungsfälle" : "Use Cases", href: "#use-cases" },
        { label: lang === "de" ? "Kundenstimmen" : "Testimonials", href: "#testimonials" },
        { label: lang === "de" ? "Preise" : "Pricing", href: "#pricing" },
        { label: lang === "de" ? "Kontakt" : "Contact", href: "#contact" },
      ],
    },
    {
      title: lang === "de" ? "Produkt" : "Product",
      links: [
        { label: lang === "de" ? "KI-Anrufassistent" : "AI Call Assistant", href: "#how-it-works" },
        { label: lang === "de" ? "Integrationen" : "Integrations", href: "#integrations" },
        { label: lang === "de" ? "Demo buchen" : "Book a Demo", href: "#booking" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: lang === "de" ? "Rechtliches" : "Legal",
      links: [
        { label: lang === "de" ? "Datenschutzerklärung" : "Privacy Policy", href: "/privacy" },
        { label: lang === "de" ? "KI-Offenlegung" : "AI Disclosure", href: "/ai-disclosure" },
        { label: "GDPR", href: "/gdpr" },
      ],
    },
  ];

  return (
    <footer style={{ background: "#060910" }}>
      <div className="border-t border-white/[0.06]" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-[#2563eb] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 18.5C15.5 18.5 18.5 15.5 18.5 12C18.5 8.5 15.5 5.5 12 5.5C8.5 5.5 5.5 8.5 5.5 12C5.5 15.5 8.5 18.5 12 18.5Z" />
                  <path d="M8 12h1.5l1-3 1.5 6 1.5-6 1 3H16" />
                </svg>
              </div>
              <span className="font-display font-700 text-white text-base">Voxalio</span>
            </div>
            <p className="text-[14px] text-[#64748b] mb-6">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-all" aria-label={Icon.displayName}>
                  <Icon className="w-4 h-4 text-[#64748b] hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-[#64748b]/50 hover:text-[#64748b] transition-colors"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-600 text-[12px] mb-4 text-white/50 uppercase tracking-[0.06em]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-[#64748b] hover:text-white transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#64748b]/50">{t("footer.rights")}</p>
          <p className="text-[11px] text-[#64748b]/30">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

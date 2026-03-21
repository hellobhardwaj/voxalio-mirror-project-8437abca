import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import voxalioIcon from "@/assets/voxalio-icon.png";

const Footer = () => {
  const { t, lang } = useLanguage();

  const columns = [
    {
      title: "Navigation",
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
    <footer style={{ background: "var(--bg-mid)" }}>
      {/* Top gradient line */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.2), transparent)" }} />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: "var(--gradient-primary)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 18.5C15.5 18.5 18.5 15.5 18.5 12C18.5 8.5 15.5 5.5 12 5.5C8.5 5.5 5.5 8.5 5.5 12C5.5 15.5 8.5 18.5 12 18.5Z" />
                  <path d="M8 12h1.5l1-3 1.5 6 1.5-6 1 3H16" />
                </svg>
              </div>
              <span className="font-display font-bold text-[var(--text-primary)] text-base">Voxalio</span>
            </div>
            <p className="text-[14px] text-[var(--text-muted)] mb-6">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-[rgba(37,99,235,0.08)]" style={{ background: "rgba(37,99,235,0.04)", border: "1px solid #e2e8f0" }} aria-label={Icon.displayName}>
                  <Icon className="w-4 h-4 text-[var(--text-secondary)] hover:text-[var(--purple)] transition-colors" />
                </a>
              ))}
            </div>

            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-[var(--text-muted)] opacity-70 hover:opacity-100 hover:text-[var(--purple)] transition-all"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold text-[var(--text-xs)] mb-4 text-[var(--text-muted)] uppercase tracking-[0.06em]">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-[var(--text-secondary)] hover:text-[var(--purple)] transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid #e2e8f0" }}>
          <p className="text-[var(--text-xs)] text-[var(--text-muted)]">{t("footer.rights")}</p>
          <p className="text-[11px] text-[var(--text-muted)] opacity-50">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

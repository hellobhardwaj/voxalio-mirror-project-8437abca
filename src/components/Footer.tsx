import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import voxalioIcon from "@/assets/voxalio-icon.png";

const Footer = () => {
  const { t, lang } = useLanguage();

  const navLinks = lang === "de"
    ? [
        { label: "Anwendungsfälle", href: "#use-cases" },
        { label: "Preise", href: "#pricing" },
        { label: "Kontakt", href: "#contact" },
      ]
    : [
        { label: "Use Cases", href: "#use-cases" },
        { label: "Pricing", href: "#pricing" },
        { label: "Contact", href: "#contact" },
      ];

  const productLinks = lang === "de"
    ? [
        { label: "KI-Anrufassistent", href: "#" },
        { label: "Integrationen", href: "#integrations" },
        { label: "Demo buchen", href: "#calendly" },
        { label: "FAQ", href: "#faq" },
      ]
    : [
        { label: "AI Call Assistant", href: "#" },
        { label: "Integrations", href: "#integrations" },
        { label: "Book a Demo", href: "#calendly" },
        { label: "FAQ", href: "#faq" },
      ];

  const legalLinks = [
    { label: lang === "de" ? "Datenschutz" : "Privacy Policy", to: "/privacy" },
    { label: lang === "de" ? "KI-Offenlegung" : "AI Disclosure", to: "/ai-disclosure" },
    { label: "GDPR", to: "/gdpr" },
  ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0f1729 0%, #0a1020 100%)" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-16">
          {/* Left: Logo + tagline + socials + powered by */}
          <div className="flex-shrink-0 max-w-[280px]">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-lg tracking-tight">Voxalio</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>
            <div className="flex items-center gap-3 mb-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 text-xs hover:text-white/50 transition-colors"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Right: 3 link columns */}
          <div className="flex flex-wrap gap-16 md:gap-20">
            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-5">
                {lang === "de" ? "Navigation" : "Navigation"}
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-5">
                {lang === "de" ? "Produkt" : "Product"}
              </h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-5">
                {lang === "de" ? "Rechtliches" : "Legal"}
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/50 text-sm hover:text-white/80 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-white/30 text-xs">
            {t("footer.rights")}
          </p>
          <p className="text-white/30 text-xs">
            {t("footer.disclosure")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

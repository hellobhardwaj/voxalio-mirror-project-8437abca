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
    <footer
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 0% 100%, rgba(37,99,235,0.12), transparent 55%),
          linear-gradient(180deg, #111827 0%, #0f1521 100%)
        `,
      }}
    >
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-14 pb-10">
        {/* Main content row */}
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left brand column */}
          <div className="flex-shrink-0 md:w-[220px]">
            <div className="flex items-center gap-2 mb-3">
              <img src={voxalioIcon} alt="Voxalio" className="w-7 h-7 rounded-md object-contain" />
              <span className="font-display font-bold text-white text-[15px] tracking-tight">Voxalio</span>
            </div>
            <p className="text-[rgba(255,255,255,0.4)] text-[12.5px] leading-relaxed mb-5">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>
            <div className="flex items-center gap-2 mb-5">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[rgba(255,255,255,0.5)] hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  <Icon className="w-[13px] h-[13px]" />
                </a>
              ))}
            </div>
            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.25)] text-[11px] hover:text-[rgba(255,255,255,0.45)] transition-colors"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Right link columns — pushed right */}
          <div className="flex flex-wrap gap-[60px] md:ml-auto">
            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold text-white text-[12px] uppercase tracking-[0.14em] mb-5">
                Navigation
              </h4>
              <ul className="space-y-[10px]">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[rgba(255,255,255,0.45)] text-[12.5px] hover:text-[rgba(255,255,255,0.75)] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-display font-bold text-white text-[12px] uppercase tracking-[0.14em] mb-5">
                {lang === "de" ? "Produkt" : "Product"}
              </h4>
              <ul className="space-y-[10px]">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[rgba(255,255,255,0.45)] text-[12.5px] hover:text-[rgba(255,255,255,0.75)] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold text-white text-[12px] uppercase tracking-[0.14em] mb-5">
                {lang === "de" ? "Rechtliches" : "Legal"}
              </h4>
              <ul className="space-y-[10px]">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[rgba(255,255,255,0.45)] text-[12.5px] hover:text-[rgba(255,255,255,0.75)] transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[rgba(255,255,255,0.25)] text-[11px]">
            {t("footer.rights")}
          </p>
          <p className="text-[rgba(255,255,255,0.25)] text-[11px]">
            {t("footer.disclosure")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

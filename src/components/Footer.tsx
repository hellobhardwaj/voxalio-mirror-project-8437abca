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
          radial-gradient(ellipse at 0% 100%, rgba(37,99,235,0.15), transparent 60%),
          linear-gradient(180deg, #141c2e 0%, #111827 100%)
        `,
      }}
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-16 md:py-20">
        {/* Main content row */}
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left brand column — fixed width, stays left */}
          <div className="flex-shrink-0 md:w-[260px]">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-[17px] tracking-tight">Voxalio</span>
            </div>
            <p className="text-[rgba(255,255,255,0.45)] text-[13px] leading-relaxed mb-7">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>
            <div className="flex items-center gap-2.5 mb-7">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[rgba(255,255,255,0.55)] hover:text-white transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <Icon className="w-[15px] h-[15px]" />
                </a>
              ))}
            </div>
            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[rgba(255,255,255,0.28)] text-[12px] hover:text-[rgba(255,255,255,0.5)] transition-colors"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Right link columns — pushed right with auto left margin */}
          <div className="flex flex-wrap gap-[72px] md:ml-auto">
            {/* Navigation */}
            <div>
              <h4 className="font-display font-bold text-white text-[13px] uppercase tracking-[0.15em] mb-6">
                {lang === "de" ? "Navigation" : "Navigation"}
              </h4>
              <ul className="space-y-[14px]">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[rgba(255,255,255,0.5)] text-[13.5px] hover:text-[rgba(255,255,255,0.8)] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-display font-bold text-white text-[13px] uppercase tracking-[0.15em] mb-6">
                {lang === "de" ? "Produkt" : "Product"}
              </h4>
              <ul className="space-y-[14px]">
                {productLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[rgba(255,255,255,0.5)] text-[13.5px] hover:text-[rgba(255,255,255,0.8)] transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-bold text-white text-[13px] uppercase tracking-[0.15em] mb-6">
                {lang === "de" ? "Rechtliches" : "Legal"}
              </h4>
              <ul className="space-y-[14px]">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-[rgba(255,255,255,0.5)] text-[13.5px] hover:text-[rgba(255,255,255,0.8)] transition-colors">
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
          className="mt-16 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[rgba(255,255,255,0.28)] text-[12px]">
            {t("footer.rights")}
          </p>
          <p className="text-[rgba(255,255,255,0.28)] text-[12px]">
            {t("footer.disclosure")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

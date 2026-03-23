import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import voxalioIcon from "@/assets/voxalio-icon.png";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const Footer = () => {
  const { lang } = useLanguage();

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

  const headingClass = "font-body font-semibold text-[rgba(255,255,255,0.65)] text-[11px] uppercase tracking-[0.14em] mb-6";
  const linkClass = "text-[#b0c4de] text-[13.5px] font-body font-normal hover:text-white transition-colors duration-200";

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient transition from page background to footer */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-[5] pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, var(--bg-mid) 0%, #0f1a2e 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(175deg, #0f1a2e 0%, #090f1e 60%, #070b17 100%)",
          boxShadow: "0 -2px 60px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      />
      {/* Dithering texture background */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-25">
        <Suspense fallback={null}>
          <Dithering
            colorBack="#00000000"
            colorFront="#2563eb"
            shape="warp"
            type="4x4"
            speed={0.2}
            className="size-full"
            minPixelRatio={1}
          />
        </Suspense>
      </div>

      {/* Watermark */}
      <span
        className="absolute z-0 pointer-events-none select-none font-display font-extrabold uppercase hidden md:block"
        style={{
          bottom: "24px",
          right: "40px",
          fontSize: "80px",
          color: "rgba(255,255,255,0.025)",
          letterSpacing: "0.08em",
          lineHeight: 1,
        }}
      >
        VOXALIO
      </span>

      {/* Card content */}
      <div className="relative z-10 px-8 pt-36 pb-8 md:px-16 md:pt-40 md:pb-10 lg:px-20">
        {/* Main grid — brand left, 3 nav columns right */}
        <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 md:gap-16 lg:gap-20">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3">
              <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-[17px] tracking-tight">Voxalio</span>
            </div>
            <p className="text-[#8fa4c0] text-[13px] font-body mt-4 leading-[1.6] whitespace-pre-line">
              {lang === "de" ? "KI-Sprachagenten —\nMade in Germany" : "Discover the future of\nAI Voice Agents"}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center w-8 h-8 rounded-lg text-[#6b7f9e] hover:text-white hover:bg-[rgba(255,255,255,0.06)] transition-all duration-200"
                >
                  <Icon className="w-[14px] h-[14px]" />
                </a>
              ))}
            </div>
            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-[#3d4f6a] text-[12px] font-body hover:text-[#8a9bb8] transition-colors duration-200"
            >
              Powered by Optimis AI
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={headingClass}>Navigation</h4>
            <ul className="flex flex-col gap-[14px]">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className={headingClass}>{lang === "de" ? "Produkt" : "Product"}</h4>
            <ul className="flex flex-col gap-[14px]">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className={headingClass}>{lang === "de" ? "Rechtliches" : "Legal"}</h4>
            <ul className="flex flex-col gap-[14px]">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className={linkClass}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-10 pt-5 border-t border-[rgba(255,255,255,0.06)]">
          <p className="text-[#3d4f6a] text-[12px] font-body whitespace-nowrap">
            {lang === "de" ? "© 2026 Voxalio. Alle Rechte vorbehalten." : "© 2026 Voxalio. All rights reserved."}
          </p>
          <p className="text-[#3d4f6a] text-[12px] font-body whitespace-nowrap">
            {lang === "de"
              ? 'KI-Hinweis: "Hallo, ich bin ein KI-Assistent für Voxalio."'
              : 'AI Disclosure: "Hello, I am an AI assistant for Voxalio."'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

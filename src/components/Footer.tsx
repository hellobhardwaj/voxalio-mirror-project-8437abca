import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import voxalioIcon from "@/assets/voxalio-icon.png";

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

  const headingClass = "font-body font-semibold text-white text-[11px] uppercase tracking-[0.12em] mb-5";
  const linkClass = "text-[#94a3b8] text-[13.5px] font-body font-normal hover:text-white transition-colors duration-200";

  return (
    <div className="px-4 pb-4 md:px-6 md:pb-6" style={{ background: "#050810" }}>
      <footer
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: "linear-gradient(180deg, #0c1525 0%, #080e1c 100%)",
          borderTop: "1px solid rgba(37,99,235,0.2)",
          boxShadow: "0 -1px 50px rgba(37,99,235,0.1)",
        }}
      >
        {/* 3D twisted ribbon shapes - bottom left */}
        <svg
          className="absolute bottom-0 left-0 z-0 pointer-events-none"
          width="420"
          height="340"
          viewBox="0 0 420 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="ribbon1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#1d4ed8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbon2" x1="0.2" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1e40af" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbon3" x1="0" y1="0.2" x2="1" y2="0.8">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0a1628" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbonEdge1" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ribbonEdge2" x1="0.3" y1="0" x2="0.7" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="glow" cx="0.15" cy="0.85" r="0.5">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Ambient glow */}
          <rect width="420" height="340" fill="url(#glow)" />

          {/* Ribbon 1 - large sweeping curve from bottom-left */}
          <path
            d="M-20,340 C-20,280 30,200 60,160 C90,120 100,100 80,60 C60,20 40,0 20,-20"
            stroke="url(#ribbon1)"
            strokeWidth="45"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 1 edge highlight */}
          <path
            d="M-20,340 C-20,280 30,200 60,160 C90,120 100,100 80,60 C60,20 40,0 20,-20"
            stroke="url(#ribbonEdge1)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Ribbon 2 - second curve, slightly offset */}
          <path
            d="M40,340 C50,300 90,240 130,190 C170,140 180,110 160,70 C140,30 120,10 100,-10"
            stroke="url(#ribbon2)"
            strokeWidth="40"
            fill="none"
            strokeLinecap="round"
          />
          {/* Ribbon 2 edge */}
          <path
            d="M40,340 C50,300 90,240 130,190 C170,140 180,110 160,70 C140,30 120,10 100,-10"
            stroke="url(#ribbonEdge2)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {/* Ribbon 3 - thinner, forward */}
          <path
            d="M100,340 C120,310 160,260 200,220 C240,180 260,150 250,110 C240,70 220,40 200,10"
            stroke="url(#ribbon3)"
            strokeWidth="30"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Watermark */}
        <span
          className="absolute z-0 pointer-events-none select-none font-display font-extrabold uppercase hidden md:block"
          style={{
            bottom: "20px",
            right: "30px",
            fontSize: "75px",
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "0.06em",
            lineHeight: 1,
          }}
        >
          VOXALIO
        </span>

        {/* Content */}
        <div className="relative z-10 px-6 pt-10 pb-0 md:px-[60px] md:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-[100px]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5">
                <img src={voxalioIcon} alt="Voxalio" className="w-7 h-7 rounded-lg object-contain" />
                <span className="font-display font-bold text-white text-[16px] tracking-tight">Voxalio</span>
              </div>
              <p className="text-[#7a8ba6] text-[13px] font-body mt-3 leading-relaxed">
                {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "Discover the future of\nAI Voice Agents"}
              </p>
              <div className="flex items-center gap-2.5 mt-5">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-[#7a8ba6] hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-[15px] h-[15px]" />
                  </a>
                ))}
              </div>
              <a
                href="https://www.optimis-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-5 text-[#4a5568] text-[12px] font-body hover:text-white transition-colors duration-200"
              >
                Powered by Optimis AI
              </a>
            </div>

            {/* Navigation */}
            <div>
              <h4 className={headingClass}>Navigation</h4>
              <ul className="flex flex-col gap-[12px]">
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
              <ul className="flex flex-col gap-[12px]">
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
              <ul className="flex flex-col gap-[12px]">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.05)",
              padding: "20px 0",
            }}
          >
            <p className="text-[#4a5568] text-[12px] font-body">
              {lang === "de" ? "© 2026 Voxalio. Alle Rechte vorbehalten." : "© 2026 Voxalio. All rights reserved."}
            </p>
            <p className="text-[#4a5568] text-[12px] font-body">
              {lang === "de"
                ? 'KI-Hinweis: "Hallo, ich bin ein KI-Assistent für Voxalio."'
                : 'AI Disclosure: "Hello, I am an AI assistant for Voxalio."'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

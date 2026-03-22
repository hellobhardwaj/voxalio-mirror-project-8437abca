import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import voxalioIcon from "@/assets/voxalio-icon.png";
import GradientBlinds from "@/components/GradientBlinds";

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
  const linkClass = "text-[#94a3b8] text-[14px] font-body font-normal hover:text-white transition-colors duration-200";

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 50% 60% at 0% 100%, rgba(37,99,235,0.12), transparent 70%),
          #0a1628
        `,
      }}
    >
      {/* WebGL Gradient Blinds - primary bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[400px] z-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(ellipse 85% 95% at 0% 100%, black 25%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 95% at 0% 100%, black 25%, transparent 65%)",
        }}
      >
        <GradientBlinds
          gradientColors={['#1e3a8a', '#2563eb', '#1d4ed8', '#3b82f6']}
          angle={0}
          noise={0.3}
          blindCount={14}
          blindMinWidth={45}
          spotlightRadius={0.6}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      {/* Secondary layer - wider spread, softer */}
      <div
        className="absolute bottom-0 left-0 w-[900px] h-[300px] z-0 pointer-events-none opacity-40"
        style={{
          maskImage: "radial-gradient(ellipse 80% 90% at 5% 100%, black 15%, transparent 60%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 5% 100%, black 15%, transparent 60%)",
        }}
      >
        <GradientBlinds
          gradientColors={['#1e40af', '#2563eb', '#60a5fa']}
          angle={-10}
          noise={0.2}
          blindCount={10}
          blindMinWidth={70}
          spotlightRadius={0.7}
          spotlightSoftness={1.2}
          spotlightOpacity={0.8}
          mouseDampening={0.2}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 pt-10 pb-0 md:px-[80px] md:pt-[60px]">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-[120px]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-[18px] tracking-tight">Voxalio</span>
            </div>
            <p className="text-[#94a3b8] text-[14px] font-body mt-4">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>
            <div className="flex items-center gap-2 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white hover:bg-[rgba(37,99,235,0.3)] hover:border-[rgba(37,99,235,0.5)] transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-[#4a5568] text-[13px] font-body hover:text-white transition-colors duration-200"
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
        <div
          className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 0",
          }}
        >
          <p className="text-[#4a5568] text-[13px] font-body">
            {lang === "de" ? "© 2026 Voxalio. Alle Rechte vorbehalten." : "© 2026 Voxalio. All rights reserved."}
          </p>
          <p className="text-[#4a5568] text-[13px] font-body">
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

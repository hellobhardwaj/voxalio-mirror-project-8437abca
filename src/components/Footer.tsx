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

  const headingClass = "font-body font-bold text-[rgba(255,255,255,0.55)] text-[11px] uppercase tracking-[0.14em] mb-6";
  const linkClass = "text-[#a3b5d0] text-[13.5px] font-body font-semibold hover:text-white transition-colors duration-200";

  return (
    <div style={{ background: "#040711" }}>
      {/* Outer wrapper with generous padding */}
      <div className="px-5 pb-5 pt-8 md:px-8 md:pb-8 md:pt-10 lg:px-10">
        {/* Main footer card */}
        <footer
          className="relative overflow-hidden rounded-[20px] md:rounded-[28px]"
          style={{
            background: "linear-gradient(175deg, #0f1a2e 0%, #090f1e 60%, #070b17 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderTopColor: "rgba(37,99,235,0.25)",
            boxShadow:
              "0 -2px 60px rgba(37,99,235,0.08), 0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Dithering texture background */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-[20px] md:rounded-[28px] opacity-40"
          >
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
          <div className="relative z-10 px-8 pt-14 pb-12 md:px-16 md:pt-16 md:pb-14 lg:px-20">
            {/* Main grid — brand left, 3 nav columns right */}
            <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr] gap-12 md:gap-16 lg:gap-20">
              {/* Brand column */}
              <div>
                <div className="flex items-center gap-3">
                  <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
                  <span className="font-display font-bold text-white text-[17px] tracking-tight">Voxalio</span>
                </div>
                <p className="text-[#8a9bb8] text-[13px] font-body font-semibold mt-4 leading-[1.6] whitespace-pre-line">
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
                  className="inline-block mt-6 text-[#5a6d8a] text-[12px] font-body font-semibold hover:text-[#a3b5d0] transition-colors duration-200"
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
          </div>
        </footer>

        {/* Bottom bar — outside card, on the dark base */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-8 lg:px-10 pt-5 pb-1 relative">
          <p className="text-[#5a6d8a] text-[12px] font-body font-semibold whitespace-nowrap">
            {lang === "de" ? "© 2026 Voxalio. Alle Rechte vorbehalten." : "© 2026 Voxalio. All rights reserved."}
          </p>
          <a
            href="https://rapid-xai.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-1/2 -translate-x-1/2 text-[#5a6d8a] text-[11px] font-body font-semibold opacity-70 hover:opacity-100 transition-opacity duration-200 hidden md:block"
          >
            Powered by RapidX AI
          </a>
          <p className="text-[#5a6d8a] text-[12px] font-body font-semibold whitespace-nowrap">
            {lang === "de"
              ? 'KI-Hinweis: "Hallo, ich bin ein KI-Assistent für Voxalio."'
              : 'AI Disclosure: "Hello, I am an AI assistant for Voxalio."'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

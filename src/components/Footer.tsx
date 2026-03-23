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

  const headingClass = "font-body font-semibold text-[rgba(255,255,255,0.45)] text-[11px] uppercase tracking-[0.14em] mb-6";
  const linkClass = "text-[#8a9bb8] text-[13.5px] font-body font-normal hover:text-white transition-colors duration-200";

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
          <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-[20px] md:rounded-[28px]">
            <Suspense fallback={null}>
              <Dithering
                colorBack="#0a1628"
                colorFront="#3b82f6"
                speed={0.3}
                scale={2.5}
                style={{ width: "100%", height: "100%", opacity: 0.4 }}
              />
            </Suspense>
          </div>

          {/* 3D ribbon shapes - bottom left */}
          <svg
            className="absolute bottom-0 left-0 z-0 pointer-events-none"
            width="380"
            height="320"
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
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.12" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="420" height="340" fill="url(#glow)" />
            <path d="M-20,340 C-20,280 30,200 60,160 C90,120 100,100 80,60 C60,20 40,0 20,-20" stroke="url(#ribbon1)" strokeWidth="45" fill="none" strokeLinecap="round" />
            <path d="M-20,340 C-20,280 30,200 60,160 C90,120 100,100 80,60 C60,20 40,0 20,-20" stroke="url(#ribbonEdge1)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M40,340 C50,300 90,240 130,190 C170,140 180,110 160,70 C140,30 120,10 100,-10" stroke="url(#ribbon2)" strokeWidth="40" fill="none" strokeLinecap="round" />
            <path d="M40,340 C50,300 90,240 130,190 C170,140 180,110 160,70 C140,30 120,10 100,-10" stroke="url(#ribbonEdge2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M100,340 C120,310 160,260 200,220 C240,180 260,150 250,110 C240,70 220,40 200,10" stroke="url(#ribbon3)" strokeWidth="30" fill="none" strokeLinecap="round" />
          </svg>

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
              {/* Brand column — pushed right to clear ribbons */}
              <div className="md:pl-[180px] lg:pl-[220px]">
                <div className="flex items-center gap-3">
                  <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
                  <span className="font-display font-bold text-white text-[17px] tracking-tight">Voxalio</span>
                </div>
                <p className="text-[#6b7f9e] text-[13px] font-body mt-4 leading-[1.6] whitespace-pre-line">
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
          </div>
        </footer>

        {/* Bottom bar — outside card, on the dark base */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 md:px-8 lg:px-10 pt-5 pb-1">
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
    </div>
  );
};

export default Footer;

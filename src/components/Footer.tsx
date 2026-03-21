import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import voxalioIcon from "@/assets/voxalio-icon.png";

const Footer = () => {
  const { t, lang } = useLanguage();

  const columns = [
    {
      title: lang === "de" ? "Informationen" : "Information",
      links: [
        { label: lang === "de" ? "Anwendungsfälle" : "Use Cases", href: "#use-cases" },
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
    <footer className="relative bg-[#0a0f1a] overflow-hidden">
      {/* Abstract wave/swirl glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 90%, rgba(37,99,235,0.22) 0%, rgba(20,50,120,0.12) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Secondary swirl accent */}
      <div
        className="absolute -bottom-10 -left-10 w-[350px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 80%, rgba(30,64,175,0.25) 0%, rgba(15,23,42,0.1) 60%, transparent 80%)",
          filter: "blur(30px)",
          borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
          transform: "rotate(-15deg)",
        }}
      />

      {/* Large faded watermark */}
      <div
        className="absolute bottom-6 right-0 pointer-events-none select-none overflow-hidden"
        style={{
          fontSize: "clamp(100px, 14vw, 260px)",
          fontWeight: 900,
          color: "rgba(255,255,255,0.03)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          fontFamily: "var(--font-display), system-ui, sans-serif",
        }}
      >
        VOXALIO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img src={voxalioIcon} alt="Voxalio" className="w-7 h-7 rounded-md object-contain" />
              <span className="font-display font-bold text-white text-lg tracking-tight">Voxalio</span>
            </div>
            <p className="text-[14px] text-white/50 mb-6 max-w-[220px] leading-relaxed">
              {lang === "de" ? "Entdecken Sie die Zukunft der KI-Sprachagenten" : "Discover the future of AI Voice Agents"}
            </p>

            <div className="flex items-center gap-2.5 mb-6">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="text-white/40 hover:text-white transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold mb-5 text-white text-[14px] tracking-wide">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[12px] text-white/25">{t("footer.rights")}</p>
          <p className="text-[11px] text-white/25">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

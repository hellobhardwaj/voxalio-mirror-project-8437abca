import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import voxalioIcon from "@/assets/voxalio-icon.png";
import footerWave from "@/assets/footer-wave.png";

const Footer = () => {
  const { t, lang } = useLanguage();

  const columns = [
    {
      title: "Navigation",
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
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0f4ff 0%, #e8efff 100%)" }}>
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Blue wave image - bottom left */}
      <div className="absolute bottom-0 left-0 w-[320px] md:w-[420px] pointer-events-none select-none z-0">
        <img
          src={footerWave}
          alt=""
          className="w-full h-auto opacity-80"
          style={{ filter: "drop-shadow(0 0 40px rgba(37,99,235,0.2))" }}
        />
      </div>

      {/* Subtle blue glow overlay */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[350px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse at 20% 90%, rgba(37,99,235,0.08), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Large faded watermark */}
      <div
        className="absolute bottom-6 right-6 pointer-events-none select-none z-0"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(100px, 12vw, 220px)",
          fontWeight: 800,
          color: "rgba(37,99,235,0.04)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
        }}
      >
        VOXALIO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={voxalioIcon} alt="Voxalio" className="w-7 h-7 rounded-md object-contain" />
              <span className="font-display font-bold text-foreground text-base">Voxalio</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 bg-white border border-border hover:bg-primary hover:border-primary group shadow-sm"
                  aria-label={Icon.displayName}
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>

            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-muted-foreground/60 hover:text-primary transition-all"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="font-display font-semibold mb-4 text-foreground uppercase"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
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
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-primary/10">
          <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
          <p className="text-[11px] text-muted-foreground/60">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

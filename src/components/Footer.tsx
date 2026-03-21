import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import voxalioIcon from "@/assets/voxalio-icon.png";

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
    <footer className="relative bg-[#0f172a] overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Blue abstract glow - bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 30% 80%, rgba(37,99,235,0.15), transparent 70%)",
          filter: "blur(80px)",
        }}
      />


      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={voxalioIcon} alt="Voxalio" className="w-7 h-7 rounded-md object-contain" />
              <span className="font-display font-bold text-white text-base">Voxalio</span>
            </div>
            <p className="text-[14px] text-[#94a3b8] mb-6">
              {lang === "de" ? "KI-Sprachagenten — Made in Germany" : "AI Voice Agents — Made in Germany"}
            </p>

            <div className="flex items-center gap-3 mb-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 bg-white/[0.08] hover:bg-[#2563eb] group"
                  aria-label={Icon.displayName}
                >
                  <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>

            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[11px] text-white/30 hover:text-[#2563eb] transition-all"
            >
              {t("footer.powered")}
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                className="font-display font-semibold mb-4 text-white uppercase"
                style={{ fontSize: "13px", letterSpacing: "0.1em" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-[#94a3b8] hover:text-white transition-colors duration-200"
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
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-[12px] text-[#4a5568]">{t("footer.rights")}</p>
          <p className="text-[11px] text-[#4a5568]">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter } from "lucide-react";
import voxalioLogo from "@/assets/voxalio-logo.jpeg";

const Footer = () => {
  const { t, lang } = useLanguage();

  const footerLinks = {
    [lang === "de" ? "Navigation" : "Navigation"]: [
      { label: lang === "de" ? "So funktioniert's" : "How It Works", href: "#how-it-works" },
      { label: lang === "de" ? "Anwendungsfälle" : "Use Cases", href: "#use-cases" },
      { label: lang === "de" ? "Preise" : "Pricing", href: "#pricing" },
      { label: lang === "de" ? "Kontakt" : "Contact", href: "#contact" },
    ],
    [lang === "de" ? "Produkt" : "Product"]: [
      { label: lang === "de" ? "KI-Anrufassistent" : "AI Call Assistant", href: "#how-it-works" },
      { label: lang === "de" ? "Integrationen" : "Integrations", href: "#integrations" },
      { label: lang === "de" ? "Demo buchen" : "Book a Demo", href: "#booking" },
      { label: "FAQ", href: "#faq" },
    ],
    [lang === "de" ? "Rechtliches" : "Legal"]: [
      { label: lang === "de" ? "Datenschutzerklärung" : "Privacy Policy", href: "/privacy" },
      { label: lang === "de" ? "KI-Offenlegung" : "AI Disclosure", href: "/ai-disclosure" },
      { label: lang === "de" ? "DSGVO" : "GDPR", href: "/privacy" },
    ],
  };

  return (
    <footer className="vox-section-dark py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <a href="/">
              <img src={voxalioLogo} alt="Voxalio" className="h-8 w-auto object-contain brightness-0 invert" />
            </a>

            <div className="flex items-center gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-200" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <a
              href="https://www.optimis-ai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[11px] font-normal opacity-25 tracking-normal hover:opacity-50 transition-opacity"
            >
              {t("footer.powered")}
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-medium text-[12px] mb-4 text-white/70 uppercase tracking-[0.04em]">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] font-normal opacity-35 hover:opacity-75 transition-all duration-200 hover:translate-x-0.5 inline-block tracking-normal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] font-normal opacity-30 tracking-normal">{t("footer.rights")}</p>
          <p className="text-[11px] font-normal opacity-20 tracking-normal">{t("footer.disclosure")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

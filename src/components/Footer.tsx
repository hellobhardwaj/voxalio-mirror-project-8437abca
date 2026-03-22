import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import voxalioIcon from "@/assets/voxalio-icon.png";

const Footer = () => {
  const { t, lang } = useLanguage();

  const columns = lang === "de"
    ? [
        { title: "Information", links: ["Produkte", "Funktionen", "Support"] },
        { title: "Unternehmen", links: ["Über uns", "Karriere", "Blog"] },
        { title: "Kontakt", links: ["Weltweit", "support@voxalio.de"] },
      ]
    : [
        { title: "Information", links: ["Products", "Features", "Support"] },
        { title: "Company", links: ["About Us", "Careers", "Blog"] },
        { title: "Contact", links: ["Worldwide", "support@voxalio.de"] },
      ];

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #080c18 0%, #0a1020 100%)" }}>
      {/* Blue glow blob bottom-left */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 80%, rgba(37,99,235,0.18), transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-10 md:gap-16">
          {/* Left: Logo + tagline + socials */}
          <div className="flex-shrink-0 max-w-[240px]">
            <div className="flex items-center gap-2.5 mb-3">
              <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
              <span className="font-display font-bold text-white text-lg tracking-tight">Voxalio</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              {lang === "de" ? "Entdecke die Zukunft der KI-Telefonie." : "Discover the future of AI-powered calling."}
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Link columns */}
          <div className="flex flex-wrap gap-12 md:gap-16">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display font-semibold text-white text-sm mb-4 tracking-tight">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/45 text-sm hover:text-white/80 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-14 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-white/30 text-xs text-center">
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

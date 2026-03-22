import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Twitter, ArrowRight, Mail } from "lucide-react";
import { motion } from "framer-motion";
import voxalioIcon from "@/assets/voxalio-icon.png";
import { useState } from "react";

const Footer = () => {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState("");

  return (
    <footer className="relative py-16 md:py-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0f1e 0%, #0d1529 50%, #101b33 100%)" }}>
      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.15), transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(14,165,233,0.12), transparent 70%)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 space-y-6">
        {/* Newsletter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 md:p-10 border border-white/10 shadow-sm"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight">
                {lang === "de" ? "Newsletter abonnieren" : "Join Our Newsletter"}
              </h3>
              <p className="text-white/60 text-sm mt-1">
                {lang === "de" ? "Nur Updates und Angebote. Kein Spam." : "Only updates and special offers. No spams."}
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === "de" ? "E-Mail-Adresse eingeben..." : "Enter your email address..."}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/10 text-white text-sm w-[240px] md:w-[280px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-white/40"
                />
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors vox-btn-glow">
                {lang === "de" ? "Abonnieren" : "Subscribe"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Divider + bottom bar inside newsletter card */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={voxalioIcon} alt="Voxalio" className="w-6 h-6 rounded-md object-contain" />
                <span className="font-display font-bold text-white text-sm tracking-tight">Voxalio</span>
              </div>
              <p className="text-xs text-white/50">{t("footer.rights")}</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-10 md:p-14 border border-white/10 shadow-sm text-center"
          style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(20px)" }}
        >
          <img src={voxalioIcon} alt="Voxalio" className="w-10 h-10 rounded-lg object-contain mx-auto mb-5" />
          <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight">
            {lang === "de" ? "Starten Sie mit Voxalio." : "Get started with Voxalio today."}
          </h3>
          <p className="text-white/60 text-sm md:text-base mt-3 max-w-md mx-auto">
            {lang === "de"
              ? "Automatisieren Sie Ihre Anrufe mit KI — ab sofort."
              : "Automate your calls with AI starting now."}
          </p>

          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="#how-it-works"
              className="px-6 py-3 rounded-xl border border-border text-foreground font-display font-semibold text-sm hover:bg-accent/50 transition-colors flex items-center gap-2"
            >
              {lang === "de" ? "Demo ansehen" : "View Demo"}
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-colors vox-btn-glow"
            >
              {lang === "de" ? "Jetzt starten" : "Get Started"}
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 px-2">
          <div className="flex items-center gap-3">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Instagram, label: "Instagram" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors duration-200"
                aria-label={label}
              >
                <Icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import heroOrb from "@/assets/hero-orb.png";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const [phone, setPhone] = useState("");
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-vox-teal/5 to-vox-blue/10 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-vox-cyan/5 to-vox-teal/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full vox-gradient-bg" />
            <span className="text-sm font-medium text-muted-foreground">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-muted-foreground text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <img src={heroOrb} alt="AI Orb" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-sm mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-5 vox-shadow">
            <div className="flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">+</span>
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("hero.placeholder")}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
            />
            <button className="w-full py-3 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
              {t("hero.cta")}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlayCircle } from "lucide-react";
import HeroWaveform from "@/components/HeroWaveform";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

const HeroSection = () => {
  const { t, lang } = useLanguage();

  const trustItems = lang === "de"
    ? ["✓ Einrichtung in 10 Minuten", "✓ DSGVO-konform", "✓ Gehostet in Deutschland"]
    : ["✓ Setup in 10 minutes", "✓ GDPR Compliant", "✓ Hosted in Germany"];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#0a0812" }}>
      {/* Purple radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.25) 0%, transparent 70%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: `rgba(168, 85, 247, ${0.2 + Math.random() * 0.3})`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animation: `float-slow ${4 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 w-full py-32 md:py-0 relative z-10 text-center">
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="flex justify-center mb-8">
          <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 border overflow-hidden" style={{ background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.4)" }}>
            <div className="absolute inset-0 vox-shimmer" />
            <span className="relative w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="relative text-[13px] text-[#a855f7]">{t("hero.badge")}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-800 text-white leading-[1.0] tracking-[-0.04em]"
          style={{ fontSize: "clamp(48px, 6vw, 80px)" }}
        >
          {lang === "de" ? (
            <>
              Ihre Telefone klingeln.
              <br />
              Voxalio antwortet.
              <br />
              <span className="vox-gradient-text">Immer.</span>
            </>
          ) : (
            <>
              Your phones ring.
              <br />
              Voxalio answers.
              <br />
              <span className="vox-gradient-text">Always.</span>
            </>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 text-[18px] text-muted-foreground leading-[1.7] max-w-[560px] mx-auto"
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-4 rounded-[10px] text-white font-display font-600 text-[16px] transition-all duration-200 text-center vox-gradient-bg vox-btn-glow"
          >
            {t("cta.button")}
          </a>
          <a
            href="#booking"
            className="px-8 py-4 rounded-[10px] border text-white font-display font-600 text-[16px] transition-all duration-200 text-center flex items-center justify-center gap-2 hover:bg-white/[0.05]"
            style={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)" }}
          >
            <PlayCircle className="w-5 h-5" />
            {lang === "de" ? "Demo ansehen" : "Watch Demo"}
          </a>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8 text-[13px] text-[#4a5568]"
        >
          {trustItems.map((item, i) => (
            <span key={i}>
              {item}
              {i < trustItems.length - 1 && <span className="ml-4">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Waveform card */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-16"
        >
          <div
            className="max-w-[700px] mx-auto rounded-[20px] px-8 py-8 md:px-12 md:py-10"
            style={{
              background: "rgba(19, 17, 31, 0.8)",
              border: "1px solid rgba(124,58,237,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 80px rgba(124,58,237,0.1)",
            }}
          >
            <span className="flex items-center justify-center gap-2 mb-4 text-[12px] text-[#a855f7] uppercase tracking-[0.15em] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
              {lang === "de" ? "LIVE SPRACHGESPRÄCH" : "LIVE VOICE CONVERSATION"}
            </span>
            <HeroWaveform />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

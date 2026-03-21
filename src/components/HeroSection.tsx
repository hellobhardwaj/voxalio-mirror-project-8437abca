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

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 2,
  left: 10 + Math.random() * 80,
  top: 10 + Math.random() * 80,
  duration: 6 + Math.random() * 8,
  delay: Math.random() * 4,
  opacity: 0.2 + Math.random() * 0.2,
}));

const HeroSection = () => {
  const { t, lang } = useLanguage();

  const trustItems = lang === "de"
    ? ["✓ Einrichtung in 10 Minuten", "✓ DSGVO-konform", "✓ Gehostet in Deutschland"]
    : ["✓ Setup in 10 minutes", "✓ GDPR Compliant", "✓ Hosted in Germany"];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "var(--bg-dark)" }}>
      {/* Purple radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] pointer-events-none" style={{ background: "radial-gradient(ellipse 100% 50% at 50% -5%, rgba(124,58,237,0.2) 0%, transparent 65%)" }} />
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />
      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: `rgba(168, 85, 247, ${p.opacity})`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animation: `float-slow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            willChange: "transform",
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center" style={{ paddingTop: "clamp(140px, 16vh, 200px)", paddingBottom: "clamp(80px, 10vh, 120px)" }}>
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 overflow-hidden" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)" }}>
            <div className="absolute inset-0 vox-shimmer" />
            <span className="relative w-2 h-2 rounded-full bg-[var(--purple-light)] animate-pulse" />
            <span className="relative text-[13px] text-[var(--purple-light)]">{t("hero.badge")}</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display font-extrabold text-[var(--text-primary)] leading-[1.0]"
          style={{ fontSize: "clamp(42px, 6vw, var(--text-hero))", letterSpacing: "-0.04em" }}
        >
          {lang === "de" ? (
            <>
              Ihre Telefone klingeln.
              <br />
              Voxalio antwortet.
              <br />
              <span className="gradient-text">Immer.</span>
            </>
          ) : (
            <>
              Your phones ring.
              <br />
              Voxalio answers.
              <br />
              <span className="gradient-text">Always.</span>
            </>
          )}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-[var(--text-secondary)] leading-[1.7] max-w-[560px]"
          style={{ fontSize: "var(--text-md)", marginTop: "var(--space-5)" }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ marginTop: "var(--space-6)" }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-[10px] text-white font-display font-semibold text-[15px] vox-gradient-bg vox-btn-glow"
          >
            {t("cta.button")}
          </a>
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] text-white font-medium text-[15px] transition-all duration-200 hover:border-[rgba(124,58,237,0.5)] hover:bg-[rgba(124,58,237,0.08)]"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
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
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[var(--text-sm)] text-[var(--text-muted)]"
          style={{ marginTop: "var(--space-5)" }}
        >
          {trustItems.map((item, i) => (
            <span key={i}>
              {item}
              {i < trustItems.length - 1 && <span className="ml-4">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Waveform card */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} style={{ marginTop: "var(--space-10)" }} className="w-full">
          <div
            className="max-w-[700px] mx-auto rounded-[var(--radius-lg)] px-8 py-8 md:px-12 md:py-10"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-normal)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 80px rgba(124,58,237,0.1)",
            }}
          >
            <span className="flex items-center justify-center gap-2 mb-4 text-[var(--text-xs)] text-[var(--purple-light)] uppercase tracking-[0.15em] font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--purple-light)] animate-pulse" />
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

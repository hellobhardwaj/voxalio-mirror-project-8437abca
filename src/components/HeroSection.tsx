import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroWaveform from "@/components/HeroWaveform";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const HeroSection = () => {
  const { t, lang } = useLanguage();

  const trustItems = lang === "de"
    ? ["✓ Einrichtung in 10 Minuten", "✓ DSGVO-konform", "✓ Gehostet in Deutschland"]
    : ["✓ Setup in 10 minutes", "✓ GDPR Compliant", "✓ Hosted in Germany"];

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      <div className="max-w-7xl mx-auto px-6 w-full py-32 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col items-start">
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 border border-[rgba(37,99,235,0.3)]"
              style={{ background: "rgba(37,99,235,0.15)" }}
            >
              <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
              <span className="text-[13px] text-[#94a3b8]">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display font-800 text-white leading-[1.05] tracking-[-0.03em]"
              style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
            >
              {lang === "de" ? (
                <>
                  Ihre Telefone klingeln.
                  <br />
                  Voxalio antwortet.
                  <br />
                  <span className="text-[#2563eb]">Immer.</span>
                </>
              ) : (
                <>
                  Your phones ring.
                  <br />
                  Voxalio answers.
                  <br />
                  <span className="text-[#2563eb]">Always.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-8 text-[17px] text-[#94a3b8] leading-[1.7] max-w-[480px]"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="px-7 py-3.5 rounded-lg bg-[#2563eb] text-white font-display font-600 text-[15px] hover:bg-[#1d4ed8] transition-all duration-200 text-center"
              >
                {t("cta.button")}
              </a>
              <a
                href="#booking"
                className="px-7 py-3.5 rounded-lg border border-white/[0.15] text-white font-display font-600 text-[15px] hover:bg-white/[0.05] transition-all duration-200 text-center"
              >
                {t("nav.bookDemo")}
              </a>
            </motion.div>

            <motion.div
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-8 text-[13px] text-[#64748b]"
            >
              {trustItems.map((item, i) => (
                <span key={i}>
                  {item}
                  {i < trustItems.length - 1 && <span className="ml-4">·</span>}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — Waveform */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <HeroWaveform />
            <span className="mt-4 text-[11px] text-[#2563eb] uppercase tracking-[0.15em] font-medium">
              {lang === "de" ? "LIVE SPRACHGESPRÄCH" : "LIVE VOICE CONVERSATION"}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

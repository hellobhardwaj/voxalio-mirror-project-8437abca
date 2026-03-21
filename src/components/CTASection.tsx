import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0a0f1e" }}>
      {/* Subtle blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(37, 99, 235, 0.08)" }} />

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-800 text-white text-[36px] md:text-[56px] leading-[1.1]"
        >
          {lang === "de" ? (
            <>
              Ihre Telefone klingeln.
              <br />
              Nimmt <span className="text-[#2563eb]">jemand</span> ab?
            </>
          ) : (
            <>
              Your phones are ringing.
              <br />
              Is <span className="text-[#2563eb]">anyone</span> answering?
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-[18px] text-[#94a3b8] leading-[1.7]"
        >
          {lang === "de"
            ? "Voxalio nimmt jeden Anruf entgegen, qualifiziert jeden Lead und bucht jeden Termin — 24/7, ohne eine einzige Person einzustellen."
            : "Voxalio picks up every call, qualifies every lead, and books every appointment — 24/7, without adding a single person to your payroll."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10"
        >
          <a
            href="#contact"
            className="inline-block px-9 py-4 rounded-lg bg-[#2563eb] text-white font-display font-600 text-[16px] hover:bg-[#1d4ed8] transition-all duration-200"
          >
            {lang === "de" ? "Kostenlos starten — in 10 Minuten" : "Start Free — It Takes 10 Minutes"}
          </a>
          <p className="mt-4 text-[13px] text-[#64748b]">
            {lang === "de"
              ? "Keine Kreditkarte · Kein Entwickler · Keine Verpflichtung"
              : "No credit card · No developer · No commitment"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { lang } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "#0a0812" }}>
      {/* Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: "rgba(124, 58, 237, 0.12)" }} />

      {/* Decorative blurred circles */}
      <div className="absolute top-20 left-[10%] w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(124,58,237,0.08)", filter: "blur(80px)" }} />
      <div className="absolute bottom-20 right-[10%] w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(37,99,235,0.06)", filter: "blur(80px)" }} />
      <div className="absolute top-1/3 right-[20%] w-32 h-32 rounded-full pointer-events-none" style={{ background: "rgba(168,85,247,0.1)", filter: "blur(80px)" }} />

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
              Nimmt <span className="vox-gradient-text">jemand</span> ab?
            </>
          ) : (
            <>
              Your phones are ringing.
              <br />
              Is <span className="vox-gradient-text">anyone</span> answering?
            </>
          )}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-8 text-[18px] text-muted-foreground leading-[1.7]"
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
            className="inline-block px-9 py-4 rounded-[10px] text-white font-display font-600 text-[16px] transition-all duration-200 vox-gradient-bg vox-btn-glow"
          >
            {lang === "de" ? "Kostenlos starten — in 10 Minuten" : "Start Free — It Takes 10 Minutes"}
          </a>
          <p className="mt-4 text-[13px] text-[#4a5568]">
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

import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Particles from "@/components/Particles";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);
  const { t, lang } = useLanguage();

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
    { q: t("faq.q6"), a: t("faq.a6") },
    { q: t("faq.q7"), a: t("faq.a7") },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="faq" style={{ background: "var(--bg-dark)" }}>
      <div className="absolute inset-0 z-0 opacity-75">
        <Particles
          particleColors={["#7c3aed", "#a855f7", "#2563eb"]}
          particleCount={150}
          particleSpread={10}
          speed={0.08}
          particleBaseSize={80}
          moveParticlesOnHover
          alphaParticles
          disableRotation={false}
          pixelRatio={1}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">FAQ</span>
            <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
              {lang === "de" ? "Alles, was Sie wissen möchten" : "Everything you want to know"}
            </h2>
            <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-6 leading-[1.7]">
              {lang === "de"
                ? "Finden Sie nicht, was Sie suchen? Buchen Sie eine Demo und wir beantworten alles live."
                : "Can't find what you're looking for? Book a demo and we'll answer everything live."}
            </p>
            <a
              href="#booking"
              className="inline-block mt-8 px-6 py-3 rounded-[10px] text-white font-display font-semibold text-[14px] transition-all vox-gradient-bg vox-btn-glow"
            >
              {lang === "de" ? "Demo buchen" : "Book a Demo"}
            </a>
          </motion.div>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    borderLeft: isOpen ? "3px solid var(--purple)" : "3px solid transparent",
                    transition: "border-left-color 0.3s ease",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between py-5 px-2 text-left group"
                  >
                    <span className={`font-display font-semibold text-[16px] pr-4 transition-colors ${isOpen ? "text-[var(--purple-light)]" : "text-white/80 group-hover:text-[var(--purple-light)]"}`}>
                      {faq.q}
                    </span>
                    <div
                      className="flex-shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <Plus className={`w-5 h-5 transition-colors ${isOpen ? "text-[var(--purple-light)]" : "text-[var(--text-muted)] group-hover:text-[var(--purple-light)]"}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 px-2 text-[14px] text-[var(--text-secondary)] leading-[1.7]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

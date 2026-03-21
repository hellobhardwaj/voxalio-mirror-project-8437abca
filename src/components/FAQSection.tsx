import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <section className="py-24 md:py-32" id="faq" style={{ background: "#0f0d1a" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display font-700 text-white text-[32px] md:text-[48px] leading-[1.1]">
              {lang === "de" ? "Alles, was Sie wissen möchten" : "Everything you want to know"}
            </h2>
            <p className="text-muted-foreground text-[16px] mt-6 leading-[1.7]">
              {lang === "de"
                ? "Finden Sie nicht, was Sie suchen? Buchen Sie eine Demo und wir beantworten alles live."
                : "Can't find what you're looking for? Book a demo and we'll answer everything live."}
            </p>
            <a
              href="#booking"
              className="inline-block mt-8 px-6 py-3 rounded-[10px] text-white font-display font-600 text-[14px] transition-all vox-gradient-bg vox-btn-glow"
            >
              {lang === "de" ? "Demo buchen" : "Book a Demo"}
            </a>
          </motion.div>

          {/* Right — Accordion */}
          <div>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className={`font-display font-600 text-[16px] pr-4 transition-colors ${openIndex === i ? "text-[#a855f7]" : "text-white/80 group-hover:text-[#a855f7]"}`}>
                    {faq.q}
                  </span>
                  {openIndex === i ? (
                    <X className="w-5 h-5 text-[#a855f7] flex-shrink-0 transition-transform" />
                  ) : (
                    <Plus className="w-5 h-5 text-muted-foreground flex-shrink-0 group-hover:text-[#a855f7] transition-colors" />
                  )}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-[15px] text-muted-foreground leading-[1.7]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

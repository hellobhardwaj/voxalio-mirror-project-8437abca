import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32" id="booking" style={{ background: "var(--bg-dark)" }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-label">Schedule</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[28px] md:text-[var(--text-3xl)] leading-[1.1] mt-3 mb-3">
            {t("calendly.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-base)] leading-[1.7]">{t("calendly.subtitle")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-[var(--radius-lg)] overflow-hidden"
          style={{ border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-card)", background: "var(--bg-card)" }}
        >
          <iframe
            src="https://calendly.com/optimis-ai-info/30min"
            title="Book a demo"
            className="w-full border-0"
            style={{ minHeight: 660 }}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CalendlySection;

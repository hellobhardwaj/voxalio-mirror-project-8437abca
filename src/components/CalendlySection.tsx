import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-white" id="booking">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-700 text-[#0f172a] text-[28px] md:text-[42px] leading-[1.1] mb-3">
            {t("calendly.title")}
          </h2>
          <p className="text-[#64748b] text-[15px] leading-[1.7]">{t("calendly.subtitle")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] bg-white"
        >
          <iframe
            src="https://calendly.com/voxalio/demo"
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

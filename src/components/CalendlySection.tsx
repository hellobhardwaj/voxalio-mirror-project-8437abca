import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32" id="booking" style={{ background: "#0f0d1a" }}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="font-display font-700 text-white text-[28px] md:text-[42px] leading-[1.1] mb-3">
            {t("calendly.title")}
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7]">{t("calendly.subtitle")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-[20px] overflow-hidden"
          style={{ border: "1px solid rgba(139,92,246,0.15)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", background: "rgba(19,17,31,0.8)" }}
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

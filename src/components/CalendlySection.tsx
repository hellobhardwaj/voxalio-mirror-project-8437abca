import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CalendlySection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-background" id="booking">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-[28px] md:text-[32px] font-semibold text-foreground mb-3">
            {t("calendly.title")}
          </h2>
          <p className="text-muted-foreground text-[16px] font-normal leading-[1.6]">
            {t("calendly.subtitle")}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-border overflow-hidden vox-shadow bg-card"
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

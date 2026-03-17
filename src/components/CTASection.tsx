import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="vox-gradient-bg rounded-3xl p-12 md:p-20 text-center text-primary-foreground relative overflow-hidden"
        >
          {/* Subtle light overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-white/[0.06] rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-white/[0.04] rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">{t("cta.title")}</h2>
            <p className="mt-5 opacity-80 max-w-lg mx-auto text-lg">{t("cta.desc")}</p>
            <a
              href="#start"
              className="inline-block mt-8 bg-background text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-px"
            >
              {t("cta.button")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

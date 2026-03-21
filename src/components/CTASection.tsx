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
          className="rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden"
          style={{ background: "#0a0f1e" }}
        >
          {/* Subtle blue glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "rgba(37, 99, 235, 0.12)" }} />
          </div>

          <div className="relative z-10">
            <h2 className="text-[28px] md:text-[34px] lg:text-[40px] font-semibold tracking-[-0.025em] leading-[1.1]">{t("cta.title")}</h2>
            <p className="mt-5 opacity-65 max-w-lg mx-auto text-[15px] font-normal leading-[1.7] tracking-[-0.01em]">{t("cta.desc")}</p>
            <a
              href="#contact"
              className="inline-block mt-8 bg-[#2563eb] text-white px-8 py-3.5 rounded-full font-medium text-[14px] hover:bg-[#1d4ed8] hover:shadow-xl transition-all duration-300 hover:-translate-y-px tracking-[-0.01em]"
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

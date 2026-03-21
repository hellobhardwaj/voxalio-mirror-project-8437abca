import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const DashboardHeader = () => {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <span className="text-[#2563eb] text-[12px] uppercase tracking-[0.12em] font-medium">
        {lang === "de" ? "Echtzeit-Intelligenz" : "Real-time Intelligence"}
      </span>
      <h2 className="font-display font-700 text-white text-[32px] md:text-[42px] leading-[1.1] mt-3">
        {lang === "de"
          ? "Jeder Anruf erfasst. Jede Erkenntnis sichtbar."
          : "Every call tracked. Every insight visible."}
      </h2>
      <p className="text-[#94a3b8] text-[16px] mt-4 max-w-lg mx-auto">
        {lang === "de"
          ? "Vollständige Transparenz über jeden Anruf, jeden Agenten und jedes Ergebnis."
          : "Complete transparency over every call, every agent, and every outcome."}
      </p>
    </motion.div>
  );
};

export default DashboardHeader;

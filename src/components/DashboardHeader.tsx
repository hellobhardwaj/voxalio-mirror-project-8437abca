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
      <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.12em] bg-white/90 backdrop-blur-sm text-primary border border-primary/20 shadow-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Real-time Intelligence</span>
      <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
        {lang === "de"
          ? "Jeder Anruf erfasst. Jede Erkenntnis sichtbar."
          : "Every call tracked. Every insight visible."}
      </h2>
      <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg mx-auto leading-[1.7]">
        {lang === "de"
          ? "Vollständige Transparenz über jeden Anruf, jeden Agenten und jedes Ergebnis."
          : "Complete transparency over every call, every agent, and every outcome."}
      </p>
    </motion.div>
  );
};

export default DashboardHeader;

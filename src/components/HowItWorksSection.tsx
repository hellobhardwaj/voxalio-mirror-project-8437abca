import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Mic, ListChecks, Phone, Plug, BarChart3 } from "lucide-react";

const HowItWorksSection = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);

  const steps = [
    { icon: Mic, title: t("how.step1.title"), desc: t("how.step1.desc") },
    { icon: ListChecks, title: t("how.step2.title"), desc: t("how.step2.desc") },
    { icon: Phone, title: t("how.step3.title"), desc: t("how.step3.desc") },
    { icon: Plug, title: t("how.step4.title"), desc: t("how.step4.desc") },
    { icon: BarChart3, title: t("how.step5.title"), desc: t("how.step5.desc") },
  ];

  const previewLabels = ["Voice Selection", "Task Configuration", "Phone Setup", "CRM Integration", "Analytics Dashboard"];

  return (
    <section className="py-24 md:py-32" id="how-it-works" style={{ background: "var(--bg-mid)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <span className="section-label">Simple Setup</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {t("how.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg leading-[1.7]">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom, var(--purple), transparent)" }} />
            <div className="space-y-2">
              {steps.map((step, i) => {
                const isActive = active === i;
                return (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    onClick={() => setActive(i)}
                    className={`relative w-full text-left pl-12 pr-4 py-4 rounded-xl transition-all duration-300 ${isActive ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"}`}
                  >
                    <div
                      className="absolute left-0 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-sm)] font-display font-semibold transition-all duration-300 z-10"
                      style={
                        isActive
                          ? { background: "var(--gradient-primary)", color: "white", boxShadow: "0 0 0 6px rgba(124,58,237,0.15), 0 0 20px rgba(124,58,237,0.4)" }
                          : { background: "var(--bg-card)", border: "1px solid var(--border-normal)", color: "var(--text-muted)" }
                      }
                    >
                      {i + 1}
                    </div>
                    <h3 className={`font-display font-semibold text-[16px] transition-colors duration-300 ${isActive ? "text-[var(--purple-light)]" : "text-white/80"}`}>
                      {step.title}
                    </h3>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[14px] text-[var(--text-secondary)] leading-[1.7] mt-2"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="sticky top-24 self-start hidden lg:block">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="vox-card min-h-[400px] flex flex-col items-center justify-center"
            >
              {(() => {
                const Icon = steps[active].icon;
                return (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: "var(--gradient-primary)" }}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                );
              })()}
              <span className="gradient-text font-display font-bold text-[var(--text-lg)]">{previewLabels[active]}</span>
              <p className="text-[var(--text-secondary)] text-[14px] mt-3 text-center max-w-xs">{steps[active].desc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

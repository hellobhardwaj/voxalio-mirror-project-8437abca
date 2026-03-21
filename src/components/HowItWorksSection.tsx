import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Mic, ListChecks, Phone, Plug, BarChart3 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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

  const previewLabels = [
    "Voice Selection",
    "Task Configuration",
    "Phone Setup",
    "CRM Integration",
    "Analytics Dashboard",
  ];

  return (
    <section className="py-24 md:py-32 bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <span className="text-[#2563eb] text-[12px] uppercase tracking-[0.12em] font-medium">
            {t("how.subtitle").includes("No developers") ? "Simple Setup" : "Einfache Einrichtung"}
          </span>
          <h2 className="font-display font-700 text-[#0f172a] text-[32px] md:text-[48px] leading-[1.1] mt-3">
            {t("how.title")}
          </h2>
          <p className="text-[#64748b] text-[16px] mt-4 max-w-lg">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          {/* Left — Steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-[#e2e8f0]" />

            <div className="space-y-2">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.08 } },
                    }}
                    onClick={() => setActive(i)}
                    className={`relative w-full text-left pl-12 pr-4 py-4 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-[#f8fafc]" : "hover:bg-[#f8fafc]/50"
                    }`}
                  >
                    {/* Step circle */}
                    <div
                      className={`absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-display font-600 transition-all duration-300 z-10 ${
                        isActive
                          ? "bg-[#2563eb] text-white shadow-[0_0_0_4px_rgba(37,99,235,0.15)]"
                          : "bg-white border border-[#e2e8f0] text-[#64748b]"
                      }`}
                    >
                      {i + 1}
                    </div>

                    <h3
                      className={`font-display font-600 text-[16px] transition-colors duration-300 ${
                        isActive ? "text-[#2563eb]" : "text-[#0f172a]"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[14px] text-[#64748b] leading-[1.7] mt-2"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right — Preview panel */}
          <div className="sticky top-24 self-start hidden lg:block">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-12 min-h-[400px] flex flex-col items-center justify-center"
            >
              {(() => {
                const Icon = steps[active].icon;
                return <Icon className="w-16 h-16 text-[#2563eb] mb-6 opacity-40" strokeWidth={1.5} />;
              })()}
              <span className="text-[#2563eb] font-display font-700 text-[20px]">{previewLabels[active]}</span>
              <p className="text-[#94a3b8] text-[14px] mt-3 text-center max-w-xs">{steps[active].desc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

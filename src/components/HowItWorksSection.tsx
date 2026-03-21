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
    <section className="py-24 md:py-32" id="how-it-works" style={{ background: "#0a0812" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <span className="text-[#a855f7] text-[12px] uppercase tracking-[0.12em] font-medium">
            Simple Setup
          </span>
          <h2 className="font-display font-700 text-white text-[32px] md:text-[48px] leading-[1.1] mt-3">
            {t("how.title")}
          </h2>
          <p className="text-muted-foreground text-[16px] mt-4 max-w-lg">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16">
          {/* Left — Steps */}
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-px" style={{ background: "linear-gradient(to bottom, #7c3aed, transparent)" }} />

            <div className="space-y-2">
              {steps.map((step, i) => {
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
                      isActive ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div
                      className="absolute left-0 top-4 w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-display font-600 transition-all duration-300 z-10"
                      style={
                        isActive
                          ? { background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "white", boxShadow: "0 0 20px rgba(124,58,237,0.5)" }
                          : { background: "rgba(19,17,31,0.8)", border: "1px solid rgba(139,92,246,0.2)", color: "#4a5568" }
                      }
                    >
                      {i + 1}
                    </div>

                    <h3 className={`font-display font-600 text-[16px] transition-colors duration-300 ${isActive ? "text-[#a855f7]" : "text-white/80"}`}>
                      {step.title}
                    </h3>

                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-[14px] text-muted-foreground leading-[1.7] mt-2"
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
              className="rounded-[20px] p-12 min-h-[400px] flex flex-col items-center justify-center"
              style={{
                background: "rgba(19,17,31,0.9)",
                border: "1px solid rgba(124,58,237,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              {(() => {
                const Icon = steps[active].icon;
                return (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
                    <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                );
              })()}
              <span className="vox-gradient-text font-display font-700 text-[20px]">{previewLabels[active]}</span>
              <p className="text-muted-foreground text-[14px] mt-3 text-center max-w-xs">{steps[active].desc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

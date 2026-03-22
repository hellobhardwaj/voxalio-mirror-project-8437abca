import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mic, ListChecks, Phone, Plug, BarChart3 } from "lucide-react";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import Prism from "@/components/Prism";

const cardGradients = [
  ["#dbeafe", "#bfdbfe", "#93c5fd", "#e0f2fe"],
  ["#e0f2fe", "#c7d2fe", "#a5b4fc", "#dbeafe"],
  ["#ede9fe", "#c7d2fe", "#bfdbfe", "#e0e7ff"],
  ["#dbeafe", "#93c5fd", "#bfdbfe", "#e0f2fe"],
  ["#c7d2fe", "#dbeafe", "#bfdbfe", "#a5b4fc"],
];

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: Mic, title: t("how.step1.title"), desc: t("how.step1.desc"), accent: "#2563eb" },
    { icon: ListChecks, title: t("how.step2.title"), desc: t("how.step2.desc"), accent: "#3b82f6" },
    { icon: Phone, title: t("how.step3.title"), desc: t("how.step3.desc"), accent: "#1d4ed8" },
    { icon: Plug, title: t("how.step4.title"), desc: t("how.step4.desc"), accent: "#2563eb" },
    { icon: BarChart3, title: t("how.step5.title"), desc: t("how.step5.desc"), accent: "#3b82f6" },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32" id="how-it-works" style={{ background: "var(--bg-mid)" }}>
      {/* Prism WebGL background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Prism
          animationType="rotate"
          timeScale={0.5}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          suspendWhenOffscreen
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="section-label">Simple Setup</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {t("how.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg leading-[1.7]">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Row 1: large card + small card */}
          {steps.slice(0, 2).map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 overflow-hidden ${i === 0 ? "md:col-span-2" : "md:col-span-1"}`}
                style={{
                  border: "1px solid rgba(37,99,235,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  minHeight: "200px",
                }}
              >
                <AnimatedGradient colors={cardGradients[i]} speed={10} blur="heavy" />
                <div className="absolute inset-0 bg-white/60 z-[1]" />
                <div className="relative z-[2]">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${step.accent}, #60a5fa)` }}
                    >
                      {i + 1}
                    </div>
                    <Icon className="w-5 h-5" style={{ color: step.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-[17px] text-[var(--text-primary)] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7] max-w-md">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Row 2: two equal cards */}
          {steps.slice(2, 4).map((step, i) => {
            const Icon = step.icon;
            const idx = i + 2;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-2xl p-8 overflow-hidden md:col-span-1 first:md:col-span-1 [&:nth-child(1)]:md:col-span-1"
                style={{
                  border: "1px solid rgba(37,99,235,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  minHeight: "180px",
                }}
              >
                <AnimatedGradient colors={cardGradients[idx]} speed={10} blur="heavy" />
                <div className="absolute inset-0 bg-white/60 z-[1]" />
                <div className="relative z-[2]">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${step.accent}, #60a5fa)` }}
                    >
                      {idx + 1}
                    </div>
                    <Icon className="w-5 h-5" style={{ color: step.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-[17px] text-[var(--text-primary)] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7]">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Row 3: full-width card */}
          {(() => {
            const step = steps[4];
            const Icon = step.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative rounded-2xl p-8 overflow-hidden md:col-span-3"
                style={{
                  border: "1px solid rgba(37,99,235,0.08)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  minHeight: "180px",
                }}
              >
                <AnimatedGradient colors={cardGradients[4]} speed={10} blur="heavy" />
                <div className="absolute inset-0 bg-white/60 z-[1]" />
                <div className="relative z-[2]">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm"
                      style={{ background: `linear-gradient(135deg, ${step.accent}, #60a5fa)` }}
                    >
                      5
                    </div>
                    <Icon className="w-5 h-5" style={{ color: step.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display font-semibold text-[17px] text-[var(--text-primary)] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-[1.7] max-w-2xl">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

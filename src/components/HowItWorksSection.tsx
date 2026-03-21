import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mic, ListChecks, Phone, Plug, BarChart3 } from "lucide-react";
import Particles from "@/components/Particles";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

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
    <section className="relative overflow-hidden" id="how-it-works" style={{ background: "var(--bg-mid)" }}>
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-auto">
        <Particles
          particleColors={["#2563eb", "#3b82f6", "#93c5fd"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 pt-24 md:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-label">Simple Setup</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {t("how.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg leading-[1.7]">
            {t("how.subtitle")}
          </p>
        </motion.div>

        <ScrollStack
          itemDistance={80}
          itemScale={0.02}
          itemStackDistance={40}
          stackPosition="30%"
          scaleEndPosition="15%"
          baseScale={0.9}
          blurAmount={2}
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollStackItem key={i}>
                <div
                  className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
                  style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(37,99,235,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Step number + icon */}
                  <div className="flex items-center gap-5 shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-lg"
                      style={{ background: `linear-gradient(135deg, ${step.accent}, #60a5fa)` }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ background: `rgba(37,99,235,0.06)` }}
                    >
                      <Icon className="w-7 h-7" style={{ color: step.accent }} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-[18px] text-[var(--text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>

      {/* Bottom padding */}
      <div className="h-24 md:h-32" />
    </section>
  );
};

export default HowItWorksSection;

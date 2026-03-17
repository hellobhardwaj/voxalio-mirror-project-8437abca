import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import step1Img from "@/assets/step-1-voice.png";
import step2Img from "@/assets/step-2-tasks.png";
import step3Img from "@/assets/step-3-phone.png";
import step4Img from "@/assets/step-4-integrate.png";
import step5Img from "@/assets/step-5-monitor.png";

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    { title: t("how.step1.title"), description: t("how.step1.desc"), image: step1Img },
    { title: t("how.step2.title"), description: t("how.step2.desc"), image: step2Img },
    { title: t("how.step3.title"), description: t("how.step3.desc"), image: step3Img },
    { title: t("how.step4.title"), description: t("how.step4.desc"), image: step4Img },
    { title: t("how.step5.title"), description: t("how.step5.desc"), image: step5Img },
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="how-it-works">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-br from-[hsl(var(--vox-teal)/0.03)] to-[hsl(var(--vox-blue)/0.02)] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold text-foreground tracking-[-0.025em] leading-[1.15]">
            {t("how.title")}
          </h2>
          <p className="mt-4 vox-gradient-text font-normal text-[15px] tracking-[-0.01em]">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Vertical line - desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full bg-border/30" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[hsl(var(--vox-teal))] to-[hsl(var(--vox-blue))]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile left line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px">
            <div className="w-full h-full bg-border/30" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[hsl(var(--vox-teal))] to-[hsl(var(--vox-blue))]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const isActive = activeStep === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  onViewportEnter={() => setActiveStep(i)}
                  className="relative"
                >
                  {/* Timeline dot - desktop */}
                  <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-20">
                    <div className="relative">
                      <motion.div
                        className={`w-3.5 h-3.5 rounded-full transition-all duration-500 ${
                          isActive
                            ? "bg-[hsl(var(--vox-teal))] shadow-[0_0_16px_hsl(var(--vox-teal)/0.6)]"
                            : "bg-muted-foreground/30 border border-border"
                        }`}
                      />
                      {isActive && (
                        <motion.div
                          className="absolute inset-[-6px] rounded-full border border-[hsl(var(--vox-teal)/0.3)]"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.4, opacity: [0.5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                  </div>

                  {/* Timeline dot - mobile */}
                  <div className="md:hidden absolute left-6 top-6 -translate-x-1/2 z-20">
                    <motion.div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isActive
                          ? "bg-[hsl(var(--vox-teal))] shadow-[0_0_12px_hsl(var(--vox-teal)/0.6)]"
                          : "bg-muted-foreground/30"
                      }`}
                    />
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-2 md:gap-16 items-center">
                    {/* Left column */}
                    <div className={`${isLeft ? "" : "order-2"}`}>
                      <div className={`${isLeft ? "pr-12 text-right" : "pl-12 text-left"}`}>
                        <StepCard
                          step={step}
                          index={i}
                          isActive={isActive}
                          align={isLeft ? "right" : "left"}
                        />
                      </div>
                    </div>

                    {/* Right column */}
                    <div className={`${isLeft ? "" : "order-1"}`}>
                      <div className={`${isLeft ? "pl-12" : "pr-12"}`}>
                        <StepImage image={step.image} isActive={isActive} index={i} />
                      </div>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden pl-14">
                    <StepCard step={step} index={i} isActive={isActive} align="left" />
                    <div className="mt-4">
                      <StepImage image={step.image} isActive={isActive} index={i} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  step: { title: string; description: string };
  index: number;
  isActive: boolean;
  align: "left" | "right";
}

const StepCard = ({ step, index, isActive, align }: StepCardProps) => (
  <div>
    <div className={`flex items-center gap-3 ${align === "right" ? "justify-end" : "justify-start"}`}>
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-medium transition-all duration-500 ${
          isActive
            ? "vox-gradient-bg text-primary-foreground shadow-md"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {index + 1}
      </span>
      <h3
        className={`text-[17px] font-medium tracking-[-0.015em] transition-colors duration-300 ${
          isActive ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {step.title}
      </h3>
    </div>

    <AnimatePresence>
      {isActive && (
        <motion.p
          initial={{ opacity: 0, height: 0, marginTop: 0 }}
          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
          exit={{ opacity: 0, height: 0, marginTop: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={`text-[14px] font-normal text-muted-foreground leading-[1.7] tracking-[-0.01em] overflow-hidden ${
            align === "right" ? "text-right" : "text-left"
          }`}
        >
          {step.description}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

interface StepImageProps {
  image: string;
  isActive: boolean;
  index: number;
}

const StepImage = ({ image, isActive, index }: StepImageProps) => (
  <motion.div
    className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
      isActive
        ? "shadow-[0_8px_40px_-12px_hsl(var(--vox-teal)/0.15)]"
        : "opacity-50"
    }`}
    animate={isActive ? { scale: 1, y: 0 } : { scale: 0.96, y: 4 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div
      className={`absolute inset-0 rounded-2xl border transition-all duration-500 z-10 ${
        isActive
          ? "border-[hsl(var(--vox-teal)/0.2)]"
          : "border-border/30"
      }`}
    />
    <img
      src={image}
      alt={`Step ${index + 1}`}
      className="w-full h-auto rounded-2xl"
      loading="lazy"
    />
  </motion.div>
);

export default HowItWorksSection;

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mic, ListChecks, Phone, Plug, BarChart3 } from "lucide-react";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    { title: t("how.step1.title"), description: t("how.step1.desc"), icon: Mic },
    { title: t("how.step2.title"), description: t("how.step2.desc"), icon: ListChecks },
    { title: t("how.step3.title"), description: t("how.step3.desc"), icon: Phone },
    { title: t("how.step4.title"), description: t("how.step4.desc"), icon: Plug },
    { title: t("how.step5.title"), description: t("how.step5.desc"), icon: BarChart3 },
  ];

  return (
    <section className="py-28 relative" id="how-it-works">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold text-foreground tracking-[-0.025em] leading-[1.15]">
            {t("how.title")}
          </h2>
          <p className="mt-4 vox-gradient-text font-normal text-[15px] tracking-[-0.01em]">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Step 1 — Hero tile spanning 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-4 relative overflow-hidden rounded-[20px] p-8 md:p-10 min-h-[220px] group cursor-default
              bg-[linear-gradient(135deg,hsl(var(--vox-teal)),hsl(200_70%_48%),hsl(var(--vox-blue)))]
              shadow-[0_8px_30px_-8px_hsl(var(--vox-teal)/0.3)]
              hover:shadow-[0_16px_48px_-12px_hsl(var(--vox-teal)/0.4)] transition-shadow duration-500"
          >
            {/* Background decorative icon */}
            {(() => { const Icon = steps[0].icon; return <Icon className="absolute -bottom-4 -right-4 w-40 h-40 text-primary-foreground/[0.08]" />; })()}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-[13px] font-semibold bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm">
                1
              </span>
              <div className="mt-6">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-primary-foreground tracking-[-0.02em]">
                  {steps[0].title}
                </h3>
                <p className="mt-2 text-[14px] text-primary-foreground/80 leading-[1.7] max-w-md">
                  {steps[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 2 — 2 cols */}
          <BentoTile step={steps[1]} index={1} delay={0.1} className="md:col-span-2" />

          {/* Step 3 — 2 cols */}
          <BentoTile step={steps[2]} index={2} delay={0.2} className="md:col-span-2" />

          {/* Step 4 — 2 cols */}
          <BentoTile step={steps[3]} index={3} delay={0.3} className="md:col-span-2" />

          {/* Step 5 — wider 4 cols */}
          <BentoTile step={steps[4]} index={4} delay={0.35} className="md:col-span-2" />
        </div>
      </div>
    </section>
  );
};

interface BentoTileProps {
  step: { title: string; description: string; icon: React.ElementType };
  index: number;
  delay: number;
  className?: string;
}

const BentoTile = ({ step, index, delay, className = "" }: BentoTileProps) => {
  const Icon = step.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-[20px] p-7 min-h-[200px] group cursor-default
        bg-muted/60 border border-border/50
        hover:bg-muted hover:shadow-[0_12px_36px_-8px_hsl(var(--foreground)/0.08)] hover:-translate-y-0.5
        transition-all duration-500 ${className}`}
    >
      {/* Background decorative icon */}
      <Icon className="absolute -bottom-3 -right-3 w-28 h-28 text-foreground/[0.04] transition-colors duration-500 group-hover:text-foreground/[0.07]" />
      <div className="relative z-10 flex flex-col h-full justify-between">
        <span className="w-9 h-9 rounded-xl flex items-center justify-center text-[12px] font-medium bg-card text-muted-foreground border border-border/60 shadow-sm
          group-hover:vox-gradient-bg group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-500">
          {index + 1}
        </span>
        <div className="mt-5">
          <h3 className="text-[15px] font-medium text-foreground tracking-[-0.015em]">
            {step.title}
          </h3>
          <p className="mt-1.5 text-[13px] text-muted-foreground leading-[1.65]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorksSection;

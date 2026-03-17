import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import step1Img from "@/assets/step-1-voice.png";
import step2Img from "@/assets/step-2-tasks.png";
import step3Img from "@/assets/step-3-phone.png";
import step4Img from "@/assets/step-4-integrate.png";
import step5Img from "@/assets/step-5-monitor.png";

const stepImages = [step1Img, step2Img, step3Img, step4Img, step5Img];

const HowItWorksSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  const steps = [
    { title: t("how.step1.title"), description: t("how.step1.desc") },
    { title: t("how.step2.title"), description: t("how.step2.desc") },
    { title: t("how.step3.title"), description: t("how.step3.desc") },
    { title: t("how.step4.title"), description: t("how.step4.desc") },
    { title: t("how.step5.title"), description: t("how.step5.desc") },
  ];

  return (
    <section className="py-28 relative" id="how-it-works">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[hsl(var(--vox-teal)/0.03)] to-[hsl(var(--vox-blue)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">{t("how.title")}</h2>
          <p className="mt-4 vox-gradient-text font-semibold text-lg">{t("how.subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-1">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className={`w-full flex items-center justify-between p-5 rounded-xl transition-all duration-300 text-left border ${
                    openIndex === i
                      ? "bg-card border-border/80 vox-shadow"
                      : "border-transparent hover:bg-muted/40 hover:border-border/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      openIndex === i
                        ? "vox-gradient-bg text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </span>
                    <span className={`font-medium transition-colors duration-200 ${openIndex === i ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${openIndex === i ? "rotate-90" : ""}`}
                  />
                </button>
                <AnimatePresenceWrapper isOpen={openIndex === i}>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-16 pr-5 pb-4">{step.description}</p>
                </AnimatePresenceWrapper>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-muted/20 rounded-2xl border border-border/60 p-2 min-h-[350px] flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={openIndex >= 0 && openIndex < stepImages.length ? openIndex : 0}
                src={stepImages[openIndex >= 0 && openIndex < stepImages.length ? openIndex : 0]}
                alt={steps[openIndex >= 0 && openIndex < steps.length ? openIndex : 0]?.title || "Step"}
                className="w-full h-auto rounded-xl object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AnimatePresenceWrapper = ({ isOpen, children }: { isOpen: boolean; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default HowItWorksSection;

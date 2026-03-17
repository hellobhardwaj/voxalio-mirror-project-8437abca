import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      {/* Subtle background accent */}
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
            className="bg-muted/20 rounded-2xl border border-border/60 p-6 min-h-[350px] flex items-center justify-center"
          >
            <div className="w-full max-w-md bg-card rounded-xl border border-border/60 p-5 vox-shadow-xl">
              <div className="flex gap-4 mb-4">
                <span className="text-sm font-semibold text-foreground border-b-2 border-primary pb-1">Behaviour</span>
                <span className="text-sm text-muted-foreground pb-1 hover:text-foreground transition-colors cursor-pointer">Technical</span>
              </div>
              <div className="space-y-1">
                {["Essentials", "Answer Questions", "Transfer Calls", "Send Email", "Custom Prompts", "Send SMS", "Book Appointments", "Webhooks"].map((item, i) => (
                  <div key={item} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 text-sm transition-colors duration-200 cursor-pointer group">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{item}</span>
                    {i > 1 && i < 7 && (
                      <span className="w-5 h-5 rounded-full vox-gradient-bg flex items-center justify-center text-primary-foreground text-[10px]">✓</span>
                    )}
                    {i <= 1 && <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Simple wrapper for animated content visibility
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

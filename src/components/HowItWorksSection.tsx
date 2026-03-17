import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-[hsl(var(--vox-teal)/0.03)] to-[hsl(var(--vox-blue)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            {t("how.title")}
          </h2>
          <p className="mt-4 vox-gradient-text font-semibold text-lg">
            {t("how.subtitle")}
          </p>
        </motion.div>

        {/* Zig-zag steps with connecting line */}
        <div className="relative">
          {/* Vertical connecting line (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="w-full h-full bg-gradient-to-b from-border/0 via-border/60 to-border/0" />
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              const isActive = openIndex === i;

              return (
                <div key={i} className="relative">
                  {/* Connection dot on the center line (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <motion.div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        isActive
                          ? "border-[hsl(var(--vox-teal))] bg-[hsl(var(--vox-teal))] shadow-[0_0_12px_hsl(var(--vox-teal)/0.5)]"
                          : "border-border bg-background"
                      }`}
                      animate={isActive ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  </div>

                  {/* Card container */}
                  <div
                    className={`md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto md:pr-0" : "md:ml-auto md:pl-0"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    >
                      <button
                        onClick={() => setOpenIndex(isActive ? -1 : i)}
                        className={`w-full text-left rounded-2xl p-6 transition-all duration-500 border group ${
                          isActive
                            ? "bg-card border-[hsl(var(--vox-teal)/0.3)] shadow-[0_8px_30px_-12px_hsl(var(--vox-teal)/0.15)] -translate-y-1"
                            : "bg-card/60 border-border/50 hover:border-border hover:bg-card hover:-translate-y-0.5 hover:shadow-lg"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {/* Step number */}
                            <span
                              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-all duration-500 ${
                                isActive
                                  ? "vox-gradient-bg text-primary-foreground shadow-md"
                                  : "bg-muted text-muted-foreground group-hover:bg-muted/80"
                              }`}
                            >
                              {i + 1}
                            </span>

                            <div>
                              {/* Title */}
                              <h3
                                className={`font-semibold text-base transition-colors duration-300 ${
                                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              >
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <ChevronDown
                            className={`w-4 h-4 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${
                              isActive ? "rotate-180" : ""
                            }`}
                          />
                        </div>

                        {/* Expandable description */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-muted-foreground leading-relaxed mt-3 pl-14">
                                {step.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

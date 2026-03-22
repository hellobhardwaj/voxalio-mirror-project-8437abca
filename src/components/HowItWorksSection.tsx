import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, Clock, Euro, TrendingUp, Zap, ArrowRight } from "lucide-react";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

const VOXALIO_MONTHLY = 49;

const ROICalculator = () => {
  const { lang } = useLanguage();

  const [callsPerMonth, setCallsPerMonth] = useState(500);
  const [avgDuration, setAvgDuration] = useState(5);
  const [hourlyCost, setHourlyCost] = useState(25);

  const results = useMemo(() => {
    const totalMinutes = callsPerMonth * avgDuration;
    const totalHours = totalMinutes / 60;
    const staffCost = totalHours * hourlyCost;
    const savings = staffCost - VOXALIO_MONTHLY;
    return {
      hoursSaved: totalHours,
      moneySaved: staffCost,
      voxalioCost: VOXALIO_MONTHLY,
      netSavings: Math.max(0, savings),
    };
  }, [callsPerMonth, avgDuration, hourlyCost]);

  const formatNum = (n: number) =>
    n.toLocaleString(lang === "de" ? "de-DE" : "en-US", { maximumFractionDigits: 0 });

  const resultGradients = [
    ["#dbeafe", "#bfdbfe", "#93c5fd", "#e0f2fe"],
    ["#e0f2fe", "#c7d2fe", "#a5b4fc", "#dbeafe"],
    ["#dbeafe", "#93c5fd", "#bfdbfe", "#e0f2fe"],
    ["#d1fae5", "#a7f3d0", "#bbf7d0", "#d1fae5"],
  ];

  const resultCards = [
    {
      icon: Clock,
      label: lang === "de" ? "Stunden gespart" : "Hours saved",
      value: formatNum(results.hoursSaved),
      suffix: lang === "de" ? " Std./Mo." : " hrs/mo",
      accent: "#2563eb",
    },
    {
      icon: Euro,
      label: lang === "de" ? "Personalkosten" : "Staff cost",
      value: `€${formatNum(results.moneySaved)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      accent: "#2563eb",
    },
    {
      icon: Zap,
      label: lang === "de" ? "Voxalio Kosten" : "Voxalio cost",
      value: `€${formatNum(results.voxalioCost)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      accent: "#2563eb",
    },
    {
      icon: TrendingUp,
      label: lang === "de" ? "Netto-Ersparnis" : "Net savings",
      value: `€${formatNum(results.netSavings)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      accent: "#059669",
      highlight: true,
    },
  ];

  const sliders = [
    {
      label: lang === "de" ? "Anrufe pro Monat" : "Calls per month",
      value: callsPerMonth, set: setCallsPerMonth,
      min: 50, max: 5000, step: 50,
      display: formatNum(callsPerMonth), minLabel: "50", maxLabel: "5,000",
    },
    {
      label: lang === "de" ? "Ø Anrufdauer (Min.)" : "Avg. call duration (min)",
      value: avgDuration, set: setAvgDuration,
      min: 1, max: 30, step: 1,
      display: `${avgDuration} min`, minLabel: "1", maxLabel: "30",
    },
    {
      label: lang === "de" ? "Personalkosten/Std. (€)" : "Hourly staff cost (€)",
      value: hourlyCost, set: setHourlyCost,
      min: 10, max: 80, step: 1,
      display: `€${hourlyCost}`, minLabel: "€10", maxLabel: "€80",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      id="how-it-works"
      style={{ background: "var(--bg-mid)" }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20"
        >
          <span className="section-label">Return on Investment</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {lang === "de" ? (
              <>So viel spart <span style={{ color: "#2563eb" }}>Voxalio</span> für Sie</>
            ) : (
              <>See what <span style={{ color: "#2563eb" }}>Voxalio</span> saves you</>
            )}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-xl leading-[1.7]">
            {lang === "de"
              ? "Berechnen Sie, wie viel Zeit und Geld Ihr Unternehmen durch den Wechsel zu KI-Sprachagenten spart"
              : "Calculate how much time and money your business saves by switching to AI voice agents"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Calculator inputs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 relative rounded-2xl p-7 md:p-8"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  boxShadow: "0 4px 16px rgba(37,99,235,0.25)",
                }}
              >
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-[15px] text-[var(--text-primary)]">
                  {lang === "de" ? "Ihre Daten" : "Your numbers"}
                </h3>
                <p className="text-[var(--text-tertiary)] text-[11px] mt-0.5">
                  {lang === "de" ? "Schieberegler anpassen" : "Adjust the sliders"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {sliders.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[13px] font-medium text-[var(--text-secondary)]">
                      {s.label}
                    </label>
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-lg"
                      style={{
                        color: "#2563eb",
                        background: "rgba(37,99,235,0.06)",
                        border: "1px solid rgba(37,99,235,0.1)",
                      }}
                    >
                      {s.display}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={s.value}
                    onChange={(e) => s.set(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2563eb ${((s.value - s.min) / (s.max - s.min)) * 100}%, #e2e8f0 ${((s.value - s.min) / (s.max - s.min)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-[var(--text-tertiary)] mt-1.5">
                    <span>{s.minLabel}</span>
                    <span>{s.maxLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results grid */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-4">
            {resultCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  whileHover={{ 
                    scale: 1.04, 
                    y: -6,
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                  className="relative rounded-2xl p-6 overflow-hidden flex flex-col group cursor-pointer select-none"
                  style={{
                    border: `1px solid ${card.highlight ? "rgba(5,150,105,0.12)" : "rgba(37,99,235,0.08)"}`,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.03)",
                    minHeight: "180px",
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                  }}
                  onHoverStart={() => {}}
                  onHoverEnd={() => {}}
                >
                  <AnimatedGradient colors={resultGradients[i]} speed={10} blur="heavy" />
                  <div className="absolute inset-0 bg-white/35 z-[1] transition-all duration-300 group-hover:bg-white/20" />
                  
                  {/* Hover glow ring */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] pointer-events-none"
                    style={{
                      boxShadow: card.highlight 
                        ? "inset 0 0 30px rgba(5,150,105,0.08), 0 8px 40px rgba(5,150,105,0.12)"
                        : "inset 0 0 30px rgba(37,99,235,0.08), 0 8px 40px rgba(37,99,235,0.12)",
                      border: `1px solid ${card.highlight ? "rgba(5,150,105,0.25)" : "rgba(37,99,235,0.2)"}`,
                    }}
                  />

                  <div className="relative z-[2] flex flex-col h-full justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{
                          background: card.highlight
                            ? "linear-gradient(135deg, #059669, #10b981)"
                            : "linear-gradient(135deg, #2563eb, #3b82f6)",
                          boxShadow: card.highlight
                            ? "0 3px 10px rgba(5,150,105,0.2)"
                            : "0 3px 10px rgba(37,99,235,0.15)",
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-300 group-hover:text-[var(--text-primary)]">
                        {card.label}
                      </span>
                    </div>
                    <div className="mt-6">
                      <motion.span
                        key={card.value}
                        initial={{ opacity: 0.6, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-display font-extrabold text-[28px] md:text-[34px] tracking-[-0.03em] transition-all duration-300 group-hover:tracking-[-0.02em]"
                        style={{ color: card.accent }}
                      >
                        {card.value}
                      </motion.span>
                      {card.suffix && (
                        <span className="text-[12px] text-[var(--text-tertiary)] ml-1.5 font-medium">
                          {card.suffix}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-[var(--text-tertiary)] text-sm mb-5">
            {lang === "de"
              ? "Basierend auf Ihren Eingaben sparen Sie jährlich"
              : "Based on your inputs, you save annually"}
            <span className="font-bold ml-2 text-base" style={{ color: "#059669" }}>
              €{formatNum(results.netSavings * 12)}
            </span>
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.25)",
            }}
          >
            {lang === "de" ? "Jetzt starten" : "Start saving today"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ROICalculator;

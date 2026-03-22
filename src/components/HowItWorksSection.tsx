import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, Clock, Euro, TrendingUp, Zap } from "lucide-react";
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
    n.toLocaleString(lang === "de" ? "de-DE" : "en-US", {
      maximumFractionDigits: 0,
    });

  const sectionGradient = ["#dbeafe", "#bfdbfe", "#93c5fd", "#e0f2fe", "#c7d2fe"];
  const resultGradients = [
    ["#dbeafe", "#bfdbfe", "#93c5fd", "#e0f2fe"],
    ["#e0f2fe", "#c7d2fe", "#a5b4fc", "#dbeafe"],
    ["#ede9fe", "#c7d2fe", "#bfdbfe", "#e0e7ff"],
    ["#c7d2fe", "#dbeafe", "#bfdbfe", "#a5b4fc"],
  ];

  const resultCards = [
    {
      icon: Clock,
      label: lang === "de" ? "Stunden gespart / Monat" : "Hours saved / month",
      value: formatNum(results.hoursSaved),
      suffix: lang === "de" ? " Std." : " hrs",
    },
    {
      icon: Euro,
      label: lang === "de" ? "Personalkosten / Monat" : "Staff cost / month",
      value: `€${formatNum(results.moneySaved)}`,
      suffix: "",
    },
    {
      icon: Zap,
      label: lang === "de" ? "Kosten mit Voxalio" : "Cost with Voxalio",
      value: `€${formatNum(results.voxalioCost)}`,
      suffix: lang === "de" ? " / Monat" : " / month",
    },
    {
      icon: TrendingUp,
      label: lang === "de" ? "Netto-Ersparnis" : "Net savings",
      value: `€${formatNum(results.netSavings)}`,
      suffix: lang === "de" ? " / Monat" : " / month",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      id="how-it-works"
      style={{ background: "var(--bg-mid)" }}
    >
      {/* Full-section animated gradient background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <AnimatedGradient colors={sectionGradient} speed={8} blur="heavy" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <span className="section-label">Return on Investment</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {lang === "de"
              ? "So viel spart Voxalio für Sie"
              : "See what Voxalio saves you"}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-xl leading-[1.7]">
            {lang === "de"
              ? "Berechnen Sie, wie viel Zeit und Geld Ihr Unternehmen durch den Wechsel zu KI-Sprachagenten spart"
              : "Calculate how much time and money your business saves by switching to AI voice agents"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator inputs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(37,99,235,0.1)",
              boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)" }}
              >
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg text-[var(--text-primary)]">
                {lang === "de" ? "Ihre Daten" : "Your numbers"}
              </h3>
            </div>

            <div className="flex flex-col gap-7">
              {/* Calls per month */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-[var(--text-primary)]">
                    {lang === "de" ? "Anrufe pro Monat" : "Calls per month"}
                  </label>
                  <span className="text-sm font-bold" style={{ color: "#2563eb" }}>
                    {formatNum(callsPerMonth)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={5000}
                  step={50}
                  value={callsPerMonth}
                  onChange={(e) => setCallsPerMonth(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((callsPerMonth - 50) / 4950) * 100}%, #e2e8f0 ${((callsPerMonth - 50) / 4950) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] mt-1.5">
                  <span>50</span>
                  <span>5,000</span>
                </div>
              </div>

              {/* Average duration */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-[var(--text-primary)]">
                    {lang === "de"
                      ? "Durchschnittliche Anrufdauer (Min.)"
                      : "Avg. call duration (min)"}
                  </label>
                  <span className="text-sm font-bold" style={{ color: "#2563eb" }}>
                    {avgDuration}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={avgDuration}
                  onChange={(e) => setAvgDuration(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((avgDuration - 1) / 29) * 100}%, #e2e8f0 ${((avgDuration - 1) / 29) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] mt-1.5">
                  <span>1 min</span>
                  <span>30 min</span>
                </div>
              </div>

              {/* Hourly cost */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-medium text-[var(--text-primary)]">
                    {lang === "de"
                      ? "Personalkosten pro Stunde (€)"
                      : "Hourly staff cost (€)"}
                  </label>
                  <span className="text-sm font-bold" style={{ color: "#2563eb" }}>
                    €{hourlyCost}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={80}
                  step={1}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((hourlyCost - 10) / 70) * 100}%, #e2e8f0 ${((hourlyCost - 10) / 70) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] mt-1.5">
                  <span>€10</span>
                  <span>€80</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results grid */}
          <div className="grid grid-cols-2 gap-4">
            {resultCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="relative rounded-2xl p-6 overflow-hidden flex flex-col justify-between"
                  style={{
                    border: "1px solid rgba(37,99,235,0.08)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                    minHeight: "160px",
                  }}
                >
                  <AnimatedGradient colors={resultGradients[i]} speed={10} blur="heavy" />
                  <div className="absolute inset-0 bg-white/40 z-[1]" />
                  <div className="relative z-[2] flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-auto">
                      <Icon className="w-4 h-4" style={{ color: "#2563eb" }} strokeWidth={1.5} />
                      <span className="text-[12px] font-medium text-[var(--text-secondary)]">
                        {card.label}
                      </span>
                    </div>
                    <div className="mt-4">
                      <span
                        className="font-display font-bold text-[28px] md:text-[32px] tracking-[-0.02em]"
                        style={{ color: "#2563eb" }}
                      >
                        {card.value}
                      </span>
                      {card.suffix && (
                        <span className="text-[13px] text-[var(--text-tertiary)] ml-1">
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
      </div>
    </section>
  );
};

export default ROICalculator;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calculator, Clock, Euro, TrendingUp, Zap, ArrowRight } from "lucide-react";

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

  const resultCards = [
    {
      icon: Clock,
      label: lang === "de" ? "Stunden gespart" : "Hours saved",
      value: formatNum(results.hoursSaved),
      suffix: lang === "de" ? " Std./Mo." : " hrs/mo",
      gradient: "from-blue-500/10 to-cyan-500/10",
      iconBg: "from-blue-500 to-cyan-500",
    },
    {
      icon: Euro,
      label: lang === "de" ? "Personalkosten" : "Staff cost",
      value: `€${formatNum(results.moneySaved)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      gradient: "from-violet-500/10 to-blue-500/10",
      iconBg: "from-violet-500 to-blue-500",
    },
    {
      icon: Zap,
      label: lang === "de" ? "Voxalio Kosten" : "Voxalio cost",
      value: `€${formatNum(results.voxalioCost)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      gradient: "from-blue-500/10 to-indigo-500/10",
      iconBg: "from-blue-500 to-indigo-500",
    },
    {
      icon: TrendingUp,
      label: lang === "de" ? "Netto-Ersparnis" : "Net savings",
      value: `€${formatNum(results.netSavings)}`,
      suffix: lang === "de" ? "/Mo." : "/mo",
      gradient: "from-emerald-500/10 to-blue-500/10",
      iconBg: "from-emerald-500 to-blue-500",
      highlight: true,
    },
  ];

  const sliders = [
    {
      label: lang === "de" ? "Anrufe pro Monat" : "Calls per month",
      value: callsPerMonth,
      set: setCallsPerMonth,
      min: 50,
      max: 5000,
      step: 50,
      display: formatNum(callsPerMonth),
      minLabel: "50",
      maxLabel: "5,000",
    },
    {
      label: lang === "de" ? "Ø Anrufdauer (Min.)" : "Avg. call duration (min)",
      value: avgDuration,
      set: setAvgDuration,
      min: 1,
      max: 30,
      step: 1,
      display: `${avgDuration} min`,
      minLabel: "1",
      maxLabel: "30",
    },
    {
      label: lang === "de" ? "Personalkosten/Std. (€)" : "Hourly staff cost (€)",
      value: hourlyCost,
      set: setHourlyCost,
      min: 10,
      max: 80,
      step: 1,
      display: `€${hourlyCost}`,
      minLabel: "€10",
      maxLabel: "€80",
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      id="how-it-works"
    >
      {/* Dark premium background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #050a18 0%, #0a1628 40%, #0c1a30 70%, #060e1e 100%)",
        }}
      />

      {/* Ambient glow orbs */}
      <div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-[-15%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 md:mb-20"
        >
          <span
            className="inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] mb-5"
            style={{
              background: "rgba(37,99,235,0.12)",
              color: "#60a5fa",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          >
            Return on Investment
          </span>
          <h2 className="font-display font-extrabold text-white text-3xl md:text-5xl leading-[1.08] tracking-[-0.03em]">
            {lang === "de" ? (
              <>So viel spart <span style={{ color: "#3b82f6" }}>Voxalio</span> für Sie</>
            ) : (
              <>See what <span style={{ color: "#3b82f6" }}>Voxalio</span> saves you</>
            )}
          </h2>
          <p className="text-white/40 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-[1.7] font-light">
            {lang === "de"
              ? "Berechnen Sie, wie viel Zeit und Geld Ihr Unternehmen durch den Wechsel zu KI-Sprachagenten spart"
              : "Calculate how much time and money your business saves by switching to AI voice agents"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Calculator inputs — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 relative rounded-3xl p-7 md:p-8"
            style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)" }}
            />

            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
                  boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
                }}
              >
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-[15px]">
                  {lang === "de" ? "Ihre Daten" : "Your numbers"}
                </h3>
                <p className="text-white/30 text-[11px] mt-0.5">
                  {lang === "de" ? "Schieberegler anpassen" : "Adjust the sliders"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {sliders.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[13px] font-medium text-white/60">
                      {s.label}
                    </label>
                    <span
                      className="text-sm font-bold px-3 py-1 rounded-lg"
                      style={{
                        color: "#60a5fa",
                        background: "rgba(37,99,235,0.1)",
                        border: "1px solid rgba(37,99,235,0.15)",
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
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer roi-slider"
                    style={{
                      background: `linear-gradient(to right, #2563eb ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.08) ${((s.value - s.min) / (s.max - s.min)) * 100}%)`,
                    }}
                  />
                  <div className="flex justify-between text-[10px] text-white/20 mt-1.5">
                    <span>{s.minLabel}</span>
                    <span>{s.maxLabel}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Results grid — takes 3 cols */}
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
                  className={`relative rounded-3xl p-6 overflow-hidden flex flex-col group transition-all duration-500 ${
                    card.highlight ? "ring-1 ring-emerald-500/20" : ""
                  }`}
                  style={{
                    background: card.highlight
                      ? "rgba(16, 185, 129, 0.06)"
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${card.highlight ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: card.highlight
                      ? "0 12px 40px rgba(16,185,129,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                      : "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
                    minHeight: "180px",
                  }}
                >
                  {/* Top glow line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                      background: card.highlight
                        ? "linear-gradient(90deg, transparent, rgba(16,185,129,0.4), transparent)"
                        : "linear-gradient(90deg, transparent, rgba(37,99,235,0.2), transparent)",
                    }}
                  />

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: card.highlight
                        ? "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.08), transparent 70%)"
                        : "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.06), transparent 70%)",
                    }}
                  />

                  <div className="relative z-[2] flex flex-col h-full justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-br ${card.iconBg} flex items-center justify-center`}
                        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                      >
                        <Icon className="w-3.5 h-3.5 text-white" strokeWidth={2} />
                      </div>
                      <span className="text-[12px] font-medium text-white/40">
                        {card.label}
                      </span>
                    </div>
                    <div className="mt-6">
                      <motion.span
                        key={card.value}
                        initial={{ opacity: 0.6, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`font-display font-extrabold text-[30px] md:text-[36px] tracking-[-0.03em] ${
                          card.highlight ? "text-emerald-400" : "text-white"
                        }`}
                      >
                        {card.value}
                      </motion.span>
                      {card.suffix && (
                        <span className="text-[12px] text-white/25 ml-1.5 font-medium">
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
          <p className="text-white/30 text-sm mb-5">
            {lang === "de"
              ? "Basierend auf Ihren Eingaben sparen Sie jährlich"
              : "Based on your inputs, you save annually"}
            <span className="text-white font-bold ml-2 text-base">
              €{formatNum(results.netSavings * 12)}
            </span>
          </p>
          <a
            href="#lead-form"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_30px_rgba(37,99,235,0.35)]"
            style={{
              background: "linear-gradient(135deg, #2563eb, #3b82f6)",
              boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
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

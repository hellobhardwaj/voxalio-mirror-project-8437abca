import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const useCountUp = (end: number, duration: number, start: boolean, suffix = "", prefix = "") => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return `${prefix}${value}${suffix}`;
};

const StatsBar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLanguage();

  const stats = lang === "de"
    ? [
        { value: 94, suffix: ".2%", label: "Lösungsrate" },
        { value: 10, suffix: " min", label: "Setup-Zeit", prefix: "< " },
        { value: 100, suffix: "%", label: "DSGVO-konform" },
        { value: 24, suffix: "/7", label: "Verfügbarkeit" },
      ]
    : [
        { value: 94, suffix: ".2%", label: "Resolution Rate" },
        { value: 10, suffix: " min", label: "Setup Time", prefix: "< " },
        { value: 100, suffix: "%", label: "GDPR Compliant" },
        { value: 24, suffix: "/7", label: "Uptime Guarantee" },
      ];

  return (
    <section
      ref={ref}
      className="w-full"
      style={{
        background: "var(--bg-mid)",
        borderTop: "1px solid #e2e8f0",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`text-center ${i < 3 ? "md:border-r" : ""}`}
              style={{ borderColor: "#e2e8f0" }}
            >
              <div className="font-display font-bold text-[36px] md:text-[var(--text-4xl)] leading-none gradient-text" style={{ willChange: "transform" }}>
                {stat.prefix || ""}
                {useCountUp(stat.value, 2000, inView)}
                {stat.suffix}
              </div>
              <div className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";

const cards = [
  {
    title: "Monthly Cost Savings",
    value: "€3,840",
    subtitle: "vs hiring a full-time receptionist",
    colors: ["#3B82F6", "#60A5FA", "#93C5FD"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Calls Handled",
    value: "1,000+",
    subtitle: "Per month on Pro plan",
    colors: ["#60A5FA", "#34D399", "#93C5FD"],
    colSpan: "",
  },
  {
    title: "Setup Time",
    value: "< 1 week",
    subtitle: "No developer needed",
    colors: ["#F59E0B", "#A78BFA", "#FCD34D"],
    colSpan: "",
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    subtitle: "Calls resolved without human escalation",
    colors: ["#3B82F6", "#A78BFA", "#FBCFE8"],
    colSpan: "md:col-span-2",
  },
  {
    title: "Return on Investment",
    value: "Up to 95% cheaper than competitors",
    subtitle:
      "Voxalio handles your calls 24/7 at a fraction of the cost of a human team — GDPR compliant, ready in minutes",
    colors: ["#2563eb", "#60A5FA", "#3B82F6"],
    colSpan: "md:col-span-3",
  },
];

const cardsDe = [
  { title: "Monatliche Kosteneinsparung", value: "€3.840", subtitle: "im Vergleich zu einer Vollzeit-Rezeptionistin" },
  { title: "Anrufe bearbeitet", value: "1.000+", subtitle: "Pro Monat im Pro-Tarif" },
  { title: "Einrichtungszeit", value: "< 1 Woche", subtitle: "Kein Entwickler nötig" },
  { title: "Lösungsrate", value: "94,2%", subtitle: "Anrufe ohne menschliche Eskalation gelöst" },
  { title: "Return on Investment", value: "Bis zu 95% günstiger als Wettbewerber", subtitle: "Voxalio bearbeitet Ihre Anrufe 24/7 zu einem Bruchteil der Kosten eines menschlichen Teams — DSGVO-konform, in unter einer Woche einsatzbereit" },
];

const ROISection = () => {
  const { lang } = useLanguage();

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      id="how-it-works"
      style={{ background: "var(--bg-mid)" }}
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 md:mb-20"
        >
          <span className="section-label">
            {lang === "de" ? "WARUM VOXALIO" : "WHY VOXALIO"}
          </span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {lang === "de"
              ? "Die Zahlen sprechen für sich"
              : "The numbers speak for themselves"}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-xl leading-[1.7]">
            {lang === "de"
              ? "Echte Ergebnisse. Echte Einsparungen. Echter ROI."
              : "Real results. Real savings. Real ROI."}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card, i) => {
            const de = cardsDe[i];
            const isFullWidth = card.colSpan === "md:col-span-3";
            const isLarge = card.colSpan === "md:col-span-2";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer select-none group ${card.colSpan} ${
                  isFullWidth ? "min-h-[180px]" : isLarge ? "min-h-[220px]" : "min-h-[220px]"
                }`}
              >
                {/* Animated gradient background */}
                <AnimatedGradient
                  colors={card.colors}
                  speed={8}
                  blur="heavy"
                />

                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/30 z-[1] transition-all duration-300 group-hover:bg-white/15" />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[1] pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 40px rgba(37,99,235,0.06), 0 8px 40px rgba(37,99,235,0.1)",
                  }}
                />

                {/* Content */}
                <div
                  className={`relative z-[2] flex flex-col justify-end h-full ${
                    isFullWidth ? "p-8 md:p-10" : "p-6 md:p-8"
                  }`}
                >
                  <p className="text-[13px] font-medium text-[var(--text-secondary)] mb-2">
                    {lang === "de" ? de.title : card.title}
                  </p>
                  <p
                    className={`font-display font-extrabold tracking-[-0.03em] text-[var(--text-primary)] ${
                      isFullWidth
                        ? "text-[22px] md:text-[28px]"
                        : "text-[32px] md:text-[42px]"
                    }`}
                  >
                    {lang === "de" ? de.value : card.value}
                  </p>
                  <p className="text-[13px] text-[var(--text-tertiary)] mt-2 leading-relaxed max-w-lg">
                    {lang === "de" ? de.subtitle : card.subtitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ROISection;

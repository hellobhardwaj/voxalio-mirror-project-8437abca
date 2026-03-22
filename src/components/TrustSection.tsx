import { motion } from "framer-motion";
import { Shield, Cpu, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Aurora from "@/components/Aurora";

const TrustSection = () => {
  const { lang } = useLanguage();

  const cards = lang === "de"
    ? [
        { icon: Shield, title: "100% DSGVO-konform", desc: "Server in Nürnberg, Deutschland. Volle Transparenz, volle Kontrolle. Löschen Sie Ihre Daten in Echtzeit." },
        { icon: Cpu, title: "Enterprise-Grade KI", desc: "Erstklassige LLMs auf EU Azure-Servern. Genauigkeit, Geschwindigkeit und Compliance garantiert." },
        { icon: Search, title: "Radikale Transparenz", desc: "Wir speichern nur das Nötigste. Keine versteckten Daten, keine Ausnahmen." },
      ]
    : [
        { icon: Shield, title: "100% GDPR Compliant", desc: "Servers in Nuremberg, Germany. Full transparency, full control. Delete your data in real time." },
        { icon: Cpu, title: "Enterprise-Grade AI", desc: "Best-in-class LLMs on EU Azure servers. Accuracy, speed, and compliance guaranteed." },
        { icon: Search, title: "Radical Transparency", desc: "We only store what's necessary. No hidden data, no exceptions." },
      ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--bg-dark)", borderTop: "1px solid rgba(0,0,0,0.12)" }}>
      {/* Aurora background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Aurora
          colorStops={["#2563eb", "#60a5fa", "#3b82f6"]}
          blend={0.6}
          amplitude={1.2}
          speed={0.8}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Security & Compliance</span>
          <h2 className="font-display font-bold text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3 gradient-text">
            {lang === "de"
              ? "Gebaut für Deutschland. Vertraut in ganz Europa."
              : "Built for Germany. Trusted across Europe."}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[var(--radius-lg)] p-8 vox-card-hover"
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  willChange: "transform",
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "var(--gradient-primary)" }}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-semibold text-[18px] text-[var(--text-primary)] mb-3">{card.title}</h3>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.6]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

import { motion } from "framer-motion";
import { Shield, Cpu, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
    <section className="py-24 md:py-32" style={{ background: "#f8fafc" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="font-display font-700 text-[#0f172a] text-[32px] md:text-[42px] leading-[1.1] text-center mb-16"
        >
          {lang === "de"
            ? "Gebaut für Deutschland. Vertraut in ganz Europa."
            : "Built for Germany. Trusted across Europe."}
        </motion.h2>

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
                className="bg-white rounded-2xl p-8 border border-[#e2e8f0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563eb]/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#2563eb]" />
                </div>
                <h3 className="font-display font-600 text-[18px] text-[#0f172a] mb-3">{card.title}</h3>
                <p className="text-[15px] text-[#64748b] leading-[1.7]">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;

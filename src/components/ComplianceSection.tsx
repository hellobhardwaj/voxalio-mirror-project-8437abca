import { motion } from "framer-motion";
import heroOrb from "@/assets/hero-orb.png";
import { useLanguage } from "@/contexts/LanguageContext";

const ComplianceSection = () => {
  const { t } = useLanguage();

  const chatMessages = [
    { type: "system", label: t("comp.aiStarted"), text: "" },
    { type: "ai", text: t("comp.aiMsg"), label: "Voxalio" },
    { type: "user", text: t("comp.userMsg"), label: "Caller" },
    { type: "ai", text: t("comp.aiReply"), label: "Voxalio" },
  ];

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[hsl(var(--vox-teal)/0.04)] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <img src={heroOrb} alt="AI Compliance" className="w-64 h-64 object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                {msg.type === "system" ? (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span className="w-2 h-2 rounded-full vox-gradient-bg animate-pulse" />
                    <span>{msg.label}</span>
                  </div>
                ) : (
                  <div className={`rounded-2xl p-4 border transition-all duration-300 hover:shadow-md ${
                    msg.type === "ai"
                      ? "bg-card border-border/60 hover:border-border"
                      : "bg-muted/40 border-border/40 ml-8 hover:border-border/60"
                  }`}>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      {msg.type === "ai" ? "🤖" : "👤"} {msg.label}
                    </p>
                    <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComplianceSection;

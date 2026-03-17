import { motion } from "framer-motion";
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
            {/* Animated dynamic orb */}
            <div className="relative w-64 h-64">
              {/* Outer rotating glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(175 65% 50% / 0.3), hsl(200 80% 50% / 0.1), hsl(175 65% 50% / 0), hsl(175 65% 50% / 0.3))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing middle ring */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: "radial-gradient(circle, hsl(175 65% 50% / 0.15), hsl(200 80% 50% / 0.05))",
                  boxShadow: "0 0 60px hsl(175 65% 50% / 0.2), inset 0 0 40px hsl(175 65% 50% / 0.1)",
                }}
                animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Core orb */}
              <motion.div
                className="absolute inset-8 rounded-full overflow-hidden"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, hsl(175 65% 60%), hsl(190 70% 40%), hsl(210 60% 25%))",
                    boxShadow: "0 0 80px hsl(175 65% 50% / 0.4), inset 0 0 30px hsl(175 65% 50% / 0.2)",
                  }}
                />
              </motion.div>

              {/* Floating particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[hsl(175,65%,50%)]"
                  style={{
                    left: `${30 + Math.cos((i / 6) * Math.PI * 2) * 45}%`,
                    top: `${30 + Math.sin((i / 6) * Math.PI * 2) * 45}%`,
                  }}
                  animate={{
                    y: [0, -10, 0, 10, 0],
                    x: [0, 5, 0, -5, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                />
              ))}
            </div>
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
                    <p className="text-[11px] font-medium text-muted-foreground mb-1 tracking-normal">
                      {msg.type === "ai" ? "🤖" : "👤"} {msg.label}
                    </p>
                    <p className="text-[14px] font-normal text-foreground leading-[1.7] tracking-[-0.01em]">{msg.text}</p>
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

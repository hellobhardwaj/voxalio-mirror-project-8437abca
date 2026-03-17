import { motion } from "framer-motion";
import heroOrb from "@/assets/hero-orb.png";

const chatMessages = [
  {
    type: "system",
    label: "AI call started",
    time: "",
  },
  {
    type: "ai",
    text: "Hello, this is Voxalio, the AI assistant for BrightHome Solutions. How can I help you today?",
    label: "Voxalio",
  },
  {
    type: "user",
    text: "Hi, I'd like to schedule an appointment for next Tuesday please.",
    label: "Caller",
  },
  {
    type: "ai",
    text: "Of course! I have availability on Tuesday at 10:00 AM and 2:00 PM. Which would you prefer?",
    label: "Voxalio",
  },
];

const ComplianceSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Left - floating orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img src={heroOrb} alt="AI Compliance" className="w-64 h-64 object-contain" />
        </motion.div>

        {/* Right - chat transcript mockup */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          {chatMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {msg.type === "system" ? (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <span className="w-2 h-2 rounded-full vox-gradient-bg" />
                  <span>{msg.label}</span>
                </div>
              ) : (
                <div
                  className={`rounded-2xl p-4 border ${
                    msg.type === "ai"
                      ? "bg-card border-border"
                      : "bg-muted/50 border-border ml-8"
                  }`}
                >
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

export default ComplianceSection;

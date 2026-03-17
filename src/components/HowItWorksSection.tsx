import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    title: "Give your AI assistant a voice",
    description: "Bring your AI call assistant to life by choosing a voice that perfectly represents your company. All our AI voices sound amazingly human.",
  },
  {
    title: "Select tasks for your AI assistant",
    description: "Define the tasks your AI call assistant will handle for you, along with your company details and covered topics.",
  },
  {
    title: "Get your AI phone number",
    description: "Your AI call assistant gets its own number directly within our platform. One click and your AI assistant is reachable 24/7.",
  },
  {
    title: "Integrate your AI assistant",
    description: "Seamlessly integrate your AI call assistant with your internal systems, such as CRM, calendars, and databases.",
  },
  {
    title: "Run and monitor your AI calls",
    description: "Once your AI assistant has all the necessary information, you can activate it instantly and monitor results in real time.",
  },
];

const HowItWorksSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Set up your AI Call Assistant
          </h2>
          <p className="mt-3 vox-gradient-text font-semibold">
            100% No-Code and takes less than 10 minutes!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-1">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-5 rounded-xl hover:bg-muted/50 transition-colors text-left border border-transparent hover:border-border"
                >
                  <span className={`font-medium ${openIndex === i ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </span>
                  {openIndex === i ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="px-5 pb-5"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-muted/30 rounded-2xl border border-border p-6 min-h-[350px] flex items-center justify-center"
          >
            <div className="w-full max-w-md bg-card rounded-xl border border-border p-5 vox-shadow">
              <div className="flex gap-4 mb-4">
                <span className="text-sm font-semibold text-foreground border-b-2 border-primary pb-1">Behaviour</span>
                <span className="text-sm text-muted-foreground pb-1">Technical</span>
              </div>
              <div className="space-y-2">
                {["Essentials", "Answer Questions", "Transfer Calls", "Send Email", "Custom Prompts", "Send SMS", "Book Appointments", "Webhooks"].map((item, i) => (
                  <div key={item} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 text-sm">
                    <span className="text-muted-foreground">{item}</span>
                    {i > 1 && i < 7 && (
                      <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-primary-foreground text-xs">✓</span>
                    )}
                    {i <= 1 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

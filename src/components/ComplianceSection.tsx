import { motion } from "framer-motion";
import { Server, Brain, Globe } from "lucide-react";
import heroOrb from "@/assets/hero-orb.png";

const items = [
  {
    icon: Server,
    title: "Location of our servers",
    description: "We host our infrastructure in Germany — making us one of the few fully GDPR-compliant AI call assistant solutions in the EU.",
  },
  {
    icon: Brain,
    title: "Local LLMs",
    description: "Our services are powered by LLMs (large language models) from leading providers. To ensure full GDPR and EU AI Act compliance, we host on European servers.",
  },
  {
    icon: Globe,
    title: "Transparency is important to us",
    description: "We only store the data that is absolutely necessary and are able to delete all your data in real time upon request.",
  },
];

const ComplianceSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img src={heroOrb} alt="AI Compliance" className="w-64 h-64 object-contain" />
        </motion.div>

        <div className="space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-border rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <item.icon className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ComplianceSection;

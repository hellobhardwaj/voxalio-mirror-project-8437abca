import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "Do you really have the best AI call assistant?", a: "We believe so! Voxalio combines cutting-edge voice AI with enterprise-grade reliability, GDPR compliance, and seamless integrations — all in a no-code platform." },
  { q: "How does the AI call assistant work?", a: "Our AI uses advanced language models to understand and respond to callers naturally. It can answer questions, schedule appointments, transfer calls, and much more — all configured through our intuitive platform." },
  { q: "Can I try it before committing?", a: "Absolutely! You can test our AI with a free call right from our homepage. No credit card required." },
  { q: "Is Voxalio GDPR compliant?", a: "Yes. Our servers are hosted in Germany, and we follow strict EU data protection regulations. We only store essential data and can delete it upon request." },
  { q: "What languages does the AI support?", a: "Our AI currently supports German and English, with more languages being added regularly." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section className="py-24" id="faq">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-foreground"
          >
            Frequently asked questions
          </motion.h2>

          <div className="space-y-1">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span className="font-medium text-foreground pr-4">{faq.q}</span>
                  <ChevronRight
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? "rotate-90" : ""}`}
                  />
                </button>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="pb-5"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

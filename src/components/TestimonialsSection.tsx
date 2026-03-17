import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Since we started using Voxalio to handle our support calls, we can finally focus on our core work again. What matters most to me is that special cases or important requests are still forwarded by the AI to my personal number.",
    name: "Maria K.",
    company: "BrightHome Solutions",
  },
  {
    quote: "Voxalio completely transformed our front desk operations. We went from missing 40% of calls to zero missed calls, and the AI handles appointment booking flawlessly.",
    name: "Thomas R.",
    company: "Alpine Health Clinic",
  },
  {
    quote: "The setup took less than 10 minutes. Within an hour we had our AI receptionist live and handling real customer calls. The voice quality is indistinguishable from a real person.",
    name: "Sophie L.",
    company: "NordTech GmbH",
  },
];

const TestimonialsSection = () => (
  <section className="py-24" id="testimonials">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-foreground max-w-md"
      >
        What customers say about our AI Call Assistant:
      </motion.h2>

      <div className="mt-12 grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="border border-border rounded-2xl p-6"
          >
            <p className="text-foreground leading-relaxed mb-6">"{t.quote}"</p>
            <div>
              <p className="font-semibold text-sm text-foreground">- {t.name}</p>
              <p className="text-xs text-muted-foreground">{t.company}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

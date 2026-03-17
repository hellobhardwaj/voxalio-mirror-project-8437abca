import { motion } from "framer-motion";

const TestimonialsSection = () => (
  <section className="py-24" id="testimonials">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left side - heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            What customers say about our AI Call Assistant:
          </h2>
        </motion.div>

        {/* Right side - testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-foreground text-lg leading-relaxed">
            "Since we started using Voxalio to handle our support calls, we can finally focus on our core work again. What matters most to me is that special cases or important requests are still forwarded by the AI to my personal number."
          </p>
          <div className="mt-6">
            <p className="font-semibold text-sm text-foreground">— Maria K., BrightHome Solutions</p>
          </div>

          {/* Avatar row */}
          <div className="mt-6 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground">MK</div>
            <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground -ml-3">TR</div>
            <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground -ml-3">SL</div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

import { motion } from "framer-motion";

const CTASection = () => (
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="vox-gradient-bg rounded-3xl p-12 md:p-16 text-center text-primary-foreground"
      >
        <h2 className="text-3xl md:text-4xl font-bold">Build your own AI now</h2>
        <p className="mt-4 opacity-80 max-w-lg mx-auto">
          Get started in minutes. No coding required. Your AI call assistant is just a few clicks away.
        </p>
        <a
          href="#start"
          className="inline-block mt-8 bg-background text-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Start Now — It's Free
        </a>
      </motion.div>
    </div>
  </section>
);

export default CTASection;

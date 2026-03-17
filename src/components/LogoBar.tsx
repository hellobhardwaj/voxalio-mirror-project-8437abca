import { motion } from "framer-motion";
import { Star } from "lucide-react";

const logos = ["TechCorp", "DataFlow", "CloudSync", "BrightAI", "NetWave", "SignalX", "PulseHQ"];

const LogoBar = () => (
  <section className="py-10 border-t border-border">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
      >
        {logos.map((name) => (
          <span key={name} className="text-muted-foreground/40 font-semibold text-sm tracking-wider uppercase">
            {name}
          </span>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">6,000+ Customers</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default LogoBar;

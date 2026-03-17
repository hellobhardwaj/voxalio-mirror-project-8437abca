import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const logos = ["TechCorp", "DataFlow", "CloudSync", "BrightAI", "NetWave", "SignalX", "PulseHQ"];

const LogoBar = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10 border-t border-border overflow-hidden">
      <div className="relative w-full">
        <div className="group flex w-max animate-scroll-x hover:[animation-play-state:paused]">
          {[...logos, ...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 md:mx-12 text-muted-foreground/30 hover:text-muted-foreground/60 font-semibold text-sm tracking-wider uppercase transition-opacity duration-300 whitespace-nowrap"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoBar;

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const logos = ["TechCorp", "DataFlow", "CloudSync", "BrightAI", "NetWave", "SignalX", "PulseHQ"];

const LogoBar = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-14 overflow-hidden">
      {/* Dark glass background */}
      <div className="absolute inset-0 bg-[hsl(var(--vox-dark))]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--vox-teal)/0.04)] via-transparent to-[hsl(var(--vox-blue)/0.04)]" />
      
      {/* Top & bottom glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent" />

      {/* Left/right fade masks */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(var(--vox-dark))] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[hsl(var(--vox-dark))] to-transparent z-10" />

      <div className="relative w-full">
        <div className="group flex w-max animate-scroll-x hover:[animation-play-state:paused]">
          {[...logos, ...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 md:mx-14 text-white/20 hover:text-white/50 font-bold text-base tracking-[0.2em] uppercase transition-all duration-500 whitespace-nowrap cursor-default"
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

import { motion } from "framer-motion";

const BAR_COUNT = 24;
const COLORS = [
  "hsl(var(--vox-blue))",
  "hsl(var(--vox-cyan))",
  "hsl(var(--vox-teal))",
  "hsl(210 75% 60%)",
  "hsl(250 50% 60%)",
  "hsl(230 60% 55%)",
];

const HeroWaveform = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end justify-center gap-[3px] h-28 md:h-36">
        {Array.from({ length: BAR_COUNT }).map((_, i) => {
          const color = COLORS[i % COLORS.length];
          const baseHeight = 20 + Math.sin(i * 0.7) * 15;
          const peakHeight = 55 + Math.sin(i * 0.9) * 35;
          return (
            <motion.div
              key={i}
              className="w-[6px] md:w-[8px] rounded-full"
              style={{ backgroundColor: color, opacity: 0.85 }}
              animate={{
                height: [
                  `${baseHeight}%`,
                  `${peakHeight}%`,
                  `${baseHeight + 10}%`,
                  `${peakHeight - 15}%`,
                  `${baseHeight}%`,
                ],
              }}
              transition={{
                duration: 1.8 + Math.random() * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.07,
              }}
            />
          );
        })}
      </div>
      <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
        Live Voice Conversation
      </span>
    </div>
  );
};

export default HeroWaveform;

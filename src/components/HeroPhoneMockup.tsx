import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

const TRANSCRIPT_LINES = [
  "Hello, this is Voxalio AI.",
  "How can I help you today?",
  "I can schedule appointments,",
  "answer questions, or transfer",
  "you to the right department.",
];

const HeroPhoneMockup = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= TRANSCRIPT_LINES.length) {
          // Reset after a pause
          setTimeout(() => setVisibleLines(0), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto w-[220px] md:w-[260px]"
    >
      {/* Phone frame */}
      <div className="rounded-[2rem] border-[3px] border-foreground/10 bg-card shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-3 pb-1">
          <span className="text-[10px] text-muted-foreground font-medium">9:41</span>
          <div className="w-16 h-[5px] rounded-full bg-foreground/15 mx-auto" />
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-foreground/20" />
          </div>
        </div>

        {/* Call screen */}
        <div className="px-5 pt-6 pb-4 text-center">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
            style={{ background: 'var(--vox-gradient)' }}>
            <Phone className="w-6 h-6 text-white" />
          </div>
          <p className="text-foreground font-semibold text-sm">Voxalio AI</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Connected · 0:12</p>
        </div>

        {/* Live transcript */}
        <div className="mx-4 mb-4 rounded-xl bg-muted/60 p-3 min-h-[90px]">
          <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground mb-2 font-medium">
            Live Transcript
          </p>
          <div className="space-y-0.5">
            {TRANSCRIPT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] text-foreground/80 leading-relaxed"
              >
                {line}
                {i === visibleLines - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-[2px] h-3 bg-primary ml-0.5 align-text-bottom"
                  />
                )}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Accept button */}
        <div className="flex justify-center pb-5">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroPhoneMockup;

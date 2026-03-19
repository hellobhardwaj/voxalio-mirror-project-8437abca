import { motion } from "framer-motion";
import { Phone, Mic, Grid3X3, Volume2 } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const TRANSCRIPT_LINES = [
  { speaker: "AI Voxalio", text: "Hi! Thanks for calling Apex Dynamics. How can I help you today?" },
  { speaker: "Caller Client", text: "Hi, I'm interested in your marketing services. Can you tell me more about your packages?" },
  { speaker: "AI Voxalio", text: "Of course! We offer three main tiers: Starter, Growth, and Premium. The Growth package is our most popular for businesses looking to scale quickly. What specific goals do you have?" },
];

const HeroPhoneMockup = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= TRANSCRIPT_LINES.length) {
      const resetTimer = setTimeout(() => {
        setVisibleLines(0);
        setDisplayedChars(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = TRANSCRIPT_LINES[visibleLines];
    const fullText = currentLine.text;

    if (displayedChars < fullText.length) {
      const charTimer = setTimeout(() => {
        setDisplayedChars((c) => c + 1);
      }, 25 + Math.random() * 20);
      return () => clearTimeout(charTimer);
    } else {
      const nextTimer = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setDisplayedChars(0);
      }, 1200);
      return () => clearTimeout(nextTimer);
    }
  }, [visibleLines, displayedChars]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [visibleLines, displayedChars]);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-[200px] md:w-[240px] shrink-0"
    >
      <div className="rounded-[2rem] border-[3px] border-foreground/10 bg-white shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 pt-2.5 pb-1 bg-[#f8faff]">
          <span className="text-[9px] text-muted-foreground font-medium">9:41</span>
          <div className="w-14 h-[4px] rounded-full bg-foreground/15 mx-auto" />
          <div className="flex gap-1">
            <div className="w-3 h-2 rounded-sm bg-foreground/20" />
          </div>
        </div>

        {/* Call screen */}
        <div className="px-4 pt-4 pb-3 text-center bg-[#f8faff]">
          <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center bg-gradient-to-br from-[hsl(175,65%,40%)] to-[hsl(210,75%,50%)]">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <p className="text-foreground font-semibold text-sm">Voxalio AI</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">0:14</p>
        </div>

        {/* Call controls */}
        <div className="flex justify-center gap-5 px-4 py-2 bg-[#f8faff]">
          {[
            { icon: Mic, label: "Mute" },
            { icon: Grid3X3, label: "Keypad" },
            { icon: Volume2, label: "Speaker" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div className="w-8 h-8 rounded-full bg-muted/80 flex items-center justify-center">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-[7px] text-muted-foreground">{label}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-0.5">
            <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-white rotate-[135deg]" />
            </div>
            <span className="text-[7px] text-muted-foreground">End Call</span>
          </div>
        </div>

        {/* Transcript */}
        <div
          ref={transcriptRef}
          className="mx-3 mb-3 rounded-xl bg-muted/40 p-2.5 h-[120px] md:h-[140px] overflow-y-auto"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="space-y-2">
            {TRANSCRIPT_LINES.slice(0, visibleLines + 1).map((line, i) => {
              const isCurrentLine = i === visibleLines;
              const text = isCurrentLine
                ? line.text.slice(0, displayedChars)
                : line.text;
              const isAI = line.speaker.startsWith("AI");

              return (
                <p key={i} className="text-[9px] leading-relaxed text-foreground/80">
                  <span className={`font-bold ${isAI ? "text-[hsl(210,75%,50%)]" : "text-foreground"}`}>
                    [{line.speaker}]:
                  </span>{" "}
                  {text}
                  {isCurrentLine && displayedChars < line.text.length && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="inline-block w-[1px] h-2.5 bg-primary ml-px align-text-bottom"
                    />
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroPhoneMockup;

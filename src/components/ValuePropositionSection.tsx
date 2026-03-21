import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, Grid3X3, Volume2, PhoneOff, Headphones } from "lucide-react";

const TRANSCRIPT = [
  { label: "[AI] Voxalio:", labelColor: "#a855f7", text: "Hi! Thanks for calling Apex Dynamics. How can I help you today?" },
  { label: "[Caller] Client:", labelColor: "#f8f8ff", text: "Hi, I'm interested in your marketing services. Can you tell me more about your packages?" },
  { label: "[AI] Voxalio:", labelColor: "#a855f7", text: "Of course! We offer three main tiers: Starter, Growth, and Premium. The Growth package is our most popular for businesses looking to scale quickly. What specific goals do you have?" },
];

const CHAR_SPEED = 35;
const PAUSE_AFTER = 2000;

const ValuePropositionSection = () => {
  const [timer, setTimer] = useState(14);
  const [displayedText, setDisplayedText] = useState<typeof TRANSCRIPT>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  const runTypewriter = useCallback(() => {
    let cancelled = false;
    const lines: typeof TRANSCRIPT = [];

    const typeChar = (lineIdx: number, charIdx: number, resolve: () => void) => {
      if (cancelled) return;
      const line = TRANSCRIPT[lineIdx];
      if (charIdx > line.text.length) { resolve(); return; }
      lines[lineIdx] = { label: line.label, labelColor: line.labelColor, text: line.text.slice(0, charIdx) };
      setDisplayedText([...lines]);
      setTimeout(() => {
        if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        typeChar(lineIdx, charIdx + 1, resolve);
      }, CHAR_SPEED);
    };

    const run = async () => {
      for (let i = 0; i < TRANSCRIPT.length; i++) {
        if (cancelled) return;
        await new Promise<void>((resolve) => typeChar(i, 0, resolve));
      }
      await new Promise((r) => setTimeout(r, PAUSE_AFTER));
      if (!cancelled) {
        setDisplayedText([]);
        if (transcriptRef.current) transcriptRef.current.scrollTop = 0;
        setTimeout(() => { if (!cancelled) run(); }, 500);
      }
    };
    run();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => { return runTypewriter(); }, [runTypewriter]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const controlBtns = [
    { icon: Mic, label: "Mute" },
    { icon: Grid3X3, label: "Keypad" },
    { icon: Volume2, label: "Speaker" },
  ];

  return (
    <section style={{ background: "var(--bg-dark)" }} className="w-full py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">See It In Action</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            Never miss a call. Never lose a <span className="gradient-text">lead.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <p className="text-[var(--text-secondary)] text-[var(--text-md)] leading-[1.7] mb-10 max-w-[420px]">
              Voxalio AI answers instantly, captures leads, and handles inquiries 24/7. Empower your business with an always-on front desk that feels authentically human.
            </p>
            <a
              href="#contact"
              className="w-full max-w-[420px] rounded-[10px] font-display font-semibold text-white text-[15px] transition-all duration-200 vox-gradient-bg vox-btn-glow text-center block py-4"
            >
              Start Your Free 14-Day Trial
            </a>
            <span className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-4 w-full max-w-[420px] text-center">No credit card required.</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative" style={{ width: "280px", maxWidth: "100%" }}>
              {/* Gradient border wrap */}
              <div className="rounded-[46px] p-[2px]" style={{ background: "linear-gradient(145deg, #7c3aed 0%, #1c1c2e 40%, #2563eb 100%)" }}>
                <div className="relative rounded-[44px] overflow-hidden" style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-purple-lg)" }}>
                  <div className="relative flex justify-center pt-3 pb-1">
                    <div className="w-[90px] h-[26px] rounded-full bg-black" />
                  </div>
                  <div className="flex items-center justify-between px-7 pb-2">
                    <span className="text-[11px] text-white/60 font-semibold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="w-[20px] h-[9px] rounded-[2px] border border-white/40 flex items-center p-[1px]">
                        <div className="w-full h-full rounded-[1px] bg-white/60" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center pt-4 pb-3">
                    <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(124,58,237,0.15)" }}>
                      <Headphones className="w-7 h-7 text-[var(--purple-light)]" />
                    </div>
                    <span className="text-[17px] font-bold text-white">Voxalio AI</span>
                    <span className="text-[var(--text-sm)] text-[var(--text-secondary)] mt-0.5">{fmtTime(timer)}</span>
                  </div>
                  <div className="flex justify-center gap-4 px-5 pb-4">
                    {controlBtns.map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1">
                        <div className="w-[44px] h-[44px] rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <b.icon className="w-[18px] h-[18px] text-white/50" />
                        </div>
                        <span className="text-[10px] text-[var(--text-secondary)]">{b.label}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#ef4444] flex items-center justify-center">
                        <PhoneOff className="w-[18px] h-[18px] text-white" />
                      </div>
                      <span className="text-[10px] text-[var(--text-secondary)]">End</span>
                    </div>
                  </div>
                  <div ref={transcriptRef} className="mx-4 mb-3 px-3 py-3 overflow-y-auto" style={{ height: "160px", scrollbarWidth: "thin" }}>
                    {displayedText.map((line, i) => (
                      <p key={i} className="text-[var(--text-xs)] leading-[1.5] mb-3">
                        <span className="font-bold" style={{ color: line.labelColor }}>{line.label}</span>{" "}
                        <span className="text-white/70">{line.text}</span>
                        {i === displayedText.length - 1 && line.text.length < TRANSCRIPT[i]?.text.length && (
                          <span className="inline-block w-[2px] h-3 bg-[var(--purple-light)] ml-0.5 align-text-bottom animate-pulse" />
                        )}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-center pb-3">
                    <div className="w-[100px] h-[4px] rounded-full bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Mic, Grid3X3, Volume2, PhoneOff, Headphones } from "lucide-react";

const TRANSCRIPT = [
  { label: "[AI] Voxalio:", labelColor: "#2563eb", text: "Hi! Thanks for calling Apex Dynamics. How can I help you today?" },
  { label: "[Caller] Client:", labelColor: "#0f172a", text: "Hi, I'm interested in your marketing services. Can you tell me more about your packages?" },
  { label: "[AI] Voxalio:", labelColor: "#2563eb", text: "Of course! We offer three main tiers: Starter, Growth, and Premium. The Growth package is our most popular for businesses looking to scale quickly. What specific goals do you have?" },
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
    <section style={{ background: "#f8fafc" }} className="w-full py-20 md:py-32">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <h2 className="font-display font-800 text-[#0f172a] leading-[1.1]" style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              Never miss a call.
              <br />Always serve
              <br />the customer.
            </h2>
            <p className="text-[#64748b] text-[16px] leading-[1.7] mb-10 mt-6 max-w-[420px]">
              Voxalio AI answers instantly, captures leads, and handles inquiries 24/7. Empower your business with an always-on front desk that feels authentically human.
            </p>
            <a
              href="#contact"
              className="w-full max-w-[420px] rounded-lg font-display font-600 text-white text-[15px] transition-all hover:bg-[#1d4ed8] bg-[#2563eb] text-center block py-4"
            >
              Start Your Free 14-Day Trial
            </a>
            <span className="text-[13px] text-[#94a3b8] mt-4 w-full max-w-[420px] text-center">No credit card required.</span>
          </motion.div>

          {/* Right — iPhone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative" style={{ width: "280px", maxWidth: "100%" }}>
              <div className="relative rounded-[46px] overflow-hidden" style={{ background: "linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 100%)", padding: "4px", boxShadow: "0 40px 100px rgba(0,0,0,0.2)" }}>
                <div className="relative rounded-[42px] overflow-hidden bg-white">
                  {/* Dynamic Island */}
                  <div className="relative flex justify-center pt-3 pb-1">
                    <div className="w-[90px] h-[26px] rounded-full bg-black" />
                  </div>
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-7 pb-2">
                    <span className="text-[11px] text-[#1c1c1e] font-semibold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      <div className="flex items-center gap-0.5">
                        <div className="w-[20px] h-[9px] rounded-[2px] border border-[#1c1c1e]/80 flex items-center p-[1px]">
                          <div className="w-full h-full rounded-[1px] bg-[#1c1c1e]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Call UI */}
                  <div className="flex flex-col items-center pt-4 pb-3">
                    <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-3" style={{ background: "#eef2ff" }}>
                      <Headphones className="w-7 h-7 text-[#2563eb]" />
                    </div>
                    <span className="text-[17px] font-bold text-[#0f172a]">Voxalio AI</span>
                    <span className="text-[13px] text-[#94a3b8] mt-0.5">{fmtTime(timer)}</span>
                  </div>
                  {/* Controls */}
                  <div className="flex justify-center gap-4 px-5 pb-4">
                    {controlBtns.map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1">
                        <div className="w-[44px] h-[44px] rounded-xl bg-[#f1f5f9] flex items-center justify-center">
                          <b.icon className="w-[18px] h-[18px] text-[#475569]" />
                        </div>
                        <span className="text-[10px] text-[#94a3b8]">{b.label}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#ef4444] flex items-center justify-center">
                        <PhoneOff className="w-[18px] h-[18px] text-white" />
                      </div>
                      <span className="text-[10px] text-[#94a3b8]">End</span>
                    </div>
                  </div>
                  {/* Transcript */}
                  <div ref={transcriptRef} className="mx-4 mb-3 px-3 py-3 overflow-y-auto" style={{ height: "160px", scrollbarWidth: "thin" }}>
                    {displayedText.map((line, i) => (
                      <p key={i} className="text-[12px] leading-[1.5] mb-3">
                        <span className="font-bold" style={{ color: line.labelColor }}>{line.label}</span>{" "}
                        <span className="text-[#334155]">{line.text}</span>
                        {i === displayedText.length - 1 && line.text.length < TRANSCRIPT[i]?.text.length && (
                          <span className="inline-block w-[2px] h-3 bg-[#0f172a] ml-0.5 align-text-bottom animate-pulse" />
                        )}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-center pb-3">
                    <div className="w-[100px] h-[4px] rounded-full bg-[#1c1c1e]/20" />
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

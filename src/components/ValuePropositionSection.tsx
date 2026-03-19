import { useState, useEffect, useRef, useCallback } from "react";
import { Phone, Mic, Grid3X3, Volume2, PhoneOff } from "lucide-react";

const TRANSCRIPT = [
  {
    label: "[Caller Client]",
    labelColor: "#0f172a",
    text: "Hi, I'm interested in your marketing services. Can you tell me more about your packages?",
  },
  {
    label: "[AI Voxalio]",
    labelColor: "#0ea5e9",
    text: "Of course! We offer three main tiers: Starter, Growth, and Premium. The Growth package is our most popular for businesses looking to scale quickly. What specific goals do you have?",
  },
];

const CHAR_SPEED = 35;
const PAUSE_AFTER = 2000;

const ValuePropositionSection = () => {
  const [timer, setTimer] = useState(14);
  const [displayedText, setDisplayedText] = useState<{ label: string; labelColor: string; text: string }[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    const iv = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

  // Typewriter
  const runTypewriter = useCallback(() => {
    let cancelled = false;
    const lines: typeof displayedText = [];

    const typeChar = (lineIdx: number, charIdx: number, resolve: () => void) => {
      if (cancelled) return;
      const line = TRANSCRIPT[lineIdx];
      if (charIdx > line.text.length) {
        resolve();
        return;
      }
      lines[lineIdx] = { label: line.label, labelColor: line.labelColor, text: line.text.slice(0, charIdx) };
      setDisplayedText([...lines]);
      setTimeout(() => {
        if (transcriptRef.current) {
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
        }
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

  useEffect(() => {
    return runTypewriter();
  }, [runTypewriter]);

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  const controlBtns = [
    { icon: Mic, label: "Mute" },
    { icon: Grid3X3, label: "Keypad" },
    { icon: Volume2, label: "Speaker" },
  ];

  return (
    <section style={{ background: "#eaf0fb" }} className="w-full">
      <div className="py-[60px] px-6">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-10 items-center">
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <span className="text-[14px] font-semibold text-[#0f172a] mb-4">Voxalio</span>
            <h2
              className="font-extrabold text-[#0f172a] leading-[1.1] mb-5"
              style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
            >
              Never miss a call.
              <br />
              Always serve
              <br />
              the customer.
            </h2>
            <p className="text-[#64748b] text-[15px] leading-[1.7] mb-8 max-w-[380px]">
              Voxalio AI answers instantly, captures leads, and handles inquiries 24/7. Empower your business with an always-on front desk that feels authentically human.
            </p>
            <button
              className="w-full rounded-xl font-semibold text-white text-[15px] transition-opacity hover:opacity-90"
              style={{ background: "#0f172a", padding: "16px 28px" }}
            >
              Start Your Free 14-Day Trial
            </button>
            <span className="text-[13px] text-[#94a3b8] mt-3">No credit card required.</span>
          </div>

          {/* RIGHT — iPhone */}
          <div className="flex justify-center">
            <div
              className="w-[280px] max-[768px]:w-[240px] rounded-[40px] bg-white overflow-hidden"
              style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-3 pb-1">
                <span className="text-[11px] text-[#94a3b8] font-medium">9:41</span>
                <div className="flex gap-1 items-center">
                  <div className="w-[14px] h-[10px] rounded-sm border border-[#94a3b8]" />
                </div>
              </div>

              {/* Call UI */}
              <div className="flex flex-col items-center pt-5 pb-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                  style={{ background: "#0ea5e9" }}
                >
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <span className="text-[16px] font-bold text-[#0f172a]">Voxalio AI</span>
                <span className="text-[12px] text-[#94a3b8] mt-0.5">{fmtTime(timer)}</span>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 px-4 pb-4">
                {controlBtns.map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
                      <b.icon className="w-4 h-4 text-[#64748b]" />
                    </div>
                    <span className="text-[10px] text-[#94a3b8]">{b.label}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-[#ef4444] flex items-center justify-center">
                    <PhoneOff className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-[10px] text-[#94a3b8]">End Call</span>
                </div>
              </div>

              {/* Transcript */}
              <div
                ref={transcriptRef}
                className="mx-4 mb-5 px-3 py-3 rounded-xl overflow-y-auto"
                style={{
                  height: "140px",
                  background: "#f8fafc",
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                {displayedText.map((line, i) => (
                  <p key={i} className="text-[12px] leading-[1.6] mb-2">
                    <span className="font-bold" style={{ color: line.labelColor }}>
                      {line.label}
                    </span>
                    :{" "}
                    <span className="text-[#334155]">{line.text}</span>
                    {i === displayedText.length - 1 && line.text.length < TRANSCRIPT[i]?.text.length && (
                      <span className="inline-block w-[2px] h-3 bg-[#0ea5e9] ml-0.5 align-text-bottom animate-pulse" />
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;

import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, Grid3X3, Volume2, PhoneOff, Headphones } from "lucide-react";

const TRANSCRIPT = [
  {
    label: "[AI] Voxalio:",
    labelColor: "#0f172a",
    text: "Hi! Thanks for calling Apex Dynamics. How can I help you today?",
  },
  {
    label: "[Caller] Client:",
    labelColor: "#0f172a",
    text: "Hi, I'm interested in your marketing services. Can you tell me more about your packages?",
  },
  {
    label: "[AI] Voxalio:",
    labelColor: "#0f172a",
    text: "Of course! We offer three main tiers: Starter, Growth, and Premium. The Growth package is our most popular for businesses looking to scale quickly. What specific goals do you have?",
  },
];

const CHAR_SPEED = 35;
const PAUSE_AFTER = 2000;

const ValuePropositionSection = () => {
  const [timer, setTimer] = useState(14);
  const [displayedText, setDisplayedText] = useState<{ label: string; labelColor: string; text: string }[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iv = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(iv);
  }, []);

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
    <section style={{ background: "#e2eaf4" }} className="w-full">
      <div className="py-[80px] px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-12 items-center min-h-[500px]">
          {/* LEFT */}
          <div className="flex flex-col items-start">
            <span className="text-[18px] font-bold text-[#0f172a] mb-5 italic">Voxalio</span>
            <h2
              className="font-extrabold text-[#0f172a] leading-[1.1] mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
            >
              Never miss a call.
              <br />
              Always serve
              <br />
              the customer.
            </h2>
            <p className="text-[#4a5568] text-[16px] leading-[1.7] mb-10 max-w-[420px]">
              Voxalio AI answers instantly, captures leads, and handles inquiries 24/7. Empower your business with an always-on front desk that feels authentically human.
            </p>
            <button
              className="w-full max-w-[420px] rounded-full font-semibold text-white text-[16px] transition-all hover:opacity-90 hover:shadow-lg"
              style={{ background: "#1a3a6b", padding: "18px 36px" }}
            >
              Start Your Free 14-Day Trial
            </button>
            <span className="text-[13px] text-[#94a3b8] mt-4 w-full max-w-[420px] text-center">No credit card required.</span>
          </div>

          {/* RIGHT — iPhone 14 Pro */}
          <div className="flex justify-center md:justify-end">
            <div
              className="relative vp-phone-wrapper"
              style={{
                width: "300px",
                maxWidth: "100%",
              }}
            >
              {/* Device frame */}
              <div
                className="relative rounded-[50px] overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 40%, #2c2c2e 100%)",
                  padding: "4px",
                  boxShadow: "0 60px 120px rgba(0,0,0,0.25), 0 20px 40px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                {/* Side buttons — left */}
                <div className="absolute -left-[3px] top-[100px] w-[3px] h-[28px] rounded-l-sm" style={{ background: "#2c2c2e" }} />
                <div className="absolute -left-[3px] top-[145px] w-[3px] h-[50px] rounded-l-sm" style={{ background: "#2c2c2e" }} />
                <div className="absolute -left-[3px] top-[205px] w-[3px] h-[50px] rounded-l-sm" style={{ background: "#2c2c2e" }} />
                {/* Side button — right */}
                <div className="absolute -right-[3px] top-[155px] w-[3px] h-[65px] rounded-r-sm" style={{ background: "#2c2c2e" }} />

                {/* Screen */}
                <div className="relative rounded-[46px] overflow-hidden bg-white">
                  {/* Dynamic Island */}
                  <div className="relative flex justify-center pt-3 pb-1">
                    <div
                      className="w-[90px] h-[26px] rounded-full bg-black"
                      style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
                    />
                  </div>

                  {/* Status bar */}
                  <div className="flex items-center justify-between px-7 pb-2">
                    <span className="text-[11px] text-[#1c1c1e] font-semibold">9:41</span>
                    <div className="flex gap-1.5 items-center">
                      {/* Signal bars */}
                      <svg width="16" height="10" viewBox="0 0 16 10" className="opacity-80">
                        <rect x="0" y="7" width="3" height="3" rx="0.5" fill="#1c1c1e"/>
                        <rect x="4" y="5" width="3" height="5" rx="0.5" fill="#1c1c1e"/>
                        <rect x="8" y="3" width="3" height="7" rx="0.5" fill="#1c1c1e"/>
                        <rect x="12" y="0" width="3" height="10" rx="0.5" fill="#1c1c1e"/>
                      </svg>
                      {/* WiFi */}
                      <svg width="13" height="10" viewBox="0 0 13 10" className="opacity-80">
                        <path d="M6.5 9a1 1 0 110 .01M3.5 7a4.5 4.5 0 016 0M1 4.5a7.5 7.5 0 0111 0" stroke="#1c1c1e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                      </svg>
                      {/* Battery */}
                      <div className="flex items-center gap-0.5">
                        <div className="w-[20px] h-[9px] rounded-[2px] border border-[#1c1c1e]/80 flex items-center p-[1px]">
                          <div className="w-full h-full rounded-[1px] bg-[#1c1c1e]" />
                        </div>
                        <div className="w-[1.5px] h-[4px] rounded-r-sm bg-[#1c1c1e]/80" />
                      </div>
                    </div>
                  </div>

                  {/* Call UI */}
                  <div className="flex flex-col items-center pt-4 pb-3">
                    <div
                      className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-3"
                      style={{ background: "#e8f0f8" }}
                    >
                      <Headphones className="w-8 h-8 text-[#0f172a]" />
                    </div>
                    <span className="text-[18px] font-bold text-[#0f172a]">Voxalio AI</span>
                    <span className="text-[13px] text-[#94a3b8] mt-0.5">{fmtTime(timer)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-5 px-5 pb-4">
                    {controlBtns.map((b) => (
                      <div key={b.label} className="flex flex-col items-center gap-1">
                        <div className="w-[44px] h-[44px] rounded-xl bg-[#e8ecf0] flex items-center justify-center">
                          <b.icon className="w-[18px] h-[18px] text-[#3a3a3c]" />
                        </div>
                        <span className="text-[10px] text-[#94a3b8]">{b.label}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-[44px] h-[44px] rounded-full bg-[#ef4444] flex items-center justify-center">
                        <PhoneOff className="w-[18px] h-[18px] text-white" />
                      </div>
                      <span className="text-[10px] text-[#94a3b8]">End Call</span>
                    </div>
                  </div>

                  {/* Transcript */}
                  <div
                    ref={transcriptRef}
                    className="mx-4 mb-3 px-3 py-3 overflow-y-auto"
                    style={{
                      height: "180px",
                      scrollbarWidth: "thin",
                      scrollbarColor: "#cbd5e1 transparent",
                    }}
                  >
                    {displayedText.map((line, i) => (
                      <p key={i} className="text-[12px] leading-[1.5] mb-3">
                        <span className="font-bold" style={{ color: line.labelColor }}>
                          {line.label}
                        </span>{" "}
                        <span className="text-[#334155]">{line.text}</span>
                        {i === displayedText.length - 1 && line.text.length < TRANSCRIPT[i]?.text.length && (
                          <span className="inline-block w-[2px] h-3 bg-[#0f172a] ml-0.5 align-text-bottom animate-pulse" />
                        )}
                      </p>
                    ))}
                  </div>

                  {/* Home indicator */}
                  <div className="flex justify-center pb-3">
                    <div className="w-[100px] h-[4px] rounded-full bg-[#1c1c1e]/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 768px) {
          .vp-phone-wrapper {
            transform: none !important;
            width: 260px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ValuePropositionSection;

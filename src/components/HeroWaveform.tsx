import { useEffect, useRef } from "react";

const BAR_COUNT = 64;

const HeroWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Frequencies & phases for each bar to make them look organic
    const bars = Array.from({ length: BAR_COUNT }, (_, i) => ({
      freq1: 0.8 + Math.random() * 1.2,
      freq2: 0.3 + Math.random() * 0.7,
      freq3: 0.15 + Math.random() * 0.4,
      phase1: Math.random() * Math.PI * 2,
      phase2: Math.random() * Math.PI * 2,
      phase3: Math.random() * Math.PI * 2,
      amp1: 0.3 + Math.random() * 0.4,
      amp2: 0.15 + Math.random() * 0.25,
      amp3: 0.1 + Math.random() * 0.15,
      // Envelope based on position (center bars taller)
      envelope: 0.3 + 0.7 * Math.pow(Math.sin((i / (BAR_COUNT - 1)) * Math.PI), 0.8),
    }));

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const gap = 3;
      const barWidth = (width - (BAR_COUNT - 1) * gap) / BAR_COUNT;
      const maxBarHeight = height * 0.85;
      const centerY = height / 2;

      bars.forEach((b, i) => {
        const time = t / 1000;
        const val =
          b.amp1 * Math.sin(time * b.freq1 + b.phase1) +
          b.amp2 * Math.sin(time * b.freq2 + b.phase2) +
          b.amp3 * Math.sin(time * b.freq3 + b.phase3);

        const normalized = (val + 1) / 2; // 0–1
        const h = Math.max(4, normalized * maxBarHeight * b.envelope);

        const x = i * (barWidth + gap);

        // Gradient from blue to lighter blue
        const grad = ctx.createLinearGradient(x, centerY - h / 2, x, centerY + h / 2);
        grad.addColorStop(0, "rgba(96, 165, 250, 0.95)");
        grad.addColorStop(0.5, "rgba(37, 99, 235, 0.9)");
        grad.addColorStop(1, "rgba(96, 165, 250, 0.95)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, centerY - h / 2, barWidth, h, 2);
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center h-full w-full">
      {/* Label */}
      <div className="flex items-center gap-2 pt-8 pb-4 md:pt-12 md:pb-6">
        {/* Tiny waveform icon */}
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" className="opacity-60">
          <rect x="0" y="4" width="2" height="6" rx="1" fill="#60a5fa" />
          <rect x="4" y="2" width="2" height="10" rx="1" fill="#60a5fa" />
          <rect x="8" y="0" width="2" height="14" rx="1" fill="#60a5fa" />
          <rect x="12" y="3" width="2" height="8" rx="1" fill="#60a5fa" />
          <rect x="16" y="5" width="2" height="4" rx="1" fill="#60a5fa" />
        </svg>
        <span
          className="text-[11px] md:text-[12px] font-medium uppercase text-white/50"
          style={{ letterSpacing: "0.15em" }}
        >
          Voice Core AI
        </span>
      </div>

      {/* Canvas waveform */}
      <div className="flex-1 w-full px-6 md:px-10">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Bottom label */}
      <p
        className="pb-8 md:pb-12 pt-4 md:pt-6 text-white font-bold text-[15px] md:text-[18px] uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        Live Voice Conversation
      </p>
    </div>
  );
};

export default HeroWaveform;

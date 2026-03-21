import { useRef, useEffect, useCallback } from "react";

const BAR_COUNT = 60;
const CANVAS_PADDING_X = 10;
const CANVAS_PADDING_Y = 4;

const HeroWaveform = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1, y: -1, inside: false });
  const smoothMouseRef = useRef({ x: -1, y: -1, inside: false });
  const rafRef = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const sm = smoothMouseRef.current;
    const m = mouseRef.current;
    const lerpSpeed = 0.08;
    sm.x = m.inside ? lerp(sm.x < 0 ? m.x : sm.x, m.x, lerpSpeed) : lerp(sm.x, w / 2, 0.03);
    sm.y = m.inside ? lerp(sm.y < 0 ? m.y : sm.y, m.y, lerpSpeed) : lerp(sm.y, h / 2, 0.03);
    sm.inside = m.inside;

    ctx.clearRect(0, 0, w, h);

    const time = performance.now() / 1000;
    const drawW = w - CANVAS_PADDING_X * 2;
    const drawH = h - CANVAS_PADDING_Y * 2;
    const centerY = h / 2;
    const barW = (drawW / BAR_COUNT) * 0.6;
    const gap = drawW / BAR_COUNT;

    const speedMod = 1.0;
    const hoverBoost = sm.inside ? 1.15 : 1.0;

    for (let i = 0; i < BAR_COUNT; i++) {
      const x = CANVAS_PADDING_X + i * gap + gap / 2 - barW / 2;
      const pos = i / BAR_COUNT;
      const envelope =
        0.55 * Math.exp(-Math.pow((pos - 0.18) / 0.1, 2)) +
        0.8 * Math.exp(-Math.pow((pos - 0.5) / 0.14, 2)) +
        0.45 * Math.exp(-Math.pow((pos - 0.82) / 0.1, 2)) +
        0.12;

      const freq1 = 0.8 + (i % 7) * 0.15;
      const freq2 = 1.2 + (i % 5) * 0.2;
      const phase1 = i * 0.4;
      const phase2 = i * 0.25 + 1.5;
      const wave =
        0.5 +
        0.3 * Math.sin(time * speedMod * freq1 + phase1) +
        0.2 * Math.sin(time * speedMod * freq2 + phase2);

      let proximityBoost = 0;
      if (sm.x >= 0) {
        const barCenter = CANVAS_PADDING_X + i * gap + gap / 2;
        const dist = Math.abs(sm.x - barCenter);
        const sigma = drawW * 0.12;
        proximityBoost = 0.35 * Math.exp(-(dist * dist) / (2 * sigma * sigma));
      }

      const amplitude = Math.min((envelope * wave + proximityBoost) * hoverBoost, 1.0);
      const barH = amplitude * (drawH / 2) * 0.92;

      // Blue gradient
      const grad = ctx.createLinearGradient(x, centerY - barH, x, centerY + barH);
      grad.addColorStop(0, "#0ea5e9");
      grad.addColorStop(0.4, "#2563eb");
      grad.addColorStop(0.5, "#2563eb");
      grad.addColorStop(0.6, "#2563eb");
      grad.addColorStop(1, "#0ea5e9");

      ctx.fillStyle = grad;

      const r = Math.min(barW / 2, 2.5);
      ctx.beginPath();
      roundedRect(ctx, x, centerY - barH, barW, barH, r);
      ctx.fill();
      ctx.beginPath();
      roundedRect(ctx, x, centerY, barW, barH, r);
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { ...mouseRef.current, inside: false };
  };

  return (
    <div
      className="w-full max-w-[600px] h-[80px] sm:h-[120px] mx-auto cursor-crosshair select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  r = Math.min(r, w / 2, Math.abs(h) / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default HeroWaveform;

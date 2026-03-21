import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { PlayCircle } from "lucide-react";
import HeroWaveform from "@/components/HeroWaveform";
import MagicRings from "@/components/MagicRings";
import { useRef, useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.3 + i * 0.12 },
  }),
};

const particles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: 2 + Math.random() * 2,
  left: 5 + Math.random() * 90,
  startTop: 100 + Math.random() * 20,
  duration: 8 + Math.random() * 12,
  delay: Math.random() * 10,
  opacity: 0.3 + Math.random() * 0.3,
  color: Math.random() > 0.5 ? "rgba(124,58,237," : "rgba(255,255,255,",
}));

// Typewriter effect for "Always."
const TypewriterWord = ({ word, className }: { word: string; className: string }) => {
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) { setDisplay(word); return; }
    let timeout: ReturnType<typeof setTimeout>;
    let idx = 0;
    let isDeleting = false;

    const tick = () => {
      if (!isDeleting) {
        idx++;
        setDisplay(word.slice(0, idx));
        if (idx >= word.length) {
          setTyping(false);
          timeout = setTimeout(() => { isDeleting = true; setTyping(true); tick(); }, 2000);
          return;
        }
        timeout = setTimeout(tick, 120);
      } else {
        idx--;
        setDisplay(word.slice(0, idx));
        if (idx <= 0) {
          isDeleting = false;
          timeout = setTimeout(tick, 500);
          return;
        }
        timeout = setTimeout(tick, 60);
      }
    };

    timeout = setTimeout(tick, 1500);
    return () => clearTimeout(timeout);
  }, [word, reduced]);

  return (
    <span className={className}>
      {display}
      <span className="inline-block w-[3px] h-[0.85em] ml-1 align-text-bottom animate-pulse" style={{ background: "var(--purple-light)" }} />
    </span>
  );
};

// Magnetic button
const MagneticButton = ({ children, className, style, href }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; href: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      const pull = (80 - dist) / 80;
      ref.current.style.transform = `translate(${dx * pull * 0.3}px, ${dy * pull * 0.3}px)`;
    }
  }, [reduced]);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      className={className}
      style={{ ...style, transition: "transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </a>
  );
};

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollY } = useScroll();
  const headlineY = useTransform(scrollY, [0, 600], [0, 120]);
  const subtextY = useTransform(scrollY, [0, 600], [0, 60]);
  const glowY = useTransform(scrollY, [0, 600], [0, 200]);

  const trustItems = lang === "de"
    ? ["✓ Einrichtung in 10 Minuten", "✓ DSGVO-konform", "✓ Gehostet in Deutschland"]
    : ["✓ Setup in 10 minutes", "✓ GDPR Compliant", "✓ Hosted in Germany"];

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "var(--bg-dark)" }}>
      {/* MagicRings WebGL background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <MagicRings
          color="#7c3aed"
          colorTwo="#2563eb"
          ringCount={6}
          speed={0.6}
          attenuation={10}
          lineThickness={2}
          baseRadius={0.35}
          radiusStep={0.1}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.05}
          rotation={0}
          ringGap={1.5}
          fadeIn={0.7}
          fadeOut={0.6}
          followMouse
          mouseInfluence={0.15}
          hoverScale={1.1}
          parallax={0.03}
        />
      </div>

      {/* Purple radial glow with parallax */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse 100% 50% at 50% -5%, rgba(124,58,237,0.2) 0%, transparent 65%)",
          y: reduced ? 0 : glowY,
        }}
      />

      {/* Aurora blobs */}
      <div className="absolute top-[10%] left-[15%] w-[400px] h-[300px] rounded-full pointer-events-none opacity-[0.08] z-[1]" style={{ background: "rgba(124,58,237,0.4)", filter: "blur(80px)", animation: reduced ? "none" : "aurora1 20s ease-in-out infinite" }} />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[400px] rounded-full pointer-events-none opacity-[0.05] z-[1]" style={{ background: "rgba(37,99,235,0.4)", filter: "blur(80px)", animation: reduced ? "none" : "aurora2 25s ease-in-out infinite" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid z-[1]" />

      {/* Floating particles rising */}
      {!reduced && particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size,
            height: p.size,
            background: `${p.color}${p.opacity})`,
            left: `${p.left}%`,
            bottom: `-${p.size}px`,
            animation: `particle-rise ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center flex flex-col items-center" style={{ paddingTop: "clamp(140px, 16vh, 200px)", paddingBottom: "clamp(80px, 10vh, 120px)" }}>
        {/* Badge */}
        <motion.div custom={0} initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
          <div className="relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 overflow-hidden" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)" }}>
            <div className="absolute inset-0 vox-shimmer" />
            <span className="relative w-2 h-2 rounded-full bg-[var(--purple-light)] animate-pulse" />
            <span className="relative text-[13px] text-[var(--purple-light)]">{t("hero.badge")}</span>
          </div>
        </motion.div>

        {/* Headline with parallax */}
        <motion.div style={{ y: reduced ? 0 : headlineY }}>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display font-extrabold text-[var(--text-primary)] leading-[1.0]"
            style={{ fontSize: "clamp(42px, 6vw, var(--text-hero))", letterSpacing: "-0.04em" }}
          >
            {lang === "de" ? (
              <>
                Ihre Telefone klingeln.
                <br />
                Voxalio antwortet.
                <br />
                <TypewriterWord word="Immer." className="gradient-text" />
              </>
            ) : (
              <>
                Your phones ring.
                <br />
                Voxalio answers.
                <br />
                <TypewriterWord word="Always." className="gradient-text" />
              </>
            )}
          </motion.h1>
        </motion.div>

        {/* Subtext with parallax */}
        <motion.div style={{ y: reduced ? 0 : subtextY }}>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-[var(--text-secondary)] leading-[1.7] max-w-[560px]"
            style={{ fontSize: "var(--text-md)", marginTop: "var(--space-5)" }}
          >
            {t("hero.subtitle")}
          </motion.p>
        </motion.div>

        {/* Magnetic Buttons */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ marginTop: "var(--space-6)" }}
        >
          <MagneticButton
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-[10px] text-white font-display font-semibold text-[15px] vox-gradient-bg vox-btn-glow"
          >
            {t("cta.button")}
          </MagneticButton>
          <MagneticButton
            href="#booking"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] text-white font-medium text-[15px] transition-all duration-200 hover:border-[rgba(124,58,237,0.5)] hover:bg-[rgba(124,58,237,0.08)]"
            style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
          >
            <PlayCircle className="w-5 h-5" />
            {lang === "de" ? "Demo ansehen" : "Watch Demo"}
          </MagneticButton>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[var(--text-sm)] text-[var(--text-muted)]"
          style={{ marginTop: "var(--space-5)" }}
        >
          {trustItems.map((item, i) => (
            <span key={i}>
              {item}
              {i < trustItems.length - 1 && <span className="ml-4">·</span>}
            </span>
          ))}
        </motion.div>

        {/* Waveform card with 3D tilt */}
        <motion.div custom={5} initial="hidden" animate="visible" variants={fadeUp} style={{ marginTop: "var(--space-10)" }} className="w-full">
          <TiltCard>
            <div
              className="max-w-[700px] mx-auto rounded-[var(--radius-lg)] px-8 py-8 md:px-12 md:py-10"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-normal)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 80px rgba(124,58,237,0.1)",
              }}
            >
              <span className="flex items-center justify-center gap-2 mb-4 text-[var(--text-xs)] text-[var(--purple-light)] uppercase tracking-[0.15em] font-medium">
                <span className="w-2 h-2 rounded-full bg-[var(--purple-light)] animate-pulse" />
                {lang === "de" ? "LIVE SPRACHGESPRÄCH" : "LIVE VOICE CONVERSATION"}
              </span>
              <HeroWaveform />
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

// 3D Tilt card component
const TiltCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }, [reduced]);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.3s ease-out", willChange: "transform" }}
    >
      {children}
    </div>
  );
};

export default HeroSection;

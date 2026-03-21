import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import voxalioLogo from "@/assets/voxalio-logo.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      setProgress(1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(tick);
      else setTimeout(onComplete, 300);
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#ffffff" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Ambient blue glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, rgba(59,130,246,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 220,
          height: 220,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          border: "1px solid rgba(37,99,235,0.1)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Second ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 280,
          height: 280,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          border: "1px solid rgba(37,99,235,0.06)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Arc accent */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 220,
          height: 220,
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#2563eb",
          borderRightColor: "rgba(37,99,235,0.3)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        >
          <motion.img
            src={voxalioLogo}
            alt="Voxalio"
            className="h-12 w-auto relative z-10 drop-shadow-[0_0_20px_rgba(37,99,235,0.2)]"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="relative"
          style={{ width: 48, height: 48 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" className="rotate-[-90deg]">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="2" />
            <motion.circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="url(#progressGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={125.66}
              strokeDashoffset={125.66 * (1 - progress)}
            />
            <defs>
              <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              color: "rgba(37,99,235,0.6)",
              letterSpacing: "-0.02em",
            }}
          >
            {Math.round(progress * 100)}
          </span>
        </motion.div>

        <motion.p
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ color: "rgba(100,116,139,0.5)", fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Loading experience
        </motion.p>
      </div>
    </motion.div>
  );
};

export default function LoadingGate({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}

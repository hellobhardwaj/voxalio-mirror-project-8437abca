import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import voxalioLogo from "@/assets/voxalio-logo.png";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#07050f" }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Animated purple ambient glow — breathes */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(124,58,237,0.22) 0%, rgba(37,99,235,0.08) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Secondary glow for depth */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 200,
          height: 200,
          background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Rotating ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          border: "1px solid transparent",
          borderTopColor: "rgba(124,58,237,0.4)",
          borderRightColor: "rgba(37,99,235,0.2)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex flex-col items-center gap-8 relative z-10">
        {/* Logo with pulse */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Pulse ring behind logo */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-2xl pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.img
            src={voxalioLogo}
            alt="Voxalio"
            className="h-14 w-auto relative z-10"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-52 h-[2px] rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
          />
        </motion.div>

        {/* Subtle text */}
        <motion.p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(148,163,184,0.5)", fontFamily: "'DM Sans', sans-serif" }}
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

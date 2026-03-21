import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import voxalioLogo from "@/assets/voxalio-logo.png";

/* ── Animated orb that morphs ── */
function MorphOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.15;
    ref.current.rotation.y = clock.getElapsedTime() * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.8}>
        <icosahedronGeometry args={[1, 8]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

/* ── Orbiting ring particles ── */
function OrbitalRing({ radius, speed, count, color }: { radius: number; speed: number; count: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count, radius]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* ── Floating particles field ── */
function ParticleField() {
  const count = 200;
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#a855f7" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/* ── 3D Scene ── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
      <pointLight position={[-5, -3, 3]} intensity={0.6} color="#2563eb" />
      <pointLight position={[0, 3, -5]} intensity={0.4} color="#06b6d4" />
      <MorphOrb />
      <OrbitalRing radius={3} speed={0.3} count={80} color="#7c3aed" />
      <OrbitalRing radius={3.8} speed={-0.2} count={60} color="#2563eb" />
      <OrbitalRing radius={4.5} speed={0.15} count={40} color="#06b6d4" />
      <ParticleField />
      <Stars radius={8} depth={30} count={800} factor={2} saturation={0.5} fade speed={0.5} />
    </>
  );
}

/* ── Loading Screen ── */
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ background: "#07050f" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            dpr={[1, 1.5]}
            style={{ background: "transparent" }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>

      {/* Overlay content */}
      <div className="flex flex-col items-center gap-8 relative z-10">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        >
          {/* Glow behind logo */}
          <div
            className="absolute -inset-8 pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <motion.img
            src={voxalioLogo}
            alt="Voxalio"
            className="h-14 w-auto relative z-10 drop-shadow-[0_0_24px_rgba(124,58,237,0.5)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-52 h-[2px] rounded-full overflow-hidden backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.06)" }}
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #7c3aed, #2563eb, #06b6d4)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          />
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "rgba(148,163,184,0.4)", fontFamily: "'DM Sans', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Initializing AI
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

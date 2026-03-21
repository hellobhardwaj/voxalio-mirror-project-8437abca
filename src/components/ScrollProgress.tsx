import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left"
      style={{
        scaleX,
        height: "3px",
        background: "linear-gradient(90deg, #2563eb, #3b82f6, #0ea5e9)",
      }}
    />
  );
};

export default ScrollProgress;

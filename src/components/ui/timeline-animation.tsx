"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  className?: string;
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  className,
}: TimelineContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    root: timelineRef as React.RefObject<Element>,
    margin: "0px 0px -100px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 20, filter: "blur(8px)" }
      }
      transition={{
        duration: 0.5,
        delay: animationNum * 0.15,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

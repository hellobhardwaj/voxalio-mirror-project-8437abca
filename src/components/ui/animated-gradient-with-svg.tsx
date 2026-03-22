import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/hooks/use-debounced-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <svg className={cn("absolute inset-0 w-full h-full", blurClass)}>
        {colors.map((color, index) => (
          <circle
            key={index}
            cx="50%"
            cy="50%"
            r={circleSize * 0.45}
            fill={color}
            className="animate-background-gradient"
            style={
              {
                "--background-gradient-speed": `${randomInt(speed, speed + 5)}s`,
                "--background-gradient-delay": `${index * -3}s`,
                "--tx-1": Math.random() - 0.5,
                "--ty-1": Math.random() - 0.5,
                "--tx-2": Math.random() - 0.5,
                "--ty-2": Math.random() - 0.5,
                "--tx-3": Math.random() - 0.5,
                "--ty-3": Math.random() - 0.5,
                "--tx-4": Math.random() - 0.5,
                "--ty-4": Math.random() - 0.5,
                opacity: 0.6,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
};

export { AnimatedGradient };

import { ArrowRight } from "lucide-react";
import { useState, Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

export function HeroDitheringCard({
  badge,
  heading,
  headingAccent,
  description,
  buttonText,
  buttonHref,
}: {
  badge?: string;
  heading?: string;
  headingAccent?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div
        className="relative overflow-hidden rounded-3xl border border-border/40 shadow-xl transition-shadow duration-500"
        style={{
          boxShadow: isHovered
            ? "0 32px 80px rgba(37,99,235,0.15), 0 0 0 1px rgba(37,99,235,0.1)"
            : "0 20px 60px rgba(0,0,0,0.08)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dithering shader background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-accent/5" />}>
            <Dithering
              colorBack="#ffffff"
              colorFront="#2563eb"
              shape="sphere"
              type="4x4"
              size={2}
              speed={0.6}
              scale={0.5}
              style={{
                width: "100%",
                height: "100%",
                opacity: isHovered ? 0.12 : 0.07,
                transition: "opacity 0.5s ease",
              }}
            />
          </Suspense>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-16 md:py-20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              <span className="text-xs font-medium text-primary ml-1 font-display tracking-wide">
                {badge || "AI-Powered Voice Agent"}
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="font-display font-bold text-foreground text-3xl md:text-5xl leading-[1.1] tracking-tight max-w-2xl">
            {heading || "Your calls,"}{" "}
            <br />
            <span className="gradient-text">
              {headingAccent || "handled perfectly."}
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-muted-foreground text-sm md:text-base max-w-lg leading-relaxed">
            {description ||
              "Join 2,847 founders using the only AI that understands the nuance of your voice. Clean, precise, and uniquely yours."}
          </p>

          {/* Button */}
          <a
            href={buttonHref || "#contact"}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm transition-all duration-300 hover:gap-3 vox-btn-glow"
          >
            {buttonText || "Get Started"}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default HeroDitheringCard;

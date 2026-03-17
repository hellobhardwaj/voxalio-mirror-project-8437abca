import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const logos = [
  "TechCorp", "DataFlow", "CloudSync", "BrightAI", "NetWave", "SignalX", "PulseHQ",
  "Aethon", "Cortex", "Helix", "Nextera", "Quantis", "Velox", "Zephyr"
];

const LogoBar = () => {
  const { lang } = useLanguage();

  return (
    <section className="relative py-10 overflow-hidden bg-[hsl(var(--vox-dark))]">
      {/* Top & bottom subtle lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.2)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.2)] to-transparent" />

      {/* Edge fade masks */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        {/* Scrolling logos layer */}
        <div className="flex w-max animate-scroll-x items-center h-full">
          {[...logos, ...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="mx-8 md:mx-12 text-white/[0.12] font-medium text-[13px] tracking-[0.15em] uppercase whitespace-nowrap select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Pinned center social proof card */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-xl shadow-lg border border-border/60 px-5 py-3 flex items-center gap-4">
          {/* Overlapping avatars */}
          <div className="flex -space-x-2.5">
            {[testimonial1, testimonial2, testimonial3].map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-8 h-8 rounded-full object-cover border-2 border-card"
              />
            ))}
          </div>

          <div className="flex flex-col">
            <span className="text-foreground font-semibold text-[13px] tracking-[-0.01em] leading-tight">
              500+ {lang === "de" ? "Kunden" : "Customers"}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
              ))}
              <Star className="w-3 h-3 fill-amber-400/50 text-amber-400/50" />
              <span className="text-muted-foreground text-[11px] ml-1">Google & Trustpilot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoBar;

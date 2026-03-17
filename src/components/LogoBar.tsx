import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const LogoSVG = ({ children, width = 120 }: { children: React.ReactNode; width?: number }) => (
  <svg
    viewBox={`0 0 ${width} 32`}
    fill="currentColor"
    className="h-5 md:h-6 w-auto mx-7 md:mx-11 shrink-0 text-muted-foreground/35 select-none"
    aria-hidden
  >
    {children}
  </svg>
);

const logos = [
  // Synthex — geometric + wordmark
  <LogoSVG key="synthex" width={110}>
    <rect x="0" y="8" width="16" height="16" rx="3" opacity="0.7" />
    <rect x="4" y="4" width="16" height="16" rx="3" opacity="0.4" />
    <text x="26" y="23" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fontWeight="600" letterSpacing="-0.5">Synthex</text>
  </LogoSVG>,

  // Meridian — with circle icon
  <LogoSVG key="meridian" width={120}>
    <circle cx="10" cy="16" r="8" opacity="0.5" />
    <circle cx="10" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.8" />
    <text x="24" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="500" letterSpacing="0.5">MERIDIAN</text>
  </LogoSVG>,

  // Voltera — lightning bolt style
  <LogoSVG key="voltera" width={105}>
    <polygon points="8,4 2,18 9,18 6,28 16,14 9,14 14,4" opacity="0.6" />
    <text x="20" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="600" letterSpacing="-0.3">Voltera</text>
  </LogoSVG>,

  // Arcline — minimalist arc
  <LogoSVG key="arcline" width={100}>
    <path d="M2 24 Q10 2 18 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
    <text x="24" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="500" letterSpacing="0.3">arcline</text>
  </LogoSVG>,

  // Nexora — hexagon icon
  <LogoSVG key="nexora" width={105}>
    <polygon points="10,3 18,7 18,17 10,21 2,17 2,7" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.5" />
    <circle cx="10" cy="12" r="3" opacity="0.4" />
    <text x="24" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="600" letterSpacing="-0.3">Nexora</text>
  </LogoSVG>,

  // Pulseway — wave/signal
  <LogoSVG key="pulseway" width={120}>
    <path d="M2 16 Q6 8 10 16 Q14 24 18 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    <text x="24" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="13.5" fontWeight="500" letterSpacing="0.8">PULSEWAY</text>
  </LogoSVG>,

  // Stratos — stacked bars
  <LogoSVG key="stratos" width={105}>
    <rect x="2" y="18" width="14" height="3" rx="1" opacity="0.3" />
    <rect x="4" y="12" width="10" height="3" rx="1" opacity="0.5" />
    <rect x="6" y="6" width="6" height="3" rx="1" opacity="0.7" />
    <text x="22" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="600" letterSpacing="-0.2">Stratos</text>
  </LogoSVG>,

  // Kinetic — rotating square
  <LogoSVG key="kinetic" width={108}>
    <rect x="3" y="6" width="13" height="13" rx="2" transform="rotate(15 9.5 12.5)" opacity="0.4" />
    <rect x="5" y="8" width="9" height="9" rx="1.5" opacity="0.6" />
    <text x="22" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14" fontWeight="500" letterSpacing="0.4">Kinetic</text>
  </LogoSVG>,

  // Cloudra — cloud shape
  <LogoSVG key="cloudra" width={110}>
    <ellipse cx="11" cy="16" rx="9" ry="6" opacity="0.3" />
    <ellipse cx="8" cy="13" rx="5" ry="4" opacity="0.4" />
    <ellipse cx="15" cy="14" rx="4" ry="3" opacity="0.35" />
    <text x="24" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="14.5" fontWeight="600" letterSpacing="-0.3">Cloudra</text>
  </LogoSVG>,

  // Dataform — grid dots
  <LogoSVG key="dataform" width={118}>
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <circle key={`${r}-${c}`} cx={3 + c * 6} cy={7 + r * 6} r="1.8" opacity={0.3 + (r + c) * 0.08} />
      ))
    )}
    <text x="22" y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="13.5" fontWeight="500" letterSpacing="0.6">DATAFORM</text>
  </LogoSVG>,
];

const LogoBar = () => {
  const { lang } = useLanguage();

  const allLogos = [...logos, ...logos, ...logos];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Edge fade masks wrapping the scrolling logos */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="flex w-max animate-scroll-x items-center h-full">
          {allLogos.map((logo, i) => (
            <div key={i} className="shrink-0">
              {logo}
            </div>
          ))}
        </div>
      </div>

      {/* Pinned center social proof card */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-xl shadow-lg border border-border/60 px-5 py-3 flex items-center gap-4">
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

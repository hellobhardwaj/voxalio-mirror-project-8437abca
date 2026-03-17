import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { Sparkles } from "@/components/ui/sparkles";

const testimonials = [
  {
    quoteKey: "test.quote",
    authorKey: "test.author",
    initials: ["MK", "TR", "SL"],
  },
  {
    quoteEn: "\"Voxalio cut our response time by 80%. Our customers don't even realize they're talking to an AI — the voice quality is that good. It's been a game-changer for our support team.\"",
    quoteDe: "\"Voxalio hat unsere Antwortzeit um 80% reduziert. Unsere Kunden merken nicht einmal, dass sie mit einer KI sprechen — die Sprachqualität ist so gut. Es war ein Game-Changer für unser Support-Team.\"",
    authorEn: "— Thomas R., DataFlow GmbH",
    authorDe: "— Thomas R., DataFlow GmbH",
    initials: ["TR", "AW", "JB"],
  },
  {
    quoteEn: "\"We replaced our entire after-hours answering service with Voxalio. It handles appointment scheduling, transfers urgent calls, and costs a fraction of what we used to pay.\"",
    quoteDe: "\"Wir haben unseren gesamten Anrufbeantworter-Service durch Voxalio ersetzt. Es übernimmt Terminplanung, leitet dringende Anrufe weiter und kostet nur einen Bruchteil.\"",
    authorEn: "— Sarah L., CloudSync Medical",
    authorDe: "— Sarah L., CloudSync Medical",
    initials: ["SL", "PH", "KM"],
  },
  {
    quoteEn: "\"The integration with our CRM was seamless. Every call is logged, transcribed, and categorized automatically. Our sales team has never been more productive.\"",
    quoteDe: "\"Die Integration mit unserem CRM war nahtlos. Jeder Anruf wird automatisch protokolliert, transkribiert und kategorisiert. Unser Vertriebsteam war noch nie so produktiv.\"",
    authorEn: "— Jan B., NetWave Solutions",
    authorDe: "— Jan B., NetWave Solutions",
    initials: ["JB", "MK", "LF"],
  },
];

const TestimonialsSection = () => {
  const { t, lang } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getQuote = (idx: number) => {
    const item = testimonials[idx];
    if (item.quoteKey) return t(item.quoteKey);
    return lang === "de" ? item.quoteDe! : item.quoteEn!;
  };

  const getAuthor = (idx: number) => {
    const item = testimonials[idx];
    if (item.authorKey) return t(item.authorKey);
    return lang === "de" ? item.authorDe! : item.authorEn!;
  };

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrent((prev) => (prev + dir + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => paginate(1), 6000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paginate]);

  const handleManual = (dir: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    paginate(dir);
    intervalRef.current = setInterval(() => paginate(1), 6000);
  };

  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(diff) > 50) handleManual(diff > 0 ? -1 : 1);
    touchStart.current = null;
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden py-28" id="testimonials">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[hsl(var(--vox-dark))]" />

      {/* Sparkles */}
      <div className="absolute inset-0 z-[1]">
        <Sparkles
          className="absolute inset-0 h-full w-full"
          color="hsl(175, 65%, 50%)"
          size={1}
          density={60}
          speed={0.3}
          opacity={0.4}
        />
      </div>

      {/* Glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[hsl(var(--vox-teal)/0.06)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-[hsl(var(--vox-blue)/0.05)] rounded-full blur-[100px] pointer-events-none" />

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent z-[2]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold text-white leading-tight tracking-tight">
              {t("test.title")}
            </h2>

            {/* Navigation dots & arrows */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={() => handleManual(-1)}
                className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > current ? 1 : -1);
                      setCurrent(idx);
                      if (intervalRef.current) clearInterval(intervalRef.current);
                      intervalRef.current = setInterval(() => paginate(1), 6000);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === current
                        ? "w-8 vox-gradient-bg"
                        : "w-2 bg-white/[0.15] hover:bg-white/[0.25]"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={() => handleManual(1)}
                className="w-10 h-10 rounded-full border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </motion.div>

          <div
            className="relative min-h-[280px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
                className="relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-8"
              >
                <Quote className="w-10 h-10 text-[hsl(var(--vox-teal)/0.25)] mb-4" />
                <p className="text-white/80 text-[18px] font-normal leading-[1.6]">
                  {getQuote(current)}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {testimonials[current].initials.map((initials) => (
                      <div
                        key={initials}
                        className="w-10 h-10 rounded-full bg-white/[0.08] border-2 border-[hsl(var(--vox-dark))] flex items-center justify-center text-xs font-semibold text-white/50"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-semibold text-[14px] text-white/70">
                      {getAuthor(current)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

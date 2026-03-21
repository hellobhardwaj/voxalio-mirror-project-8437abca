import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useCallback, useEffect, useRef } from "react";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";
import testimonial4 from "@/assets/testimonial-4.jpg";

const testimonials = [
  { quoteKey: "test.quote", authorKey: "test.author", photo: testimonial1 },
  {
    quoteEn: "\"Voxalio cut our response time by 80%. Our customers don't even realize they're talking to an AI — the voice quality is that good.\"",
    quoteDe: "\"Voxalio hat unsere Antwortzeit um 80% reduziert. Unsere Kunden merken nicht einmal, dass sie mit einer KI sprechen.\"",
    authorEn: "— Thomas R., DataFlow GmbH",
    authorDe: "— Thomas R., DataFlow GmbH",
    photo: testimonial2,
  },
  {
    quoteEn: "\"We replaced our entire after-hours answering service with Voxalio. It handles appointment scheduling, transfers urgent calls, and costs a fraction.\"",
    quoteDe: "\"Wir haben unseren gesamten Anrufbeantworter-Service durch Voxalio ersetzt. Es übernimmt Terminplanung und leitet dringende Anrufe weiter.\"",
    authorEn: "— Sarah L., CloudSync Medical",
    authorDe: "— Sarah L., CloudSync Medical",
    photo: testimonial3,
  },
  {
    quoteEn: "\"The integration with our CRM was seamless. Every call is logged, transcribed, and categorized automatically.\"",
    quoteDe: "\"Die Integration mit unserem CRM war nahtlos. Jeder Anruf wird automatisch protokolliert und kategorisiert.\"",
    authorEn: "— Jan B., NetWave Solutions",
    authorDe: "— Jan B., NetWave Solutions",
    photo: testimonial4,
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

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32" id="testimonials" style={{ background: "var(--bg-mid)" }}>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Testimonials</span>
            <h2 className="font-display font-bold text-[var(--text-primary)] text-[28px] md:text-[36px] leading-[1.15] mt-3">
              {t("test.title")}
            </h2>

            <div className="flex items-center gap-4 mt-8">
              <button onClick={() => handleManual(-1)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid var(--border-normal)", background: "rgba(124,58,237,0.08)" }} aria-label="Previous">
                <ChevronLeft className="w-4 h-4 text-white/70" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
                    className="h-2 rounded-full transition-all duration-300"
                    style={idx === current ? { width: 32, background: "var(--gradient-primary)" } : { width: 8, background: "rgba(255,255,255,0.15)" }}
                  />
                ))}
              </div>
              <button onClick={() => handleManual(1)} className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ border: "1px solid var(--border-normal)", background: "rgba(124,58,237,0.08)" }} aria-label="Next">
                <ChevronRight className="w-4 h-4 text-white/70" />
              </button>
            </div>
          </motion.div>

          <div className="relative min-h-[280px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative rounded-[var(--radius-lg)] p-8 vox-card-hover"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", backdropFilter: "blur(12px)" }}
              >
                <Quote className="w-10 h-10 text-[var(--purple)]/25 mb-4" />
                <p className="text-white/75 text-[16px] leading-[1.7]">{getQuote(current)}</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={testimonials[current].photo} alt="" className="w-12 h-12 rounded-full object-cover" style={{ border: "2px solid rgba(124,58,237,0.3)" }} loading="lazy" />
                  <p className="font-medium text-[var(--text-sm)] text-white/60">{getAuthor(current)}</p>
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

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, Loader2 } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/optimis-ai-info/30min";

const CalendlySection = () => {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly widget script
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Detect when Calendly iframe appears
    const observer = new MutationObserver(() => {
      if (containerRef.current?.querySelector("iframe")) {
        setLoaded(true);
        observer.disconnect();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="booking" style={{ background: "var(--bg-dark)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(124,58,237,0.08), transparent)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="section-label">Schedule</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[28px] md:text-[var(--text-3xl)] leading-[1.1] mt-3 mb-3">
            {t("calendly.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-base)] leading-[1.7]">{t("calendly.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="rounded-[var(--radius-lg)] overflow-hidden relative"
          style={{ border: "1px solid rgba(139,92,246,0.15)", boxShadow: "0 0 40px rgba(124,58,237,0.08)", background: "#0a0812" }}
        >
          {!loaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4" style={{ background: "#0a0812", minHeight: 700 }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "rgba(124,58,237,0.12)" }}>
                <Calendar className="w-7 h-7 text-purple-400" />
              </div>
              <div className="flex items-center gap-2 text-[var(--text-muted)] text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                Loading calendar...
              </div>
              <div className="w-full max-w-md space-y-3 mt-4 px-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-10 rounded-lg animate-pulse" style={{ background: "rgba(139,92,246,0.08)", animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          )}

          <div
            ref={containerRef}
            className="calendly-inline-widget"
            data-url={`${CALENDLY_URL}?background_color=0a0812&text_color=e2e0ea&primary_color=7c3aed`}
            style={{ minWidth: 320, height: 700, opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CalendlySection;

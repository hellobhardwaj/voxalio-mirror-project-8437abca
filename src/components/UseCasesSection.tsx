import { motion } from "framer-motion";
import { Phone, FileText, Headphones, CheckCircle, Calendar, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SpotlightCard from "@/components/SpotlightCard";
import { useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const UseCasesSection = () => {
  const { t } = useLanguage();

  const useCases = [
    { icon: Phone, title: t("uc.frontDesk"), description: t("uc.frontDeskDesc"), featured: true },
    { icon: FileText, title: t("uc.transcription"), description: t("uc.transcriptionDesc") },
    { icon: Headphones, title: t("uc.customerService"), description: t("uc.customerServiceDesc") },
    { icon: CheckCircle, title: t("uc.orderProcessing"), description: t("uc.orderProcessingDesc") },
    { icon: Calendar, title: t("uc.appointments"), description: t("uc.appointmentsDesc") },
    { icon: Layers, title: t("uc.more"), description: t("uc.moreDesc") },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases" style={{ background: "var(--bg-mid)" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 text-center">
          
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {t("uc.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg leading-[1.7] mx-auto">
            {t("uc.desc")}
          </p>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <TiltCard3D><BentoCard uc={useCases[0]} featured /></TiltCard3D>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.slice(1, 3).map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <TiltCard3D><BentoCard uc={uc} /></TiltCard3D>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {useCases.slice(3).map((uc, i) => (
              <motion.div key={uc.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}>
                <TiltCard3D><BentoCard uc={uc} /></TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ uc, featured = false }: { uc: { icon: any; title: string; description: string }; featured?: boolean }) => {
  const Icon = uc.icon;
  return (
    <SpotlightCard
      className="group rounded-[var(--radius-lg)] p-8 h-full vox-card-hover relative overflow-hidden"
      style={{
        background: featured
          ? "linear-gradient(135deg, rgba(37,99,235,0.1), rgba(59,130,246,0.05))"
          : "white",
        border: featured
          ? "1px solid rgba(37,99,235,0.25)"
          : "1px solid #e2e8f0",
        minHeight: featured ? "180px" : "160px",
      }}
    >
      <div
        className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center mb-5"
        style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.12), rgba(59,130,246,0.12))", border: "1px solid rgba(37,99,235,0.15)" }}
      >
        <Icon className="w-5 h-5 text-[var(--purple)]" />
      </div>
      <h3 className="font-display font-semibold text-[18px] mb-3 text-[var(--text-primary)]">{uc.title}</h3>
      <p className="text-[14px] leading-[1.6] text-[var(--text-secondary)]">{uc.description}</p>
    </SpotlightCard>
  );
};

const TiltCard3D = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  }, [reduced]);

  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0)";
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: "transform 0.3s ease-out", willChange: "transform" }}>
      {children}
    </div>
  );
};

export default UseCasesSection;

import { motion } from "framer-motion";
import { Phone, FileText, Headphones, CheckCircle, Calendar, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const UseCasesSection = () => {
  const { t } = useLanguage();

  const useCases = [
    { icon: Phone, title: t("uc.frontDesk"), description: t("uc.frontDeskDesc"), span: "md:col-span-2 md:row-span-2", featured: true },
    { icon: FileText, title: t("uc.transcription"), description: t("uc.transcriptionDesc"), span: "" },
    { icon: Headphones, title: t("uc.customerService"), description: t("uc.customerServiceDesc"), span: "" },
    { icon: CheckCircle, title: t("uc.orderProcessing"), description: t("uc.orderProcessingDesc"), span: "" },
    { icon: Calendar, title: t("uc.appointments"), description: t("uc.appointmentsDesc"), span: "" },
    { icon: Layers, title: t("uc.more"), description: t("uc.moreDesc"), span: "", highlight: true },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases" style={{ background: "var(--bg-dark)" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <span className="section-label">Built for every business</span>
          <h2 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-2xl)] md:text-[var(--text-3xl)] leading-[1.1] mt-3">
            {t("uc.title")}
          </h2>
          <p className="text-[var(--text-secondary)] text-[var(--text-md)] mt-4 max-w-lg leading-[1.7]">
            {t("uc.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {useCases.map((uc, i) => {
            const Icon = uc.icon;
            return (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group rounded-[var(--radius-lg)] p-8 vox-card-hover ${uc.span}`}
                style={{
                  background: uc.highlight
                    ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.2))"
                    : uc.featured
                    ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.1))"
                    : "var(--bg-card)",
                  border: uc.highlight || uc.featured
                    ? "1px solid rgba(124,58,237,0.3)"
                    : "1px solid var(--border-subtle)",
                  backdropFilter: "blur(12px)",
                  willChange: "transform",
                }}
              >
                <div
                  className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))", border: "1px solid var(--border-normal)" }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-[18px] mb-3 text-[var(--text-primary)]">
                  {uc.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[var(--text-secondary)]">
                  {uc.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

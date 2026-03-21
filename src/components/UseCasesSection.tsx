import { motion } from "framer-motion";
import { Phone, FileText, Headphones, CheckCircle, Calendar, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

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
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases" style={{ background: "#0f0d1a" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <span className="text-[#a855f7] text-[12px] uppercase tracking-[0.12em] font-medium">
            Built for every business
          </span>
          <h2 className="font-display font-700 text-white text-[32px] md:text-[48px] leading-[1.1] mt-3">
            {t("uc.title")}
          </h2>
          <p className="text-muted-foreground text-[16px] mt-4 max-w-lg">
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
                className={`group rounded-[20px] p-8 transition-all duration-300 vox-card-hover ${uc.span}`}
                style={{
                  background: uc.highlight
                    ? "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.2))"
                    : uc.featured
                    ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.1))"
                    : "rgba(19,17,31,0.8)",
                  border: uc.highlight || uc.featured
                    ? "1px solid rgba(124,58,237,0.3)"
                    : "1px solid rgba(139,92,246,0.12)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-600 text-[18px] mb-3 text-white">
                  {uc.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-muted-foreground">
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

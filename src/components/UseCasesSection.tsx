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
    { icon: Phone, title: t("uc.frontDesk"), description: t("uc.frontDeskDesc"), span: "md:col-span-2 md:row-span-2" },
    { icon: FileText, title: t("uc.transcription"), description: t("uc.transcriptionDesc"), span: "" },
    { icon: Headphones, title: t("uc.customerService"), description: t("uc.customerServiceDesc"), span: "" },
    { icon: CheckCircle, title: t("uc.orderProcessing"), description: t("uc.orderProcessingDesc"), span: "" },
    { icon: Calendar, title: t("uc.appointments"), description: t("uc.appointmentsDesc"), span: "" },
    { icon: Layers, title: t("uc.more"), description: t("uc.moreDesc"), span: "", highlight: true },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="use-cases" style={{ background: "#0a0f1e" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
          <span className="text-[#2563eb] text-[12px] uppercase tracking-[0.12em] font-medium">
            Built for every business
          </span>
          <h2 className="font-display font-700 text-white text-[32px] md:text-[48px] leading-[1.1] mt-3">
            {t("uc.title")}
          </h2>
          <p className="text-[#94a3b8] text-[16px] mt-4 max-w-lg">
            {t("uc.desc")}
          </p>
        </motion.div>

        {/* Bento Grid */}
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
                className={`group rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 ${uc.span} ${
                  uc.highlight
                    ? "bg-[#2563eb] border-[#2563eb] hover:border-[#3b82f6]"
                    : "bg-[#141c2e] border-white/[0.06] hover:border-white/[0.12]"
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  uc.highlight ? "bg-white/20" : "bg-white/[0.06]"
                }`}>
                  <Icon className={`w-6 h-6 ${uc.highlight ? "text-white" : "text-[#2563eb]"}`} />
                </div>
                <h3 className={`font-display font-600 text-[18px] mb-3 ${uc.highlight ? "text-white" : "text-white"}`}>
                  {uc.title}
                </h3>
                <p className={`text-[14px] leading-[1.7] ${uc.highlight ? "text-white/70" : "text-[#94a3b8]"}`}>
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

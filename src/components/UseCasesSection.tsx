import { motion } from "framer-motion";
import { Phone, FileText, Headphones, CheckCircle, Calendar, Layers } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const UseCasesSection = () => {
  const { t } = useLanguage();

  const useCases = [
    { icon: Phone, title: t("uc.frontDesk"), description: t("uc.frontDeskDesc") },
    { icon: FileText, title: t("uc.transcription"), description: t("uc.transcriptionDesc") },
    { icon: Headphones, title: t("uc.customerService"), description: t("uc.customerServiceDesc") },
    { icon: CheckCircle, title: t("uc.orderProcessing"), description: t("uc.orderProcessingDesc") },
    { icon: Calendar, title: t("uc.appointments"), description: t("uc.appointmentsDesc") },
    { icon: Layers, title: t("uc.more"), description: t("uc.moreDesc") },
  ];

  return (
    <section className="vox-section-dark py-28 relative overflow-hidden" id="use-cases">
      {/* Subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[hsl(var(--vox-teal)/0.06)] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <h2 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold tracking-[-0.025em] leading-[1.15]">{t("uc.title")}</h2>
            <p className="mt-5 text-[15px] font-normal leading-[1.7] opacity-55 tracking-[-0.01em]">{t("uc.desc")}</p>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#start"
            className="vox-gradient-bg text-primary-foreground px-7 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-px self-start"
          >
            {t("uc.signup")}
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center group-hover:bg-white/[0.1] group-hover:border-white/[0.15] transition-all duration-300">
                  <uc.icon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-[17px] text-white/90">{uc.title}</h3>
              </div>
              <p className="text-[14px] font-normal opacity-50 leading-[1.6] group-hover:opacity-70 transition-opacity duration-300">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

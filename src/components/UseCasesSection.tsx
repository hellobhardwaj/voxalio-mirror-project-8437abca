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
    <section className="vox-section-dark py-24" id="use-cases">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold">{t("uc.title")}</h2>
            <p className="mt-4 text-sm leading-relaxed opacity-70">{t("uc.desc")}</p>
          </motion.div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#start"
            className="vox-gradient-bg text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity self-start"
          >
            {t("uc.signup")}
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <uc.icon className="w-5 h-5 opacity-70" />
                <h3 className="font-semibold">{uc.title}</h3>
              </div>
              <p className="text-sm opacity-60 leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-28 bg-muted/20" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
              {t("test.title")}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="relative"
          >
            <Quote className="w-10 h-10 text-primary/15 mb-4" />
            <p className="text-foreground text-lg leading-relaxed">{t("test.quote")}</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["MK", "TR", "SL"].map((initials) => (
                  <div key={initials} className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground">{t("test.author")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

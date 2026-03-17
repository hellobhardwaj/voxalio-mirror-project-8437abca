import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t, lang } = useLanguage();

  const plans = [
    {
      name: t("pricing.starter"),
      price: t("pricing.starterPrice"),
      desc: t("pricing.starterDesc"),
      features: ["50 minutes/month", "1 AI assistant", "Email support", "Basic analytics"],
      featuresDe: ["50 Minuten/Monat", "1 KI-Assistent", "E-Mail-Support", "Basis-Analytik"],
      cta: t("pricing.getStarted"),
      popular: false,
    },
    {
      name: t("pricing.pro"),
      price: t("pricing.proPrice"),
      desc: t("pricing.proDesc"),
      features: ["1,000 minutes/month", "5 AI assistants", "Priority support", "Advanced analytics", "CRM integrations", "Custom voices"],
      featuresDe: ["1.000 Minuten/Monat", "5 KI-Assistenten", "Prioritäts-Support", "Erweiterte Analytik", "CRM-Integrationen", "Benutzerdefinierte Stimmen"],
      cta: t("pricing.getStarted"),
      popular: true,
    },
    {
      name: t("pricing.enterprise"),
      price: t("pricing.enterprisePrice"),
      desc: t("pricing.enterpriseDesc"),
      features: ["Unlimited minutes", "Unlimited assistants", "Dedicated support", "Custom integrations", "SLA guarantee", "On-premise option"],
      featuresDe: ["Unbegrenzte Minuten", "Unbegrenzte Assistenten", "Dedizierter Support", "Individuelle Integrationen", "SLA-Garantie", "On-Premise Option"],
      cta: t("pricing.contactSales"),
      popular: false,
    },
  ];

  return (
    <section className="py-28 relative" id="pricing">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-[hsl(var(--vox-teal)/0.03)] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">{t("pricing.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">{t("pricing.subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-14"
        >
          <div className="inline-flex items-center gap-4 bg-secondary/80 backdrop-blur-sm rounded-full px-6 py-2.5 border border-border/50">
            <span className="text-sm font-semibold vox-gradient-text">{t("pricing.perMin")}</span>
            <span className="text-xs text-muted-foreground line-through">{t("pricing.competitorMin")}</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                plan.popular
                  ? "border-primary/40 vox-shadow-xl bg-card scale-[1.02]"
                  : "border-border/60 bg-card hover:border-border hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 vox-gradient-bg text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-3xl font-extrabold text-foreground mt-2 tracking-tight">{plan.price}</p>
              <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              <hr className="my-6 border-border/50" />
              <ul className="space-y-3">
                {(lang === "de" ? plan.featuresDe : plan.features).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "vox-gradient-bg text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-px"
                    : "bg-foreground text-background hover:opacity-90 hover:shadow-md"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

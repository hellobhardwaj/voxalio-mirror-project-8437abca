import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t } = useLanguage();

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

  const { lang } = useLanguage();

  return (
    <section className="py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("pricing.title")}</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">{t("pricing.subtitle")}</p>
        </motion.div>

        {/* Cost advantage callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-4 bg-secondary rounded-full px-6 py-2.5">
            <span className="text-sm font-semibold vox-gradient-text">{t("pricing.perMin")}</span>
            <span className="text-xs text-muted-foreground line-through">{t("pricing.competitorMin")}</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${
                plan.popular
                  ? "border-primary vox-shadow-lg bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 vox-gradient-bg text-primary-foreground text-xs font-semibold px-4 py-1 rounded-full">
                  {t("pricing.popular")}
                </span>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="text-3xl font-bold text-foreground mt-2">{plan.price}</p>
              <p className="text-sm text-muted-foreground mt-1">{plan.desc}</p>
              <hr className="my-6 border-border" />
              <ul className="space-y-3">
                {(lang === "de" ? plan.featuresDe : plan.features).map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full mt-8 py-3 rounded-lg text-sm font-semibold transition-opacity ${
                  plan.popular
                    ? "vox-gradient-bg text-primary-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
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

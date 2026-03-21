import Pricing, { type PricingPlan } from "@/components/ui/pricing";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSection = () => {
  const { t, lang } = useLanguage();

  const plans: PricingPlan[] = [
    {
      name: t("pricing.starter"),
      price: "0",
      yearlyPrice: "0",
      period: lang === "de" ? "pro Monat" : "per month",
      features:
        lang === "de"
          ? [
              "50 Minuten/Monat",
              "1 KI-Assistent",
              "E-Mail-Support",
              "Basis-Analytik",
              "Community-Support",
            ]
          : [
              "50 minutes/month",
              "1 AI assistant",
              "Email support",
              "Basic analytics",
              "Community support",
            ],
      description:
        lang === "de"
          ? "Perfekt zum Testen und für kleine Projekte"
          : "Perfect for testing and small projects",
      buttonText: t("pricing.getStarted"),
      href: "#lead-form",
      isPopular: false,
    },
    {
      name: t("pricing.pro"),
      price: "49",
      yearlyPrice: "39",
      period: lang === "de" ? "pro Monat" : "per month",
      features:
        lang === "de"
          ? [
              "1.000 Minuten/Monat",
              "5 KI-Assistenten",
              "Prioritäts-Support",
              "Erweiterte Analytik",
              "CRM-Integrationen",
              "Benutzerdefinierte Stimmen",
              "Team-Zusammenarbeit",
            ]
          : [
              "1,000 minutes/month",
              "5 AI assistants",
              "Priority support",
              "Advanced analytics",
              "CRM integrations",
              "Custom voices",
              "Team collaboration",
            ],
      description:
        lang === "de"
          ? "Für wachsende Unternehmen"
          : "For growing businesses",
      buttonText: t("pricing.getStarted"),
      href: "#lead-form",
      isPopular: true,
    },
    {
      name: t("pricing.enterprise"),
      price: "199",
      yearlyPrice: "159",
      period: lang === "de" ? "pro Monat" : "per month",
      features:
        lang === "de"
          ? [
              "Alles in Professional",
              "Individuelle Lösungen",
              "Dedizierter Account Manager",
              "1-Stunde Support-Reaktionszeit",
              "SSO-Authentifizierung",
              "Erweiterte Sicherheit",
              "SLA-Garantie",
              "On-Premise Option",
            ]
          : [
              "Everything in Professional",
              "Custom solutions",
              "Dedicated account manager",
              "1-hour support response time",
              "SSO Authentication",
              "Advanced security",
              "SLA guarantee",
              "On-premise option",
            ],
      description:
        lang === "de"
          ? "Für große Organisationen"
          : "For large organizations",
      buttonText:
        lang === "de" ? "Vertrieb kontaktieren" : "Contact Sales",
      href: "#contact",
      isPopular: false,
    },
  ];

  return (
    <Pricing
      plans={plans}
      title={
        lang === "de"
          ? "Einfache, transparente Preise"
          : "Simple, transparent pricing"
      }
      description={
        lang === "de"
          ? "Starten Sie kostenlos. Skalieren Sie nach Bedarf. Bis zu 95% günstiger als die Konkurrenz."
          : "Start free. Scale as you grow. Up to 95% cheaper than competitors."
      }
    
    />
  );
};

export default PricingSection;

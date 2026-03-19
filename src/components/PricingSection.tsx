"use client";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { useLanguage } from "@/contexts/LanguageContext";

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
}

const PricingSection = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);
  const { t, lang } = useLanguage();

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--secondary))",
          "hsl(var(--muted))",
        ],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

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
            ]
          : [
              "50 minutes/month",
              "1 AI assistant",
              "Email support",
              "Basic analytics",
            ],
      description: t("pricing.starterDesc"),
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
            ]
          : [
              "1,000 minutes/month",
              "5 AI assistants",
              "Priority support",
              "Advanced analytics",
              "CRM integrations",
              "Custom voices",
            ],
      description: t("pricing.proDesc"),
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
              "Unbegrenzte Minuten",
              "Unbegrenzte Assistenten",
              "Dedizierter Support",
              "Individuelle Integrationen",
              "SLA-Garantie",
              "On-Premise Option",
            ]
          : [
              "Unlimited minutes",
              "Unlimited assistants",
              "Dedicated support",
              "Custom integrations",
              "SLA guarantee",
              "On-premise option",
            ],
      description: t("pricing.enterpriseDesc"),
      buttonText: t("pricing.contactSales"),
      href: "#lead-form",
      isPopular: false,
    },
  ];

  return (
    <section className="w-full py-24" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            {t("pricing.title")}
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              ref={switchRef}
              onCheckedChange={handleToggle}
              id="pricing-toggle"
            />
            <Label htmlFor="pricing-toggle" className="text-muted-foreground">
              {lang === "de"
                ? "Jährliche Abrechnung (20% sparen)"
                : "Annual billing (Save 20%)"}
            </Label>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm",
                plan.isPopular && "border-primary shadow-lg scale-[1.02]"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary-foreground text-primary-foreground" />
                    <span className="text-xs font-semibold text-primary-foreground">
                      {t("pricing.popular")}
                    </span>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    <NumberFlow
                      value={Number(isMonthly ? plan.price : plan.yearlyPrice)}
                      format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
                      transformTiming={{
                        duration: 500,
                        easing: "ease-out",
                      }}
                      willChange
                    />
                  </span>
                  {plan.price !== "0" && (
                    <span className="text-sm text-muted-foreground">
                      / {plan.period}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {isMonthly
                    ? lang === "de"
                      ? "monatlich abgerechnet"
                      : "billed monthly"
                    : lang === "de"
                    ? "jährlich abgerechnet"
                    : "billed annually"}
                </p>
              </div>

              <div className="flex-1 space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={plan.href}
                  className={cn(
                    buttonVariants({
                      variant: plan.isPopular ? "default" : "outline",
                    }),
                    "w-full"
                  )}
                >
                  {plan.buttonText}
                </a>
                <p className="text-center text-xs text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

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

  const plans = [
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
      description: t("pricing.enterpriseDesc"),
      buttonText: t("pricing.contactSales"),
      href: "#lead-form",
      isPopular: false,
    },
  ];

  return (
    <section className="w-full py-24 bg-[hsl(220,20%,6%)]" id="pricing">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">
            {t("pricing.title")}
          </h2>
          <p className="max-w-xl text-base text-white/50">
            {t("pricing.subtitle")}
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              ref={switchRef}
              onCheckedChange={handleToggle}
              id="pricing-toggle"
            />
            <Label
              htmlFor="pricing-toggle"
              className="text-white/70 font-medium"
            >
              {lang === "de"
                ? "Jährliche Abrechnung (20% sparen)"
                : "Annual billing (Save 20%)"}
            </Label>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-3 items-start">
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
                "relative flex flex-col rounded-2xl p-6 md:p-8",
                plan.isPopular
                  ? "border border-white/20 bg-white/[0.03] shadow-[0_0_40px_rgba(255,255,255,0.04)]"
                  : "border border-transparent bg-transparent"
              )}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-white/10 border border-white/20 px-3 py-1">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-white/90">
                      {t("pricing.popular")}
                    </span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-sm font-semibold tracking-widest text-white/60 uppercase">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-bold text-white tabular-nums">
                  <NumberFlow
                    value={Number(isMonthly ? plan.price : plan.yearlyPrice)}
                    format={{
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }}
                    transformTiming={{
                      duration: 500,
                      easing: "ease-out",
                    }}
                    willChange
                  />
                </span>
                {plan.price !== "0" && (
                  <span className="text-sm text-white/40 ml-1">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-primary/60">
                {isMonthly
                  ? lang === "de"
                    ? "monatlich abgerechnet"
                    : "billed monthly"
                  : lang === "de"
                  ? "jährlich abgerechnet"
                  : "billed annually"}
              </p>

              {/* Features */}
              <div className="mt-8 flex-1 space-y-3.5">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                    <span className="text-sm text-white/70 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-semibold transition-all duration-200",
                    plan.isPopular
                      ? "bg-white text-[hsl(220,20%,6%)] hover:bg-white/90"
                      : "border border-white/20 text-white bg-transparent hover:bg-white/5"
                  )}
                >
                  {plan.buttonText}
                </a>
                <p className="text-center text-xs text-primary/50">
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

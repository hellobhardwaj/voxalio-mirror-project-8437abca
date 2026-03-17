"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PricingSwitch = ({
  onSwitch,
  labels,
}: {
  onSwitch: (value: string) => void;
  labels: { monthly: string; yearly: string };
}) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative flex items-center rounded-full bg-white/[0.06] border border-white/[0.08] p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors text-sm",
            selected === "0" ? "text-white" : "text-white/50"
          )}
        >
          {selected === "0" && (
            <motion.div
              layoutId="pricing-switch"
              className="absolute inset-0 rounded-full vox-gradient-bg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{labels.monthly}</span>
        </button>
        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors text-sm",
            selected === "1" ? "text-white" : "text-white/50"
          )}
        >
          {selected === "1" && (
            <motion.div
              layoutId="pricing-switch"
              className="absolute inset-0 rounded-full vox-gradient-bg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{labels.yearly}</span>
        </button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLElement>(null);
  const { t, lang } = useLanguage();

  const plans = [
    {
      name: t("pricing.starter"),
      price: 0,
      yearlyPrice: 0,
      priceLabel: t("pricing.starterPrice"),
      desc: t("pricing.starterDesc"),
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
      cta: t("pricing.getStarted"),
      popular: false,
    },
    {
      name: t("pricing.pro"),
      price: 49,
      yearlyPrice: 470,
      priceLabel: t("pricing.proPrice"),
      desc: t("pricing.proDesc"),
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
      cta: t("pricing.getStarted"),
      popular: true,
    },
    {
      name: t("pricing.enterprise"),
      price: 199,
      yearlyPrice: 1990,
      priceLabel: t("pricing.enterprisePrice"),
      desc: t("pricing.enterpriseDesc"),
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
      cta: t("pricing.contactSales"),
      popular: false,
    },
  ];

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <section
      className="relative overflow-hidden py-28"
      id="pricing"
      ref={pricingRef}
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-[hsl(var(--vox-dark))]" />

      {/* Sparkles background */}
      <div className="absolute inset-0 z-[1]">
        <Sparkles
          className="absolute inset-0 h-full w-full"
          color="hsl(175, 65%, 50%)"
          size={1.2}
          density={100}
          speed={0.4}
          opacity={0.5}
        />
      </div>

      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 z-[2]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full bg-[hsl(var(--vox-teal)/0.15)] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <TimelineContent animationNum={0} timelineRef={pricingRef}>
            <h2 className="text-[26px] md:text-[30px] lg:text-[34px] font-semibold text-white tracking-[-0.025em]">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                containerClassName="justify-center"
                elementLevelClassName="text-white"
              >
                {t("pricing.title")}
              </VerticalCutReveal>
            </h2>
          </TimelineContent>

          <TimelineContent animationNum={1} timelineRef={pricingRef}>
            <p className="mt-4 text-white/45 max-w-xl mx-auto text-[15px] font-normal leading-[1.7] tracking-[-0.01em]">
              {t("pricing.subtitle")}
            </p>
          </TimelineContent>

          <div className="mt-8" />

          <TimelineContent animationNum={3} timelineRef={pricingRef}>
            <PricingSwitch
              onSwitch={togglePricingPeriod}
              labels={{
                monthly: lang === "de" ? "Monatlich" : "Monthly",
                yearly: lang === "de" ? "Jährlich" : "Yearly",
              }}
            />
          </TimelineContent>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              animationNum={4 + index}
              timelineRef={pricingRef}
            >
              <Card
                className={cn(
                  "relative bg-white/[0.03] backdrop-blur-sm border-white/[0.08] rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 h-full flex flex-col",
                  plan.popular &&
                    "border-[hsl(var(--vox-teal)/0.4)] bg-white/[0.06] shadow-[0_0_40px_hsl(var(--vox-teal)/0.1)]"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal))] to-transparent" />
                )}

                <CardHeader className="pb-4 pt-6 px-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[17px] font-medium text-white tracking-[-0.015em]">
                      {plan.name}
                    </h3>
                    {plan.popular && (
                      <span className="vox-gradient-bg text-primary-foreground text-[10px] font-semibold px-3 py-1 rounded-full">
                        {t("pricing.popular")}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-baseline gap-1">
                    {plan.price === 0 ? (
                      <span className="text-[36px] font-semibold text-white tracking-[-0.03em]">
                        {plan.priceLabel}
                      </span>
                    ) : (
                      <>
                        <span className="text-white/60 text-lg">€</span>
                        <NumberFlow
                          value={isYearly ? plan.yearlyPrice : plan.price}
                          className="text-[36px] font-semibold text-white tracking-[-0.03em]"
                          transformTiming={{
                            duration: 500,
                            easing: "ease-out",
                          }}
                          willChange
                        />
                      </>
                    )}
                    <span className="text-white/40 text-sm ml-1">
                      /{isYearly ? (lang === "de" ? "Jahr" : "year") : (lang === "de" ? "Monat" : "month")}
                    </span>
                  </div>

                  <p className="text-white/40 text-[14px] font-normal mt-2 leading-[1.7] tracking-[-0.01em]">
                    {plan.desc}
                  </p>
                </CardHeader>

                <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                  <button
                    className={cn(
                      "w-full py-3 rounded-xl text-[14px] font-medium transition-all duration-300 tracking-[-0.01em]",
                      plan.popular
                        ? "vox-gradient-bg text-primary-foreground hover:shadow-lg hover:shadow-[hsl(var(--vox-teal)/0.2)] hover:-translate-y-px"
                        : "bg-white/[0.08] text-white border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/[0.2]"
                    )}
                  >
                    {plan.cta}
                  </button>

                  <div className="mt-6 flex-1">
                    <p className="text-[11px] font-medium text-white/50 uppercase tracking-[0.06em] mb-3">
                      {lang === "de" ? "Enthalten" : "Includes"}
                    </p>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2.5 text-sm text-white/50"
                        >
                          <Check className="w-4 h-4 text-[hsl(var(--vox-teal))] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

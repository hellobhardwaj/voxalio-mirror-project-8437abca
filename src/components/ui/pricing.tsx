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

export interface PricingPlan {
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

interface PricingProps {
  plans: PricingPlan[];
  title: string;
  description: string;
  popularLabel?: string;
  annualLabel?: string;
  monthlyBilledLabel?: string;
  yearlyBilledLabel?: string;
}

const Pricing = ({
  plans,
  title,
  description,
  popularLabel = "Popular",
  annualLabel = "Annual billing (Save 20%)",
  monthlyBilledLabel = "billed monthly",
  yearlyBilledLabel = "billed annually",
}: PricingProps) => {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

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
        colors: ["#0ea5e9", "#22c55e", "#0f172a", "#64748b"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section
      className="w-full py-20 md:py-32"
      id="pricing"
      style={{ backgroundColor: "#0a0d14" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-[-0.02em] text-white leading-tight">
            {title}
          </h2>
          <p className="max-w-2xl text-base sm:text-lg text-white/45 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.08] rounded-full px-5 py-2.5">
            <Switch
              ref={switchRef}
              onCheckedChange={handleToggle}
              id="pricing-toggle"
              className="data-[state=checked]:bg-[#0ea5e9]"
            />
            <Label
              htmlFor="pricing-toggle"
              className="text-white/60 font-medium text-sm cursor-pointer"
            >
              {annualLabel}
            </Label>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 md:mt-16 grid gap-5 lg:gap-0 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              className={cn(
                "relative flex flex-col rounded-2xl",
                plan.isPopular
                  ? "border-2 border-white/30 bg-white/[0.05] shadow-[0_0_60px_rgba(255,255,255,0.06)] lg:scale-[1.04] lg:-translate-y-3 z-10 p-7 md:p-10"
                  : "border border-white/[0.12] bg-white/[0.02] p-6 md:p-8"
              )}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-white/10 border border-white/25 px-4 py-1.5 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-white/95 tracking-wide">
                      {popularLabel}
                    </span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white/50 uppercase">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-extrabold text-white tabular-nums tracking-tight">
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
                  <span className="text-sm text-white/35 ml-1.5 font-medium">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="mt-2.5 text-xs font-medium text-[#0ea5e9]/50 tracking-wide">
                {isMonthly ? monthlyBilledLabel : yearlyBilledLabel}
              </p>

              {/* Divider */}
              <div className="mt-6 md:mt-8 h-px bg-white/[0.08]" />

              {/* Features */}
              <div className="mt-6 md:mt-8 flex-1 space-y-3.5 md:space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0ea5e9]/10">
                      <Check className="h-3 w-3 text-[#0ea5e9]" />
                    </div>
                    <span className="text-sm text-white/65 font-medium leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-10 flex flex-col gap-3">
                <a
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-xl py-3.5 px-6 text-sm font-semibold transition-all duration-200",
                    plan.isPopular
                      ? "bg-white text-[#0a0d14] hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                      : "border border-white/15 text-white/80 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25"
                  )}
                >
                  {plan.buttonText}
                </a>
                <p className="text-center text-xs text-white/35 font-medium">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

export default Pricing;

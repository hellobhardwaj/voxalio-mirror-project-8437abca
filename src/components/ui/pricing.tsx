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
      className="w-full py-16 md:py-24"
      id="pricing"
      style={{ backgroundColor: "#0a0d14" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="max-w-xl text-sm sm:text-base text-white/50">
            {description}
          </p>
        </div>

        {/* Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <Switch
              ref={switchRef}
              onCheckedChange={handleToggle}
              id="pricing-toggle"
              className="data-[state=checked]:bg-[#0ea5e9]"
            />
            <Label
              htmlFor="pricing-toggle"
              className="text-white/70 font-medium text-sm"
            >
              {annualLabel}
            </Label>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
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
                  ? "border border-white/20 bg-white/[0.03] shadow-[0_0_40px_rgba(255,255,255,0.04)] lg:scale-105 lg:-translate-y-2"
                  : "border border-white/10 bg-white/[0.02]"
              )}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 right-6 rounded-full bg-white/10 border border-white/20 px-3 py-1">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-white/90">
                      {popularLabel}
                    </span>
                  </div>
                </div>
              )}

              {/* Plan name */}
              <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">
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
                  <span className="text-xs sm:text-sm text-white/40 ml-1">
                    / {plan.period}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs text-[#0ea5e9]/60">
                {isMonthly ? monthlyBilledLabel : yearlyBilledLabel}
              </p>

              {/* Features */}
              <div className="mt-6 md:mt-8 flex-1 space-y-3 md:space-y-3.5">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0ea5e9]" />
                    <span className="text-sm text-white/70 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 md:mt-8 flex flex-col gap-3">
                <a
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-lg py-3 px-6 text-sm font-semibold transition-all duration-200",
                    plan.isPopular
                      ? "bg-white text-[#0a0d14] hover:bg-white/90"
                      : "border border-white/20 text-white bg-transparent hover:bg-white/5"
                  )}
                >
                  {plan.buttonText}
                </a>
                <p className="text-center text-xs text-white/40">
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

export default Pricing;

"use client";

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
}

const Pricing = ({ plans, title, description }: PricingProps) => {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: ["#7c3aed", "#a855f7", "#2563eb", "#06b6d4"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
      });
    }
  };

  return (
    <section className="w-full py-20 md:py-32" id="pricing" style={{ backgroundColor: "var(--bg-mid)" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col items-center gap-5 text-center">
          <span className="section-label">Pricing</span>
          <h2 className="text-[var(--text-2xl)] md:text-[var(--text-4xl)] font-extrabold tracking-[-0.02em] text-[var(--text-primary)] leading-tight font-display">
            {title}
          </h2>
          <p className="max-w-2xl text-[var(--text-md)] text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>
        </motion.div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex items-center gap-3 rounded-full px-5 py-2.5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid var(--border-subtle)" }}>
            <Switch
              ref={switchRef}
              onCheckedChange={handleToggle}
              id="pricing-toggle"
              className="data-[state=checked]:bg-[var(--purple-light)]"
            />
            <Label htmlFor="pricing-toggle" className="text-white/60 font-medium text-sm cursor-pointer">
              Annual billing (Save 20%)
            </Label>
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid gap-5 lg:gap-0 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-lg)]",
                plan.isPopular
                  ? "z-10 p-7 md:p-10 lg:scale-[1.04] lg:-translate-y-3"
                  : "p-6 md:p-8"
              )}
              style={
                plan.isPopular
                  ? {
                      background: "linear-gradient(145deg, #5b21b6, #3730a3)",
                      boxShadow: "0 0 0 1px rgba(124,58,237,0.3), 0 32px 80px rgba(124,58,237,0.35)",
                    }
                  : {
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-subtle)",
                    }
              }
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1.5" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 fill-white text-white" />
                    <span className="text-xs font-bold text-white tracking-wide">Popular</span>
                  </div>
                </div>
              )}

              <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] text-white/50 uppercase">
                {plan.name}
              </h3>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl md:text-6xl font-extrabold text-white tabular-nums tracking-tight font-display">
                  <NumberFlow
                    value={Number(isMonthly ? plan.price : plan.yearlyPrice)}
                    format={{ style: "currency", currency: "EUR", maximumFractionDigits: 0 }}
                    transformTiming={{ duration: 500, easing: "ease-out" }}
                    willChange
                  />
                </span>
                {plan.price !== "0" && (
                  <span className="text-sm text-white/35 ml-1.5 font-medium">/ {plan.period}</span>
                )}
              </div>

              <p className="mt-2.5 text-xs font-medium tracking-wide" style={{ color: plan.isPopular ? "rgba(255,255,255,0.6)" : "var(--purple-light)" }}>
                {isMonthly ? "billed monthly" : "billed annually"}
              </p>

              <div className="mt-6 md:mt-8 h-px" style={{ background: plan.isPopular ? "rgba(255,255,255,0.2)" : "var(--border-subtle)" }} />

              <div className="mt-6 md:mt-8 flex-1 space-y-3.5 md:space-y-4">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: plan.isPopular ? "rgba(255,255,255,0.2)" : "rgba(124,58,237,0.15)" }}>
                      <Check className="h-3 w-3" style={{ color: plan.isPopular ? "white" : "var(--purple-light)" }} />
                    </div>
                    <span className="text-sm font-medium leading-snug" style={{ color: plan.isPopular ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 md:mt-10 flex flex-col gap-3">
                <a
                  href={plan.href}
                  className={cn(
                    "w-full inline-flex items-center justify-center rounded-xl py-3.5 px-6 text-sm font-semibold transition-all duration-200",
                    plan.isPopular
                      ? "bg-white text-[var(--purple)] hover:bg-white/90 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                      : "text-white/80 hover:border-[var(--border-bright)] vox-btn-glow"
                  )}
                  style={!plan.isPopular ? { border: "1px solid var(--border-normal)", background: "rgba(124,58,237,0.08)" } : undefined}
                >
                  {plan.buttonText}
                </a>
                <p className="text-center text-xs text-white/35 font-medium">{plan.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

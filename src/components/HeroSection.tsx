import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import HeroWaveform from "@/components/HeroWaveform";
import HeroPhoneMockup from "@/components/HeroPhoneMockup";

const HeroSection = () => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);
  const { t, lang } = useLanguage();

  const cleanPhone = (raw: string) => raw.replace(/[\s\-\(\)]/g, "");

  const buildE164 = (): string => {
    const cleaned = cleanPhone(phone);
    if (cleaned.startsWith("+")) return cleaned;
    return `+49${cleaned.replace(/^0+/, "")}`;
  };

  const validate = (e164: string): boolean => {
    if (!e164.startsWith("+")) return false;
    const digits = e164.slice(1);
    if (digits.length < 10 || digits.length > 15) return false;
    if (!/^\d+$/.test(digits)) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (submittingRef.current) return;
    setError("");
    setSuccess(false);

    const e164 = buildE164();

    if (!validate(e164)) {
      setError(
        lang === "de"
          ? "Bitte geben Sie eine gültige Telefonnummer mit Landesvorwahl ein"
          : "Please enter a valid phone number with country code"
      );
      return;
    }

    submittingRef.current = true;
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("trigger-call", {
        body: { phone: e164 },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setSuccess(true);
      setPhone("");
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Call trigger failed:", err);
      setError(
        lang === "de"
          ? "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      submittingRef.current = false;
    }
  };

  return (
    <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-[hsl(220_40%_98%)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/80 rounded-full px-4 py-1.5 mb-6 border border-border/50">
              <span className="w-2 h-2 rounded-full vox-gradient-bg animate-pulse" />
              <span className="text-[13px] font-normal text-muted-foreground tracking-normal">
                {t("hero.badge")}
              </span>
            </div>

            <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-foreground leading-[1.08] tracking-[-0.03em] max-w-lg">
              {t("hero.title")}
            </h1>

            <p className="mt-5 text-muted-foreground text-[17px] font-normal leading-[1.7] max-w-md tracking-[-0.01em]">
              {t("hero.subtitle")}
            </p>

            {/* CTA Card */}
            <div className="mt-8 max-w-sm">
              <div className="relative rounded-2xl p-[2px] overflow-hidden vox-shadow-xl">
                <div
                  className="absolute inset-[-50%] animate-rainbow-spin"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, transparent 65%, hsl(210 70% 60%) 78%, hsl(270 50% 60%) 85%, hsl(185 60% 50%) 92%, transparent 100%)",
                  }}
                />
                <div className="relative bg-card backdrop-blur-xl rounded-[calc(1rem-1px)] p-5">
                  <div className="flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      {lang === "de" ? "Telefonnummer eingeben" : "Enter your phone number"}
                    </span>
                  </div>

                  <div className="mb-3">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setError("");
                      }}
                      placeholder={lang === "de" ? "z.B. +4917612345678" : "e.g. +4917612345678"}
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 transition-all duration-200"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-destructive text-xs mb-3 text-left"
                      >
                        {error}
                      </motion.p>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-primary text-sm mb-3 justify-center"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>
                          📞 {lang === "de" ? "Wir rufen Sie jetzt an..." : "Calling you now..."}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={handleSubmit}
                    disabled={loading || !phone.trim()}
                    className="w-full py-3 rounded-lg bg-foreground text-background font-medium text-[14px] hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg tracking-[-0.01em]"
                  >
                    {loading
                      ? lang === "de"
                        ? "Wird angerufen..."
                        : "Calling..."
                      : t("hero.cta")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column — visuals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-10 items-center"
          >
            <HeroWaveform />
            <HeroPhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

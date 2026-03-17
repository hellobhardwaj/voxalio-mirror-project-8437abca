import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";

import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { AuroraBackground } from "@/components/ui/aurora-background";


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
    // Default to +49 if no country code provided
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
    <AuroraBackground className="pt-32 pb-24 min-h-[92vh]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[hsl(var(--vox-teal)/0.04)] to-[hsl(var(--vox-blue)/0.08)] blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[hsl(var(--vox-cyan)/0.04)] to-[hsl(var(--vox-teal)/0.06)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-border/50">
            <span className="w-2 h-2 rounded-full vox-gradient-bg animate-pulse" />
            <span className="text-[13px] font-normal text-muted-foreground tracking-normal">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-semibold text-foreground leading-[1.08] max-w-3xl mx-auto tracking-[-0.03em]"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-muted-foreground text-[17px] font-normal leading-[1.7] max-w-xl mx-auto tracking-[-0.01em]"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 flex justify-center"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
            <video
              src="/hero-orb.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none scale-[1.35]"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-sm mx-auto"
        >
          <div className="bg-card/90 backdrop-blur-xl rounded-2xl border border-border/60 p-5 vox-shadow-xl">
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
                  <span>📞 {lang === "de" ? "Wir rufen Sie jetzt an..." : "Calling you now..."}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={loading || !phone.trim()}
              className="w-full py-3 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            >
              {loading
                ? lang === "de"
                  ? "Wird angerufen..."
                  : "Calling..."
                : t("hero.cta")}
            </button>
          </div>
        </motion.div>
      </div>
    </AuroraBackground>
  );
};

export default HeroSection;

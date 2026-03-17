import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle } from "lucide-react";
import heroOrb from "@/assets/hero-orb.png";
import { useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRY_CODES = [
  { code: "+49", flag: "🇩🇪", label: "DE" },
  { code: "+43", flag: "🇦🇹", label: "AT" },
  { code: "+41", flag: "🇨🇭", label: "CH" },
  { code: "+44", flag: "🇬🇧", label: "UK" },
  { code: "+1", flag: "🇺🇸", label: "US" },
  { code: "+33", flag: "🇫🇷", label: "FR" },
  { code: "+39", flag: "🇮🇹", label: "IT" },
  { code: "+34", flag: "🇪🇸", label: "ES" },
  { code: "+31", flag: "🇳🇱", label: "NL" },
  { code: "+48", flag: "🇵🇱", label: "PL" },
  { code: "+46", flag: "🇸🇪", label: "SE" },
  { code: "+47", flag: "🇳🇴", label: "NO" },
  { code: "+45", flag: "🇩🇰", label: "DK" },
  { code: "+32", flag: "🇧🇪", label: "BE" },
  { code: "+90", flag: "🇹🇷", label: "TR" },
];

const HeroSection = () => {
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+49");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);
  const { t, lang } = useLanguage();

  const cleanPhone = (raw: string) => raw.replace(/[\s\-\(\)]/g, "");

  const buildE164 = (): string => {
    const cleaned = cleanPhone(phone);
    if (cleaned.startsWith("+")) return cleaned;
    return `${countryCode}${cleaned.replace(/^0+/, "")}`;
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
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-vox-teal/5 to-vox-blue/10 blur-3xl" />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-vox-cyan/5 to-vox-teal/8 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-secondary rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full vox-gradient-bg" />
            <span className="text-sm font-medium text-muted-foreground">{t("hero.badge")}</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-muted-foreground text-lg"
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <img src={heroOrb} alt="AI Orb" className="w-40 h-40 md:w-52 md:h-52 object-contain" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 max-w-sm mx-auto"
        >
          <div className="bg-card rounded-2xl border border-border p-5 vox-shadow">
            <div className="flex items-center justify-center mb-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                {lang === "de" ? "Telefonnummer eingeben" : "Enter your phone number"}
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              <Select value={countryCode} onValueChange={setCountryCode}>
                <SelectTrigger className="w-[100px] shrink-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRY_CODES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                placeholder={t("hero.placeholder")}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
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
                  className="flex items-center gap-2 text-emerald-500 text-sm mb-3 justify-center"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>📞 {lang === "de" ? "Wir rufen Sie jetzt an..." : "Calling you now..."}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleSubmit}
              disabled={loading || !phone.trim()}
              className="w-full py-3 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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
    </section>
  );
};

export default HeroSection;

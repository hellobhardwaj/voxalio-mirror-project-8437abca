import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+49", label: "🇩🇪 +49", country: "DE" },
  { code: "+1", label: "🇺🇸 +1", country: "US" },
  { code: "+44", label: "🇬🇧 +44", country: "GB" },
  { code: "+43", label: "🇦🇹 +43", country: "AT" },
  { code: "+41", label: "🇨🇭 +41", country: "CH" },
  { code: "+33", label: "🇫🇷 +33", country: "FR" },
  { code: "+39", label: "🇮🇹 +39", country: "IT" },
  { code: "+34", label: "🇪🇸 +34", country: "ES" },
  { code: "+31", label: "🇳🇱 +31", country: "NL" },
  { code: "+46", label: "🇸🇪 +46", country: "SE" },
  { code: "+47", label: "🇳🇴 +47", country: "NO" },
  { code: "+45", label: "🇩🇰 +45", country: "DK" },
  { code: "+48", label: "🇵🇱 +48", country: "PL" },
  { code: "+91", label: "🇮🇳 +91", country: "IN" },
  { code: "+61", label: "🇦🇺 +61", country: "AU" },
  { code: "+81", label: "🇯🇵 +81", country: "JP" },
  { code: "+82", label: "🇰🇷 +82", country: "KR" },
  { code: "+55", label: "🇧🇷 +55", country: "BR" },
  { code: "+52", label: "🇲🇽 +52", country: "MX" },
  { code: "+90", label: "🇹🇷 +90", country: "TR" },
];

type FormState = "idle" | "loading" | "success" | "error";

const DemoCallSection = () => {
  const { lang } = useLanguage();
  const [countryCode, setCountryCode] = useState("+49");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [validationError, setValidationError] = useState("");

  const stripPhone = (val: string) => val.replace(/\D/g, "");

  const validate = (): boolean => {
    const digits = stripPhone(phoneNumber);
    if (!digits) {
      setValidationError(lang === "de" ? "Bitte geben Sie eine Telefonnummer ein." : "Please enter a phone number.");
      return false;
    }
    if (digits.length < 7 || digits.length > 15) {
      setValidationError(lang === "de" ? "Die Nummer muss zwischen 7 und 15 Ziffern haben." : "Number must be between 7 and 15 digits.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("loading");
    const fullNumber = countryCode + stripPhone(phoneNumber);

    try {
      const response = await fetch(
        "https://n8n.srv1116041.hstgr.cloud/webhook/retell-call",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to_number: fullNumber }),
        }
      );
      const data = await response.json();
      console.log("Retell call response:", data);

      if (response.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch (err) {
      console.error("Retell call error:", err);
      setFormState("error");
    }
  };

  const texts = lang === "de"
    ? {
        heading: "Neugierig, wie es funktioniert?",
        headingAccent: "Lassen Sie unsere KI Sie anrufen.",
        subtitle: "Geben Sie Ihre Nummer ein. Lena, unsere KI-Sprachagentin, ruft Sie sofort an — auf Deutsch oder Englisch.",
        cta: "Jetzt anrufen",
        connecting: "Verbinde...",
        success: "🎉 Lena ruft Sie jetzt an! Nehmen Sie ab — sie erklärt Ihnen alles in unter 2 Minuten.",
        error: "Etwas ist schiefgelaufen. Bitte überprüfen Sie Ihre Nummer und versuchen Sie es erneut.",
        placeholder: "Ihre Telefonnummer",
      }
    : {
        heading: "Curious how it works?",
        headingAccent: "Let our AI call you.",
        subtitle: "Enter your number below. Lena, our AI voice agent, will call you instantly — in German or English.",
        cta: "Call Me Now",
        connecting: "Connecting...",
        success: "🎉 Lena is calling you now! Pick up — she'll walk you through everything in under 2 minutes.",
        error: "Something went wrong. Please check your number and try again.",
        placeholder: "Your phone number",
      };

  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--bg-mid)", borderTop: "1px solid rgba(0,0,0,0.10)" }}
    >
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(37,99,235,0.06), transparent)" }} />
      <div className="absolute top-16 right-[10%] w-48 h-48 rounded-full pointer-events-none" style={{ background: "rgba(37,99,235,0.04)", filter: "blur(80px)" }} />

      <div className="relative z-10 max-w-[600px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
            <Phone className="w-4 h-4 text-[var(--purple)]" />
            <span className="text-[var(--purple)] text-[13px] font-semibold font-body">
              {lang === "de" ? "Live AI-Demo" : "Live AI Demo"}
            </span>
          </div>

          <h2 className="font-display font-extrabold text-[var(--text-primary)] text-[32px] md:text-[48px] leading-[1.1]">
            {texts.heading}
            <br />
            <span className="gradient-text">{texts.headingAccent}</span>
          </h2>

          <p className="mt-6 text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-[1.7]">
            {texts.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10"
        >
          {formState === "success" ? (
            <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white" style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0" }}>
              <CheckCircle2 className="w-12 h-12 text-green-500" />
              <p className="text-[var(--text-primary)] text-[16px] font-semibold font-body leading-[1.6]">
                {texts.success}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white" style={{ boxShadow: "0 16px 48px rgba(0,0,0,0.07)", border: "1px solid #e2e8f0" }}>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="shrink-0 w-[100px] px-3 py-3.5 rounded-xl bg-white text-[#0f172a] text-sm font-semibold border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[var(--purple)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all appearance-none cursor-pointer"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>

                <input
                  type="tel"
                  placeholder={texts.placeholder}
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (validationError) setValidationError("");
                    if (formState === "error") setFormState("idle");
                  }}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-white text-[#0f172a] text-sm border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[var(--purple)] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] transition-all"
                />
              </div>

              {validationError && (
                <div className="flex items-center gap-2 mt-3 text-red-500 text-[13px] font-medium text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {validationError}
                </div>
              )}

              {formState === "error" && (
                <div className="flex items-center gap-2 mt-3 text-red-500 text-[13px] font-medium text-left">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {texts.error}
                </div>
              )}

              <button
                type="submit"
                disabled={formState === "loading"}
                className="w-full mt-5 py-4 rounded-xl text-white font-display font-semibold text-[16px] transition-all duration-200 disabled:opacity-60 vox-gradient-bg vox-btn-glow flex items-center justify-center gap-2"
              >
                {formState === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {texts.connecting}
                  </>
                ) : (
                  <>
                    <Phone className="w-5 h-5" />
                    {texts.cta}
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default DemoCallSection;

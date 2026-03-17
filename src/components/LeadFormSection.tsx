import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles } from "@/components/ui/sparkles";

const LeadFormSection = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [gdpr, setGdpr] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdpr || submitting) return;
    setSubmitting(true);

    try {
      const phone = form.phone.replace(/[\s\-\(\)]/g, "");
      const { error } = await supabase.from("leads" as any).insert({
        phone: phone || null,
        name: form.name || null,
        email: form.email || null,
        company: form.company || null,
      });
      if (error) console.error("Lead insert error:", error);
    } catch (err) {
      console.error("Failed to store lead:", err);
    }

    setForm({ name: "", email: "", phone: "", company: "" });
    setGdpr(false);
    setSubmitting(false);
    navigate("/thank-you");
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.04] text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--vox-teal)/0.4)] focus:border-[hsl(var(--vox-teal)/0.3)] transition-all duration-200 backdrop-blur-sm";

  return (
    <section className="relative overflow-hidden py-28" id="contact">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[hsl(var(--vox-dark))]" />

      {/* Sparkles */}
      <div className="absolute inset-0 z-[1]">
        <Sparkles
          className="absolute inset-0 h-full w-full"
          color="hsl(175, 65%, 50%)"
          size={1}
          density={50}
          speed={0.3}
          opacity={0.35}
        />
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[hsl(var(--vox-teal)/0.06)] rounded-full blur-[150px] pointer-events-none" />

      {/* Border lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent z-[2]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.3)] to-transparent z-[2]" />

      <div className="relative z-10 max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.08] p-8 md:p-10 shadow-[0_24px_64px_hsl(var(--vox-dark)/0.5)]"
        >
          {/* Top glow on card */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--vox-teal)/0.4)] to-transparent rounded-t-2xl" />

          <h2 className="text-[28px] font-semibold text-white text-center mb-2 tracking-tight">
            {t("lead.title")}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("lead.name")}
              className={inputClass}
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("lead.email")}
              className={inputClass}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={t("lead.phone")}
                className={inputClass}
              />
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder={t("lead.company")}
                className={inputClass}
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={(e) => setGdpr(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-white/20 accent-[hsl(var(--vox-teal))]"
              />
              <span className="text-xs text-white/40 leading-relaxed">
                {t("lead.gdpr")}{" "}
                <a href="/privacy" className="underline text-[hsl(var(--vox-teal))] hover:text-[hsl(var(--vox-teal)/0.8)] transition-colors">
                  {t("cookie.privacy")}
                </a>
              </span>
            </label>
            <button
              type="submit"
              disabled={!gdpr || submitting}
              className="w-full py-3.5 rounded-xl vox-gradient-bg text-primary-foreground font-semibold text-sm hover:shadow-lg hover:shadow-[hsl(var(--vox-teal)/0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-px"
            >
              {submitting ? (lang === "de" ? "Wird gesendet..." : "Submitting...") : t("lead.submit")}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadFormSection;

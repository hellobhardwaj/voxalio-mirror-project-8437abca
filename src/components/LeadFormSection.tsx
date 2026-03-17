import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

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
        phone: phone || form.email,
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

  return (
    <section className="py-24 bg-muted/30" id="contact">
      <div className="max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl border border-border p-8 md:p-10 vox-shadow"
        >
          <h2 className="text-2xl font-bold text-foreground text-center mb-2">{t("lead.title")}</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("lead.name")}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("lead.email")}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder={t("lead.phone")}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder={t("lead.company")}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={gdpr}
                onChange={(e) => setGdpr(e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-border accent-primary"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                {t("lead.gdpr")}{" "}
                <a href="/privacy" className="underline text-primary">
                  {t("cookie.privacy")}
                </a>
              </span>
            </label>
            <button
              type="submit"
              disabled={!gdpr || submitting}
              className="w-full py-3 rounded-lg vox-gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
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

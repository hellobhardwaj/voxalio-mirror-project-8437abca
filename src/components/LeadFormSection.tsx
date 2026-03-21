import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Check } from "lucide-react";

const LeadFormSection = () => {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      const { error } = await supabase.from("leads" as any).insert({
        phone: "",
        name: form.name || null,
        email: form.email || null,
        company: form.company || null,
      });
      if (error) console.error("Lead insert error:", error);
    } catch (err) {
      console.error("Failed to store lead:", err);
    }

    setForm({ name: "", email: "", company: "", message: "" });
    setSubmitting(false);
    navigate("/thank-you");
  };

  const bullets = lang === "de"
    ? ["Keine Verpflichtung", "14 Tage kostenlos testen", "Einrichtung in 10 Min"]
    : ["No commitment", "Free 14-day trial", "Setup in 10 min"];

  const labels = lang === "de"
    ? { name: "Vollständiger Name", email: "Geschäftliche E-Mail", company: "Firmenname", message: "Nachricht", submit: "Nachricht senden", heading: "Sprechen wir.", subtitle: "Buchen Sie eine Demo oder sagen Sie einfach Hallo — wir melden uns innerhalb von 24 Stunden." }
    : { name: "Full Name", email: "Work Email", company: "Company Name", message: "Message", submit: "Send Message", heading: "Let's talk.", subtitle: "Book a demo or just say hello — we'll get back within 24 hours" };

  return (
    <section className="relative w-full" id="contact" style={{ backgroundColor: "#1e2128" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-[100px] lg:py-[120px]">
        <div className="flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-24">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-[45%] mb-12 md:mb-0"
          >
            <h2
              className="font-extrabold text-white leading-[0.95] tracking-[-0.03em]"
              style={{ fontSize: "clamp(56px, 6vw, 80px)" }}
            >
              {labels.heading}
            </h2>

            <p className="mt-8 text-white/60 text-[18px] leading-[1.7] max-w-[420px]">
              {labels.subtitle}
            </p>

            <ul className="mt-10 space-y-4">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#2563eb] flex-shrink-0" strokeWidth={3} />
                  <span className="text-white text-[18px] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column — White Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:w-[55%]"
          >
            <div
              className="bg-white rounded-2xl p-8 md:py-10 md:px-12"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[#0f172a] text-sm font-medium mb-2">{labels.name}</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white text-[#0f172a] text-sm border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[#0f172a] transition-colors" />
                </div>
                <div>
                  <label className="block text-[#0f172a] text-sm font-medium mb-2">{labels.email}</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white text-[#0f172a] text-sm border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[#0f172a] transition-colors" />
                </div>
                <div>
                  <label className="block text-[#0f172a] text-sm font-medium mb-2">{labels.company}</label>
                  <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white text-[#0f172a] text-sm border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[#0f172a] transition-colors" />
                </div>
                <div>
                  <label className="block text-[#0f172a] text-sm font-medium mb-2">{labels.message}</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-white text-[#0f172a] text-sm border-[1.5px] border-[#e2e8f0] focus:outline-none focus:border-[#0f172a] transition-colors resize-vertical" style={{ height: "140px" }} />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-[10px] text-white font-semibold text-[16px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[#2563eb] hover:bg-[#1d4ed8]"
                >
                  {submitting ? (lang === "de" ? "Wird gesendet..." : "Sending...") : labels.submit}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;

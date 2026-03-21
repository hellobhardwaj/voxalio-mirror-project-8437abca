import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const { lang } = useLanguage();

  const sections = lang === "de"
    ? [
        { title: "1. Verantwortlicher", content: "Voxalio — Powered by Optimis AI\nKontakt: datenschutz@voxalio.de" },
        { title: "2. Erhobene Daten", content: "Wir erheben personenbezogene Daten nur, wenn Sie diese freiwillig bereitstellen, z.B. über unser Kontaktformular (Name, E-Mail, Telefon, Unternehmen) oder bei Nutzung unserer KI-Anruffunktion (Telefonnummer)." },
        { title: "3. Zweck der Datenverarbeitung", content: "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage, zur Erbringung unserer Dienste und zur Verbesserung unserer KI-Dienste verwendet." },
        { title: "4. Datenspeicherung", content: "Alle Daten werden auf Servern in Nürnberg, Deutschland gespeichert und unterliegen den EU-Datenschutzvorschriften (DSGVO). Daten werden maximal 24 Monate nach letzter Aktivität aufbewahrt." },
        { title: "5. KI-Offenlegung", content: 'Unser KI-Anrufassistent identifiziert sich zu Beginn jedes Anrufs: "Hallo, ich bin ein KI-Assistent für Voxalio."' },
        { title: "6. Cookies", content: "Wir verwenden essentielle Cookies für die Website-Funktionalität. Sie können der Verwendung über unser Cookie-Banner zustimmen oder sie ablehnen." },
        { title: "7. Ihre Rechte", content: "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter datenschutz@voxalio.de." },
      ]
    : [
        { title: "1. Data Controller", content: "Voxalio — Powered by Optimis AI\nContact: privacy@voxalio.de" },
        { title: "2. Data We Collect", content: "We collect personal data only when you voluntarily provide it, e.g. via our contact form (name, email, phone, company) or when using our AI call feature (phone number)." },
        { title: "3. Purpose of Processing", content: "Your data is used solely to process your inquiry, provide our services, and improve our AI services." },
        { title: "4. Data Storage & Retention", content: "All data is stored on servers in Nuremberg, Germany and is subject to EU data protection regulations (GDPR). Data is retained for a maximum of 24 months after last activity." },
        { title: "5. AI Disclosure", content: 'Our AI call assistant identifies itself at the beginning of every call: "Hello, I am an AI assistant for Voxalio."' },
        { title: "6. Cookies", content: "We use essential cookies for website functionality. You can accept or decline their use via our cookie banner." },
        { title: "7. Your Rights", content: "You have the right to access, rectify, delete, and restrict the processing of your personal data. Contact us at privacy@voxalio.de." },
      ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-3xl)] mb-2">
          {lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>
        <p className="text-[var(--text-sm)] text-[var(--text-muted)] mb-8">Last updated: March 2026</p>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display font-semibold text-[var(--text-primary)] text-lg mb-3">{s.title}</h2>
              <p className="text-[var(--text-secondary)] text-[var(--text-base)] leading-[1.7] whitespace-pre-line">{s.content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

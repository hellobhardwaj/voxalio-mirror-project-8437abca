import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIDisclosure = () => {
  const { lang } = useLanguage();

  const sections = lang === "de"
    ? [
        { title: "Pflichthinweis bei jedem Anruf", content: 'Voxalio identifiziert sich zu Beginn jedes Telefonats als KI-Assistent. Der erste Satz jedes Anrufs lautet: "Hallo, ich bin ein KI-Assistent für [Firmenname]."' },
        { title: "Wie unsere KI funktioniert", content: "Voxalio verwendet fortschrittliche Sprachmodelle, um natürliche Gespräche zu führen." },
        { title: "Datenverarbeitung", content: "Alle Gesprächsdaten werden DSGVO-konform auf Servern in Deutschland verarbeitet und gespeichert." },
        { title: "Eskalation an Menschen", content: "Wenn die KI eine Anfrage nicht bearbeiten kann, wird der Anruf nahtlos an einen verfügbaren Mitarbeiter weitergeleitet." },
      ]
    : [
        { title: "Mandatory Disclosure on Every Call", content: 'Voxalio identifies itself as an AI assistant at the beginning of every phone call.' },
        { title: "How Our AI Works", content: "Voxalio uses advanced language models to conduct natural conversations." },
        { title: "Data Processing", content: "All conversation data is processed and stored on servers in Germany in compliance with GDPR." },
        { title: "Human Escalation", content: "When the AI cannot handle a request, the call is seamlessly transferred to an available team member." },
      ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="font-display font-bold text-[var(--text-primary)] text-[var(--text-3xl)] mb-8">
          {lang === "de" ? "KI-Offenlegung" : "AI Disclosure"}
        </h1>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display font-semibold text-[var(--text-primary)] text-lg mb-3">{s.title}</h2>
              <p className="text-[var(--text-secondary)] text-[var(--text-base)] leading-[1.7]">{s.content}</p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIDisclosure;

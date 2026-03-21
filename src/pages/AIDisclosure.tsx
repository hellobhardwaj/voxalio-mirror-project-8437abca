import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AIDisclosure = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {lang === "de" ? "KI-Offenlegung" : "AI Disclosure"}
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "Pflichthinweis bei jedem Anruf" : "Mandatory Disclosure on Every Call"}
            </h2>
            <p>
              {lang === "de"
                ? "Voxalio identifiziert sich zu Beginn jedes Telefonats als KI-Assistent. Der erste Satz jedes Anrufs lautet: \"Hallo, ich bin ein KI-Assistent für [Firmenname].\""
                : "Voxalio identifies itself as an AI assistant at the beginning of every phone call. The first sentence of each call is: \"Hello, I am an AI assistant for [Company Name].\""}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "Wie unsere KI funktioniert" : "How Our AI Works"}
            </h2>
            <p>
              {lang === "de"
                ? "Voxalio verwendet fortschrittliche Sprachmodelle, um natürliche Gespräche zu führen. Die KI versteht Kontext, beantwortet Fragen und kann Aktionen wie Terminbuchungen oder Datenerfassung durchführen."
                : "Voxalio uses advanced language models to conduct natural conversations. The AI understands context, answers questions, and can perform actions such as appointment booking or data collection."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "Datenverarbeitung" : "Data Processing"}
            </h2>
            <p>
              {lang === "de"
                ? "Alle Gesprächsdaten werden DSGVO-konform auf Servern in Deutschland verarbeitet und gespeichert. Aufzeichnungen werden nur mit ausdrücklicher Zustimmung des Anrufers erstellt."
                : "All conversation data is processed and stored on servers in Germany in compliance with GDPR. Recordings are only made with the explicit consent of the caller."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "Eskalation an Menschen" : "Human Escalation"}
            </h2>
            <p>
              {lang === "de"
                ? "Wenn die KI eine Anfrage nicht bearbeiten kann oder der Anrufer einen menschlichen Gesprächspartner wünscht, wird der Anruf nahtlos an einen verfügbaren Mitarbeiter weitergeleitet."
                : "When the AI cannot handle a request or the caller requests a human agent, the call is seamlessly transferred to an available team member."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIDisclosure;

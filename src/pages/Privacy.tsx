import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          {lang === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>

        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "1. Verantwortlicher" : "1. Data Controller"}
            </h2>
            <p>
              Voxalio — Powered by Optimis AI<br />
              {lang === "de" ? "Kontakt: datenschutz@voxalio.de" : "Contact: privacy@voxalio.de"}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "2. Erhobene Daten" : "2. Data We Collect"}
            </h2>
            <p>
              {lang === "de"
                ? "Wir erheben personenbezogene Daten nur, wenn Sie diese freiwillig bereitstellen, z.B. über unser Kontaktformular (Name, E-Mail, Telefon, Unternehmen) oder bei Nutzung unserer KI-Anruffunktion (Telefonnummer)."
                : "We collect personal data only when you voluntarily provide it, e.g. via our contact form (name, email, phone, company) or when using our AI call feature (phone number)."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "3. Zweck der Datenverarbeitung" : "3. Purpose of Processing"}
            </h2>
            <p>
              {lang === "de"
                ? "Ihre Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage, zur Erbringung unserer Dienste und zur Verbesserung unserer KI-Dienste verwendet."
                : "Your data is used solely to process your inquiry, provide our services, and improve our AI services."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "4. Datenspeicherung" : "4. Data Storage"}
            </h2>
            <p>
              {lang === "de"
                ? "Alle Daten werden auf Servern in Deutschland gespeichert und unterliegen den EU-Datenschutzvorschriften (DSGVO)."
                : "All data is stored on servers located in Germany and is subject to EU data protection regulations (GDPR)."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "5. KI-Offenlegung" : "5. AI Disclosure"}
            </h2>
            <p>
              {lang === "de"
                ? "Unser KI-Anrufassistent identifiziert sich zu Beginn jedes Anrufs: \"Hallo, ich bin ein KI-Assistent für Voxalio.\""
                : "Our AI call assistant identifies itself at the beginning of every call: \"Hello, I am an AI assistant for Voxalio.\""}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "6. Cookies" : "6. Cookies"}
            </h2>
            <p>
              {lang === "de"
                ? "Wir verwenden essentielle Cookies für die Website-Funktionalität. Sie können der Verwendung über unser Cookie-Banner zustimmen oder sie ablehnen."
                : "We use essential cookies for website functionality. You can accept or decline their use via our cookie banner."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground">
              {lang === "de" ? "7. Ihre Rechte" : "7. Your Rights"}
            </h2>
            <p>
              {lang === "de"
                ? "Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten. Kontaktieren Sie uns unter datenschutz@voxalio.de."
                : "You have the right to access, rectify, delete, and restrict the processing of your personal data. Contact us at privacy@voxalio.de."}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GDPR = () => {
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1e" }}>
      <Navbar />
      <main className="pt-32 pb-20 max-w-3xl mx-auto px-6">
        <h1 className="font-display font-700 text-white text-3xl mb-8">
          {lang === "de" ? "DSGVO-Konformität" : "GDPR Compliance"}
        </h1>
        <div className="space-y-8 text-[#94a3b8] text-[15px] leading-[1.7]">
          <section>
            <h2 className="font-display font-600 text-white text-lg mb-3">
              {lang === "de" ? "Datenspeicherort" : "Data Location"}
            </h2>
            <p>
              {lang === "de"
                ? "Alle Daten werden auf Servern in Nürnberg, Deutschland verarbeitet und gespeichert. Unsere Infrastruktur wird von zertifizierten EU-Rechenzentren betrieben."
                : "All data is processed and stored on servers in Nuremberg, Germany. Our infrastructure is operated by certified EU data centers."}
            </p>
          </section>
          <section>
            <h2 className="font-display font-600 text-white text-lg mb-3">
              {lang === "de" ? "Ihre Rechte" : "Your Rights"}
            </h2>
            <p>
              {lang === "de"
                ? "Gemäß DSGVO haben Sie das Recht auf: Auskunft über Ihre gespeicherten Daten, Berichtigung unrichtiger Daten, Löschung Ihrer Daten, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen die Verarbeitung."
                : "Under GDPR, you have the right to: access your stored data, rectify inaccurate data, delete your data, restrict processing, data portability, and object to processing."}
            </p>
          </section>
          <section>
            <h2 className="font-display font-600 text-white text-lg mb-3">
              {lang === "de" ? "Datenlöschung" : "Data Deletion"}
            </h2>
            <p>
              {lang === "de"
                ? "Sie können die Löschung Ihrer Daten jederzeit beantragen. Wir löschen alle personenbezogenen Daten innerhalb von 30 Tagen nach Ihrer Anfrage."
                : "You can request deletion of your data at any time. We delete all personal data within 30 days of your request."}
            </p>
          </section>
          <section>
            <h2 className="font-display font-600 text-white text-lg mb-3">
              {lang === "de" ? "Kontakt" : "Contact"}
            </h2>
            <p>
              {lang === "de"
                ? "Für DSGVO-bezogene Anfragen kontaktieren Sie uns unter: datenschutz@voxalio.de"
                : "For GDPR-related inquiries, contact us at: privacy@voxalio.de"}
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GDPR;

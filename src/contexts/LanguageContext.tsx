import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.howItWorks": { en: "How It Works", de: "So funktioniert's" },
  "nav.useCases": { en: "Use Cases", de: "Anwendungsfälle" },
  "nav.pricing": { en: "Pricing", de: "Preise" },
  "nav.partner": { en: "Contact", de: "Kontakt" },
  "nav.resources": { en: "Resources", de: "Ressourcen" },
  "nav.about": { en: "About Voxalio", de: "Über Voxalio" },
  "nav.bookDemo": { en: "Book Demo", de: "Demo buchen" },
  "nav.startNow": { en: "Start Now", de: "Jetzt starten" },

  // Hero
  "hero.badge": { en: "AI Calls Made Easy", de: "KI-Anrufe leicht gemacht" },
  "hero.title": { en: "Let your AI Call Assistant work for you", de: "Lassen Sie Ihren KI-Anrufassistenten für Sie arbeiten" },
  "hero.subtitle": { en: "Test our AI in a call", de: "Testen Sie unsere KI in einem Anruf" },
  "hero.placeholder": { en: "e.g. +44123456789", de: "z.B. +4917612345678" },
  "hero.cta": { en: "Get A Call", de: "Anruf erhalten" },

  // Logo bar
  "logo.customers": { en: "6,000+ Customers", de: "6.000+ Kunden" },

  // Video
  "video.title": { en: "Get started\nin 3 minutes", de: "In 3 Minuten\nloslegen" },
  "video.tutorial": { en: "Platform Tutorial", de: "Plattform-Tutorial" },
  "video.ceo": { en: "CEO & Co-Founder, Daniel Kahrizi", de: "CEO & Mitgründer, Daniel Kahrizi" },
  "video.cta": { en: "Build your own AI call assistant", de: "Erstellen Sie Ihren eigenen KI-Anrufassistenten" },

  // How it works
  "how.title": { en: "Set up your AI Call Assistant", de: "Richten Sie Ihren KI-Anrufassistenten ein" },
  "how.subtitle": { en: "100% No-Code and takes less than 10 minutes!", de: "100% No-Code und in weniger als 10 Minuten!" },
  "how.step1.title": { en: "Give your AI assistant a voice", de: "Geben Sie Ihrem KI-Assistenten eine Stimme" },
  "how.step1.desc": { en: "Bring your AI call assistant to life by choosing a voice that perfectly represents your company. All our AI voices sound amazingly human.", de: "Erwecken Sie Ihren KI-Anrufassistenten zum Leben, indem Sie eine Stimme wählen, die Ihr Unternehmen perfekt repräsentiert." },
  "how.step2.title": { en: "Select tasks for your AI assistant", de: "Wählen Sie Aufgaben für Ihren KI-Assistenten" },
  "how.step2.desc": { en: "Define the tasks your AI call assistant will handle for you, along with your company details and covered topics.", de: "Definieren Sie die Aufgaben, die Ihr KI-Anrufassistent für Sie übernehmen soll." },
  "how.step3.title": { en: "Get your AI phone number", de: "Erhalten Sie Ihre KI-Telefonnummer" },
  "how.step3.desc": { en: "Your AI call assistant gets its own number directly within our platform. One click and your AI assistant is reachable 24/7.", de: "Ihr KI-Anrufassistent erhält seine eigene Nummer direkt auf unserer Plattform." },
  "how.step4.title": { en: "Integrate your AI assistant", de: "Integrieren Sie Ihren KI-Assistenten" },
  "how.step4.desc": { en: "Seamlessly integrate your AI call assistant with your internal systems, such as CRM, calendars, and databases.", de: "Integrieren Sie Ihren KI-Anrufassistenten nahtlos in Ihre internen Systeme." },
  "how.step5.title": { en: "Run and monitor your AI calls", de: "Starten und überwachen Sie Ihre KI-Anrufe" },
  "how.step5.desc": { en: "Once your AI assistant has all the necessary information, you can activate it instantly and monitor results in real time.", de: "Sobald Ihr KI-Assistent alle nötigen Informationen hat, können Sie ihn sofort aktivieren." },

  // Use cases
  "uc.title": { en: "Use Cases for AI Calls with Voxalio", de: "Anwendungsfälle für KI-Anrufe mit Voxalio" },
  "uc.desc": { en: "Our AI call assistant adapts flexibly to your needs and integrates seamlessly with your systems like calendars and CRMs. AI calls that truly make sense!", de: "Unser KI-Anrufassistent passt sich flexibel an Ihre Bedürfnisse an und integriert sich nahtlos in Ihre Systeme." },
  "uc.signup": { en: "Sign up now", de: "Jetzt anmelden" },
  "uc.frontDesk": { en: "Front-Desk", de: "Empfang" },
  "uc.frontDeskDesc": { en: "Our AI assistant handles incoming calls and seamlessly transfers them to the right team members when needed.", de: "Unser KI-Assistent bearbeitet eingehende Anrufe und leitet sie bei Bedarf nahtlos weiter." },
  "uc.transcription": { en: "Transcription", de: "Transkription" },
  "uc.transcriptionDesc": { en: "Our AI captures customer inquiries, transcribes them, and sends them straight to your inbox when you're unavailable.", de: "Unsere KI erfasst Kundenanfragen, transkribiert sie und sendet sie direkt in Ihren Posteingang." },
  "uc.customerService": { en: "Customer Service", de: "Kundenservice" },
  "uc.customerServiceDesc": { en: "Let our AI handle customer inquiries 24/7. Through our platform, you can precisely configure the AI's responses.", de: "Lassen Sie unsere KI Kundenanfragen rund um die Uhr bearbeiten." },
  "uc.orderProcessing": { en: "Order Processing", de: "Auftragsbearbeitung" },
  "uc.orderProcessingDesc": { en: "Provide fast service with automated 24/7 request processing.", de: "Bieten Sie schnellen Service mit automatisierter 24/7-Anfragenbearbeitung." },
  "uc.appointments": { en: "Appointment Scheduling", de: "Terminplanung" },
  "uc.appointmentsDesc": { en: "Our AI schedules appointments during calls — compatible with all calendars supported by cal.com.", de: "Unsere KI plant Termine während des Anrufs — kompatibel mit allen von cal.com unterstützten Kalendern." },
  "uc.more": { en: "100+ More Use Cases", de: "100+ weitere Anwendungsfälle" },
  "uc.moreDesc": { en: "Explore our full library of use cases tailored to every industry and workflow.", de: "Entdecken Sie unsere vollständige Bibliothek von Anwendungsfällen." },

  // Compliance
  "comp.aiStarted": { en: "AI call started", de: "KI-Anruf gestartet" },
  "comp.aiMsg": { en: "Hello, this is Voxalio, the AI assistant for BrightHome Solutions. How can I help you today?", de: "Hallo, hier ist Voxalio, der KI-Assistent für BrightHome Solutions. Wie kann ich Ihnen helfen?" },
  "comp.userMsg": { en: "Hi, I'd like to schedule an appointment for next Tuesday please.", de: "Hallo, ich möchte gerne einen Termin für nächsten Dienstag vereinbaren." },
  "comp.aiReply": { en: "Of course! I have availability on Tuesday at 10:00 AM and 2:00 PM. Which would you prefer?", de: "Natürlich! Am Dienstag habe ich um 10:00 und 14:00 Uhr Verfügbarkeit. Was passt Ihnen besser?" },

  // Testimonials
  "test.title": { en: "What customers say about our AI Call Assistant:", de: "Was Kunden über unseren KI-Anrufassistenten sagen:" },
  "test.quote": { en: "\"Since we started using Voxalio to handle our support calls, we can finally focus on our core work again. What matters most to me is that special cases or important requests are still forwarded by the AI to my personal number.\"", de: "\"Seit wir Voxalio für unsere Support-Anrufe nutzen, können wir uns endlich wieder auf unsere Kernarbeit konzentrieren. Am wichtigsten ist mir, dass Sonderfälle weiterhin an meine persönliche Nummer weitergeleitet werden.\"" },
  "test.author": { en: "— Maria K., BrightHome Solutions", de: "— Maria K., BrightHome Solutions" },

  // Integrations
  "int.title": { en: "Integrations", de: "Integrationen" },
  "int.desc": { en: "Our AI Call Assistant integrates seamlessly with your internal systems such as CRMs, calendars, and databases to accurately capture and retrieve data.", de: "Unser KI-Anrufassistent integriert sich nahtlos in Ihre internen Systeme wie CRMs, Kalender und Datenbanken." },

  // FAQ
  "faq.title": { en: "Frequently asked\nquestions", de: "Häufig gestellte\nFragen" },
  "faq.q1": { en: "Do you really have the best AI call assistant?", de: "Haben Sie wirklich den besten KI-Anrufassistenten?" },
  "faq.a1": { en: "We believe so! Voxalio combines cutting-edge voice AI with enterprise-grade reliability, GDPR compliance, and seamless integrations — all in a no-code platform.", de: "Wir glauben schon! Voxalio kombiniert modernste Sprach-KI mit Enterprise-Zuverlässigkeit, DSGVO-Konformität und nahtlosen Integrationen." },
  "faq.q2": { en: "Is the data stored within the EU?", de: "Werden die Daten innerhalb der EU gespeichert?" },
  "faq.a2": { en: "Yes. All data is stored on servers located in Germany, fully compliant with EU data protection regulations.", de: "Ja. Alle Daten werden auf Servern in Deutschland gespeichert, vollständig konform mit den EU-Datenschutzvorschriften." },
  "faq.q3": { en: "Where can I hear a Voxalio AI demo call?", de: "Wo kann ich einen Voxalio KI-Demo-Anruf hören?" },
  "faq.a3": { en: "Right here! Use the 'Talk to our AI' widget on this page to get an instant demo call.", de: "Genau hier! Nutzen Sie das 'Mit unserer KI sprechen'-Widget auf dieser Seite für einen sofortigen Demo-Anruf." },
  "faq.q4": { en: "Can the AI Call Assistant be used to make outbound calls reliably and at scale?", de: "Kann der KI-Anrufassistent zuverlässig und in großem Umfang für ausgehende Anrufe eingesetzt werden?" },
  "faq.a4": { en: "Absolutely. Our infrastructure supports high-volume outbound campaigns with reliable delivery and real-time monitoring.", de: "Absolut. Unsere Infrastruktur unterstützt Kampagnen mit hohem Volumen bei zuverlässiger Zustellung und Echtzeit-Überwachung." },
  "faq.q5": { en: "How quickly can I get my AI Call Assistant up and running?", de: "Wie schnell kann ich meinen KI-Anrufassistenten einrichten?" },
  "faq.a5": { en: "In less than 10 minutes. Our no-code platform makes setup fast and simple.", de: "In weniger als 10 Minuten. Unsere No-Code-Plattform macht die Einrichtung schnell und einfach." },
  "faq.q6": { en: "What happens if the AI makes a mistake?", de: "Was passiert, wenn die KI einen Fehler macht?" },
  "faq.a6": { en: "Our AI can seamlessly transfer calls to a human agent when it detects uncertainty or complex situations.", de: "Unsere KI kann Anrufe nahtlos an einen menschlichen Agenten weiterleiten, wenn sie Unsicherheit oder komplexe Situationen erkennt." },

  // CTA
  "cta.title": { en: "Rethinking calls with Voxalio", de: "Anrufe neu denken mit Voxalio" },
  "cta.desc": { en: "Just try it! Install and see how your AI Call Assistant automates your calls, saves resources, and supports your team around the clock.", de: "Probieren Sie es einfach! Installieren Sie und sehen Sie, wie Ihr KI-Anrufassistent Ihre Anrufe automatisiert und Ihr Team rund um die Uhr unterstützt." },
  "cta.button": { en: "Start Now — It's Free", de: "Jetzt starten — Kostenlos" },

  // Pricing
  "pricing.title": { en: "Simple, transparent pricing", de: "Einfache, transparente Preise" },
  "pricing.subtitle": { en: "Start free. Scale as you grow. Up to 95% cheaper than competitors.", de: "Kostenlos starten. Skalieren Sie mit Ihrem Wachstum. Bis zu 95% günstiger als Mitbewerber." },
  "pricing.starter": { en: "Starter", de: "Starter" },
  "pricing.starterPrice": { en: "Free", de: "Kostenlos" },
  "pricing.starterDesc": { en: "Perfect for testing and small projects", de: "Perfekt zum Testen und für kleine Projekte" },
  "pricing.pro": { en: "Professional", de: "Professional" },
  "pricing.proPrice": { en: "€49/mo", de: "49€/Monat" },
  "pricing.proDesc": { en: "For growing businesses", de: "Für wachsende Unternehmen" },
  "pricing.enterprise": { en: "Enterprise", de: "Enterprise" },
  "pricing.enterprisePrice": { en: "Custom", de: "Individuell" },
  "pricing.enterpriseDesc": { en: "For large organizations", de: "Für große Organisationen" },
  "pricing.getStarted": { en: "Get Started", de: "Loslegen" },
  "pricing.contactSales": { en: "Contact Sales", de: "Vertrieb kontaktieren" },
  "pricing.popular": { en: "Most Popular", de: "Beliebteste" },
  "pricing.perMin": { en: "~€0.006–0.008/min", de: "~0,006–0,008€/Min." },
  "pricing.competitorMin": { en: "Competitors: €0.12–0.15/min", de: "Mitbewerber: 0,12–0,15€/Min." },

  // Lead form
  "lead.title": { en: "Get in touch", de: "Kontaktieren Sie uns" },
  "lead.name": { en: "Full Name", de: "Vollständiger Name" },
  "lead.email": { en: "Email", de: "E-Mail" },
  "lead.phone": { en: "Phone", de: "Telefon" },
  "lead.company": { en: "Company", de: "Unternehmen" },
  "lead.gdpr": { en: "I agree to the processing of my data in accordance with the privacy policy.", de: "Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu." },
  "lead.submit": { en: "Submit", de: "Absenden" },

  // Cookie
  "cookie.text": { en: "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.", de: "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Durch die weitere Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu." },
  "cookie.accept": { en: "Accept", de: "Akzeptieren" },
  "cookie.decline": { en: "Decline", de: "Ablehnen" },
  "cookie.privacy": { en: "Privacy Policy", de: "Datenschutzerklärung" },

  // Calendly
  "calendly.title": { en: "Book a Demo", de: "Demo buchen" },
  "calendly.subtitle": { en: "Schedule a personalized walkthrough with our team.", de: "Vereinbaren Sie eine persönliche Vorstellung mit unserem Team." },

  // Thank you
  "thankyou.title": { en: "Thank you!", de: "Vielen Dank!" },
  "thankyou.desc": { en: "Your message has been received. We'll be in touch shortly.", de: "Ihre Nachricht wurde empfangen. Wir melden uns in Kürze bei Ihnen." },
  "thankyou.back": { en: "Back to Home", de: "Zurück zur Startseite" },

  // Footer
  "footer.disclosure": { en: "AI Disclosure: \"Hello, I am an AI assistant for Voxalio.\"", de: "KI-Hinweis: \"Hallo, ich bin ein KI-Assistent für Voxalio.\"" },
  "footer.powered": { en: "Powered by Optimis AI", de: "Powered by Optimis AI" },
  "footer.rights": { en: "© 2026 Voxalio. All rights reserved.", de: "© 2026 Voxalio. Alle Rechte vorbehalten." },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};

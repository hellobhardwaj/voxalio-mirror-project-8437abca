import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" style={{ background: "#0a0f1e" }}>
      <Navbar />
      <main className="flex items-center justify-center min-h-[70vh] px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display font-700 text-white text-4xl mb-4">{t("thankyou.title")}</h1>
          <p className="text-[#94a3b8] text-[16px] leading-[1.7] mb-8">{t("thankyou.desc")}</p>
          <Link to="/" className="inline-block px-6 py-3 rounded-lg bg-[#2563eb] text-white font-display font-600 text-[14px] hover:bg-[#1d4ed8] transition-all">
            {t("thankyou.back")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <Navbar />
      <main className="flex items-center justify-center min-h-[70vh] px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display font-bold text-[var(--text-primary)] text-4xl mb-4">{t("thankyou.title")}</h1>
          <p className="text-[var(--text-secondary)] text-[16px] leading-[1.7] mb-8">{t("thankyou.desc")}</p>
          <Link to="/" className="inline-block px-6 py-3 rounded-lg text-white font-display font-semibold text-[14px] transition-all vox-gradient-bg vox-btn-glow">
            {t("thankyou.back")}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

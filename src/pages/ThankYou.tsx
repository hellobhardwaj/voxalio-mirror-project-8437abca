import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ThankYou = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-[rgba(37,99,235,0.1)] flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#2563eb]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            {t("thankyou.title")}
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {t("thankyou.desc")}
          </p>
          <a
            href="/"
            className="inline-block bg-[#2563eb] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#1d4ed8] transition-all"
          >
            {t("thankyou.back")}
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYou;

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const CookieBanner = () => {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("voxalio-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("voxalio-cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("voxalio-cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-5 vox-shadow-lg flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm text-muted-foreground flex-1">
              {t("cookie.text")}{" "}
              <a href="/privacy" className="underline text-primary hover:opacity-80">
                {t("cookie.privacy")}
              </a>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {t("cookie.decline")}
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 rounded-lg vox-gradient-bg text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {t("cookie.accept")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;

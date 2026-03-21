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
          <div className="max-w-4xl mx-auto rounded-[20px] p-5 flex flex-col sm:flex-row items-center gap-4" style={{ background: "rgba(19,17,31,0.95)", border: "1px solid rgba(139,92,246,0.15)", backdropFilter: "blur(20px)", boxShadow: "0 -8px 40px rgba(0,0,0,0.3)" }}>
            <p className="text-sm text-muted-foreground flex-1">
              {t("cookie.text")}{" "}
              <a href="/privacy" className="underline text-[#a855f7] hover:opacity-80">
                {t("cookie.privacy")}
              </a>
            </p>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={handleDecline}
                className="px-5 py-2 rounded-xl text-sm font-medium text-white/70 transition-colors"
                style={{ border: "1px solid rgba(139,92,246,0.2)", background: "rgba(124,58,237,0.08)" }}
              >
                {t("cookie.decline")}
              </button>
              <button
                onClick={handleAccept}
                className="px-5 py-2 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity vox-gradient-bg"
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

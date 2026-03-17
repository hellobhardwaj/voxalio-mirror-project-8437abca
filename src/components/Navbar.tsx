import { useState } from "react";
import { ChevronDown, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t("nav.useCases"), href: "#use-cases" },
    { label: t("nav.testimonials"), href: "#testimonials" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.partner"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 vox-glass border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="text-[16px] font-medium tracking-[-0.02em] text-foreground">
          Voxalio<span className="vox-gradient-text">.de</span>
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-2 text-[14px] font-normal text-muted-foreground hover:text-foreground transition-all duration-200 flex items-center gap-1 rounded-lg hover:bg-muted/50 tracking-[-0.01em]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <a href="#contact" className="text-[14px] font-medium text-foreground hover:text-primary transition-colors duration-200 tracking-[-0.01em]">
            {t("nav.bookDemo")}
          </a>
          <a
            href="#contact"
            className="vox-gradient-bg text-primary-foreground px-5 py-2 rounded-full text-[14px] font-medium hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-px tracking-[-0.01em]"
          >
            {t("nav.startNow")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1 px-2 py-1 rounded border border-border text-xs font-medium text-muted-foreground"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                className="vox-gradient-bg text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold text-center mt-3"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.startNow")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.useCases"), href: "#use-cases" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.partner"), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 vox-glass border-b" style={{ borderColor: "rgba(139,92,246,0.12)", height: 64 }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 18.5C15.5 18.5 18.5 15.5 18.5 12C18.5 8.5 15.5 5.5 12 5.5C8.5 5.5 5.5 8.5 5.5 12C5.5 15.5 8.5 18.5 12 18.5Z" />
              <path d="M8 12h1.5l1-3 1.5 6 1.5-6 1 3H16" />
            </svg>
          </div>
          <span className="font-display font-700 text-white text-lg tracking-tight">Voxalio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-white transition-colors duration-200 rounded-lg group"
            >
              {item.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </a>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.1] text-xs font-medium text-muted-foreground hover:text-white hover:border-white/[0.2] transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <a
            href="#booking"
            className="px-5 py-2 rounded-lg border border-white/[0.15] text-white text-sm font-medium hover:bg-white/[0.05] transition-all duration-200"
          >
            {t("nav.bookDemo")}
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-lg text-white text-sm font-medium transition-all duration-200 vox-gradient-bg vox-btn-glow"
          >
            {t("nav.startNow")}
          </a>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1 px-2 py-1 rounded border border-white/[0.1] text-xs font-medium text-muted-foreground"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <button className="text-white" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="lg:hidden overflow-hidden border-b"
            style={{ background: "rgba(10,8,18,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(139,92,246,0.12)" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#booking"
                className="py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-white rounded-lg hover:bg-white/[0.05] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.bookDemo")}
              </a>
              <a
                href="#contact"
                className="vox-gradient-bg text-white px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-3"
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

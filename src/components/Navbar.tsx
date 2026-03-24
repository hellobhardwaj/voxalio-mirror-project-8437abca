import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import voxalioIcon from "@/assets/voxalio-icon.png";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y > 100 && y > lastScrollY.current + 5) {
        setHidden(true);
      } else if (y < lastScrollY.current - 5) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: t("nav.howItWorks"), href: "#how-it-works" },
    { label: t("nav.useCases"), href: "#use-cases" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: "Blog", href: "/blog", isRoute: true },
    { label: t("nav.partner"), href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: 64,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid transparent",
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={voxalioIcon} alt="Voxalio" className="w-8 h-8 rounded-lg object-contain" />
          <span className="font-display font-bold text-[var(--text-primary)] text-lg tracking-tight">Voxalio</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center" style={{ gap: 32 }}>
          {navItems.map((item) =>
            (item as any).isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className="relative text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="relative text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )
          )}
        </div>

        {/* Desktop buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "de" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <a
            href="#booking"
            className="px-5 py-2 rounded-lg text-[var(--text-primary)] text-sm font-medium transition-all duration-200 hover:border-[rgba(37,99,235,0.4)]"
            style={{ border: "1px solid #e2e8f0" }}
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
            className="flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-[var(--text-secondary)]"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "DE" : "EN"}
          </button>
          <button className="text-[var(--text-primary)] p-1" onClick={() => setMobileOpen(!mobileOpen)}>
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
            className="lg:hidden overflow-hidden"
            style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid #e2e8f0" }}
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) =>
                (item as any).isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="py-3 px-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[rgba(37,99,235,0.04)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-3 px-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[rgba(37,99,235,0.04)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                href="#booking"
                className="py-3 px-3 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-lg hover:bg-[rgba(37,99,235,0.04)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.bookDemo")}
              </a>
              <a
                href="#contact"
                className="vox-gradient-bg text-white px-5 py-3 rounded-lg text-sm font-semibold text-center mt-3"
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

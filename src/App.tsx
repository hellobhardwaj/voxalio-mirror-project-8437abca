import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import LoadingGate from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import AIDisclosure from "./pages/AIDisclosure";
import GDPR from "./pages/GDPR";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/ai-disclosure" element={<AIDisclosure />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoadingGate>
          <CustomCursor />
          <SmoothScroll>
            <BrowserRouter>
              <AnimatedRoutes />
            </BrowserRouter>
          </SmoothScroll>
        </LoadingGate>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UseCasesSection from "@/components/UseCasesSection";
import TrustSection from "@/components/TrustSection";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardShowcase from "@/components/DashboardShowcase";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import LeadFormSection from "@/components/LeadFormSection";
import CalendlySection from "@/components/CalendlySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/ScrollProgress";
import { motion } from "framer-motion";

const Index = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen"
    style={{ background: "var(--bg-dark)" }}
  >
    <ScrollProgress />
    <Navbar />
    <HeroSection />
    <StatsBar />
    <ValuePropositionSection />
    <HowItWorksSection />
    <UseCasesSection />
    <TrustSection />
    <div style={{ background: "var(--bg-dark)" }} className="py-24 md:py-32">
      <DashboardHeader />
      <DashboardShowcase />
    </div>
    <IntegrationsSection />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <LeadFormSection />
    <CalendlySection />
    <CTASection />
    <Footer />
    <CookieBanner />
  </motion.div>
);

export default Index;

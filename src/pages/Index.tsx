import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import VideoSection from "@/components/VideoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UseCasesSection from "@/components/UseCasesSection";

import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import LeadFormSection from "@/components/LeadFormSection";
import CalendlySection from "@/components/CalendlySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => (
  <div className="min-h-screen bg-background">
    <ScrollProgress />
    <Navbar />
    <HeroSection />
    <ValuePropositionSection />
    <VideoSection />
    <div className="vox-section-divider max-w-5xl mx-auto" />
    <HowItWorksSection />
    <UseCasesSection />
    
    <div className="vox-section-divider max-w-5xl mx-auto" />
    <IntegrationsSection />
    <div className="vox-section-divider max-w-5xl mx-auto" />
    <PricingSection />
    <FAQSection />
    <LeadFormSection />
    <CalendlySection />
    <CTASection />
    <Footer />
    <CookieBanner />
  </div>
);

export default Index;

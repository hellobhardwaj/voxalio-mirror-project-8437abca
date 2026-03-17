import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoBar from "@/components/LogoBar";
import VideoSection from "@/components/VideoSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import UseCasesSection from "@/components/UseCasesSection";
import ComplianceSection from "@/components/ComplianceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import IntegrationsSection from "@/components/IntegrationsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <LogoBar />
    <VideoSection />
    <HowItWorksSection />
    <UseCasesSection />
    <ComplianceSection />
    <TestimonialsSection />
    <IntegrationsSection />
    <FAQSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;

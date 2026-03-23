import { useState, Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import HowItWorksSection from "@/components/HowItWorksSection";

import TrustSection from "@/components/TrustSection";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardShowcase from "@/components/DashboardShowcase";
import DitheringBackground from "@/components/DitheringBackground";
import IntegrationsSection from "@/components/IntegrationsSection";
import PricingSection from "@/components/PricingSection";

import FAQSection from "@/components/FAQSection";
import LeadFormSection from "@/components/LeadFormSection";
import CalendlySection from "@/components/CalendlySection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/ScrollProgress";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
);

const Index = () => {
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-dark)" }}>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <StatsBar />
      <ValuePropositionSection />
      <HowItWorksSection />
      
      <TrustSection />
      <div
        className="relative py-8 md:py-12 overflow-hidden"
        style={{ background: "var(--bg-dark)", borderTop: "1px solid rgba(0,0,0,0.12)" }}
        onMouseEnter={() => setIsDashboardHovered(true)}
        onMouseLeave={() => setIsDashboardHovered(false)}
      >
        {/* Dithering shader background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ mixBlendMode: "multiply" }}>
          <Suspense fallback={null}>
            <Dithering
              colorBack="#00000000"
              colorFront="#2563eb"
              speed={isDashboardHovered ? 0.6 : 0.2}
              scale={3}
              style={{ width: "100%", height: "100%", opacity: 0.3 }}
            />
          </Suspense>
        </div>
        <div className="relative z-[1]">
          <DashboardHeader />
          <DashboardShowcase />
        </div>
      </div>
      <IntegrationsSection />
      <PricingSection />
      
      <FAQSection />
      <LeadFormSection />
      <CalendlySection />
      <CTASection />
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default Index;

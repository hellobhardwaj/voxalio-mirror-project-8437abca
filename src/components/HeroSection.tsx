import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroWaveform from "@/components/HeroWaveform";
import HeroPhoneMockup from "@/components/HeroPhoneMockup";

const HeroSection = () => {
  const { t, lang } = useLanguage();

  return (
    <section className="pt-20 md:pt-24 pb-4 md:pb-6 overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[75vh] md:min-h-[85vh]">
          {/* LEFT PANEL — Dark waveform */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ background: "#0a0a1a" }}
          >
            {/* Dot grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative z-10 h-full">
              <HeroWaveform />
            </div>
          </motion.div>

          {/* RIGHT PANEL — CTA + Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative rounded-2xl overflow-hidden flex"
            style={{ background: "#f0f4ff" }}
          >
            <div className="flex flex-col lg:flex-row w-full">
              {/* Text content */}
              <div className="flex-1 flex flex-col justify-center px-8 md:px-10 py-10 md:py-14">
                <p className="text-foreground font-bold text-lg md:text-xl tracking-tight mb-1">
                  Voxalio
                </p>

                <h1 className="text-[28px] sm:text-[32px] md:text-[38px] font-bold text-foreground leading-[1.1] tracking-[-0.02em] mt-4">
                  Never miss a call.
                  <br />
                  Always serve the
                  <br />
                  customer.
                </h1>

                <p className="mt-5 text-muted-foreground text-[14px] md:text-[15px] leading-[1.7] max-w-sm">
                  Voxalio AI answers instantly, captures leads, and handles
                  inquiries 24/7. Empower your business with an always-on front
                  desk that feels authentically human.
                </p>

                <div className="mt-7">
                  <a
                    href="#pricing"
                    className="inline-block px-7 py-3.5 rounded-lg bg-[#0f172a] text-white font-semibold text-[14px] hover:bg-[#1e293b] transition-colors duration-200 tracking-[-0.01em]"
                  >
                    Start Your Free 14-Day Trial
                  </a>
                  <p className="text-muted-foreground text-[12px] mt-2.5">
                    No credit card required.
                  </p>
                </div>
              </div>

              {/* Phone mockup */}
              <div className="flex items-center justify-center px-4 pb-8 lg:pb-0 lg:pr-8">
                <HeroPhoneMockup />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

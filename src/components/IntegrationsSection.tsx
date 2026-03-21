import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import mondayLogo from "@/assets/monday-logo.png";
import ShapeGrid from "@/components/ShapeGrid";

const integrations = [
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg" },
  { name: "Google Calendar", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecalendar.svg" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg" },
  { name: "Google Drive", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googledrive.svg" },
  { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/trello.svg" },
  { name: "Zapier", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg" },
  { name: "Monday.com", logo: mondayLogo, isRaster: true },
  { name: "HubSpot", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg" },
  { name: "Airtable", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/airtable.svg" },
];

const IntegrationsSection = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const radius = isMobile ? 115 : 160;
  const iconSize = isMobile ? 20 : 28;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" id="integrations" style={{ background: "var(--bg-mid)" }}>
      <div className="absolute inset-0 z-0 opacity-50">
        <ShapeGrid
          speed={0.3}
          squareSize={45}
          direction="diagonal"
          borderColor="rgba(37, 99, 235, 0.08)"
          hoverFillColor="rgba(37, 99, 235, 0.1)"
          shape="square"
          hoverTrailAmount={8}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Integrations</span>
            <h2 className="font-display font-bold text-[var(--text-primary)] text-[28px] md:text-[36px] leading-[1.1] mt-3">{t("int.title")}</h2>
            <p className="mt-5 text-[var(--text-md)] text-[var(--text-secondary)] leading-[1.7]">{t("int.desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[290px] h-[290px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 rounded-full" style={{ border: "1px dashed rgba(37,99,235,0.2)" }} />
              <div className="absolute inset-8 md:inset-12 rounded-full" style={{ border: "1px dashed rgba(37,99,235,0.1)" }} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-2xl z-10" style={{ background: "var(--gradient-primary)" }}>
                  <span className="text-white font-display font-bold text-xs md:text-base">Voxalio</span>
                </div>
              </div>

              <motion.div className="absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
                {integrations.map((item, i) => {
                  const angle = (i / integrations.length) * 360 - 90;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.div
                      key={item.name}
                      className="absolute w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-sm"
                      style={{
                        left: `calc(50% + ${x}px - ${iconSize}px)`,
                        top: `calc(50% + ${y}px - ${iconSize}px)`,
                        background: "white",
                        border: "1px solid #e2e8f0",
                      }}
                      title={item.name}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    >
                      <img
                        src={item.logo}
                        alt={item.name}
                        className="w-5 h-5 md:w-7 md:h-7"
                        style={(item as any).isRaster ? { filter: "grayscale(100%) contrast(1.2)", objectFit: "contain" } : { filter: "brightness(0.4)" }}
                        loading="lazy"
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;

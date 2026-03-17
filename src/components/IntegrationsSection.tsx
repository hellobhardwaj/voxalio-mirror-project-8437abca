import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const integrations = [
  { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/slack.svg", color: "#E01E5A" },
  { name: "Google Calendar", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecalendar.svg", color: "#4285F4" },
  { name: "Notion", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/notion.svg", color: "#000000" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg", color: "#00A4EF" },
  { name: "Google Drive", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googledrive.svg", color: "#0F9D58" },
  { name: "Trello", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/trello.svg", color: "#0079BF" },
  { name: "Zapier", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zapier.svg", color: "#FF4A00" },
  { name: "Monday", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mondaydotcom.svg", color: "#FF3D57" },
  { name: "HubSpot", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg", color: "#FF7A59" },
  { name: "Airtable", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/airtable.svg", color: "#18BFFF" },
];

const IntegrationsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-28 relative overflow-hidden" id="integrations">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-[hsl(var(--vox-blue)/0.03)] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">{t("int.title")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{t("int.desc")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
              {/* Outer orbit ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-border/40" />
              {/* Inner orbit ring */}
              <div className="absolute inset-12 rounded-full border border-dashed border-border/30" />

              {/* Center hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-foreground flex items-center justify-center shadow-2xl">
                  <span className="text-background font-bold text-sm md:text-base tracking-tight">Voxalio.de</span>
                </div>
              </div>

              {/* Orbiting logos */}
              {integrations.map((item, i) => {
                const angle = (i / integrations.length) * 360 - 90;
                const radius = 160;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, type: "spring" }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    className="absolute w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center shadow-md hover:shadow-xl hover:border-border transition-all duration-300 cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px - ${28}px)`,
                      top: `calc(50% + ${y}px - ${28}px)`,
                    }}
                    title={item.name}
                  >
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-6 h-6 md:w-7 md:h-7"
                      style={{ filter: item.color === "#000000" ? "none" : "none" }}
                      loading="lazy"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;

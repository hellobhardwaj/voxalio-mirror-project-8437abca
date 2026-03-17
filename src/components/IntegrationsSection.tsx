import { motion } from "framer-motion";

const integrations = [
  { name: "Slack", color: "#E01E5A", letter: "S" },
  { name: "Google Calendar", color: "#4285F4", letter: "G" },
  { name: "Notion", color: "#000000", letter: "N" },
  { name: "Microsoft", color: "#00A4EF", letter: "M" },
  { name: "Google Drive", color: "#0F9D58", letter: "D" },
  { name: "Trello", color: "#0079BF", letter: "T" },
  { name: "Zapier", color: "#FF4A00", letter: "Z" },
  { name: "Monday", color: "#FF3D57", letter: "M" },
  { name: "Front", color: "#394EFF", letter: "F" },
  { name: "HubSpot", color: "#FF7A59", letter: "H" },
];

const IntegrationsSection = () => (
  <section className="py-24">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Integrations</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Our AI Call Assistant integrates seamlessly with your internal systems such as CRMs, calendars, and databases to accurately capture and retrieve data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-80 h-80">
            {/* Orbital rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-border" />
            <div className="absolute inset-8 rounded-full border border-dashed border-border" />

            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full vox-gradient-bg flex items-center justify-center vox-shadow-lg">
                <span className="text-primary-foreground font-bold text-xs">Voxalio.ai</span>
              </div>
            </div>

            {/* Integration nodes */}
            {integrations.map((item, i) => {
              const angle = (i / integrations.length) * 360 - 90;
              const radius = 140;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="absolute w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center vox-shadow text-sm font-bold"
                  style={{
                    left: `calc(50% + ${x}px - 22px)`,
                    top: `calc(50% + ${y}px - 22px)`,
                    color: item.color,
                  }}
                  title={item.name}
                >
                  {item.letter}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default IntegrationsSection;

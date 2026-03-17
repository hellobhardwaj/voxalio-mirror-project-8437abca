import { motion } from "framer-motion";

const integrations = [
  "Slack", "Google Calendar", "Notion", "Microsoft Word", "Google Drive",
  "Trello", "Zapier", "Monday.com", "Front", "HubSpot",
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
          {/* Orbital ring */}
          <div className="relative w-80 h-80">
            <div className="absolute inset-0 rounded-full border border-dashed border-border" />
            <div className="absolute inset-8 rounded-full border border-dashed border-border" />
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-foreground flex items-center justify-center">
                <span className="text-background font-bold text-sm">Voxalio.ai</span>
              </div>
            </div>
            {/* Integration dots */}
            {integrations.map((name, i) => {
              const angle = (i / integrations.length) * 360;
              const radius = 140;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <div
                  key={name}
                  className="absolute w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center vox-shadow text-xs font-medium text-muted-foreground"
                  style={{
                    left: `calc(50% + ${x}px - 20px)`,
                    top: `calc(50% + ${y}px - 20px)`,
                  }}
                  title={name}
                >
                  {name.charAt(0)}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default IntegrationsSection;

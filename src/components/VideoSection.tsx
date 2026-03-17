import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoSection = () => (
  <section className="py-16">
    <div className="max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden border border-border vox-shadow-lg bg-foreground"
      >
        {/* Browser chrome mockup */}
        <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <span className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-muted rounded-md px-4 py-1 text-xs text-muted-foreground max-w-xs w-full text-center">
              app.voxalio.ai
            </div>
          </div>
        </div>

        {/* Video preview area */}
        <div className="relative bg-foreground aspect-video flex items-end">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Platform UI mockup in background */}
          <div className="absolute inset-0 opacity-30">
            <div className="p-8 grid grid-cols-3 gap-4 h-full">
              <div className="bg-white/10 rounded-lg" />
              <div className="col-span-2 bg-white/10 rounded-lg" />
            </div>
          </div>

          {/* Content overlay */}
          <div className="relative z-10 p-8 md:p-12 w-full">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Get started<br />in 3 minutes
                </h2>
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                    <Play className="w-4 h-4 text-red-500 fill-red-500" />
                    <span className="text-xs text-white/80 font-medium">Platform Tutorial</span>
                  </div>
                </div>
                <p className="text-white/60 text-sm mt-2">
                  CEO & Co-Founder, Daniel Kahrizi
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA below video */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex justify-center mt-8"
      >
        <a
          href="#start"
          className="vox-gradient-bg text-primary-foreground px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Build your own AI call assistant
        </a>
      </motion.div>
    </div>
  </section>
);

export default VideoSection;

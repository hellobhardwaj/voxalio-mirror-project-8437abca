import { motion } from "framer-motion";
import { Play, BarChart3, MessageSquare, Users, Phone, TrendingUp, Clock, Settings, Bell, Search, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-border vox-shadow-lg"
        >
          {/* Browser chrome */}
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

          {/* Dashboard UI */}
          <div className="relative bg-[hsl(220,20%,10%)] min-h-[420px] md:min-h-[480px] flex">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[hsl(var(--vox-teal)/0.08)] rounded-full blur-[120px] pointer-events-none" />

            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-48 bg-[hsl(220,20%,12%)] border-r border-white/5 p-4 gap-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg vox-gradient-bg flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-white/90 text-sm font-semibold">Voxalio</span>
              </div>
              {[
                { icon: BarChart3, label: "Dashboard", active: true },
                { icon: MessageSquare, label: "Conversations" },
                { icon: Users, label: "Contacts" },
                { icon: Phone, label: "Call Logs" },
                { icon: TrendingUp, label: "Analytics" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/60"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-4 md:p-6 flex flex-col gap-4 relative z-10">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-semibold">Dashboard</p>
                  <p className="text-white/30 text-[10px]">Welcome back — here's your overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center">
                    <Search className="w-3 h-3 text-white/40" />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center relative">
                    <Bell className="w-3 h-3 text-white/40" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[hsl(var(--vox-teal))]" />
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Total Calls", value: "12,847", change: "+12.5%", up: true },
                  { label: "Resolved", value: "94.2%", change: "+3.1%", up: true },
                  { label: "Avg Duration", value: "2m 34s", change: "-8.2%", up: true },
                  { label: "Active Agents", value: "24", change: "+2", up: true },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.04] backdrop-blur-sm border border-white/5 rounded-xl p-3"
                  >
                    <p className="text-white/40 text-[10px]">{stat.label}</p>
                    <p className="text-white text-lg font-bold mt-0.5">{stat.value}</p>
                    <p className="text-[hsl(var(--vox-teal))] text-[10px] mt-0.5">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Bottom row: chart + chat */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-3 min-h-0">
                {/* Chart area */}
                <div className="md:col-span-3 bg-white/[0.04] backdrop-blur-sm border border-white/5 rounded-xl p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/70 text-xs font-medium">Call Volume</p>
                    <div className="flex gap-1">
                      {["7D", "30D", "90D"].map((period, i) => (
                        <span
                          key={period}
                          className={`text-[10px] px-2 py-0.5 rounded ${
                            i === 1
                              ? "bg-[hsl(var(--vox-teal)/0.2)] text-[hsl(var(--vox-teal))]"
                              : "text-white/30"
                          }`}
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Fake chart bars */}
                  <div className="flex-1 flex items-end gap-1 min-h-[80px]">
                    {[40, 55, 35, 70, 60, 80, 45, 65, 75, 50, 85, 90, 55, 70, 60, 78, 82, 68, 72, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end">
                        <div
                          className="rounded-sm bg-gradient-to-t from-[hsl(var(--vox-teal)/0.6)] to-[hsl(var(--vox-blue)/0.4)]"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Chat panel */}
                <div className="md:col-span-2 bg-white/[0.04] backdrop-blur-sm border border-white/5 rounded-xl p-4 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full vox-gradient-bg flex items-center justify-center">
                        <MessageSquare className="w-2.5 h-2.5 text-white" />
                      </div>
                      <p className="text-white/70 text-xs font-medium">AI Assistant</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 text-[10px] overflow-hidden">
                    <div className="bg-white/[0.06] rounded-lg p-2 text-white/50 max-w-[85%]">
                      Hello! I've handled 847 calls today. 94% resolved without escalation.
                    </div>
                    <div className="bg-[hsl(var(--vox-teal)/0.15)] rounded-lg p-2 text-white/70 max-w-[85%] self-end">
                      Show me today's missed calls
                    </div>
                    <div className="bg-white/[0.06] rounded-lg p-2 text-white/50 max-w-[85%]">
                      3 missed calls today. 2 have been scheduled for callback.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom overlay with title */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight whitespace-pre-line">
              {t("video.title")}
            </h2>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-xs text-white/80 font-medium">{t("video.tutorial")}</span>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-2">{t("video.ceo")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;

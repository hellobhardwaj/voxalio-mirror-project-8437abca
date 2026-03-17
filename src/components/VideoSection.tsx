import { motion } from "framer-motion";
import { BarChart3, MessageSquare, Users, Phone, TrendingUp, Clock, Settings, Bell, Search, ArrowUpRight, Activity, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border border-border/60 vox-shadow-xl"
        >
          {/* Browser chrome */}
          <div className="bg-[hsl(220,20%,11%)] border-b border-white/5 px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white/[0.06] rounded-lg px-4 py-1.5 text-xs text-white/40 max-w-xs w-full text-center border border-white/[0.04]">
                app.voxalio.de/dashboard
              </div>
            </div>
          </div>

          {/* Dashboard UI */}
          <div className="relative bg-[hsl(220,20%,8%)] min-h-[520px] md:min-h-[600px] flex">
            {/* Subtle glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[hsl(var(--vox-teal)/0.06)] rounded-full blur-[150px] pointer-events-none" />

            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-56 bg-[hsl(220,20%,10%)] border-r border-white/[0.04] p-5 gap-1">
              <div className="flex items-center gap-2.5 mb-8">
                <div className="w-8 h-8 rounded-xl vox-gradient-bg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90 text-sm font-bold tracking-tight">Voxalio</span>
              </div>
              {[
                { icon: BarChart3, label: "Dashboard", active: true },
                { icon: MessageSquare, label: "Conversations" },
                { icon: Users, label: "Contacts" },
                { icon: Phone, label: "Call Logs" },
                { icon: TrendingUp, label: "Analytics" },
                { icon: Zap, label: "Automations" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                    active
                      ? "bg-white/[0.08] text-white"
                      : "text-white/30 hover:text-white/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 md:p-8 flex flex-col gap-5 relative z-10">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-[15px] font-medium tracking-[-0.015em]">Dashboard</p>
                  <p className="text-white/25 text-[11px] font-normal mt-0.5 tracking-normal">Welcome back — here's your overview</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                    <Search className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center relative">
                    <Bell className="w-3.5 h-3.5 text-white/40" />
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[hsl(var(--vox-teal))]" />
                  </div>
                  <div className="w-8 h-8 rounded-full vox-gradient-bg flex items-center justify-center text-white text-[10px] font-bold ml-1">
                    V
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Total Calls", value: "12,847", change: "+12.5%", icon: Phone },
                  { label: "Resolved", value: "94.2%", change: "+3.1%", icon: Activity },
                  { label: "Avg Duration", value: "2m 34s", change: "-8.2%", icon: Clock },
                  { label: "Active Agents", value: "24", change: "+2", icon: Users },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-4 group hover:bg-white/[0.05] transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white/35 text-[11px] font-medium">{stat.label}</p>
                      <stat.icon className="w-3.5 h-3.5 text-white/15" />
                    </div>
                    <p className="text-white text-xl font-bold tracking-tight">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-[hsl(var(--vox-teal))]" />
                      <p className="text-[hsl(var(--vox-teal))] text-[11px] font-medium">{stat.change}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom row: chart + chat */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 min-h-0">
                {/* Chart area */}
                <div className="md:col-span-3 bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white/80 text-sm font-semibold">Call Volume</p>
                      <p className="text-white/25 text-[10px] mt-0.5">Last 30 days</p>
                    </div>
                    <div className="flex gap-1">
                      {["7D", "30D", "90D"].map((period, i) => (
                        <span
                          key={period}
                          className={`text-[10px] px-2.5 py-1 rounded-lg font-medium ${
                            i === 1
                              ? "bg-[hsl(var(--vox-teal)/0.15)] text-[hsl(var(--vox-teal))] border border-[hsl(var(--vox-teal)/0.2)]"
                              : "text-white/25 hover:text-white/40"
                          }`}
                        >
                          {period}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Chart bars */}
                  <div className="flex-1 flex items-end gap-[3px] min-h-[120px]">
                    {[40, 55, 35, 70, 60, 80, 45, 65, 75, 50, 85, 90, 55, 70, 60, 78, 82, 68, 72, 88, 62, 74, 80, 56].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end">
                        <div
                          className="rounded-sm bg-gradient-to-t from-[hsl(var(--vox-teal)/0.5)] to-[hsl(var(--vox-blue)/0.3)] hover:from-[hsl(var(--vox-teal)/0.7)] hover:to-[hsl(var(--vox-blue)/0.5)] transition-all duration-300"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Chat panel */}
                <div className="md:col-span-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg vox-gradient-bg flex items-center justify-center">
                        <MessageSquare className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-white/80 text-xs font-semibold">AI Assistant</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400/70 text-[10px]">Live</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5 text-[11px] overflow-hidden">
                    <div className="bg-white/[0.05] rounded-xl p-3 text-white/50 max-w-[88%]">
                      Hello! I've handled 847 calls today. 94% resolved without escalation.
                    </div>
                    <div className="bg-[hsl(var(--vox-teal)/0.12)] rounded-xl p-3 text-white/70 max-w-[88%] self-end border border-[hsl(var(--vox-teal)/0.15)]">
                      Show me today's missed calls
                    </div>
                    <div className="bg-white/[0.05] rounded-xl p-3 text-white/50 max-w-[88%]">
                      3 missed calls today. 2 have been scheduled for callback. 1 left a voicemail.
                    </div>
                    <div className="bg-[hsl(var(--vox-teal)/0.12)] rounded-xl p-3 text-white/70 max-w-[88%] self-end border border-[hsl(var(--vox-teal)/0.15)]">
                      Schedule callbacks for the remaining one
                    </div>
                    <div className="bg-white/[0.05] rounded-xl p-3 text-white/50 max-w-[88%]">
                      Done! Callback scheduled for tomorrow at 9:00 AM. ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;

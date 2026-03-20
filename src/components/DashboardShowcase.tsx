import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, MessageSquare, Users, Phone, TrendingUp,
  Clock, Settings, Bell, Search, ArrowUpRight, ArrowDownRight,
  Activity, Zap, CheckCircle2, AlertTriangle
} from "lucide-react";

/* ── design tokens ── */
const T = {
  navy: "#0a0f1e",
  navyMid: "#111827",
  navyCard: "#141c2e",
  navyBorder: "#1e2d4a",
  teal: "#00d4aa",
  tealDim: "rgba(0,212,170,0.15)",
  tealGlow: "rgba(0,212,170,0.06)",
  gold: "#f0b429",
  textPrimary: "#e8edf5",
  textSecondary: "#7a8faa",
  textMuted: "#3a4a62",
  chrome: "#0d1117",
};

const sidebarItems = [
  { icon: BarChart3, label: "Dashboard", id: "dashboard" },
  { icon: MessageSquare, label: "Conversations", id: "conversations" },
  { icon: Users, label: "Contacts", id: "contacts" },
  { icon: Phone, label: "Call Logs", id: "calls" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Zap, label: "Automations", id: "automations" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const stats = [
  { label: "Total Calls", value: "12,847", change: "+12.5%", up: true, icon: Phone },
  { label: "Resolved", value: "94.2%", change: "+3.1%", up: true, icon: Activity },
  { label: "Avg Duration", value: "2m 34s", change: "-8.2%", up: false, icon: Clock },
  { label: "Active Agents", value: "24", change: "+2", up: true, icon: Users },
];

const barHeights = [28,38,32,44,40,52,36,48,56,42,58,62,46,54,50,60,64,52,56,68,48,58,62,50];

const chatMessages = [
  { from: "ai", text: "Hello! I've handled 847 calls today. 94% resolved without escalation." },
  { from: "user", text: "Show today's missed calls" },
  { from: "ai", text: "3 missed calls today. 2 have been scheduled for callback. 1 left a voicemail." },
  { from: "user", text: "Schedule callbacks for the remaining one" },
  { from: "ai", text: "Done! Callback scheduled for tomorrow at 9:00 AM. ✓" },
];

const conversations = [
  { name: "Maria Schmidt", number: "+49 170 *** 4821", status: "resolved", duration: "4m 12s", ago: "12 min ago", preview: "Requested invoice for last month's subscription..." },
  { name: "Jonas Weber", number: "+49 151 *** 9032", status: "escalated", duration: "8m 45s", ago: "28 min ago", preview: "Billing dispute regarding double charge on account..." },
  { name: "Laura Fischer", number: "+49 176 *** 1155", status: "resolved", duration: "2m 03s", ago: "1h ago", preview: "Password reset completed successfully after verification..." },
  { name: "Thomas Müller", number: "+49 162 *** 7788", status: "resolved", duration: "3m 28s", ago: "2h ago", preview: "Product return initiated — shipping label sent via email..." },
  { name: "Sarah Klein", number: "+49 157 *** 3340", status: "escalated", duration: "6m 51s", ago: "3h ago", preview: "Technical issue with API integration, forwarded to engineering..." },
];

const floatingCards = [
  { label: "RESOLVED", value: "94.2%", sub: "+3.1% this month", color: T.teal, pos: "top-[-28px] left-[-32px]" },
  { label: "ACTIVE AGENTS", value: "24", sub: "+2 today", color: T.teal, pos: "bottom-[120px] left-[-40px]" },
  { label: "TOTAL CALLS", value: "12,847", sub: "+12.5% vs last month", color: T.teal, pos: "bottom-[60px] right-[-36px]" },
];

/* ── keyframes injected once ── */
const STYLE_ID = "dashboard-showcase-styles";
const injectStyles = () => {
  if (document.getElementById(STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = STYLE_ID;
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    @keyframes ds-float1{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes ds-float2{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
    @keyframes ds-border-glow{0%,100%{opacity:.4}50%{opacity:.8}}
    @keyframes ds-bar-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
    @keyframes ds-pulse-dot{0%,100%{opacity:1}50%{opacity:.4}}
    .ds-font-heading{font-family:'Syne',sans-serif}
    .ds-font-body{font-family:'DM Sans',sans-serif}
    .ds-float-1{animation:ds-float1 4s ease-in-out infinite}
    .ds-float-2{animation:ds-float2 4.5s ease-in-out infinite}
    .ds-float-3{animation:ds-float1 5s ease-in-out infinite .5s}
    .ds-border-glow{animation:ds-border-glow 3s ease-in-out infinite}
    .ds-bar-grow{animation:ds-bar-grow .8s ease-out forwards;transform-origin:bottom}
    .ds-pulse{animation:ds-pulse-dot 2s ease-in-out infinite}
  `;
  document.head.appendChild(s);
};

/* ── Component ── */
const DashboardShowcase = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => { injectStyles(); }, []);

  /* stagger chat messages */
  useEffect(() => {
    if (activeTab !== "dashboard") return;
    setVisibleMsgs(0);
    const timers: NodeJS.Timeout[] = [];
    chatMessages.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleMsgs(i + 1), 600 + i * 700));
    });
    return () => timers.forEach(clearTimeout);
  }, [activeTab]);

  /* bar animation trigger */
  useEffect(() => {
    if (activeTab !== "dashboard") { setBarsVisible(false); return; }
    const t = setTimeout(() => setBarsVisible(true), 300);
    return () => clearTimeout(t);
  }, [activeTab]);

  /* cursor spotlight */
  const handleMouse = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouse}
      className="relative py-20 md:py-24 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(0,212,170,0.04) 0%, transparent 50%), radial-gradient(ellipse at 50% 40%, ${T.tealGlow} 0%, transparent 70%), ${T.navy}`,
      }}
    >
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative">
        {/* ── Outer window frame ── */}
        <div
          className="relative rounded-2xl overflow-visible"
          style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}
        >
          {/* Glowing border */}
          <div
            className="absolute -inset-[1px] rounded-2xl ds-border-glow pointer-events-none z-0"
            style={{
              background: `linear-gradient(135deg, ${T.teal}40, transparent 40%, transparent 60%, ${T.teal}30)`,
            }}
          />

          <div className="relative z-10 rounded-2xl overflow-hidden" style={{ background: T.chrome }}>
            {/* ── macOS chrome bar ── */}
            <div className="flex items-center px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
                <span className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="ds-font-body rounded-lg px-4 py-1.5 text-xs max-w-xs w-full text-center"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  app.voxalio.de/dashboard
                </div>
              </div>
            </div>

            {/* ── Dashboard body ── */}
            <div className="flex min-h-[520px] md:min-h-[600px]" style={{ background: T.navy }}>
              {/* Sidebar — hidden on mobile */}
              <div className="hidden md:flex flex-col w-56 p-5 gap-1 border-r" style={{ background: T.chrome, borderColor: "rgba(255,255,255,0.04)" }}>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: T.teal }}>
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="ds-font-heading text-[13px] font-semibold" style={{ color: T.textPrimary }}>Voxalio</span>
                </div>
                {sidebarItems.map(({ icon: Icon, label, id }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id === "dashboard" || id === "conversations" ? id : "dashboard")}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-normal transition-colors w-full text-left ds-font-body"
                    style={{
                      background: activeTab === id ? T.tealDim : "transparent",
                      color: activeTab === id ? T.teal : T.textMuted,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-5 md:p-8 flex flex-col gap-5 relative">
                <AnimatePresence mode="wait">
                  {activeTab === "dashboard" ? (
                    <DashboardView
                      key="dashboard"
                      visibleMsgs={visibleMsgs}
                      barsVisible={barsVisible}
                    />
                  ) : (
                    <ConversationsView key="conversations" />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── Floating breakout cards (desktop only) ── */}
          <div className="hidden lg:block">
            {floatingCards.map((card, i) => (
              <div
                key={card.label}
                className={`absolute ${card.pos} ${i === 0 ? "ds-float-1" : i === 1 ? "ds-float-2" : "ds-float-3"} z-20`}
              >
                <div
                  className="rounded-xl px-5 py-4 ds-font-body"
                  style={{
                    background: "rgba(20,28,46,0.95)",
                    border: `1px solid ${T.navyBorder}`,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p className="text-[10px] font-medium tracking-wider mb-1" style={{ color: T.textMuted }}>{card.label}</p>
                  <p className="ds-font-heading text-xl font-bold" style={{ color: T.textPrimary }}>{card.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-3 h-3" style={{ color: T.teal }} />
                    <span className="text-[11px]" style={{ color: T.teal }}>{card.sub}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Dashboard sub-view ── */
const DashboardView = ({ visibleMsgs, barsVisible }: { visibleMsgs: number; barsVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-5 flex-1"
  >
    {/* Top bar */}
    <div className="flex items-center justify-between">
      <div>
        <p className="ds-font-heading text-[15px] font-semibold" style={{ color: T.textPrimary }}>Dashboard</p>
        <p className="ds-font-body text-[11px] mt-0.5" style={{ color: T.textMuted }}>Welcome back — here's your overview</p>
      </div>
      <div className="flex items-center gap-2">
        <IconBtn><Search className="w-3.5 h-3.5" style={{ color: T.textMuted }} /></IconBtn>
        <div className="relative">
          <IconBtn><Bell className="w-3.5 h-3.5" style={{ color: T.textMuted }} /></IconBtn>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold ml-1" style={{ background: T.teal }}>V</div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl p-4 transition-colors duration-300 hover:brightness-110"
          style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}` }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="ds-font-body text-[11px] font-medium" style={{ color: T.textSecondary }}>{s.label}</p>
            <s.icon className="w-3.5 h-3.5" style={{ color: T.textMuted }} />
          </div>
          <p className="ds-font-heading text-[18px] font-bold tracking-tight" style={{ color: T.textPrimary }}>{s.value}</p>
          <div className="flex items-center gap-1 mt-1">
            {s.up ? (
              <ArrowUpRight className="w-3 h-3" style={{ color: T.teal }} />
            ) : (
              <ArrowDownRight className="w-3 h-3" style={{ color: "#ef4444" }} />
            )}
            <p className="text-[11px] font-medium" style={{ color: s.up ? T.teal : "#ef4444" }}>{s.change}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom row */}
    <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 min-h-0">
      {/* Chart */}
      <div
        className="md:col-span-3 rounded-xl p-5 flex flex-col"
        style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="ds-font-body text-[13px] font-medium" style={{ color: T.textPrimary }}>Call Volume</p>
            <p className="ds-font-body text-[10px] mt-0.5" style={{ color: T.textMuted }}>Last 30 days</p>
          </div>
          <div className="flex gap-1">
            {["7D", "30D", "90D"].map((p, i) => (
              <span
                key={p}
                className="text-[10px] px-2.5 py-1 rounded-lg font-medium ds-font-body cursor-pointer"
                style={
                  i === 1
                    ? { background: T.tealDim, color: T.teal, border: `1px solid rgba(0,212,170,0.25)` }
                    : { color: T.textMuted }
                }
              >
                {p}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-end gap-[3px] min-h-[120px]">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end h-full">
              <div
                className={barsVisible ? "ds-bar-grow" : ""}
                style={{
                  height: `${h}%`,
                  borderRadius: 3,
                  background: `linear-gradient(to top, ${T.teal}, rgba(0,212,170,0.3))`,
                  transform: barsVisible ? undefined : "scaleY(0)",
                  transformOrigin: "bottom",
                  animationDelay: `${i * 30}ms`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat */}
      <div
        className="md:col-span-2 rounded-xl p-5 flex flex-col"
        style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}` }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: T.teal }}>
              <MessageSquare className="w-3 h-3 text-white" />
            </div>
            <p className="ds-font-body text-[12px] font-medium" style={{ color: T.textPrimary }}>AI Assistant</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full ds-pulse" style={{ background: "#28c840" }} />
            <span className="text-[10px]" style={{ color: "#28c840" }}>Live</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2.5 text-[11px] overflow-hidden ds-font-body">
          {chatMessages.slice(0, visibleMsgs).map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className={`rounded-xl p-3 max-w-[88%] ${m.from === "user" ? "self-end" : ""}`}
              style={
                m.from === "user"
                  ? { background: T.tealDim, color: T.textPrimary, border: `1px solid rgba(0,212,170,0.2)` }
                  : { background: "rgba(255,255,255,0.05)", color: T.textSecondary }
              }
            >
              {m.text}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ── Conversations sub-view ── */
const ConversationsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col gap-4 flex-1"
  >
    <div>
      <p className="ds-font-heading text-[15px] font-semibold" style={{ color: T.textPrimary }}>Conversations</p>
      <p className="ds-font-body text-[11px] mt-0.5" style={{ color: T.textMuted }}>Recent call transcripts and statuses</p>
    </div>
    <div className="flex flex-col gap-2">
      {conversations.map((c, i) => (
        <motion.div
          key={c.name}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl p-4 ds-font-body cursor-pointer transition-colors duration-200"
          style={{ background: T.navyCard, border: `1px solid ${T.navyBorder}` }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(20,28,46,0.8)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = T.navyCard)}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-medium" style={{ color: T.textPrimary }}>{c.name}</p>
              <span className="text-[10px]" style={{ color: T.textMuted }}>{c.number}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
                style={{
                  background: c.status === "resolved" ? T.tealDim : "rgba(240,180,41,0.15)",
                  color: c.status === "resolved" ? T.teal : T.gold,
                }}
              >
                {c.status === "resolved" ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {c.status === "resolved" ? "Resolved" : "Escalated"}
              </span>
              <span className="text-[10px]" style={{ color: T.textMuted }}>{c.duration}</span>
              <span className="text-[10px]" style={{ color: T.textMuted }}>{c.ago}</span>
            </div>
          </div>
          <p className="text-[11px] truncate" style={{ color: T.textSecondary }}>{c.preview}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

/* ── Small helper ── */
const IconBtn = ({ children }: { children: React.ReactNode }) => (
  <div
    className="w-8 h-8 rounded-xl flex items-center justify-center"
    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
  >
    {children}
  </div>
);

export default DashboardShowcase;

"use client";

import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Calendar,
  Clock,
  Coins,
  CreditCard,
  Info,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";

type Tx = {
  id: string;
  time: string;
  amount: number;
  table: string;
  shift: "A" | "B";
  method: "Apple Pay" | "Bit" | "כרטיס";
};

const SEED_TX: Tx[] = [
  { id: "1", time: "14:32", table: "שולחן 12", shift: "A", amount: 35, method: "Apple Pay" },
  { id: "2", time: "13:48", table: "שולחן 7", shift: "A", amount: 22, method: "Bit" },
  { id: "3", time: "13:15", table: "שולחן 3", shift: "A", amount: 50, method: "כרטיס" },
  { id: "4", time: "12:40", table: "בר", shift: "A", amount: 18, method: "Bit" },
  { id: "5", time: "12:02", table: "שולחן 9", shift: "A", amount: 40, method: "Apple Pay" },
];

const WEEK_BARS = [
  { day: "א׳", value: 180 },
  { day: "ב׳", value: 240 },
  { day: "ג׳", value: 195 },
  { day: "ד׳", value: 310 },
  { day: "ה׳", value: 380 },
  { day: "ו׳", value: 420 },
  { day: "ש׳", value: 165 },
];

const NET_RATE = 0.88; // 12% mock social/handling deductions

export default function WorkerDashboard() {
  const [tab, setTab] = useState<"today" | "week" | "month">("today");
  const [txs, setTxs] = useState<Tx[]>(SEED_TX);
  const [toast, setToast] = useState<Tx | null>(null);

  function simulateIncoming() {
    const tables = ["שולחן 5", "שולחן 8", "בר", "שולחן 14", "שולחן 2"];
    const methods: Tx["method"][] = ["Apple Pay", "Bit", "כרטיס"];
    const amount = [25, 30, 35, 40, 45][Math.floor(Math.random() * 5)];
    const tx: Tx = {
      id: Date.now().toString(),
      time: new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }),
      table: tables[Math.floor(Math.random() * tables.length)],
      shift: "A",
      amount,
      method: methods[Math.floor(Math.random() * methods.length)],
    };
    setTxs((prev) => [tx, ...prev]);
    setToast(tx);
    setTimeout(() => setToast(null), 4500);
  }

  const todayTotal = useMemo(() => txs.reduce((s, t) => s + t.amount, 0), [txs]);
  const weekTotal = useMemo(() => WEEK_BARS.reduce((s, b) => s + b.value, 0) + todayTotal, [todayTotal]);
  const monthTotal = useMemo(() => weekTotal * 4.1, [weekTotal]);
  const net = useMemo(() => todayTotal * NET_RATE, [todayTotal]);
  const max = Math.max(...WEEK_BARS.map((b) => b.value), todayTotal);

  return (
    <div className="min-h-screen bg-ink-50">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold">
              ד
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-ink-900">דניאל כהן</p>
              <p className="text-xs text-ink-500">מלצר ראשי · משמרת ערב</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={simulateIncoming}
              className="hidden items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 transition hover:border-brand-500 hover:text-brand-700 sm:inline-flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              סימולציה: טיפ חדש
            </button>
            <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-700 transition hover:border-ink-300">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-0.5 -end-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-5 py-6">
        {/* Tabs */}
        <div className="flex gap-1 rounded-2xl border border-ink-200 bg-white p-1 shadow-card sm:w-fit">
          {([
            ["today", "היום"],
            ["week", "השבוע"],
            ["month", "החודש"],
          ] as const).map(([k, label]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition sm:flex-none ${
                tab === k ? "bg-brand-600 text-white shadow-pop" : "text-ink-600 hover:bg-ink-100"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label={tab === "today" ? "טיפים היום" : tab === "week" ? "טיפים השבוע" : "טיפים החודש"}
            value={`${(tab === "today" ? todayTotal : tab === "week" ? weekTotal : monthTotal).toLocaleString("he-IL", { maximumFractionDigits: 0 })}₪`}
            delta="+12%"
            trend="up"
            icon={<Coins className="h-5 w-5" />}
            tone="primary"
          />
          <MetricCard
            label="ממוצע לטיפ"
            value={`${(todayTotal / Math.max(1, txs.length)).toFixed(0)}₪`}
            delta={`${txs.length} עסקאות`}
            icon={<TrendingUp className="h-5 w-5" />}
            tone="amber"
          />
          <MetricCard
            label="נטו משוער"
            value={`${(tab === "today" ? net : (tab === "week" ? weekTotal : monthTotal) * NET_RATE).toLocaleString("he-IL", { maximumFractionDigits: 0 })}₪`}
            delta="לאחר ניכויי חבר"
            icon={<Wallet className="h-5 w-5" />}
            tone="ink"
            hint
          />
        </div>

        {/* Gross vs Net breakdown */}
        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">פירוט שקיפות — ברוטו מול נטו</h3>
            <span className="inline-flex items-center gap-1 text-xs text-ink-500">
              <Info className="h-3.5 w-3.5" />
              הערכה לפי משכורת
            </span>
          </div>
          <div className="space-y-3">
            <BreakdownRow label="ברוטו (סכום שהתקבל)" value={todayTotal} tone="ink" />
            <BreakdownRow label="עמלת סליקה ופלטפורמה (1.8%)" value={-(todayTotal * 0.018)} tone="muted" />
            <BreakdownRow label="הפרשות סוציאליות משוערות (10%)" value={-(todayTotal * 0.1)} tone="muted" />
            <div className="border-t border-dashed border-ink-200" />
            <BreakdownRow label="נטו משוער ליד" value={net} tone="success" bold />
          </div>
        </div>

        {/* Chart + Tx grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card lg:col-span-3">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink-900">חלוקה יומית · 7 ימים אחרונים</h3>
              <span className="inline-flex items-center gap-1 text-xs text-ink-500">
                <Calendar className="h-3.5 w-3.5" />
                שבוע נוכחי
              </span>
            </div>
            <BarChart bars={[...WEEK_BARS.slice(0, -1), { day: "היום", value: todayTotal }]} max={max} />
          </div>

          <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink-900">תנועות אחרונות</h3>
              <button
                type="button"
                onClick={simulateIncoming}
                className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 transition hover:text-brand-600 sm:hidden"
              >
                <Sparkles className="h-3.5 w-3.5" />
                סימולציה
              </button>
            </div>
            <ul className="space-y-2">
              {txs.slice(0, 6).map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 p-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-ink-200">
                    {t.method === "Apple Pay" ? "" : t.method === "Bit" ? <CreditCard className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-ink-900">{t.table} · משמרת {t.shift}</p>
                    <p className="text-xs text-ink-500 inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {t.time} · {t.method}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="text-base font-bold text-brand-700">+{t.amount}₪</p>
                    <p className="text-[10px] text-ink-400">נטו ≈ {(t.amount * NET_RATE).toFixed(0)}₪</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 start-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-slideDown rounded-2xl border border-brand-200 bg-white p-4 shadow-pop">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-emerald-400 text-white">
              <ArrowDownRight className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink-900">
                כל הכבוד! קיבלת טיפ של {toast.amount}₪ 🎉
              </p>
              <p className="text-xs text-ink-500">
                מ{toast.table} · משמרת {toast.shift} · {toast.method}
              </p>
            </div>
            <button onClick={() => setToast(null)} className="text-xs font-medium text-ink-400 hover:text-ink-600">
              סגירה
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  delta,
  trend,
  icon,
  tone,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: React.ReactNode;
  tone: "primary" | "amber" | "ink";
  hint?: boolean;
}) {
  const tones: Record<typeof tone, string> = {
    primary: "from-brand-600 to-emerald-500 text-white",
    amber: "from-amber-500 to-orange-500 text-white",
    ink: "from-ink-900 to-ink-700 text-white",
  };
  return (
    <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-ink-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${tones[tone]}`}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-ink-900">{value}</p>
      {delta && (
        <p className={`mt-1 inline-flex items-center gap-1 text-xs font-medium ${
          trend === "up" ? "text-brand-700" : trend === "down" ? "text-rose-600" : "text-ink-500"
        }`}>
          {trend === "up" && <ArrowUpRight className="h-3.5 w-3.5" />}
          {trend === "down" && <ArrowDownRight className="h-3.5 w-3.5" />}
          {hint && <Info className="h-3.5 w-3.5 text-ink-400" />}
          {delta}
        </p>
      )}
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  tone,
  bold,
}: {
  label: string;
  value: number;
  tone: "ink" | "muted" | "success";
  bold?: boolean;
}) {
  const tones = {
    ink: "text-ink-700",
    muted: "text-ink-500",
    success: "text-brand-700",
  };
  const sign = value < 0 ? "−" : "";
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${tones[tone]}`}>{label}</span>
      <span className={`${bold ? "text-lg font-bold" : "text-sm font-semibold"} ${tones[tone]}`}>
        {sign}{Math.abs(value).toFixed(2)}₪
      </span>
    </div>
  );
}

function BarChart({ bars, max }: { bars: { day: string; value: number }[]; max: number }) {
  return (
    <div className="flex h-48 items-end gap-2 sm:gap-3">
      {bars.map((b, i) => {
        const h = max > 0 ? (b.value / max) * 100 : 0;
        const isToday = b.day === "היום";
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative flex w-full flex-1 items-end">
              <div
                className={`w-full rounded-t-lg transition-all ${
                  isToday
                    ? "bg-gradient-to-t from-brand-700 to-emerald-400"
                    : "bg-gradient-to-t from-ink-300 to-ink-200"
                }`}
                style={{ height: `${Math.max(8, h)}%` }}
              />
              {isToday && (
                <span className="absolute -top-6 start-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink-900 px-1.5 py-0.5 text-[10px] font-medium text-white">
                  {b.value}₪
                </span>
              )}
            </div>
            <span className={`text-xs ${isToday ? "font-bold text-brand-700" : "text-ink-500"}`}>{b.day}</span>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  Clock,
  Coins,
  Download,
  FileSpreadsheet,
  LayoutDashboard,
  LogIn,
  LogOut,
  Minus,
  Plus,
  Settings2,
  Sparkles,
  Timer,
  Users,
  X,
} from "lucide-react";

type NavKey = "overview" | "live" | "log" | "rules" | "staff" | "export";

const NAV: { key: NavKey; label: string; icon: any }[] = [
  { key: "overview", label: "סקירה", icon: LayoutDashboard },
  { key: "live", label: "משמרת חיה", icon: Activity },
  { key: "log", label: "יומן שירות", icon: ClipboardList },
  { key: "rules", label: "חוקי חלוקה", icon: Settings2 },
  { key: "staff", label: "ניהול עובדים", icon: Users },
  { key: "export", label: "ייצוא לשכר", icon: Download },
];

type Worker = { id: string; name: string; role: "מלצר" | "מטבח" | "בר" | "מארחת"; checkedIn: boolean; hoursIn: number };

const INITIAL_STAFF: Worker[] = [
  { id: "w1", name: "דניאל כהן", role: "מלצר", checkedIn: true, hoursIn: 4.5 },
  { id: "w2", name: "נועה לוי", role: "מלצר", checkedIn: true, hoursIn: 4.2 },
  { id: "w3", name: "יוסי פרץ", role: "בר", checkedIn: true, hoursIn: 5.0 },
  { id: "w4", name: "רונן אמיר", role: "מטבח", checkedIn: true, hoursIn: 5.5 },
  { id: "w5", name: "שירה ברק", role: "מארחת", checkedIn: true, hoursIn: 3.0 },
  { id: "w6", name: "אורי בן-דוד", role: "מלצר", checkedIn: false, hoursIn: 0 },
  { id: "w7", name: "מאיה גל", role: "מטבח", checkedIn: false, hoursIn: 0 },
];

const SERVICE_LOG = [
  { id: "SH-2841", date: "21/05/26", shift: "ערב", gross: 1840, distributed: 1808, status: "compliant" },
  { id: "SH-2840", date: "20/05/26", shift: "ערב", gross: 1620, distributed: 1591, status: "compliant" },
  { id: "SH-2839", date: "20/05/26", shift: "צהריים", gross: 980, distributed: 962, status: "compliant" },
  { id: "SH-2838", date: "19/05/26", shift: "ערב", gross: 2120, distributed: 2082, status: "compliant" },
  { id: "SH-2837", date: "19/05/26", shift: "צהריים", gross: 740, distributed: 727, status: "review" },
  { id: "SH-2836", date: "18/05/26", shift: "ערב", gross: 1980, distributed: 1944, status: "compliant" },
];

export default function ManagerDashboard() {
  const [nav, setNav] = useState<NavKey>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-ink-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 end-0 z-40 w-72 transform border-s border-ink-200 bg-white transition lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between border-b border-ink-200 px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-emerald-500 text-white font-bold">
              ט
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-ink-900">טיפלי · ניהול</p>
              <p className="text-xs text-ink-500">מסעדת הים התיכון</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-ink-500" />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = nav === n.key;
            return (
              <button
                key={n.key}
                onClick={() => {
                  setNav(n.key);
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-brand-50 text-brand-700 shadow-sm ring-1 ring-brand-200"
                    : "text-ink-600 hover:bg-ink-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 text-start">{n.label}</span>
                {active && <ChevronLeft className="h-4 w-4" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-4 text-xs">
            <div className="flex items-center gap-2 font-semibold text-brand-800">
              <BadgeCheck className="h-4 w-4" />
              מודל A · מעסיק-יומן
            </div>
            <p className="mt-1 leading-relaxed text-brand-700">
              חלוקה אוטומטית, ייצוא לשכר, תקין מע״מ.
            </p>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink-900/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-200 bg-white/95 px-5 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-xl border border-ink-200 bg-white p-2 text-ink-700 lg:hidden"
            >
              <Settings2 className="h-4 w-4" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-ink-900">{NAV.find((n) => n.key === nav)?.label}</h1>
              <p className="text-xs text-ink-500">{new Date().toLocaleDateString("he-IL", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-emerald-500" />
              LIVE · 3 משמרות פעילות
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">מ</div>
          </div>
        </header>

        <main className="flex-1 px-5 py-6 lg:px-8">
          {nav === "overview" && <OverviewPanel />}
          {nav === "live" && <LiveShiftPanel />}
          {nav === "log" && <ServiceLogPanel />}
          {nav === "rules" && <RulesPanel />}
          {nav === "staff" && <StaffPanel />}
          {nav === "export" && <ExportPanel />}
        </main>
      </div>
    </div>
  );
}

/* ---------------- OVERVIEW ---------------- */

function OverviewPanel() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="טיפים היום" value="1,840₪" delta="+18%" tone="primary" icon={<Coins className="h-5 w-5" />} />
        <StatCard label="משמרות פעילות" value="3" delta="ערב · בר · מטבח" tone="amber" icon={<Activity className="h-5 w-5" />} />
        <StatCard label="עובדים מחותמים" value="5 / 7" delta="2 לא בתורנות" tone="indigo" icon={<Users className="h-5 w-5" />} />
        <StatCard label="קופת משמרת חיה" value="1,240₪" delta="טרם חולק" tone="ink" icon={<Timer className="h-5 w-5" />} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">הכנסות 14 הימים האחרונים</h3>
            <span className="text-xs text-ink-500">סה״כ · כל המשמרות</span>
          </div>
          <SparkArea />
        </div>

        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
          <h3 className="mb-3 text-sm font-semibold text-ink-900">פיצול טיפ של 100₪</h3>
          <DistributionVisual rules={DEFAULT_RULES} amount={100} />
        </div>
      </div>
    </div>
  );
}

/* ---------------- LIVE SHIFT ---------------- */

function LiveShiftPanel() {
  const [shiftActive, setShiftActive] = useState(true);
  const [pool, setPool] = useState(1240);
  const [staff, setStaff] = useState<Worker[]>(INITIAL_STAFF);

  const checkedIn = staff.filter((s) => s.checkedIn);
  const totalHours = checkedIn.reduce((s, w) => s + w.hoursIn, 0);

  function toggle(id: string) {
    setStaff((prev) => prev.map((w) => (w.id === id ? { ...w, checkedIn: !w.checkedIn, hoursIn: w.checkedIn ? 0 : 3 } : w)));
  }
  function bump() {
    setPool((p) => p + 25);
  }

  return (
    <div className="space-y-6">
      {/* Control bar */}
      <div className="flex flex-col gap-3 rounded-3xl border border-ink-200 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${shiftActive ? "bg-emerald-100 text-emerald-700" : "bg-ink-100 text-ink-500"}`}>
            <Activity className={`h-6 w-6 ${shiftActive ? "animate-pulseSoft" : ""}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-900">משמרת ערב · #SH-2841</p>
            <p className="text-xs text-ink-500">
              {shiftActive ? "פעילה — התחלה 17:30" : "לא פעילה"} · {checkedIn.length} עובדים בתורנות
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={bump}
            className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 transition hover:border-brand-500 hover:text-brand-700"
          >
            <Sparkles className="h-3.5 w-3.5" />
            סימולציה: +25₪ לקופה
          </button>
          <button
            onClick={() => setShiftActive((a) => !a)}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition ${
              shiftActive ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-brand-600 text-white hover:bg-brand-700"
            }`}
          >
            {shiftActive ? <LogOut className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            {shiftActive ? "סגירת משמרת" : "פתיחת משמרת"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Live pool */}
        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card lg:col-span-2">
          <p className="text-xs font-medium text-ink-500">קופה חיה</p>
          <p className="mt-2 text-4xl font-bold tracking-tight text-ink-900">{pool.toLocaleString("he-IL")}₪</p>
          <p className="mt-1 text-xs text-ink-500">
            <span className="font-semibold text-brand-700">+₪{(pool * 0.04).toFixed(0)}</span> ב-10 הדקות האחרונות
          </p>

          <div className="mt-5 space-y-2">
            <Row k="ממוצע לעובד" v={`${Math.round(pool / Math.max(1, checkedIn.length)).toLocaleString("he-IL")}₪`} />
            <Row k="ממוצע לשעה" v={`${Math.round(pool / Math.max(1, totalHours)).toLocaleString("he-IL")}₪`} />
            <Row k="עמלות פלטפורמה (1.8%)" v={`−${Math.round(pool * 0.018).toLocaleString("he-IL")}₪`} muted />
            <Row k="לחלוקה (משוער)" v={`${Math.round(pool * 0.982).toLocaleString("he-IL")}₪`} bold />
          </div>
        </div>

        {/* Check in list */}
        <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-ink-900">צוות זמין · החתימו במשמרת</h3>
            <span className="text-xs text-ink-500">{checkedIn.length} מתוך {staff.length}</span>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {staff.map((w) => (
              <li
                key={w.id}
                className={`flex items-center gap-3 rounded-2xl border p-3 transition ${
                  w.checkedIn ? "border-brand-200 bg-brand-50/50" : "border-ink-200 bg-white"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${
                  w.checkedIn ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"
                }`}>
                  {w.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink-900">{w.name}</p>
                  <p className="text-xs text-ink-500">
                    {w.role}
                    {w.checkedIn && (
                      <>
                        {" · "}
                        <Clock className="inline h-3 w-3" /> {w.hoursIn.toFixed(1)} ש
                        {" · "}
                        ≈ {Math.round((pool * 0.982) / Math.max(1, checkedIn.length))}₪
                      </>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => toggle(w.id)}
                  className={`rounded-lg p-2 transition ${
                    w.checkedIn
                      ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
                      : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                  }`}
                  aria-label="החתמת עובד"
                >
                  {w.checkedIn ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------- SERVICE LOG ---------------- */

function ServiceLogPanel() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold text-ink-900">יומן שירות מחויב</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            <BadgeCheck className="h-3.5 w-3.5" /> תקין למבדק מע״מ
          </span>
          <span className="text-xs text-ink-500">חוזר רשות המסים 14/2018</span>
          <div className="ms-auto flex items-center gap-2 text-xs">
            <select className="rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 text-ink-700">
              <option>30 ימים אחרונים</option>
              <option>שבוע אחרון</option>
              <option>חודש קלנדרי</option>
            </select>
            <button className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-2.5 py-1.5 font-medium text-ink-700 transition hover:border-brand-400 hover:text-brand-700">
              <Download className="h-3.5 w-3.5" /> ייצוא
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-end text-sm">
            <thead className="bg-ink-50 text-xs font-semibold uppercase text-ink-500">
              <tr>
                <th className="px-5 py-3 text-end">תאריך</th>
                <th className="px-5 py-3 text-end">מס׳ משמרת</th>
                <th className="px-5 py-3 text-end">סוג</th>
                <th className="px-5 py-3 text-end">סך טיפים</th>
                <th className="px-5 py-3 text-end">חולק לעובדים</th>
                <th className="px-5 py-3 text-end">סטטוס</th>
                <th className="px-5 py-3 text-end">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {SERVICE_LOG.map((r) => (
                <tr key={r.id} className="transition hover:bg-ink-50/60">
                  <td className="px-5 py-3 text-ink-700">{r.date}</td>
                  <td className="px-5 py-3 font-medium text-ink-900">{r.id}</td>
                  <td className="px-5 py-3 text-ink-600">{r.shift}</td>
                  <td className="px-5 py-3 font-semibold tabular-nums text-ink-900">{r.gross.toLocaleString("he-IL")}₪</td>
                  <td className="px-5 py-3 tabular-nums text-ink-700">{r.distributed.toLocaleString("he-IL")}₪</td>
                  <td className="px-5 py-3">
                    {r.status === "compliant" ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
                        <BadgeCheck className="h-3.5 w-3.5" /> תקין
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                        <Clock className="h-3.5 w-3.5" /> בבדיקה
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <button className="text-xs font-medium text-brand-700 hover:text-brand-600">פרטים</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------------- RULES ---------------- */

const DEFAULT_RULES = [
  { role: "מלצרים", pct: 70, color: "from-brand-600 to-emerald-500" },
  { role: "מטבח", pct: 15, color: "from-amber-500 to-orange-500" },
  { role: "בר", pct: 10, color: "from-indigo-500 to-blue-500" },
  { role: "מארחות", pct: 5, color: "from-fuchsia-500 to-pink-500" },
];

function RulesPanel() {
  const [rules, setRules] = useState(DEFAULT_RULES);
  const [mode, setMode] = useState<"pct" | "hourly">("pct");
  const [saved, setSaved] = useState(false);

  const total = rules.reduce((s, r) => s + r.pct, 0);

  function update(i: number, v: number) {
    setRules((prev) => prev.map((r, idx) => (idx === i ? { ...r, pct: Math.max(0, Math.min(100, v)) } : r)));
    setSaved(false);
  }

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink-900">חוקי חלוקת קופה</h3>
          <div className="flex gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1 text-xs">
            <button
              onClick={() => setMode("pct")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                mode === "pct" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
              }`}
            >
              לפי אחוזים
            </button>
            <button
              onClick={() => setMode("hourly")}
              className={`rounded-lg px-3 py-1.5 font-medium transition ${
                mode === "hourly" ? "bg-white text-ink-900 shadow-sm" : "text-ink-500"
              }`}
            >
              נקודות לשעה
            </button>
          </div>
        </div>

        {mode === "pct" ? (
          <div className="space-y-4">
            {rules.map((r, i) => (
              <div key={r.role}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-700">{r.role}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={r.pct}
                      onChange={(e) => update(i, Number(e.target.value))}
                      className="w-16 rounded-lg border border-ink-200 bg-white px-2 py-1 text-end text-sm tabular-nums outline-none focus:border-brand-500"
                    />
                    <span className="text-sm font-semibold text-ink-500">%</span>
                  </div>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className={`h-full bg-gradient-to-r ${r.color} transition-all`}
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className={`mt-4 flex items-center justify-between rounded-xl p-3 text-sm ${
              total === 100 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
            }`}>
              <span className="font-medium">סך אחוזים</span>
              <span className="font-bold tabular-nums">{total}%</span>
            </div>
            <button
              onClick={save}
              disabled={total !== 100}
              className="w-full rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saved ? "✓ נשמר" : "שמירת חוקים"}
            </button>
          </div>
        ) : (
          <HourlyMatrix />
        )}
      </div>

      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
        <h3 className="mb-2 text-sm font-semibold text-ink-900">תצוגה דינמית · 100₪ טיפ</h3>
        <p className="mb-4 text-xs text-ink-500">כך יתפצל טיפ בודד לפי החוקים הנוכחיים</p>
        <DistributionVisual rules={rules} amount={100} />
      </div>
    </div>
  );
}

function HourlyMatrix() {
  const matrix = [
    { role: "מלצר ראשי", points: 1.5 },
    { role: "מלצר", points: 1.0 },
    { role: "מטבח (טבח ראשי)", points: 0.8 },
    { role: "בר", points: 0.9 },
    { role: "מארחות", points: 0.4 },
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-ink-200">
      <div className="grid grid-cols-2 bg-ink-50 px-4 py-2 text-xs font-semibold text-ink-500">
        <span>תפקיד</span>
        <span className="text-end">נקודות לשעה</span>
      </div>
      <ul className="divide-y divide-ink-100">
        {matrix.map((m) => (
          <li key={m.role} className="grid grid-cols-2 items-center px-4 py-2.5">
            <span className="text-sm text-ink-700">{m.role}</span>
            <span className="text-end text-sm font-bold tabular-nums text-ink-900">{m.points}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DistributionVisual({ rules, amount }: { rules: typeof DEFAULT_RULES; amount: number }) {
  const total = rules.reduce((s, r) => s + r.pct, 0) || 1;
  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full ring-1 ring-ink-100">
        {rules.map((r) => (
          <div
            key={r.role}
            className={`h-full bg-gradient-to-r ${r.color}`}
            style={{ width: `${(r.pct / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="space-y-2 text-sm">
        {rules.map((r) => (
          <li key={r.role} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-ink-700">
              <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${r.color}`} />
              {r.role}
            </span>
            <span className="font-bold tabular-nums text-ink-900">
              {((amount * r.pct) / total).toFixed(2)}₪
              <span className="ms-1 text-xs font-normal text-ink-500">({r.pct}%)</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- STAFF ---------------- */

function StaffPanel() {
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">ניהול עובדים</h3>
          <p className="text-xs text-ink-500">{INITIAL_STAFF.length} עובדים רשומים</p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-xl bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> הוספת עובד
        </button>
      </div>
      <ul className="divide-y divide-ink-100">
        {INITIAL_STAFF.map((w) => (
          <li key={w.id} className="flex items-center gap-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-sm font-bold text-ink-700">
              {w.name[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-ink-900">{w.name}</p>
              <p className="text-xs text-ink-500">{w.role} · ת.ז. ****1234</p>
            </div>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
              w.checkedIn ? "bg-emerald-50 text-emerald-700" : "bg-ink-100 text-ink-500"
            }`}>
              {w.checkedIn ? "בתורנות" : "לא במשמרת"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- EXPORT ---------------- */

function ExportPanel() {
  const [exporting, setExporting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function run(name: string) {
    setExporting(name);
    setSuccess(null);
    setTimeout(() => {
      setExporting(null);
      setSuccess(name);
      setTimeout(() => setSuccess(null), 4000);
    }, 1500);
  }

  const targets = [
    { id: "hilan", title: "חילן (Hilan)", subtitle: "ייצוא משכורות מותאם", ext: ".xml" },
    { id: "malam", title: "מלם (Malam)", subtitle: "פורמט סטנדרטי לתשלום", ext: ".csv" },
    { id: "csv", title: "CSV גנרי", subtitle: "Excel / Google Sheets", ext: ".csv" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
        <h3 className="text-sm font-semibold text-ink-900">ייצוא דוח שכר</h3>
        <p className="mt-1 text-xs text-ink-500">
          בחרו טווח ויעד ייצוא. הנתונים כוללים פירוט טיפים, חלוקות וחתימות תקנים.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <select className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700">
            <option>חודש נוכחי (מאי 2026)</option>
            <option>חודש קודם</option>
            <option>טווח מותאם</option>
          </select>
          <select className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700">
            <option>כל העובדים</option>
            <option>מלצרים בלבד</option>
            <option>מטבח בלבד</option>
          </select>
          <select className="rounded-xl border border-ink-200 bg-white px-3 py-2.5 text-sm text-ink-700">
            <option>כל המשמרות</option>
            <option>ערב בלבד</option>
            <option>צהריים בלבד</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {targets.map((t) => {
          const busy = exporting === t.id;
          return (
            <div key={t.id} className="flex flex-col rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink-900">{t.title}</p>
                  <p className="text-xs text-ink-500">{t.subtitle} · {t.ext}</p>
                </div>
              </div>
              <button
                onClick={() => run(t.id)}
                disabled={busy}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:cursor-wait"
              >
                {busy ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    מכין קובץ...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    ייצוא {t.title}
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {success && (
        <div className="animate-slideDown rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-emerald-900">הקובץ הוכן בהצלחה</p>
              <p className="text-xs text-emerald-700">
                payroll-{success}-2026-05.{success === "hilan" ? "xml" : "csv"} · 24KB · {INITIAL_STAFF.length} עובדים
              </p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
              <Download className="h-3.5 w-3.5" /> הורדה
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- shared bits ---------------- */

function StatCard({
  label,
  value,
  delta,
  icon,
  tone,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: React.ReactNode;
  tone: "primary" | "amber" | "indigo" | "ink";
}) {
  const tones: Record<typeof tone, string> = {
    primary: "from-brand-600 to-emerald-500",
    amber: "from-amber-500 to-orange-500",
    indigo: "from-indigo-500 to-blue-500",
    ink: "from-ink-900 to-ink-700",
  };
  return (
    <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium text-ink-500">{label}</p>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${tones[tone]} text-white`}>
          {icon}
        </div>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-ink-900">{value}</p>
      {delta && <p className="mt-1 text-xs text-ink-500">{delta}</p>}
    </div>
  );
}

function Row({ k, v, muted, bold }: { k: string; v: string; muted?: boolean; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm ${muted ? "text-ink-400" : "text-ink-500"}`}>{k}</span>
      <span
        dir="ltr"
        className={`tabular-nums ${bold ? "text-base font-bold text-ink-900" : muted ? "text-ink-400" : "text-sm font-semibold text-ink-700"}`}
      >
        {v}
      </span>
    </div>
  );
}

function SparkArea() {
  const points = [180, 220, 195, 260, 245, 310, 285, 340, 380, 320, 420, 400, 460, 510];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100, h = 36;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / (max - min)) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-48 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="1" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#g)" />
      <path d={path} fill="none" stroke="#059669" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

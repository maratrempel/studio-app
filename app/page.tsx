import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  ClipboardList,
  Coins,
  CreditCard,
  LayoutDashboard,
  LineChart,
  Scale,
  Settings2,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from "lucide-react";

type Screen = {
  href: string;
  title: string;
  subtitle: string;
  audience: string;
  icon: any;
  metrics: { label: string; value: string; icon: any }[];
  features: string[];
  cta: string;
};

const SCREENS: Screen[] = [
  {
    href: "/tip",
    title: "מסך תשר לצרכן",
    subtitle: "PWA · מובייל ראשון",
    audience: "ללקוח שסורק QR במסעדה",
    icon: Smartphone,
    metrics: [
      { label: "סכום ממוצע", value: "₪32", icon: Coins },
      { label: "דירוג ממוצע", value: "4.8★", icon: Star },
      { label: "המרה", value: "82%", icon: TrendingUp },
    ],
    features: [
      "כפתורי תשלום מהירים: Apple Pay · Bit · כרטיס",
      "סכומים מוגדרים מראש + סכום מותאם",
      "קבלה דיגיטלית עם פירוט ברוטו/נטו",
    ],
    cta: "פתיחת מסך הצרכן",
  },
  {
    href: "/worker",
    title: "לוח עובד",
    subtitle: "רספונסיבי · מובייל ודסקטופ",
    audience: "למלצרים, ברמנים וצוות שירות",
    icon: LineChart,
    metrics: [
      { label: "טיפים היום", value: "₪165", icon: Coins },
      { label: "נטו משוער", value: "₪145", icon: Wallet },
      { label: "עסקאות", value: "5", icon: CreditCard },
    ],
    features: [
      "מטריקות יום/שבוע/חודש בלחיצת לשונית",
      "התראות Push בזמן אמת על טיפ חדש",
      "פירוט שקוף: ברוטו → ניכויים → נטו",
    ],
    cta: "כניסה לאזור העובד",
  },
  {
    href: "/manager",
    title: "לוח ניהול",
    subtitle: "אופטימלי לדסקטופ",
    audience: "לבעלי עסק ומנהלי כספים",
    icon: LayoutDashboard,
    metrics: [
      { label: "משמרות פעילות", value: "3", icon: Settings2 },
      { label: "טיפים היום", value: "₪1,840", icon: Coins },
      { label: "תאימות", value: "100%", icon: BadgeCheck },
    ],
    features: [
      "יומן שירות עם חותמת מע״מ + חוקי חלוקה",
      "ניהול משמרת חיה: הוספה/הסרה של עובדים",
      "ייצוא שכר: חילן · מלם · CSV",
    ],
    cta: "פתיחת לוח הניהול",
  },
  {
    href: "/onboarding",
    title: "אשף הצטרפות",
    subtitle: "Wizard Flow · 3 שלבים",
    audience: "לעסק חדש שמצטרף לפלטפורמה",
    icon: Sparkles,
    metrics: [
      { label: "זמן הקמה", value: "2 דק׳", icon: TrendingUp },
      { label: "מודלים", value: "2", icon: Scale },
      { label: "שלבים", value: "3", icon: ClipboardList },
    ],
    features: [
      "מודל A — מעסיק-יומן (מסעדות, מלונות)",
      "מודל B — עובד עצמאי (פרילנס, ספרות)",
      "חיבור מיידי לסליקה והפעלת QR",
    ],
    cta: "התחלת תהליך הצטרפות",
  },
];

const HERO_STATS = [
  { value: "0%", label: "מע״מ על תשר" },
  { value: "1.8%", label: "עמלת פלטפורמה" },
  { value: "2 ימים", label: "זמן זיכוי" },
  { value: "100%", label: "תאימות לרשות המסים" },
];

const BUILD_TIMESTAMP = new Date().toLocaleString("he-IL", {
  timeZone: "Asia/Jerusalem",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-ink-50 via-white to-ink-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
        {/* Hero */}
        <header className="mb-10 text-center sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-brand-500" />
              גרסת אבטיפוס · Prototype
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-1.5 text-xs font-medium text-ink-600">
              <span>עודכן: {BUILD_TIMESTAMP}</span>
            </div>
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-ink-900 sm:mt-6 sm:text-5xl">
            טיפלי <span className="text-brand-600">·</span> פלטפורמת תשרים דיגיטליים
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-balance text-base text-ink-600 sm:mt-4 sm:text-lg">
            תשתית תשלום ותשרים מודרנית לעסקים בישראל. בחרו דשבורד כדי לחקור את האב-טיפוס האינטראקטיבי.
          </p>

          {/* Hero stats strip */}
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {HERO_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-ink-200 bg-white/70 px-3 py-3 text-center shadow-sm backdrop-blur"
              >
                <p className="text-xl font-bold text-brand-700 sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-ink-500 sm:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Screen dashboard cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {SCREENS.map((s) => (
            <DashboardCard key={s.href} screen={s} />
          ))}
        </div>

        <footer className="mt-12 text-center text-xs text-ink-400 sm:mt-16">
          טיפלי · אב-טיפוס Front-End · React · Next.js App Router · Tailwind · Lucide
        </footer>
      </div>
    </main>
  );
}

function DashboardCard({ screen }: { screen: Screen }) {
  const Icon = screen.icon;
  return (
    <Link
      href={screen.href}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-pop"
    >
      {/* Header strip */}
      <div className="relative flex items-start justify-between bg-gradient-to-br from-brand-700 via-brand-600 to-sky-500 p-5 text-white sm:p-6">
        <div className="absolute -end-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -start-10 -bottom-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">{screen.title}</h2>
          <p className="mt-0.5 text-xs font-medium text-white/75 sm:text-sm">{screen.subtitle}</p>
        </div>
        <span className="relative inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/90 ring-1 ring-white/15 backdrop-blur">
          {screen.audience}
        </span>
      </div>

      {/* Metric mini-dashboard */}
      <div className="grid grid-cols-3 gap-px bg-ink-100">
        {screen.metrics.map((m) => {
          const MIcon = m.icon;
          return (
            <div key={m.label} className="bg-white px-3 py-3 text-center">
              <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <MIcon className="h-3.5 w-3.5" />
              </div>
              <p className="mt-1.5 text-base font-bold tabular-nums text-ink-900 sm:text-lg" dir="ltr">{m.value}</p>
              <p className="text-[10px] text-ink-500 sm:text-[11px]">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Features list */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ul className="space-y-2">
          {screen.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-ink-700">
              <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center justify-between border-t border-ink-100 pt-4">
          <span className="text-sm font-semibold text-brand-700">{screen.cta}</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
            <ArrowLeft className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

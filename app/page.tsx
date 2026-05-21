import Link from "next/link";
import {
  Smartphone,
  LineChart,
  LayoutDashboard,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

const screens = [
  {
    href: "/tip",
    title: "מסך התשר לצרכן",
    subtitle: "PWA — מובייל בלבד",
    description: "המסך שהלקוח רואה לאחר סריקת קוד QR במסעדה או באירוע.",
    icon: Smartphone,
    accent: "from-emerald-500 to-teal-500",
  },
  {
    href: "/worker",
    title: "לוח המחוונים של העובד",
    subtitle: "רספונסיבי — מובייל ודסקטופ",
    description: "פורטל פרטי לעובדי שירות לצפייה בביצועים, טיפים והערכת נטו.",
    icon: LineChart,
    accent: "from-amber-500 to-orange-500",
  },
  {
    href: "/manager",
    title: "לוח ניהול למעסיק",
    subtitle: "ממוטב לדסקטופ",
    description: "פאנל בקרה למנהל המסעדה — יומן שירות, חוקי חלוקה וייצוא לשכר.",
    icon: LayoutDashboard,
    accent: "from-indigo-500 to-blue-500",
  },
  {
    href: "/onboarding",
    title: "אשף ההצטרפות לעסק",
    subtitle: "Wizard Flow",
    description: "תהליך הקמת חשבון לעסק חדש — בחירת מודל ניתוב משפטי.",
    icon: Sparkles,
    accent: "from-fuchsia-500 to-pink-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-ink-50 via-white to-ink-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
            <span className="h-1.5 w-1.5 animate-pulseSoft rounded-full bg-brand-500" />
            Prototype · גרסת אבטיפוס
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl">
            טיפלי <span className="text-brand-600">·</span> פלטפורמת תשרים דיגיטליים
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-ink-600">
            תשתית תשלום ותשרים מודרנית לעסקים בישראל. בחרו מסך כדי לחקור את האב-טיפוס האינטראקטיבי.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {screens.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.href}
                href={s.href}
                className="group relative overflow-hidden rounded-3xl border border-ink-200 bg-white p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop"
              >
                <div
                  className={`absolute -end-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent} opacity-10 transition group-hover:opacity-20`}
                />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${s.accent} text-white shadow-pop`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className="mt-5 text-xl font-semibold text-ink-900">{s.title}</h2>
                    <p className="mt-1 text-sm font-medium text-ink-500">{s.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.description}</p>
                  </div>
                  <ArrowLeft className="mt-1 h-5 w-5 text-ink-300 transition group-hover:-translate-x-1 group-hover:text-brand-600" />
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 text-center text-xs text-ink-400">
          טיפלי · אב-טיפוס Front-End · React · Next.js App Router · Tailwind · Lucide
        </footer>
      </div>
    </main>
  );
}

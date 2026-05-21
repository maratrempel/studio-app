"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  CheckCircle2,
  ChefHat,
  CreditCard,
  FileText,
  Scale,
  Scissors,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type Model = "A" | "B" | null;

const STEPS = [
  { key: 1, label: "פרטי עסק", icon: Building2 },
  { key: 2, label: "ניתוב משפטי", icon: Scale },
  { key: 3, label: "הגדרת תשלום", icon: CreditCard },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [model, setModel] = useState<Model>(null);
  const [biz, setBiz] = useState({ name: "", legalId: "", category: "", phone: "" });
  const [done, setDone] = useState(false);

  const canNext =
    (step === 1 && biz.name && biz.legalId) ||
    (step === 2 && model !== null) ||
    step === 3;

  function next() {
    if (step < 3) setStep(step + 1);
    else setDone(true);
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      {/* Step indicator */}
      <ol className="mb-10 flex items-center justify-between gap-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const current = !done && step === s.key;
          const complete = done || step > s.key;
          return (
            <li key={s.key} className="flex flex-1 items-center gap-3">
              <div
                className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl font-semibold transition ${
                  complete
                    ? "bg-brand-600 text-white"
                    : current
                    ? "bg-ink-900 text-white shadow-pop"
                    : "border border-ink-200 bg-white text-ink-400"
                }`}
              >
                {complete ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
              </div>
              <div className="hidden min-w-0 flex-1 sm:block">
                <p className={`text-[10px] font-semibold uppercase tracking-wider ${
                  current || complete ? "text-brand-700" : "text-ink-400"
                }`}>
                  שלב {s.key}
                </p>
                <p className={`truncate text-sm font-medium ${
                  current ? "text-ink-900" : complete ? "text-ink-700" : "text-ink-400"
                }`}>
                  {s.label}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 rounded ${complete ? "bg-brand-500" : "bg-ink-200"}`} />
              )}
            </li>
          );
        })}
      </ol>

      <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card sm:p-10">
        {done ? <CompleteState model={model} biz={biz} /> : (
          <>
            {step === 1 && <BusinessStep biz={biz} setBiz={setBiz} />}
            {step === 2 && <RoutingStep model={model} setModel={setModel} />}
            {step === 3 && <PaymentStep model={model} />}

            <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-100 pt-6">
              <button
                type="button"
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-2 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm font-medium text-ink-700 transition hover:border-ink-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowRight className="h-4 w-4" />
                חזרה
              </button>
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pop transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 3 ? "סיום והפעלה" : "המשך"}
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-ink-400">
        <ShieldCheck className="me-1 inline h-3.5 w-3.5 text-brand-600" />
        נתוני העסק מוצפנים ומאוחסנים תחת תקן ISO 27001
      </p>
    </div>
  );
}

/* ---------------- STEP 1 ---------------- */

function BusinessStep({
  biz,
  setBiz,
}: {
  biz: { name: string; legalId: string; category: string; phone: string };
  setBiz: React.Dispatch<React.SetStateAction<typeof biz>>;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">בואו נכיר את העסק שלכם</h2>
      <p className="mt-1 text-sm text-ink-500">פרטים בסיסיים שיופיעו בקבלות וביומן השירות.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="שם העסק" required>
          <input
            type="text"
            value={biz.name}
            onChange={(e) => setBiz({ ...biz, name: e.target.value })}
            placeholder="לדוגמה: מסעדת הים התיכון"
            className="input"
          />
        </Field>
        <Field label="ח.פ / עוסק מורשה" required>
          <input
            type="text"
            value={biz.legalId}
            onChange={(e) => setBiz({ ...biz, legalId: e.target.value })}
            placeholder="9 ספרות"
            className="input"
          />
        </Field>
        <Field label="קטגוריה">
          <select
            value={biz.category}
            onChange={(e) => setBiz({ ...biz, category: e.target.value })}
            className="input"
          >
            <option value="">בחרו קטגוריה</option>
            <option value="restaurant">מסעדה / בית קפה</option>
            <option value="hotel">מלון / נופש</option>
            <option value="event">אירועים</option>
            <option value="freelance">פרילנס / טיפול</option>
            <option value="barber">ספרות / יופי</option>
          </select>
        </Field>
        <Field label="טלפון ליצירת קשר">
          <input
            type="tel"
            value={biz.phone}
            onChange={(e) => setBiz({ ...biz, phone: e.target.value })}
            placeholder="050-0000000"
            className="input"
          />
        </Field>
      </div>

      <style>{`.input{display:block;width:100%;border-radius:.875rem;border:1px solid #e2e8f0;background:#fff;padding:.65rem .9rem;font-size:.875rem;color:#0f172a;outline:none;transition:.15s} .input:focus{border-color:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.15)}`}</style>
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">
        {label}
        {required && <span className="ms-1 text-rose-500">*</span>}
      </span>
      {children}
    </label>
  );
}

/* ---------------- STEP 2 — ROUTING ---------------- */

function RoutingStep({ model, setModel }: { model: Model; setModel: (m: Model) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">איזה מודל מתאים לכם?</h2>
      <p className="mt-1 text-sm text-ink-500">בחירת המודל המשפטי קובעת כיצד הכסף זורם, מי מנפיק חשבונית, ואיך מוגש דוח לרשויות המס.</p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <ModelCard
          id="A"
          selected={model === "A"}
          onSelect={() => setModel("A")}
          title="מודל מעסיק-יומן"
          subtitle="Employer-Ledger"
          for="מסעדות · מלונות · בתי קפה · אולמות"
          icon={<ChefHat className="h-6 w-6" />}
          tone="brand"
          features={[
            { icon: FileText, text: "יומן משמרות אוטומטי וחתימה דיגיטלית" },
            { icon: CreditCard, text: "ייצוא לשכר: חילן, מלם, CSV" },
            { icon: ShieldCheck, text: "0% מע״מ — בהתאם לחוזר רשות המסים" },
            { icon: Sparkles, text: "חוקי חלוקת קופה מותאמים אישית" },
          ]}
        />

        <ModelCard
          id="B"
          selected={model === "B"}
          onSelect={() => setModel("B")}
          title="מודל עובד עצמאי"
          subtitle="Independent Worker"
          for="פרילנסרים · ספרים · מטפלים · מאמנים"
          icon={<Scissors className="h-6 w-6" />}
          tone="amber"
          features={[
            { icon: Briefcase, text: "KYC ישיר מול ספק סליקה (PSP)" },
            { icon: FileText, text: "הפקת חשבוניות דיגיטליות אוטומטית" },
            { icon: CreditCard, text: "תשלום ישיר לחשבון העסק שלכם" },
            { icon: Sparkles, text: "התאמה לעוסק מורשה / עוסק פטור" },
          ]}
        />
      </div>

      {model && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-800 ring-1 ring-brand-200">
          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-brand-600" />
          <p>
            נבחר: <span className="font-bold">מודל {model}</span> — {model === "A" ? "מעסיק-יומן" : "עובד עצמאי"}.
            ניתן לשנות בכל שלב לפני הפעלת החשבון.
          </p>
        </div>
      )}
    </div>
  );
}

function ModelCard({
  id,
  selected,
  onSelect,
  title,
  subtitle,
  for: forWhom,
  icon,
  tone,
  features,
}: {
  id: "A" | "B";
  selected: boolean;
  onSelect: () => void;
  title: string;
  subtitle: string;
  for: string;
  icon: React.ReactNode;
  tone: "brand" | "amber";
  features: { icon: any; text: string }[];
}) {
  const tones = {
    brand: {
      border: selected ? "border-brand-600 ring-4 ring-brand-100" : "border-ink-200 hover:border-brand-300",
      icon: "from-brand-600 to-emerald-500",
      pill: "bg-brand-50 text-brand-700 ring-brand-200",
    },
    amber: {
      border: selected ? "border-amber-500 ring-4 ring-amber-100" : "border-ink-200 hover:border-amber-300",
      icon: "from-amber-500 to-orange-500",
      pill: "bg-amber-50 text-amber-700 ring-amber-200",
    },
  } as const;
  const t = tones[tone];

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`relative flex flex-col rounded-3xl border-2 bg-white p-6 text-start transition ${t.border}`}
    >
      {selected && (
        <span className="absolute -top-3 end-6 inline-flex items-center gap-1 rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-white shadow-pop">
          <Check className="h-3.5 w-3.5" />
          נבחר
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.icon} text-white shadow-pop`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-ink-900">{title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${t.pill}`}>
              מודל {id}
            </span>
          </div>
          <p className="text-xs font-medium text-ink-500">{subtitle}</p>
        </div>
      </div>

      <p className="mt-4 text-xs uppercase tracking-wider text-ink-400">מתאים ל</p>
      <p className="text-sm text-ink-700">{forWhom}</p>

      <ul className="mt-5 space-y-2.5">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" />
              <span>{f.text}</span>
            </li>
          );
        })}
      </ul>
    </button>
  );
}

/* ---------------- STEP 3 — PAYMENT ---------------- */

function PaymentStep({ model }: { model: Model }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-ink-900">הגדרת חשבון תשלומים</h2>
      <p className="mt-1 text-sm text-ink-500">
        {model === "A"
          ? "חשבון מעסיק לקבלת תשרים בנאמנות וחלוקה לעובדים."
          : model === "B"
          ? "חשבון עצמאי לקבלת תשלום ישיר עם הפקת חשבונית."
          : "בחרו תחילה מודל בשלב הקודם."}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="חשבון בנק">
          <input className="input" placeholder="פועלים · 12 · 123-456789" />
        </Field>
        <Field label="ספק סליקה">
          <select className="input">
            <option>Tranzila</option>
            <option>Hyp / ישראכרט</option>
            <option>CardCom</option>
            <option>PayPlus</option>
          </select>
        </Field>
        {model === "A" && (
          <Field label="ברירת מחדל לחלוקת קופה">
            <select className="input">
              <option>70/15/10/5 (מלצרים/מטבח/בר/מארחות)</option>
              <option>נקודות לפי שעות</option>
              <option>חלוקה שווה</option>
              <option>מותאם אישית</option>
            </select>
          </Field>
        )}
        {model === "B" && (
          <Field label="הפקת חשבונית">
            <select className="input">
              <option>אוטומטית בכל עסקה</option>
              <option>איגוד יומי</option>
              <option>איגוד חודשי</option>
            </select>
          </Field>
        )}
        <Field label="קטגוריית מס">
          <select className="input">
            <option>{model === "A" ? "תשר בנאמנות (0% מע״מ)" : "הכנסה מעבודה"}</option>
            <option>הכנסה מעסק</option>
          </select>
        </Field>
      </div>

      <div className="mt-6 rounded-2xl bg-ink-50 p-4 text-xs text-ink-600">
        <p className="font-semibold text-ink-700">סיכום מודל {model ?? "—"}</p>
        <ul className="mt-2 space-y-1">
          <li>· עמלת פלטפורמה: 1.8% מהעסקה</li>
          <li>· זמן זיכוי: עד 2 ימי עסקים</li>
          <li>· ביטול עסקה: זיכוי תוך 24 שעות</li>
        </ul>
      </div>

      <style>{`.input{display:block;width:100%;border-radius:.875rem;border:1px solid #e2e8f0;background:#fff;padding:.65rem .9rem;font-size:.875rem;color:#0f172a;outline:none;transition:.15s} .input:focus{border-color:#059669;box-shadow:0 0 0 3px rgba(5,150,105,.15)}`}</style>
    </div>
  );
}

/* ---------------- DONE ---------------- */

function CompleteState({ model, biz }: { model: Model; biz: { name: string } }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="relative">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-emerald-400 text-white shadow-pop">
          <CheckCircle2 className="h-10 w-10" strokeWidth={2.4} />
        </div>
        <span className="absolute -inset-2 animate-pulseSoft rounded-full ring-4 ring-brand-200/50" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-ink-900">החשבון הופעל בהצלחה!</h2>
      <p className="mt-2 max-w-md text-sm text-ink-600">
        <span className="font-semibold text-ink-900">{biz.name || "העסק שלכם"}</span> מוגדר תחת מודל {model} ומוכן לקבלת תשרים.
        קוד QR ייחודי נשלח לכתובת המייל שלכם.
      </p>
      <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700 ring-1 ring-brand-200">QR ייחודי הופק</span>
        <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200">חשבון סליקה מקושר</span>
        <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700 ring-1 ring-amber-200">דשבורד פעיל</span>
      </div>
    </div>
  );
}

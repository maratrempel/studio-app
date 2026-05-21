"use client";

import { useMemo, useState } from "react";
import {
  Apple,
  Check,
  CheckCircle2,
  CreditCard,
  Heart,
  Info,
  Receipt,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Wallet,
} from "lucide-react";

type PayMethod = "apple" | "bit" | "card";

const PRESET_AMOUNTS = [15, 20, 30];

const PLATFORM_FEE_RATE = 0.018; // 1.8% mock clearing+platform fee

export default function ConsumerTip() {
  const [amount, setAmount] = useState<number | null>(20);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [paying, setPaying] = useState<PayMethod | null>(null);
  const [success, setSuccess] = useState<{ method: PayMethod; amount: number; net: number; fee: number } | null>(null);

  const parsedCustom = Number(customAmount);
  const effectiveAmount = amount ?? (Number.isFinite(parsedCustom) ? parsedCustom : 0);
  const fee = useMemo(() => Math.max(0, +(effectiveAmount * PLATFORM_FEE_RATE).toFixed(2)), [effectiveAmount]);
  const net = useMemo(() => Math.max(0, +(effectiveAmount - fee).toFixed(2)), [effectiveAmount, fee]);

  const canPay = effectiveAmount >= 1 && !paying;

  function chooseAmount(v: number) {
    setAmount(v);
    setCustomAmount("");
  }

  function chooseCustom(v: string) {
    setAmount(null);
    setCustomAmount(v.replace(/[^\d.]/g, ""));
  }

  function pay(method: PayMethod) {
    if (!canPay) return;
    setPaying(method);
    setTimeout(() => {
      setSuccess({ method, amount: effectiveAmount, net, fee });
      setPaying(null);
    }, 1100);
  }

  function reset() {
    setSuccess(null);
    setAmount(20);
    setCustomAmount("");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-gradient-to-b from-white via-ink-50 to-white">
      {/* Venue header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-500 px-6 pb-10 pt-8 text-white">
        <div className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -start-12 bottom-0 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur ring-1 ring-white/20">
            <span className="text-xl font-bold">ים</span>
          </div>
          <div>
            <p className="text-xs font-medium text-white/70">משלמים תשר ב</p>
            <h1 className="text-lg font-semibold leading-tight">מסעדת הים התיכון</h1>
            <p className="text-xs text-white/70">תל אביב · רח׳ דיזנגוף 88</p>
          </div>
        </div>
      </header>

      {/* Worker card */}
      <section className="relative -mt-6 px-5">
        <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 text-2xl font-bold text-white shadow-sm">
                ד
              </div>
              <span className="absolute -bottom-1 -end-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 ring-2 ring-white">
                <Check className="h-3 w-3 text-white" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-ink-900">דניאל כהן</h2>
              <p className="text-sm text-ink-500">מלצר ראשי · משמרת ערב</p>
              <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
                <Sparkles className="h-3 w-3" />
                קופת משמרת A · 6 חברי צוות
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 flex items-center justify-between rounded-2xl bg-ink-50 px-4 py-3">
            <div>
              <p className="text-xs text-ink-500">איך הייתה החוויה?</p>
              <p className="text-sm font-medium text-ink-700">דרגו את השירות</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  aria-label={`${n} כוכבים`}
                  className="transition active:scale-90"
                >
                  <Star
                    className={`h-5 w-5 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-ink-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Amount selection */}
      <section className="px-5 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-ink-700">בחרו סכום</h3>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_AMOUNTS.map((v) => {
            const active = amount === v;
            return (
              <button
                key={v}
                type="button"
                onClick={() => chooseAmount(v)}
                className={`relative rounded-2xl border-2 px-3 py-4 text-center font-semibold transition active:scale-95 ${
                  active
                    ? "border-brand-600 bg-brand-50 text-brand-700 shadow-pop"
                    : "border-ink-200 bg-white text-ink-700 hover:border-ink-300"
                }`}
              >
                <span className="block text-2xl">{v}₪</span>
                {active && (
                  <span className="absolute -top-2 end-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <label className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 transition ${
            amount === null && customAmount
              ? "border-brand-600 bg-brand-50"
              : "border-ink-200 bg-white"
          }`}>
            <span className="text-sm font-medium text-ink-600">סכום אחר</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={customAmount}
              onChange={(e) => chooseCustom(e.target.value)}
              className="w-full bg-transparent text-end text-lg font-semibold text-ink-900 outline-none placeholder:text-ink-300"
            />
            <span className="text-lg font-semibold text-ink-500">₪</span>
          </label>
        </div>

        {/* Compliance note */}
        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-ink-50 px-4 py-3 text-xs text-ink-600">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-400" />
          <p>
            <span className="font-semibold text-ink-700">תשר אינו כפוף למע״מ</span> — בהתאם לחוזר רשות המסים. הסכום מועבר ישירות לצוות השירות במלואו.
          </p>
        </div>
      </section>

      {/* Pay buttons */}
      <section className="px-5 pt-6">
        <h3 className="mb-3 text-sm font-semibold text-ink-700">בחרו אמצעי תשלום</h3>
        <div className="space-y-3">
          <PayButton
            method="apple"
            label="Apple Pay"
            icon={<Apple className="h-5 w-5" />}
            tone="dark"
            amount={effectiveAmount}
            paying={paying}
            onPay={pay}
            disabled={!canPay}
          />
          <PayButton
            method="bit"
            label="Bit"
            sublabel="העברה ישירה"
            icon={<Smartphone className="h-5 w-5" />}
            tone="bit"
            amount={effectiveAmount}
            paying={paying}
            onPay={pay}
            disabled={!canPay}
          />
          <PayButton
            method="card"
            label="כרטיס אשראי"
            icon={<CreditCard className="h-5 w-5" />}
            tone="light"
            amount={effectiveAmount}
            paying={paying}
            onPay={pay}
            disabled={!canPay}
          />
        </div>
      </section>

      {/* Disclaimer */}
      <footer className="mt-auto px-5 pb-8 pt-8">
        <div className="rounded-2xl border border-ink-200 bg-white/60 p-4 text-center text-xs text-ink-500 backdrop-blur">
          <div className="mb-1 inline-flex items-center gap-1 font-medium text-ink-600">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            100% מהתשר לעובדי השירות
          </div>
          <p className="leading-relaxed">
            התשלום מועבר ישירות לצוות השירות (בניכוי עמלות סליקה וטכנולוגיה סטנדרטיות),
            בהתאם לתקנות רשות המסים בישראל.
          </p>
        </div>
      </footer>

      {/* Success modal */}
      {success && <SuccessReceipt success={success} workerName="דניאל כהן" venue="מסעדת הים התיכון" rating={rating} onClose={reset} />}
    </div>
  );
}

function PayButton({
  method,
  label,
  sublabel,
  icon,
  tone,
  amount,
  paying,
  onPay,
  disabled,
}: {
  method: PayMethod;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  tone: "dark" | "light" | "bit";
  amount: number;
  paying: PayMethod | null;
  onPay: (m: PayMethod) => void;
  disabled: boolean;
}) {
  const isPaying = paying === method;
  const base =
    "relative flex w-full items-center justify-between rounded-2xl px-5 py-4 font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";
  const tones: Record<typeof tone, string> = {
    dark: "bg-ink-900 text-white hover:bg-ink-800 shadow-card",
    light: "bg-white border border-ink-200 text-ink-900 hover:bg-ink-50",
    bit: "bg-gradient-to-l from-purple-600 to-fuchsia-600 text-white shadow-pop hover:opacity-95",
  };

  return (
    <button
      type="button"
      onClick={() => onPay(method)}
      disabled={disabled}
      className={`${base} ${tones[tone]}`}
    >
      <span className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          tone === "light" ? "bg-ink-100" : "bg-white/15"
        }`}>
          {icon}
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span>{label}</span>
          {sublabel && <span className={`text-xs font-normal ${tone === "light" ? "text-ink-500" : "text-white/70"}`}>{sublabel}</span>}
        </span>
      </span>
      <span className="flex items-center gap-2 text-base">
        {isPaying ? (
          <span className="flex items-center gap-2 text-sm">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            מעבד...
          </span>
        ) : (
          <>
            <span>{amount > 0 ? `${amount}₪` : "—"}</span>
            <Wallet className="h-4 w-4 opacity-70" />
          </>
        )}
      </span>
    </button>
  );
}

function SuccessReceipt({
  success,
  workerName,
  venue,
  rating,
  onClose,
}: {
  success: { method: PayMethod; amount: number; net: number; fee: number };
  workerName: string;
  venue: string;
  rating: number;
  onClose: () => void;
}) {
  const methodLabel = success.method === "apple" ? "Apple Pay" : success.method === "bit" ? "Bit" : "כרטיס אשראי";
  const txId = useMemo(() => "TX-" + Math.random().toString(36).slice(2, 8).toUpperCase(), []);
  const now = useMemo(() => new Date().toLocaleString("he-IL", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" }), []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink-900/60 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md animate-scaleIn rounded-t-3xl bg-white p-6 shadow-pop sm:rounded-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-emerald-400 text-white shadow-pop">
              <CheckCircle2 className="h-10 w-10" strokeWidth={2.4} />
            </div>
            <span className="absolute -inset-2 animate-pulseSoft rounded-full ring-4 ring-brand-200/50" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-ink-900">תודה רבה! 🎉</h2>
          <p className="mt-1 text-sm text-ink-500">
            תשר של <span className="font-semibold text-ink-700">{success.amount}₪</span> נשלח ל{workerName}
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-ink-50 p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
            <Receipt className="h-3.5 w-3.5" />
            פירוט קבלה דיגיטלית
          </div>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="עסק" value={venue} />
            <Row label="מקבל" value={workerName} />
            <Row label="סכום ברוטו" value={`${success.amount.toFixed(2)}₪`} />
            <Row label="עמלת סליקה ופלטפורמה" value={`-${success.fee.toFixed(2)}₪`} muted />
            <div className="my-2 border-t border-dashed border-ink-300" />
            <Row label="לעובד (נטו לחלוקה)" value={`${success.net.toFixed(2)}₪`} bold />
            <Row label="אמצעי תשלום" value={methodLabel} />
            <Row label="דירוג השירות" value={"★".repeat(rating) + "☆".repeat(5 - rating)} />
            <Row label="מספר עסקה" value={txId} muted />
            <Row label="תאריך" value={now} muted />
          </dl>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-500">
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
          תרמתם לחיים טובים יותר לצוות השירות
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-2xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          סיום
        </button>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted }: { label: string; value: string; bold?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={`text-xs ${muted ? "text-ink-400" : "text-ink-500"}`}>{label}</dt>
      <dd className={`text-sm ${bold ? "text-base font-bold text-ink-900" : muted ? "text-ink-400" : "text-ink-700"}`}>{value}</dd>
    </div>
  );
}

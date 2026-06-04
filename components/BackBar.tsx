import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BackBar({ label = "חזרה לרשימת המסכים" }: { label?: string }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 transition hover:text-brand-600"
    >
      <ArrowRight className="h-4 w-4" />
      {label}
    </Link>
  );
}

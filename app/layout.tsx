import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "טיפלי — פלטפורמת תשרים דיגיטליים",
  description: "פלטפורמת תשרים דיגיטליים מתקדמת לעסקים בישראל",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased min-h-screen bg-ink-50 text-ink-900">
        {children}
      </body>
    </html>
  );
}

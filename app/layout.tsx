import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import PWARegister from "@/components/PWARegister";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "محوّل العملات — أسعار صرف لحظية",
  description:
    "حوّل بين أكثر من 160 عملة بأسعار لحظية، مع رسم بياني لآخر 7 أيام وجدول بأشهر العملات.",
  applicationName: "محوّل العملات",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#080d1a",
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "light") document.documentElement.classList.remove("dark");
    else document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${cairo.variable} font-cairo`}>
        <ThemeProvider>{children}</ThemeProvider>
        <PWARegister />
      </body>
    </html>
  );
}

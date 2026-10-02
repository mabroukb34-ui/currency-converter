import Header from "@/components/Header";
import CurrencyConverter from "@/components/CurrencyConverter";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-gold-600/5 blur-3xl" />
      </div>

      <Header />

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            حوِّل عملاتك <span className="gold-text">بأسعار لحظية</span>
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            أكثر من 160 عملة عالمية — تحديث تلقائي كل ساعة
          </p>
        </div>

        <CurrencyConverter />
      </main>

      <footer className="border-t border-stone-200 py-6 text-center text-xs text-slate-400 dark:border-white/5">
        الأسعار من <span dir="ltr">open.er-api.com</span> و{" "}
        <span dir="ltr">frankfurter.app</span> — لأغراض إعلامية وليست للتداول
      </footer>
    </div>
  );
}

import ThemeToggle from "./ThemeToggle";
import { GlobeIcon } from "./Icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/70 backdrop-blur-md
                       dark:border-white/5 dark:bg-night-950/70">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br
                           from-gold-300 to-gold-600 text-night-950 shadow-lg shadow-gold-500/30">
            <GlobeIcon className="h-5 w-5" strokeWidth={2} />
          </span>
          <div>
            <p className="text-lg font-extrabold leading-6">
              مُحوِّل <span className="gold-text">العملات</span>
            </p>
            <p className="text-[11px] text-slate-400">أسعار صرف لحظية</p>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

"use client";

import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "./Icons";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      className="grid h-10 w-10 place-items-center rounded-xl border border-stone-300 bg-white/60
                 text-slate-600 transition hover:border-gold-400 hover:text-gold-500
                 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-gold-300"
    >
      {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  );
}

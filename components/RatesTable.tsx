"use client";

import { POPULAR_CODES, getCurrency } from "@/lib/currencies";
import { formatRate } from "@/lib/format";
import { InfoIcon, TrendingUpIcon } from "./Icons";

interface Props {
  rates: Record<string, number> | null;
  loading: boolean;
  onSelect: (code: string) => void;
}

export default function RatesTable({ rates, loading, onSelect }: Props) {
  return (
    <section className="card flex h-full flex-col p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-bold">
          <TrendingUpIcon className="h-5 w-5 text-gold-400" />
          أشهر 10 عملات
        </h2>
        <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-600 dark:text-gold-300">
          مقابل الدولار
        </span>
      </div>

      <ul className="divide-y divide-stone-200/70 dark:divide-white/5">
        {POPULAR_CODES.map((code, i) => {
          const c = getCurrency(code);
          return (
            <li key={code}>
              <button
                type="button"
                onClick={() => onSelect(code)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-right transition hover:bg-gold-500/5"
              >
                <span className="w-4 text-xs text-slate-400">{i + 1}</span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-stone-100 text-lg dark:bg-white/5">
                  {c.flag}
                </span>
                <span className="min-w-0 flex-1 text-right">
                  <span className="block text-sm font-semibold">{c.nameAr}</span>
                  <span className="block text-xs text-slate-400">{c.code}</span>
                </span>
                <span dir="ltr" className="font-bold tabular-nums text-gold-600 dark:text-gold-300">
                  {loading ? "..." : formatRate(rates?.[code] ?? NaN)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <p className="mt-4 flex items-start gap-1.5 text-[11px] text-slate-400">
        <InfoIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        اضغط على أي عملة لاختيارها في المحوِّل
      </p>
    </section>
  );
}

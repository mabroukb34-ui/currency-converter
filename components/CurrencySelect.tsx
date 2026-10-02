"use client";

import { useEffect, useRef, useState } from "react";
import type { Currency } from "@/types";
import { CheckIcon, ChevronDownIcon, SearchIcon } from "./Icons";

interface Props {
  label: string;
  value: string;
  onChange: (code: string) => void;
  currencies: Currency[];
}

export default function CurrencySelect({ label, value, onChange, currencies }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = currencies.find((c) => c.code === value);

  const filtered = currencies.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.nameAr.includes(query.trim())
    );
  });

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    searchRef.current?.focus();

    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={boxRef} className="relative">
      <label className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-xl border border-stone-300 bg-white px-3.5 py-3
                   transition hover:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40
                   dark:border-white/10 dark:bg-white/5 dark:hover:border-gold-500/50"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-stone-100 text-lg dark:bg-white/10">
          {selected?.flag}
        </span>
        <span className="min-w-0 flex-1 text-right">
          <span className="block font-bold">{value}</span>
          <span className="block truncate text-xs text-slate-400">{selected?.nameAr}</span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-gold-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border
                        border-stone-200 bg-white shadow-2xl dark:border-white/10 dark:bg-night-900">
          <div className="flex items-center gap-2 border-b border-stone-100 px-3 py-2 dark:border-white/10">
            <SearchIcon className="h-4 w-4 text-slate-400" />
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن عملة..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <ul role="listbox" className="max-h-56 overflow-y-auto">
            {filtered.map((c) => (
              <li key={c.code} role="option" aria-selected={c.code === value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-right text-sm transition
                              hover:bg-gold-500/10
                              ${c.code === value ? "bg-gold-500/10 text-gold-700 dark:text-gold-300" : ""}`}
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="min-w-0 flex-1 text-right">
                    <span className="block font-semibold">{c.nameAr}</span>
                    <span className="block text-xs text-slate-400">{c.name}</span>
                  </span>
                  {c.code === value && <CheckIcon className="h-4 w-4 text-gold-500" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-slate-400">لا توجد نتائج</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

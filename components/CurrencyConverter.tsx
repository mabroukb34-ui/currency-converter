"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CurrencySelect from "./CurrencySelect";
import ExchangeChart from "./ExchangeChart";
import RatesTable from "./RatesTable";
import { InfoIcon, RefreshIcon, SwapIcon } from "./Icons";
import { CURRENCIES, getCurrency } from "@/lib/currencies";
import { formatDateTimeAr, formatMoney, formatRate } from "@/lib/format";
import type { RatesResponse } from "@/types";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("SAR");

  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [updatedAt, setUpdatedAt] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [spinning, setSpinning] = useState(false);

  const loadRates = useCallback(async () => {
    setError("");
    try {
      const res = await fetch("/api/rates?base=USD");
      if (!res.ok) throw new Error("bad response");
      const data: RatesResponse = await res.json();
      setRates(data.rates);
      setUpdatedAt(data.time_last_update_utc);
    } catch {
      setError("تعذّر جلب أسعار الصرف، تأكد من اتصالك بالإنترنت وحاول مجددًا.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const handleConvert = async () => {
    setSpinning(true);
    await loadRates();
    setSpinning(false);
  };

  const numericAmount = useMemo(() => {
    const n = parseFloat(amount);
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  const unitRate = useMemo(() => {
    if (!rates) return null;
    const f = rates[from];
    const t = rates[to];
    if (!f || !t) return null;
    return t / f;
  }, [rates, from, to]);

  const result = unitRate !== null ? numericAmount * unitRate : null;

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="space-y-6">
      <section className="card relative overflow-hidden p-5 sm:p-8">
        <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl" />

        <div className="relative grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <CurrencySelect label="من" value={from} onChange={setFrom} currencies={CURRENCIES} />

          <button
            type="button"
            onClick={swap}
            title="عكس العملتين"
            aria-label="عكس العملتين"
            className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-gold-500/40
                       bg-gold-500/10 text-gold-500 transition-all duration-300
                       hover:rotate-180 hover:bg-gold-500/20 dark:text-gold-300"
          >
            <SwapIcon className="h-5 w-5" />
          </button>

          <CurrencySelect label="إلى" value={to} onChange={setTo} currencies={CURRENCIES} />
        </div>

        <div className="relative mt-6">
          <label htmlFor="amount" className="mb-1.5 block text-xs font-semibold text-slate-500 dark:text-slate-400">
            المبلغ
          </label>
          <div className="flex items-center gap-3 rounded-xl border border-stone-300 bg-white px-4 py-3
                          transition focus-within:border-gold-400 focus-within:ring-2 focus-within:ring-gold-500/30
                          dark:border-white/10 dark:bg-white/5">
            <span className="w-8 text-center text-xl font-bold text-gold-500 dark:text-gold-300">
              {getCurrency(from).symbol}
            </span>
            <input
              id="amount"
              dir="ltr"
              inputMode="decimal"
              autoComplete="off"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl font-extrabold outline-none
                         placeholder:text-slate-300 dark:placeholder:text-slate-600"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleConvert}
          disabled={loading}
          className="btn-gold mt-6 flex w-full items-center justify-center gap-2"
        >
          <RefreshIcon className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`} />
          {loading ? "جارٍ التحميل..." : "تحويل الآن"}
        </button>

        {error && (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10
                        px-4 py-3 text-sm text-red-500 dark:text-red-400">
            <InfoIcon className="h-5 w-5 shrink-0" />
            {error}
          </p>
        )}

        {loading && !error && (
          <div className="mt-6 animate-pulse space-y-3 rounded-2xl border border-stone-200 p-6 text-center dark:border-white/10">
            <div className="mx-auto h-3 w-44 rounded-full bg-stone-200 dark:bg-white/10" />
            <div className="mx-auto h-10 w-60 rounded-full bg-stone-200 dark:bg-white/10" />
          </div>
        )}

        {result !== null && !loading && (
          <div className="animate-fade-up mt-6 rounded-2xl border border-gold-500/25
                          bg-gradient-to-b from-gold-500/10 to-transparent p-6 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span dir="ltr" className="font-bold text-slate-700 dark:text-slate-200">
                {formatMoney(numericAmount)}
              </span>{" "}
              {getCurrency(from).nameAr} يساوي
            </p>
            <p dir="ltr" className="gold-text mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              {formatMoney(result)}
              <span className="ms-2 align-middle text-xl font-bold opacity-70">{to}</span>
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span dir="ltr">1 {from} = {formatRate(unitRate!)} {to}</span>
              <span dir="ltr">1 {to} = {formatRate(1 / unitRate!)} {from}</span>
            </div>
            {updatedAt && (
              <p className="mt-3 text-[11px] text-slate-400">
                آخر تحديث للأسعار: {formatDateTimeAr(updatedAt)}
              </p>
            )}
          </div>
        )}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ExchangeChart from={from} to={to} />
        </div>
        <div className="lg:col-span-2">
          <RatesTable rates={rates} loading={loading} onSelect={setTo} />
        </div>
      </div>
    </div>
  );
}

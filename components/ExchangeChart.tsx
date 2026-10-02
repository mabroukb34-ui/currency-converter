"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartIcon, InfoIcon, RefreshIcon } from "./Icons";

const ECB_SUPPORTED = new Set([
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD",
  "HUF", "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD",
  "PHP", "PLN", "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR",
]);

type Status = "loading" | "ok" | "unsupported" | "error";

interface Point {
  date: string;
  rate: number;
}

interface Props {
  from: string;
  to: string;
}

export default function ExchangeChart({ from, to }: Props) {
  const [data, setData] = useState<Point[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (from === to || !ECB_SUPPORTED.has(from) || !ECB_SUPPORTED.has(to)) {
      setData([]);
      setStatus("unsupported");
      return;
    }

    let active = true;
    setStatus("loading");

    fetch(`/api/history?base=${from}&target=${to}`)
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((json) => {
        if (!active) return;
        const entries = Object.entries(json.rates ?? {}) as [string, Record<string, number>][];
        const points = entries
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([date, obj]) => ({ date, rate: obj[to] }))
          .filter((p) => typeof p.rate === "number" && Number.isFinite(p.rate))
          .slice(-7);

        if (points.length === 0) {
          setStatus("error");
        } else {
          setData(points);
          setStatus("ok");
        }
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, [from, to]);

  const change = useMemo(() => {
    if (data.length < 2) return 0;
    return ((data[data.length - 1].rate - data[0].rate) / data[0].rate) * 100;
  }, [data]);

  const isUp = change >= 0;

  return (
    <section className="card p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-bold">
          <ChartIcon className="h-5 w-5 text-gold-400" />
          سعر الصرف — آخر 7 أيام
        </h2>
        <span dir="ltr" className="text-sm text-slate-400">
          {from} / {to}
        </span>
      </div>

      {status === "loading" && (
        <div className="grid h-64 place-items-center text-slate-400">
          <RefreshIcon className="h-6 w-6 animate-spin" />
        </div>
      )}

      {status === "unsupported" && (
        <div className="flex h-64 flex-col items-center justify-center gap-3 px-4 text-center text-sm text-slate-400">
          <InfoIcon className="h-8 w-8 text-gold-500/50" />
          {from === to ? (
            <p>اختر عملتين مختلفتين لعرض الرسم البياني.</p>
          ) : (
            <p>
              البيانات التاريخية غير متاحة للزوج <b dir="ltr">{from}/{to}</b> حاليًا.
              <br />
              الرسم البياني مدعوم لعملات البنك المركزي الأوروبي (USD, EUR, GBP, JPY, TRY...).
            </p>
          )}
        </div>
      )}

      {status === "error" && (
        <div className="flex h-64 flex-col items-center justify-center gap-2 text-center text-sm text-slate-400">
          <InfoIcon className="h-8 w-8 text-red-400/70" />
          تعذّر تحميل بيانات الرسم البياني
        </div>
      )}

      {status === "ok" && (
        <>
          {data.length >= 2 && (
            <div className="mb-3 flex items-center gap-2 text-sm">
              <span
                dir="ltr"
                className={`rounded-full px-2.5 py-1 font-bold ${
                  isUp ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400"
                       : "bg-red-500/10 text-red-500 dark:text-red-400"
                }`}
              >
                {isUp ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
              </span>
              <span className="text-xs text-slate-400">التغير خلال الأسبوع</span>
            </div>
          )}

          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
              <defs>
                <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e0af3a" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#e0af3a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="currentColor"
                className="text-stone-300/60 dark:text-white/10"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickFormatter={(v: string) =>
                  new Date(v + "T00:00:00").toLocaleDateString("ar", {
                    day: "numeric",
                    month: "short",
                  })
                }
                tick={{ fontSize: 11, fill: "currentColor" }}
                className="text-slate-400"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={["auto", "auto"]}
                width={60}
                tick={{ fontSize: 11, fill: "currentColor" }}
                tickFormatter={(v: number) =>
                  v >= 100 ? v.toFixed(0) : v >= 1 ? v.toFixed(3) : v.toFixed(4)
                }
                axisLine={false}
                tickLine={false}
                className="text-slate-400"
              />
              <Tooltip content={<ChartTooltip from={from} to={to} />} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#e0af3a"
                strokeWidth={2.5}
                fill="url(#goldFill)"
                dot={{ r: 3, fill: "#e0af3a", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#eed88f", stroke: "#e0af3a", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </section>
  );
}

function ChartTooltip({
  active,
  payload,
  from,
  to,
}: {
  active?: boolean;
  payload?: { payload: Point }[];
  from: string;
  to: string;
}) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;

  return (
    <div
      dir="ltr"
      className="rounded-xl border border-gold-500/30 bg-night-900/95 px-4 py-3 shadow-xl backdrop-blur"
    >
      <p className="text-xs text-slate-300">
        {new Date(p.date + "T00:00:00").toLocaleDateString("ar", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <p className="mt-1 text-lg font-bold text-gold-300">
        {p.rate.toFixed(4)}{" "}
        <span className="text-xs font-normal text-slate-400">
          {from} → {to}
        </span>
      </p>
    </div>
  );
}

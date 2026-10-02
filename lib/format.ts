export function formatMoney(value: number, maxDigits?: number): string {
  if (!Number.isFinite(value)) return "—";
  const digits = maxDigits ?? (Math.abs(value) >= 1000 ? 2 : 4);
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatRate(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: Math.abs(value) >= 1 ? 4 : 6,
  }).format(value);
}

export function formatDateTimeAr(value: string | number | Date): string {
  try {
    return new Intl.DateTimeFormat("ar", {
      dateStyle: "medium",
      timeStyle: "short",
      numberingSystem: "latn",
    }).format(new Date(value));
  } catch {
    return String(value);
  }
}

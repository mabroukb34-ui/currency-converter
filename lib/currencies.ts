import type { Currency } from "@/types";

export const POPULAR_CODES = [
  "USD", "EUR", "GBP", "JPY", "CHF", "CAD", "AUD", "CNY", "SAR", "AED",
] as const;

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar",         nameAr: "دولار أمريكي",    symbol: "$",   flag: "🇺🇸" },
  { code: "EUR", name: "Euro",              nameAr: "يورو",            symbol: "€",   flag: "🇪🇺" },
  { code: "GBP", name: "British Pound",     nameAr: "جنيه إسترليني",   symbol: "£",   flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen",      nameAr: "ين ياباني",       symbol: "¥",   flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc",       nameAr: "فرنك سويسري",     symbol: "Fr",  flag: "🇨🇭" },
  { code: "CAD", name: "Canadian Dollar",   nameAr: "دولار كندي",      symbol: "C$",  flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", nameAr: "دولار أسترالي",   symbol: "A$",  flag: "🇦🇺" },
  { code: "CNY", name: "Chinese Yuan",      nameAr: "يوان صيني",       symbol: "¥",   flag: "🇨🇳" },
  { code: "SAR", name: "Saudi Riyal",       nameAr: "ريال سعودي",      symbol: "ر.س", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham",        nameAr: "درهم إماراتي",    symbol: "د.إ", flag: "🇦🇪" },
  { code: "EGP", name: "Egyptian Pound",    nameAr: "جنيه مصري",       symbol: "ج.م", flag: "🇪🇬" },
  { code: "KWD", name: "Kuwaiti Dinar",     nameAr: "دينار كويتي",     symbol: "د.ك", flag: "🇰🇼" },
  { code: "QAR", name: "Qatari Riyal",      nameAr: "ريال قطري",       symbol: "ر.ق", flag: "🇶🇦" },
  { code: "BHD", name: "Bahraini Dinar",    nameAr: "دينار بحريني",    symbol: "د.ب", flag: "🇧🇭" },
  { code: "OMR", name: "Omani Rial",        nameAr: "ريال عماني",      symbol: "ر.ع", flag: "🇴🇲" },
  { code: "JOD", name: "Jordanian Dinar",   nameAr: "دينار أردني",     symbol: "د.أ", flag: "🇯🇴" },
  { code: "MAD", name: "Moroccan Dirham",   nameAr: "درهم مغربي",      symbol: "د.م", flag: "🇲🇦" },
  { code: "TND", name: "Tunisian Dinar",    nameAr: "دينار تونسي",     symbol: "د.ت", flag: "🇹🇳" },
  { code: "DZD", name: "Algerian Dinar",    nameAr: "دينار جزائري",    symbol: "د.ج", flag: "🇩🇿" },
  { code: "IQD", name: "Iraqi Dinar",       nameAr: "دينار عراقي",     symbol: "د.ع", flag: "🇮🇶" },
  { code: "TRY", name: "Turkish Lira",      nameAr: "ليرة تركية",      symbol: "₺",   flag: "🇹🇷" },
  { code: "SEK", name: "Swedish Krona",     nameAr: "كرونة سويدية",    symbol: "kr",  flag: "🇸🇪" },
  { code: "NOK", name: "Norwegian Krone",   nameAr: "كرونة نرويجية",   symbol: "kr",  flag: "🇳🇴" },
  { code: "SGD", name: "Singapore Dollar",  nameAr: "دولار سنغافوري",  symbol: "S$",  flag: "🇸🇬" },
  { code: "INR", name: "Indian Rupee",      nameAr: "روبية هندية",     symbol: "₹",   flag: "🇮🇳" },
  { code: "PKR", name: "Pakistani Rupee",   nameAr: "روبية باكستانية", symbol: "₨",   flag: "🇵🇰" },
  { code: "MYR", name: "Malaysian Ringgit", nameAr: "رينغيت ماليزي",   symbol: "RM",  flag: "🇲🇾" },
  { code: "IDR", name: "Indonesian Rupiah", nameAr: "روبية إندونيسية", symbol: "Rp",  flag: "🇮🇩" },
  { code: "ZAR", name: "South African Rand",nameAr: "راند جنوب أفريقي",symbol: "R",   flag: "🇿🇦" },
  { code: "BRL", name: "Brazilian Real",    nameAr: "ريال برازيلي",    symbol: "R$",  flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble",     nameAr: "روبل روسي",       symbol: "₽",   flag: "🇷🇺" },
  { code: "KRW", name: "South Korean Won",  nameAr: "وون كوري جنوبي",  symbol: "₩",   flag: "🇰🇷" },
];

export function getCurrency(code: string): Currency {
  return (
    CURRENCIES.find((c) => c.code === code) ?? {
      code,
      name: code,
      nameAr: code,
      symbol: code,
      flag: "🏳️",
    }
  );
}

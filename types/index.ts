export interface Currency {
  code: string;
  name: string;
  nameAr: string;
  symbol: string;
  flag: string;
}

export interface RatesResponse {
  result: string;
  time_last_update_utc: string;
  base_code: string;
  rates: Record<string, number>;
}

export interface HistoryResponse {
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}

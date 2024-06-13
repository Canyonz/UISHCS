export type CounterType = 'HotWaterAreaMeter' | 'ColdWaterAreaMeter';

export interface Counter {
  id: string;
  _type?: [CounterType, string];
  installation_date?: string;
  is_automatic?: boolean | null;
  initial_values?: number[];
  area?: string;
  description?: string | null;
}

export interface CounterSchema {
  count: number;
  results: Counter[];
}

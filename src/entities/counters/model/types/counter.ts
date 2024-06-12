export type CounterType = 'HotWaterAreaMeter' | 'ColdWaterAreaMeter';

export interface Counter {
  type: CounterType;
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  area: string;
  description: string;
}

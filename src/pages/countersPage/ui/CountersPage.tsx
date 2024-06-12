import { CounterRow } from '@/entities/counters';
import styles from './CountersPage.module.sass';
import { Counter } from '@/entities/counters/model/types/counter';

const data: Counter = {
  type: 'ColdWaterAreaMeter',
  installation_date: '12.01.2023',
  is_automatic: true,
  initial_values: [22],
  area: 'г Санкт-Петербург, ул Чудес, д 256, кв. 1',
  description: '211',
};

export const CountersPage = () => {
  return (
    <main>
      <CounterRow rowIndex={1} dataRow={data} />
    </main>
  );
};

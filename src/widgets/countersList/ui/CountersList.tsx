import { CounterRow } from '@/entities/counters';
import { Counter } from '@/entities/counters/model/types/counter';
import { CounterRowDeleteBtn } from '@/features/counterRowDeleteBtn';
import { PaginationUI } from '@/shared/ui/paginationUI/PaginationUI';
import { TextUI } from '@/shared/ui/textUI/TextUI';
import cls from 'classnames';
import { useCallback, useState } from 'react';
import styles from './CountersList.module.sass';
import { CountersListHeader } from './countersListHeader/CountersListHeader';

interface CountersListProps {
  className?: string;
}

const data: Counter[] = [
  {
    type: 'ColdWaterAreaMeter',
    installation_date: '12.01.2023',
    is_automatic: true,
    initial_values: [22],
    area: 'г Санкт-Петербург, ул Чудес, д 256, кв. 1',
    description: '211',
  },
  {
    type: 'ColdWaterAreaMeter',
    installation_date: '12.01.2023',
    is_automatic: true,
    initial_values: [22],
    area: 'г Санкт-Петербург, ул Чудес, д 256, кв. 1',
    description: '211',
  },
  {
    type: 'ColdWaterAreaMeter',
    installation_date: '12.01.2023',
    is_automatic: true,
    initial_values: [22],
    area: 'г Санкт-Петербург, ул Чудес, д 256, кв. 1',
    description: '211',
  },
];

export const CountersList = ({ className }: CountersListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(data.length / 20);

  const handlePageNumberClick = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  return (
    <section className={cls(styles.countersListLayout, className)}>
      <TextUI text="Список счетчиков" variant="h2" />
      <div className={styles.countersListWrapper}>
        <div className={styles.countersList}>
          <CountersListHeader className={styles.countersListHeader} />
          {data.map((dat, index) => (
            <CounterRow
              key={index}
              rowIndex={index + 1}
              dataRow={dat}
              deleteBtn={<CounterRowDeleteBtn counterId="" />}
            />
          ))}
        </div>
        <div className={styles.countersFooter}>
          <PaginationUI
            currentPage={currentPage}
            pageCount={pageCount}
            onClick={handlePageNumberClick}
          />
        </div>
      </div>
    </section>
  );
};

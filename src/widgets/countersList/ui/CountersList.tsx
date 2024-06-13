import { useMst } from '@/app/providers/store/store';
import { CounterRow } from '@/entities/counters';
import { getCounters } from '@/entities/counters/model/api/countersApi';
import { CounterRowDeleteBtn } from '@/features/counterRowDeleteBtn';
import { PaginationUI } from '@/shared/ui/paginationUI/PaginationUI';
import { TextUI } from '@/shared/ui/textUI/TextUI';
import cls from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import styles from './CountersList.module.sass';
import { CountersListHeader } from './countersListHeader/CountersListHeader';

interface CountersListProps {
  className?: string;
}

export const CountersList = observer(({ className }: CountersListProps) => {
  const { counter } = useMst();
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.ceil(counter.count / 20);

  const getData = useCallback(async () => {
    const counters = await getCounters({
      limit: 20,
      offset: 20 * currentPage,
    });

    if (!counters) return;

    counter.setCounters(counters);
  }, [counter, currentPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  const updateCountersOnDelete = useCallback(
    (id: string) => {
      console.log(id);

      getData();
    },
    [getData]
  );

  const handlePageNumberClick = useCallback((value: number) => {
    setCurrentPage(value);
  }, []);

  return (
    <section className={cls(styles.countersListLayout, className)}>
      <TextUI text="Список счетчиков" variant="h2" />
      <div className={styles.countersListWrapper}>
        <div className={styles.countersList}>
          <CountersListHeader className={styles.countersListHeader} />
          <div className={styles.countersListItems}>
            {counter.counters.length ? (
              counter.counters.map((data, index) => (
                <CounterRow
                  key={index}
                  rowIndex={index + 1}
                  dataRow={data}
                  deleteBtn={
                    <CounterRowDeleteBtn
                      key={data.id}
                      counterId={data.id}
                      onClick={updateCountersOnDelete}
                    />
                  }
                />
              ))
            ) : (
              <TextUI text="Загрузка..." variant="h2" />
            )}
          </div>
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
});

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

  const searchParams = new URLSearchParams(window.location.search);
  const limitParam = Number(searchParams.get('limit')) || 20;
  const offsetParam = Number(searchParams.get('offset')) || 0;
  const initCurrentPage =
    offsetParam !== 0 ? Math.floor(offsetParam / limitParam) : 0;

  const [currentPage, setCurrentPage] = useState(initCurrentPage);
  const [limit, setLimit] = useState(limitParam);
  const [offset, setOffset] = useState(offsetParam);

  const pageCount = Math.ceil(counter.count / limit);

  const getData = useCallback(async () => {
    const counters = await getCounters({
      limit,
      offset,
    });

    if (!counters) return;

    counter.setCounters(counters);
  }, [counter, limit, offset]);

  const updateCountersOnDelete = useCallback(
    (id: string) => {
      console.log(id);

      getData();
    },
    [getData]
  );

  const handlePageNumberClick = useCallback(
    (value: number) => {
      const offset = limit * value;

      setOffset(offset);
      setCurrentPage(value);
    },
    [limit]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set('limit', limit.toString());
    searchParams.set('offset', offset.toString());

    window.history.pushState(null, '', `?${searchParams.toString()}`);
    getData();
  }, [getData, limit, offset]);

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

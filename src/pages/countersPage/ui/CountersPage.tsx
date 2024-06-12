import { CountersList } from '@/widgets/countersList';
import styles from './CountersPage.module.sass';

export const CountersPage = () => {
  return (
    <main className={styles.countersPage}>
      <CountersList />
    </main>
  );
};

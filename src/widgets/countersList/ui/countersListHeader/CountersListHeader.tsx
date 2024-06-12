import { TextUI } from '@/shared/ui/textUI/TextUI';
import styles from './CountersListHeader.module.sass';
import cls from 'classnames';

interface CountersListHeaderProps {
  className?: string;
}

const headerList = [
  '№',
  'Тип',
  'Дата установки',
  'Автоматический',
  'Текущие показания',
  'Адрес',
  'Примечание',
];

export const CountersListHeader = ({ className }: CountersListHeaderProps) => {
  return (
    <div className={cls(styles.countersListHeader, className)}>
      {headerList.map((header, index) => (
        <TextUI
          key={index}
          text={header}
          variant="h4"
          color="grey-neutral"
          className={styles.headerItem}
        />
      ))}
    </div>
  );
};

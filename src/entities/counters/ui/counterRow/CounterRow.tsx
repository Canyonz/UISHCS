import GvsSVG from '@/shared/assets/icons/gvs.svg';
import HvsSVG from '@/shared/assets/icons/hvs.svg';
import { TextUI } from '@/shared/ui/textUI/TextUI';
import cls from 'classnames';
import { ReactElement } from 'react';
import { Counter, CounterType } from '../../model/types/counter';
import styles from './CounterRow.module.sass';
import {
  CounterCellType,
  CounterCellTypeProps,
} from './counterCellType/CounterCellType';

interface CounterRowProps {
  rowIndex: number;
  dataRow: Counter;
  deleteBtn: ReactElement;
  className?: string;
}

const mapTypeToTypeName: Record<CounterType, CounterCellTypeProps> = {
  ColdWaterAreaMeter: { SvgIcon: HvsSVG, name: 'ХВС' },
  HotWaterAreaMeter: { SvgIcon: GvsSVG, name: 'ГВС' },
};

export const CounterRow = ({
  rowIndex,
  dataRow,
  deleteBtn,
  className,
}: CounterRowProps) => {
  const typeData = mapTypeToTypeName[dataRow._type[0]];
  const is_automatic = dataRow.is_automatic ? 'Да' : 'Нет';
  const initial_values = dataRow.initial_values.join(', ');

  const date = new Date(dataRow.installation_date);
  const day = date.getDate().toString().padStart(2, '0');
  const mouth = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const installation_date = `${day}.${mouth}.${year}`;

  return (
    <div className={cls(styles.counterRow, className)}>
      <TextUI
        text={rowIndex}
        textAlign="center"
        className={styles.counterCell}
      />
      <CounterCellType className={styles.counterCell} {...typeData} />
      <TextUI text={installation_date} className={styles.counterCell} />
      <TextUI text={is_automatic} className={styles.counterCell} />
      <TextUI text={initial_values} className={styles.counterCell} />
      <TextUI text={dataRow.area} className={styles.counterCell} />

      <TextUI
        text={dataRow.description}
        color={'grey'}
        className={styles.counterCell}
      />
      <div className={styles.buttonWrapper}>{deleteBtn}</div>
    </div>
  );
};

import GvsSVG from '@/shared/assets/icons/gvs.svg';
import HvsSVG from '@/shared/assets/icons/hvs.svg';
import TrashSVG from '@/shared/assets/icons/trash.svg';
import { IconUI } from '@/shared/ui/iconUI/IconUI';
import { TextUI } from '@/shared/ui/textUI/TextUI';
import cls from 'classnames';
import { Counter, CounterType } from '../../model/types/counter';
import styles from './CounterRow.module.sass';
import {
  CounterCellType,
  CounterCellTypeProps,
} from './counterCellType/CounterCellType';

interface CounterRowProps {
  rowIndex: number;
  dataRow: Counter;
  className?: string;
}

const mapTypeToTypeName: Record<CounterType, CounterCellTypeProps> = {
  ColdWaterAreaMeter: { SvgIcon: HvsSVG, name: 'ХВС' },
  HotWaterAreaMeter: { SvgIcon: GvsSVG, name: 'ГВС' },
};

export const CounterRow = ({
  rowIndex,
  dataRow,
  className,
}: CounterRowProps) => {
  const data = Object.entries(dataRow);

  const typeData = mapTypeToTypeName[dataRow.type];

  return (
    <div className={cls(styles.counterRow, className)}>
      <TextUI
        text={rowIndex}
        textAlign="center"
        className={styles.counterCell}
      />
      {data.map((value) =>
        value[1] === dataRow.type ? (
          <CounterCellType
            key={value[0]}
            className={styles.counterCell}
            {...typeData}
          />
        ) : (
          <TextUI
            key={value[0]}
            text={value[1]}
            className={styles.counterCell}
          />
        )
      )}
      <div className={styles.buttonWrapper}>
        <IconUI
          Svg={TrashSVG}
          classNameBtn={styles.iconBtn}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

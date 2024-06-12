import { IconUI } from '@/shared/ui/iconUI/IconUI';
import cls from 'classnames';
import styles from './CounterCellType.module.sass';
import { TextUI } from '@/shared/ui/textUI/TextUI';

export interface CounterCellTypeProps {
  SvgIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
  className?: string;
}

export const CounterCellType = ({
  SvgIcon,
  name,
  className,
}: CounterCellTypeProps) => {
  return (
    <div className={cls(styles.counterCellType, className)}>
      <IconUI Svg={SvgIcon} />
      <TextUI text={name} />
    </div>
  );
};

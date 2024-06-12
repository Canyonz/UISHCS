import { IconUI } from '@/shared/ui/iconUI/IconUI';
import TrashSVG from '@/shared/assets/icons/trash.svg';
import styles from './CounterRowDeleteBtn.module.sass';
import cls from 'classnames';
import { useCallback } from 'react';

interface CounterRowDeleteBtnProps {
  counterId: string;
  className?: string;
}

export const CounterRowDeleteBtn = ({
  counterId,
  className,
}: CounterRowDeleteBtnProps) => {
  const handleClickDelete = useCallback(() => {
    console.log(counterId);
  }, [counterId]);

  return (
    <IconUI
      Svg={TrashSVG}
      classNameBtn={cls(styles.counterRowDeleteBtn, className)}
      onClick={handleClickDelete}
    />
  );
};

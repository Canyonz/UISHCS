import { IconUI } from '@/shared/ui/iconUI/IconUI';
import TrashSVG from '@/shared/assets/icons/trash.svg';
import styles from './CounterRowDeleteBtn.module.sass';
import cls from 'classnames';
import { useCallback } from 'react';
import { deleteCounter } from '@/entities/counters/model/api/countersApi';

interface CounterRowDeleteBtnProps {
  counterId: string;
  className?: string;
  onClick: (id: string) => void;
}

export const CounterRowDeleteBtn = ({
  counterId,
  className,
  onClick,
}: CounterRowDeleteBtnProps) => {
  const handleClickDelete = useCallback(async () => {
    const data = await deleteCounter({ id: counterId });
    console.log(data);

    onClick(counterId);
  }, [counterId, onClick]);

  return (
    <IconUI
      Svg={TrashSVG}
      classNameBtn={cls(styles.counterRowDeleteBtn, className)}
      onClick={handleClickDelete}
    />
  );
};

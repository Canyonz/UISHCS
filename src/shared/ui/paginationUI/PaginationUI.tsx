import styles from './PaginationUI.module.sass';
import cls from 'classnames';

interface PaginationUIProps {
  currentPage: number;
  pageCount: number;
  className?: string;
  onClick: (value: number) => void;
}

export const PaginationUI = ({
  currentPage,
  pageCount,
  className,
  onClick,
}: PaginationUIProps) => {
  let ellipsisLeftAdded = false;
  let ellipsisRightAdded = false;

  return (
    <div className={cls(styles.pagination, className)}>
      {new Array(pageCount).fill('').map((_, index) => {
        const isLastThreePages = index >= pageCount - 4;
        const isFirstThreePages = index <= 3;
        const isVisible =
          index === 0 ||
          index === pageCount - 1 ||
          (index >= currentPage - 1 && index <= currentPage + 1) ||
          (isLastThreePages && currentPage === pageCount - 1) ||
          (isLastThreePages && currentPage === pageCount - 2) ||
          (isFirstThreePages && currentPage === 0) ||
          (isFirstThreePages && currentPage === 1);

        const isVisibleLeftElipsis = index < currentPage && currentPage >= 3;
        const isVisibleRightElipsis =
          index > currentPage && currentPage <= pageCount - 4;

        if (!isVisible && !ellipsisLeftAdded && isVisibleLeftElipsis) {
          ellipsisLeftAdded = true;
          return (
            <button key={index} className={styles.paginationItemEllipsis}>
              ...
            </button>
          );
        }

        if (!isVisible && !ellipsisRightAdded && isVisibleRightElipsis) {
          ellipsisRightAdded = true;
          return (
            <button key={index} className={styles.paginationItemEllipsis}>
              ...
            </button>
          );
        }

        return (
          isVisible && (
            <button
              key={index}
              className={cls(styles.paginationItem, {
                [styles.selected]: index === currentPage,
              })}
              onClick={() => onClick(index)}
            >
              {index + 1}
            </button>
          )
        );
      })}
    </div>
  );
};

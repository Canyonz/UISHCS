import styles from './IconUI.module.sass';
import cls from 'classnames';

type SVGProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick' | 'className'>;

interface IconUIProps extends SVGProps {
  Svg: React.FC<React.SVGProps<SVGSVGElement>>;
  size?: number;
  disabled?: boolean;
  classNameIcon?: string;
  classNameBtn?: string;
  onClick?: () => void;
}

export const IconUI = ({
  Svg,
  size = 16,
  disabled = false,
  classNameBtn,
  classNameIcon,
  onClick,
  ...restProps
}: IconUIProps) => {
  const icon = (
    <Svg
      height={size}
      width={size}
      className={cls(styles.iconUI, classNameIcon)}
      {...restProps}
    />
  );

  if (onClick)
    return (
      <button
        disabled={disabled}
        className={cls(styles.btnIconUI, classNameBtn)}
        onClick={onClick}
      >
        {icon}
      </button>
    );

  return icon;
};

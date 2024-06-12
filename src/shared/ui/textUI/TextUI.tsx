import styles from './TextUI.module.sass';
import cls from 'classnames';

type TextUIVariant = 'h2' | 'h4' | 'span';
type TextUIColor = 'primary' | 'grey' | 'grey-neutral';
type TextUIAlign = 'left' | 'center' | 'right';

interface TextUIProps {
  text: string | number;
  variant?: TextUIVariant;
  color?: TextUIColor;
  textAlign?: TextUIAlign;
  className?: string;
}

export const TextUI = ({
  text = '',
  variant = 'span',
  color = 'primary',
  textAlign = 'left',
  className,
}: TextUIProps) => {
  const TextTag = variant;

  return (
    <TextTag
      className={cls(
        styles.textUI,
        styles[color],
        styles[textAlign],
        className
      )}
    >
      {text}
    </TextTag>
  );
};

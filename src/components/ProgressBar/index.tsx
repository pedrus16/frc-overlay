import style from './style.module.css';

export enum Direction {
  HORIZONTAL,
  VERTICAL,
}

export interface Props {
  progressPercent: number;
  direction?: Direction;
  className?: string;
  barClassName?: string;
}

const ProgressBar = ({
  progressPercent,
  direction = Direction.HORIZONTAL,
  className = '',
  barClassName = '',
}: Props) => {
  const styleKey = direction === Direction.HORIZONTAL ? 'width' : 'height';

  return (
    <div className={`${style.container} ${className}`}>
      <div
        className={`${style.progressForeground} ${barClassName}`}
        style={{ [styleKey]: `${progressPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;

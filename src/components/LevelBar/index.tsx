import range from '../../utils/range';

import style from './style.module.css';

export interface Props {
  level: number;
  levelMax: number;
  className?: string;
}

const LevelBar = ({ level, levelMax, className = '' }: Props) => {
  const dots = range(levelMax);

  return (
    <div className={`${className} ${style.container}`}>
      {dots.map((index) => (
        <div
          key={index}
          className={`${style.dot} ${level > index ? style.active : ''}`}
        ></div>
      ))}
    </div>
  );
};

export default LevelBar;

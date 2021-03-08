import Cameo from '../Cameo';
import LevelBar from '../LevelBar';

import style from './style.module.css';

export interface Props {
  id: string;
  level: number;
  levelMax: number;
  className?: string;
}

const Upgrade = ({ id, level, levelMax, className = '' }: Props) => {
  const suffix = level > 1 ? Math.min(level, levelMax) : '';

  return (
    <div className={`${style.container} ${className}`}>
      <Cameo id={`${id}${suffix}`} />
      {levelMax > 1 && (
        <LevelBar
          className={style.levelBar}
          level={level}
          levelMax={levelMax}
        />
      )}
    </div>
  );
};

export default Upgrade;

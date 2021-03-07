import { useMemo } from 'react';
import Cameo from '../../../Cameo';
import Cooldown from '../../../Cooldown';

import style from './style.module.css';

export interface Props {
  id: string;
  level: number;
  cooldown?: { totalDurationSec: number; timeLeftSec: number };
}

const Spell = ({ id, level, cooldown }: Props) => {
  const progress = useMemo(
    () =>
      cooldown ? 1 - cooldown?.timeLeftSec / cooldown?.totalDurationSec : 0,
    [cooldown]
  );

  return (
    <div className={style.container}>
      <Cameo id={id} />
      {!!cooldown && cooldown.timeLeftSec > 0 && (
        <div className={style.cooldownOverlay}>
          <Cooldown
            progressPercent={progress * 100}
            className={style.cooldown}
            width={32}
            height={32}
          />
          <div className={style.countdown}>
            {Math.ceil(cooldown.timeLeftSec)}
          </div>
        </div>
      )}
      <div className={style.level}>
        <div
          className={`${style.levelDot} ${level >= 1 ? style.active : ''}`}
        ></div>
        <div
          className={`${style.levelDot} ${level >= 2 ? style.active : ''}`}
        ></div>
        <div
          className={`${style.levelDot} ${level >= 3 ? style.active : ''}`}
        ></div>
      </div>
    </div>
  );
};

export default Spell;

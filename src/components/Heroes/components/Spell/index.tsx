import { useEffect, useMemo } from 'react';
import useRealTimeMs from '../../../../hooks/useRealTimeMs';
import Cameo from '../../../Cameo';
import Cooldown from '../../../Cooldown';
import LevelBar from '../../../LevelBar';

import style from './style.module.css';

export interface Props {
  id: string;
  level: number;
  levelMax: number;
  cooldown?: { totalDurationSec: number; timeLeftSec: number };
}

const Spell = ({ id, level, levelMax, cooldown }: Props) => {
  const [realTimeMs, setRealtimeMs] = useRealTimeMs(
    (cooldown?.timeLeftSec || 0) * 1000,
    true
  );
  useEffect(() => {
    setRealtimeMs((cooldown?.timeLeftSec || 0) * 1000);
  }, [cooldown, setRealtimeMs]);

  const progress = useMemo(() => {
    return cooldown ? 1 - realTimeMs / 1000 / cooldown?.totalDurationSec : 0;
  }, [cooldown, realTimeMs]);

  return (
    <div className={style.container}>
      <Cameo id={id} />
      {!!cooldown && cooldown.timeLeftSec > 0 && (
        <div className={style.cooldownOverlay}>
          <Cooldown
            progressPercent={progress * 100}
            className={style.cooldown}
            width={40}
            height={40}
          />
          {realTimeMs > 0 && (
            <div className={style.countdown}>
              {Math.ceil(realTimeMs / 1000)}
            </div>
          )}
        </div>
      )}
      <LevelBar className={style.levelBar} level={level} levelMax={levelMax} />
    </div>
  );
};

export default Spell;

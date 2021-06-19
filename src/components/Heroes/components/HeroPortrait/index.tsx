import { useEffect, useMemo } from 'react';

import Cameo from '../../../Cameo';
import Cooldown from '../../../Cooldown';
import useRealTimeMs from '../../../../hooks/useRealTimeMs';
import style from './style.module.css';
import ProgressBar from '../../../ProgressBar';

export interface Props {
  id: string;
  healthPercent: number;
  manaPercent: number;
  respawn: { totalDurationSec: number; timeLeftSec: number } | null;
  compact?: boolean;
  className?: string;
}

const HeroPortrait = ({
  id,
  healthPercent,
  manaPercent,
  respawn,
  compact = false,
  className = '',
}: Props) => {
  const isDead = useMemo(() => healthPercent <= 0, [healthPercent]);
  const compactClass = compact ? style.compact : '';

  const [realTimeMs, setRealtimeMs] = useRealTimeMs(
    (respawn?.timeLeftSec || 0) * 1000,
    true
  );
  useEffect(() => {
    setRealtimeMs((respawn?.timeLeftSec || 0) * 1000);
  }, [respawn, setRealtimeMs]);

  const progress = useMemo(
    () => (respawn ? 1 - realTimeMs / 1000 / respawn?.totalDurationSec : 0),
    [respawn, realTimeMs]
  );

  return (
    <div className={`${className} ${style.container} ${compactClass}`}>
      <div className={style.cameoContainer}>
        <Cameo id={id} width={64} height={64} />
        <Cameo
          className={`${style.overlay} ${style.grayscale} ${
            isDead ? '' : style.hide
          }`}
          id={id}
          width={64}
          height={64}
        />
        {realTimeMs > 0 && (
          <div className={`${style.overlay} ${style.cooldown}`}>
            <Cooldown
              className={`${style.overlay} ${style.clock}`}
              progressPercent={progress * 100}
            />
            <div className={style.countdown}>
              {Math.ceil(realTimeMs / 1000)}
            </div>
          </div>
        )}
      </div>
      <ProgressBar
        progressPercent={healthPercent}
        className={style.progressBackground}
        barClassName={style.healthBar}
      />
      <ProgressBar
        progressPercent={manaPercent}
        className={style.progressBackground}
        barClassName={style.manaBar}
      />
    </div>
  );
};

export default HeroPortrait;

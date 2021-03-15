import { useEffect, useMemo, useRef, useState } from 'react';

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
  className?: string;
}

const CAMEO_SIZE_PX = 64;

const HeroPortrait = ({
  id,
  healthPercent,
  manaPercent,
  respawn,
  className = '',
}: Props) => {
  const isDead = useMemo(() => healthPercent <= 0, [healthPercent]);
  const previousHealthPercent = useRef(healthPercent);
  const [showRed, setShowRed] = useState(false);

  useEffect(() => {
    if (healthPercent > 0 && previousHealthPercent.current > healthPercent) {
      setShowRed(true);
      setTimeout(() => setShowRed(false), 1200);
    }
    previousHealthPercent.current = healthPercent;
  }, [healthPercent]);

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
    <div className={`${className} ${style.container}`}>
      <div className={style.cameoContainer}>
        <Cameo id={id} width={CAMEO_SIZE_PX} height={CAMEO_SIZE_PX} />
        <Cameo
          className={`${style.overlay} ${style.grayscale} ${
            isDead ? style.show : ''
          }`}
          id={id}
          width={CAMEO_SIZE_PX}
          height={CAMEO_SIZE_PX}
        />
        {showRed && (
          <Cameo
            className={`${style.overlay} ${style.redShift}`}
            id={id}
            width={CAMEO_SIZE_PX}
            height={CAMEO_SIZE_PX}
          />
        )}
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

import { createStyles, LinearProgress, withStyles } from '@material-ui/core';
import { useEffect, useMemo } from 'react';

import Cameo from '../../../Cameo';
import Cooldown from '../../../Cooldown';
import useRealTimeMs from '../../../../hooks/useRealTimeMs';
import style from './style.module.css';

const HealthBarProgress = withStyles(() =>
  createStyles({
    root: {
      height: 4,
      borderRadius: 0,
    },
    colorPrimary: {
      backgroundColor: 'rgba(0 0 0 / 80%)',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: 'var(--health-color)',
    },
  })
)(LinearProgress);

const ManaBarProgress = withStyles(() =>
  createStyles({
    root: {
      height: 4,
      borderRadius: 0,
    },
    colorPrimary: {
      backgroundColor: 'rgba(0 0 0 / 80%)',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: 'var(--mana-color)',
    },
  })
)(LinearProgress);

export interface Props {
  id: string;
  healthPercent: number;
  manaPercent: number;
  level: number;
  respawn: { totalDurationSec: number; timeLeftSec: number } | null;
  className?: string;
}

const HeroPortrait = ({
  id,
  healthPercent,
  manaPercent,
  level,
  respawn,
  className = '',
}: Props) => {
  const isDead = useMemo(() => healthPercent <= 0, [healthPercent]);

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
        <Cameo id={id} width={64} height={64} />
        <Cameo
          className={`${style.overlay} ${style.grayscale} ${
            isDead ? '' : style.hide
          }`}
          id={id}
          width={64}
          height={64}
        />
        <div className={style.level}>{level}</div>
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
      <HealthBarProgress variant="determinate" value={healthPercent} />
      <ManaBarProgress variant="determinate" value={manaPercent} />
    </div>
  );
};

export default HeroPortrait;

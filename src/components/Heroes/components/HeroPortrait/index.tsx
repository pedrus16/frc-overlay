import { createStyles, LinearProgress, withStyles } from '@material-ui/core';
import { useMemo } from 'react';

import Cameo from '../../../Cameo';
import Cooldown from '../../../Cooldown';
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
  className,
}: Props) => {
  const isDead = useMemo(() => healthPercent <= 0, [healthPercent]);
  const progress = useMemo(
    () => (respawn ? 1 - respawn?.timeLeftSec / respawn?.totalDurationSec : 0),
    [respawn]
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
        {!!respawn && respawn.timeLeftSec > 0 && (
          <div className={`${style.overlay} ${style.cooldown}`}>
            <Cooldown
              className={`${style.overlay} ${style.clock}`}
              progressPercent={progress * 100}
            />
            <div className={style.countdown}>
              {Math.ceil(respawn.timeLeftSec)}
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

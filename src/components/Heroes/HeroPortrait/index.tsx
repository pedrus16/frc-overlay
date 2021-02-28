import {
  createStyles,
  LinearProgress,
  Theme,
  withStyles,
} from '@material-ui/core';
import { useMemo } from 'react';
import Hero from '../../../models/Hero';
import Cameo from '../../Cameo';

import style from './style.module.css';

const HealthBarProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 8,
      borderRadius: 0,
    },
    colorPrimary: {
      backgroundColor: 'rgba(0 0 0 / 80%)',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: 'var(--health-color)',
      boxShadow:
        '0 3px 1px -1px rgb(255 255 255 / 50%) inset, 0 -4px 4px -2px rgb(0 0 0  / 40%) inset',
    },
  })
)(LinearProgress);

const ManaBarProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 8,
      borderRadius: 0,
    },
    colorPrimary: {
      backgroundColor: 'rgba(0 0 0 / 80%)',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: 'var(--mana-color)',
      boxShadow:
        '0 3px 1px -1px rgb(255 255 255 / 25%) inset, 0 -4px 4px -2px rgb(0 0 0  / 40%) inset',
    },
  })
)(LinearProgress);

interface Props {
  hero: Hero;
}

const HeroPortrait = ({ hero }: Props) => {
  const healthPercent = useMemo(
    () => (hero.hitpoints / hero.hitpoints_max) * 100,
    [hero]
  );

  const manaPercent = useMemo(() => (hero.mana / hero.mana_max) * 100, [hero]);
  return (
    <div className={style.container}>
      <Cameo id={hero.id} />
      <div className={style.overlay}>
        <HealthBarProgress variant="determinate" value={healthPercent} />
        <ManaBarProgress variant="determinate" value={manaPercent} />
      </div>
    </div>
  );
};

export default HeroPortrait;

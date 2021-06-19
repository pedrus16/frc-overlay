import RaceEmblem, { Race } from '../../../RaceEmblem';

import { ReactComponent as HelmetIcon } from '../../../../images/helmet.svg';
import { ReactComponent as HammerIcon } from '../../../../images/hammer.svg';

import style from './style.module.css';

export interface Props {
  race: Race;
  population: number;
  workers: number;
  reverse?: boolean;
  className?: string;
}

const ArmySummary = ({
  race,
  population,
  workers,
  reverse,
  className = '',
}: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      <div className={style.unitCount}>
        <HelmetIcon />
        <div>{population}</div>
      </div>
      <RaceEmblem race={race} className={style.raceEmblem} />
      <div className={style.unitCount}>
        <HammerIcon />
        <div>{workers}</div>
      </div>
    </div>
  );
};

export default ArmySummary;

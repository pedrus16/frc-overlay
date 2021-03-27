import { Race as RaceEnum } from '../../../../models';
import { ReactComponent as HelmetIcon } from './images/helmet.svg';
import { ReactComponent as HammerIcon } from './images/hammer.svg';

import humanEmblem from './images/human.png';
import nightElfEmblem from './images/nightelf.png';
import orcEmblem from './images/orc.png';
import undeadEmblem from './images/undead.png';

import style from './style.module.css';

type Race = RaceEnum.HUMAN | RaceEnum.NIGHTELF | RaceEnum.ORC | RaceEnum.UNDEAD;

const RaceEmblemMap = new Map<Race, string>([
  [RaceEnum.HUMAN, humanEmblem],
  [RaceEnum.NIGHTELF, nightElfEmblem],
  [RaceEnum.ORC, orcEmblem],
  [RaceEnum.UNDEAD, undeadEmblem],
]);

export interface Props {
  race: RaceEnum.HUMAN | RaceEnum.NIGHTELF | RaceEnum.ORC | RaceEnum.UNDEAD;
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
  const emblem = RaceEmblemMap.get(race);
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      <div className={style.population}>
        <div className={style.unitCount}>
          <HammerIcon />
          <div>{workers}</div>
        </div>
        <div className={style.unitCount}>
          <HelmetIcon />
          <div>{population}</div>
        </div>
      </div>
      <div className={style.raceEmblemContainer}>
        <img className={style.raceEmblem} src={emblem} alt={race} />
      </div>
    </div>
  );
};

export default ArmySummary;

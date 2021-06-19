import { HTMLAttributes } from 'react';
import Resources, { Props as ResourcesProps } from '../../../Resources';
import { Race as RaceEnum } from '../../../../models';
import RaceEmblem from '../../../RaceEmblem';

import { ReactComponent as HelmetIcon } from '../../../../images/helmet.svg';
import { ReactComponent as HammerIcon } from '../../../../images/hammer.svg';

import style from './style.module.css';

interface ArmySummaryProps {
  soldiers: number;
  workers: number;
}

const ArmySummary = ({ soldiers, workers }: ArmySummaryProps) => (
  <div className={style.armySummary}>
    <div>
      <HelmetIcon />
      <span>{soldiers}</span>
    </div>
    <div>
      <HammerIcon />
      <span>{workers}</span>
    </div>
  </div>
);

export interface Props extends HTMLAttributes<HTMLDivElement> {
  race: RaceEnum.HUMAN | RaceEnum.NIGHTELF | RaceEnum.ORC | RaceEnum.UNDEAD;
  army: {
    soldiers: number;
    workers: number;
  };
  playerName: string;
  resources: ResourcesProps;
  techLevel: number;
  reverse?: boolean;
}

const PlayerInfo = ({
  race,
  army,
  playerName,
  resources,
  techLevel,
  reverse = false,
  className,
  ...props
}: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div
      className={`${style.container} ${reverseClass} ${className}`}
      {...props}
    >
      <div className={style.info}>
        <RaceEmblem race={race} className={style.emblem} />
        <ArmySummary soldiers={army.soldiers} workers={army.workers} />
        <span className={style.playerName}>{playerName}</span>
      </div>
      <div className={style.horizontalContainer}>
        <Resources
          gold={resources.gold}
          lumber={resources.lumber}
          food={resources.food}
          foodMax={resources.foodMax}
          className={style.resources}
        />
        <div className={style.separator} />
        <div className={style.techLevel}>
          <div>{`T${techLevel}`}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerInfo;

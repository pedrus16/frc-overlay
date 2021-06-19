import { ImgHTMLAttributes } from 'react';
import { Race as RaceEnum } from '../../models';

import humanEmblem from './images/human.png';
import nightElfEmblem from './images/nightelf.png';
import orcEmblem from './images/orc.png';
import undeadEmblem from './images/undead.png';

export type Race =
  | RaceEnum.HUMAN
  | RaceEnum.NIGHTELF
  | RaceEnum.ORC
  | RaceEnum.UNDEAD;

const RaceEmblemMap = new Map<Race, string>([
  [RaceEnum.HUMAN, humanEmblem],
  [RaceEnum.NIGHTELF, nightElfEmblem],
  [RaceEnum.ORC, orcEmblem],
  [RaceEnum.UNDEAD, undeadEmblem],
]);

export interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  race: RaceEnum.HUMAN | RaceEnum.NIGHTELF | RaceEnum.ORC | RaceEnum.UNDEAD;
}

const RaceEmblem = ({ race, ...props }: Props) => {
  const emblem = RaceEmblemMap.get(race);

  return <img src={emblem} alt={race} {...props} />;
};

export default RaceEmblem;

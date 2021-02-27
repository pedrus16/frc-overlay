import { Race } from '../models';

const trigramMap = new Map<Race, string>([
  [Race.HUMAN, 'HU'],
  [Race.UNDEAD, 'UD'],
  [Race.ORC, 'ORC'],
  [Race.NIGHTELF, 'NE'],
]);

const raceToTrigram = (race: Race): string => {
  return trigramMap.get(race) ?? race;
};

export default raceToTrigram;

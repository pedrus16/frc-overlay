import { ResearchType } from '../models';
import Research from '../models/Research';
import clamp from './clamp';

/* Respawn time in seconds at level = table index + 1 */
const RESPAWN_TIME_TABLE = [36, 72, 107, 110];

const getHeroRespawnTime = (
  id: string,
  level: number,
  researches: Research[]
) => {
  const revival = researches.find(
    (research) => research.id === id && research.type === ResearchType.REVIVAL
  );

  if (!revival) {
    return null;
  }

  const respawnTimeSec =
    RESPAWN_TIME_TABLE[clamp(0, RESPAWN_TIME_TABLE.length - 1, level - 1)];

  return {
    totalDurationSec: respawnTimeSec,
    timeLeftSec: (respawnTimeSec * (100 - revival.progress_percent)) / 100,
  };
};

export default getHeroRespawnTime;

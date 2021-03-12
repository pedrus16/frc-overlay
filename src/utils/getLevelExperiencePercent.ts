import clamp from './clamp';
import toPercent from './toPercent';

const EXPERIENCE_TABLE = [0, 200, 500, 900, 1400, 2000, 2700, 3500, 4400, 5400];

const getLevelExperiencePercent = (
  level: number,
  experience: number,
  experienceMax: number
) => {
  return toPercent(
    experience -
      EXPERIENCE_TABLE[clamp(0, EXPERIENCE_TABLE.length - 1, level - 1)],
    experienceMax -
      EXPERIENCE_TABLE[clamp(0, EXPERIENCE_TABLE.length - 1, level - 1)]
  );
};

export default getLevelExperiencePercent;

import Ability from '../models/Ability';
import Hero from '../models/Hero';
import { Props as HeroesProps } from '../components/Heroes';
import Research from '../models/Research';
import { ResearchType } from '../models';

const toPercent = (value: number, max: number) => {
  return (value / max) * 100;
};

const buildSpellList = (abilities: Ability[]) => {
  return abilities
    .filter((ability) => ability.is_hero_ability)
    .filter((ability) => !ability.art.includes('BTNTemp.blp')) // Abilities with "BTNTemp.blp" seem to not be actual hero abilities and have no icon
    .map((ability) => ({
      id: ability.id,
      level: ability.level,
      cooldown: {
        totalDurationSec: ability.cooldown_time,
        timeLeftSec: ability.cooldown,
      },
    }));
};

const sortByIndex = (a: Hero, b: Hero) => a.index - b.index;

const getHeroRespawnTime = (id: string, researches: Research[]) => {
  const revival = researches.find(
    (research) => research.id === id && research.type === ResearchType.REVIVAL
  );

  if (!revival) {
    return null;
  }

  return {
    totalDurationSec: 100,
    timeLeftSec: 100 - revival.progress_percent,
  };
};

export const buildHeroesData = (
  heroes: Hero[],
  researches: Research[]
): HeroesProps['heroes'] => {
  return heroes
    .concat()
    .sort(sortByIndex)
    .map((hero) => ({
      id: hero.id,
      healthPercent: toPercent(hero.hitpoints, hero.hitpoints_max),
      manaPercent: toPercent(hero.mana, hero.mana_max),
      experiencePercent: toPercent(hero.experience, hero.experience_max),
      level: hero.level,
      inventory: hero.inventory,
      spells: buildSpellList(hero.abilities),
      respawn: getHeroRespawnTime(hero.id, researches),
    }));
};

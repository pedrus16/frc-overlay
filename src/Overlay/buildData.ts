import Hero from '../models/Hero';
import Research from '../models/Research';
import { Race, ResearchType } from '../models';
import Player from '../models/Player';
import Ability from '../models/Ability';
import Unit from '../models/Unit';
import Upgrade from '../models/Upgrade';
import Building from '../models/Building';
import {
  toPercent,
  getColorNameByIndex,
  isUltimate,
  getLevelExperiencePercent,
  getHeroRespawnTime,
} from '../utils';

const ABILITY_MAX_LEVEL = 3;
const ULTIMATE_MAX_LEVEL = 1;
const buildSpellList = (abilities: Ability[]) => {
  return abilities
    .filter((ability) => ability.is_hero_ability)
    .filter((ability) => !ability.art.includes('BTNTemp.blp')) // Abilities with "BTNTemp.blp" seem to not be actual hero abilities and have no icon
    .map((ability) => ({
      id: ability.id,
      level: ability.level,
      levelMax: isUltimate(ability.id) ? ULTIMATE_MAX_LEVEL : ABILITY_MAX_LEVEL,
      cooldown: {
        totalDurationSec: ability.cooldown_time,
        timeLeftSec: ability.cooldown,
      },
    }))
    .reverse();
};

const buildHeroesData = (heroes: Hero[], researches: Research[]) => {
  return heroes
    .concat()
    .map((hero) => ({
      id: hero.id,
      healthPercent: toPercent(hero.hitpoints, hero.hitpoints_max),
      manaPercent: toPercent(hero.mana, hero.mana_max),
      experiencePercent: getLevelExperiencePercent(
        hero.level,
        hero.experience,
        hero.experience_max
      ),
      level: hero.level,
      inventory: hero.inventory,
      spells: buildSpellList(hero.abilities),
      respawn: getHeroRespawnTime(hero.id, hero.level, researches),
    }))
    .reverse();
};

const buildSoldiers = (units: Unit[]) =>
  units
    .filter((unit) => !unit.is_worker && unit.alive_count > 0)
    .map((unit) => ({ id: unit.id, count: unit.alive_count }));

const buildWorkers = (units: Unit[]) => {
  const worker = units.find((unit) => unit.is_worker);

  if (!worker) {
    return { id: '', count: 0 };
  }

  return {
    id: worker.id,
    count: worker.alive_count,
  };
};

const buildPlayerUpgrades = (upgrades: Upgrade[]) => {
  return upgrades.map((upgrade) => ({
    id: upgrade.id,
    level: upgrade.level,
    levelMax: upgrade.level_max,
  }));
};

type PlayerRace = Race.HUMAN | Race.NIGHTELF | Race.ORC | Race.UNDEAD;

/* [T1 building, T2 building, T3 building] */
const TECH_MAP = {
  [Race.HUMAN]: ['htow', 'hkee', 'hcas'],
  [Race.NIGHTELF]: ['etol', 'etoa', 'etoe'],
  [Race.ORC]: ['ogre', 'ostr', 'ofrt'],
  [Race.UNDEAD]: ['unpl', 'unp1', 'unp2'],
};

enum TechLevel {
  T1,
  T2,
  T3,
}

const getTechLevel = (race: PlayerRace, buildings: Building[]) => {
  const completed = buildings.filter(
    (building) => building.progress_percent === 100
  );

  if (
    completed.some((building) => building.id === TECH_MAP[race][TechLevel.T3])
  ) {
    return TechLevel.T3 + 1;
  }

  if (
    completed.some((building) => building.id === TECH_MAP[race][TechLevel.T2])
  ) {
    return TechLevel.T2 + 1;
  }

  return TechLevel.T1 + 1;
};

const getNextTechId = (race: PlayerRace, id: string): string | null => {
  if (!TECH_MAP[race].includes(id)) return null;

  return TECH_MAP[race][TECH_MAP[race].indexOf(id) + 1] ?? null;
};

const buildResearchData = (
  race: PlayerRace,
  researches: Research[],
  buildings: Building[]
) => {
  return buildings
    .filter((building) => building.upgrade_progress_percent > 0)
    .filter(({ id }) => getNextTechId(race, id))
    .map(({ id, upgrade_progress_percent }) => ({
      id: getNextTechId(race, id),
      progress_percent: upgrade_progress_percent,
    }))
    .concat(
      researches.filter((research) => research.type === ResearchType.UPGRADE)
    );
};

const getRace = (race: Race): PlayerRace => {
  if (![Race.HUMAN, Race.NIGHTELF, Race.ORC, Race.UNDEAD].includes(race)) {
    throw new Error('Invalid race');
  }

  return race as PlayerRace;
};

const getArmyPop = (
  food: number,
  workers: number,
  unitsInProduction: Research[]
) => {
  const workersIds = ['hpea', 'uaco', 'opeo', 'ewsp'];
  const workersInProduction = unitsInProduction.filter(({ id }) =>
    workersIds.includes(id)
  ).length;
  return food - workers - workersInProduction;
};

export const buildPlayerData = (player: Player) => {
  const workers = buildWorkers(player.units_on_map);
  const unitsInProduction = player.researches_in_progress.filter(
    (research) => research.type === ResearchType.UNIT
  );

  return {
    playerName: player.name,
    apm: player.apm,
    color: getColorNameByIndex(player.team_color),
    army: {
      race: getRace(player.race),
      soldiers: buildSoldiers(player.units_on_map),
      workers: workers,
      population: getArmyPop(player.food, workers.count, unitsInProduction),
    },
    resources: {
      gold: player.gold,
      lumber: player.lumber,
      food: player.food,
      foodMax: player.food_max,
    },
    upgrades: buildPlayerUpgrades(player.upgrades_completed),
    techLevel: getTechLevel(getRace(player.race), player.buildings_on_map),
    score: '',
    heroes: buildHeroesData(player.heroes, player.researches_in_progress),
    production: {
      buildings: player.buildings_on_map.filter(
        (building) => building.progress_percent < 100
      ),
      units: unitsInProduction,
    },
    research: buildResearchData(
      getRace(player.race),
      player.researches_in_progress,
      player.buildings_on_map
    ),
  };
};

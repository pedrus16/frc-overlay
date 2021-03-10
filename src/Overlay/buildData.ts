import Ability from '../models/Ability';
import Hero from '../models/Hero';
import { Props as HeroesProps } from '../components/Heroes';
import { Props as PlayerBarProps } from '../components/PlayerBar';
import { Props as UpgradeProps } from '../components/Upgrade';
import Research from '../models/Research';
import { Race, ResearchType } from '../models';
import Player from '../models/Player';
import Unit from '../models/Unit';
import Upgrade from '../models/Upgrade';
import Building from '../models/Building';

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
const clamp = (min: number, max: number, value: number) =>
  Math.max(min, Math.min(value, max));

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

const buildHeroesData = (
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
      respawn: getHeroRespawnTime(hero.id, hero.level, researches),
    }));
};

const buildSoldiers = (units: Unit[]) =>
  units
    .filter((unit) => !unit.is_worker)
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

const buildPlayerUpgrades = (upgrades: Upgrade[]): UpgradeProps[] => {
  return upgrades.map((upgrade) => ({
    id: upgrade.id,
    level: upgrade.level,
    levelMax: upgrade.level_max,
  }));
};

const TEAM_COLORS = [
  'Red',
  'Blue',
  'Teal',
  'Purple',
  'Yellow',
  'Orange',
  'Green',
  'Pink',
  'Gray',
  'LightBlue',
  'DarkGreen',
  'Brown',
  'Maroon',
  'Navy',
  'Turqoise',
  'Violet',
  'Wheat',
  'Peach',
  'Mint',
  'Lavender',
  'Coal',
  'Snow',
  'Emerald',
  'Peanut',
];

const getColor = (teamColor: number) => `var(--${TEAM_COLORS[teamColor]})`;

type PlayerRace = Race.HUMAN | Race.NIGHTELF | Race.ORC | Race.UNDEAD;

/* [T3 building id, T2 building id] */
const TECH_MAP = {
  [Race.HUMAN]: ['hcas', 'hkee'],
  [Race.NIGHTELF]: ['etoe', 'etoa'],
  [Race.ORC]: ['ofrt', 'ostr'],
  [Race.UNDEAD]: ['unp2', 'unp1'],
};

enum TechLevel {
  T1,
  T2,
  T3,
}

const getTech = (race: PlayerRace, buildings: Building[]): TechLevel => {
  const completed = buildings.filter(
    (building) => building.progress_percent === 100
  );

  if (completed.some((building) => building.id === TECH_MAP[race][0])) {
    return TechLevel.T3;
  }

  if (completed.some((building) => building.id === TECH_MAP[race][1])) {
    return TechLevel.T2;
  }

  return TechLevel.T1;
};

const getRace = (race: Race): PlayerRace => {
  if (![Race.HUMAN, Race.NIGHTELF, Race.ORC, Race.UNDEAD].includes(race)) {
    throw new Error('Invalid race');
  }

  return race as PlayerRace;
};

export const buildPlayerData = (
  player: Player
): { player: PlayerBarProps; heroes: HeroesProps['heroes']; color: string } => {
  return {
    player: {
      playerName: player.name,
      army: {
        race: getRace(player.race),
        soldiers: buildSoldiers(player.units_on_map),
        workers: buildWorkers(player.units_on_map),
      },
      resources: {
        gold: player.gold,
        lumber: player.lumber,
        food: player.food,
        foodMax: player.food_max,
      },
      upgrades: buildPlayerUpgrades(player.upgrades_completed),
      techLevel: getTech(getRace(player.race), player.buildings_on_map),
    },
    heroes: buildHeroesData(player.heroes, player.researches_in_progress),
    color: getColor(player.team_color),
  };
};

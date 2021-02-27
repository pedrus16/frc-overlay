import Building from './Building';
import { GameResult } from './enums/GameResult';
import { Race } from './enums/Race';
import Hero from './Hero';
import Research from './Research';
import Unit from './Unit';
import Upgrade from './Upgrade';

export default interface Player {
  name: string;
  race: Race;
  id: number;
  team_index: number;
  team_color: number;
  game_result: GameResult;
  apm: number;
  apm_realtime: number;
  gold: number;
  gold_mined: number;
  gold_taxed: number;
  gold_tax: number /* Use this for Tiers */;
  lumber: number;
  lumber_harvested: number;
  lumber_taxed: number;
  lumber_tax: number;
  food_max: number;
  food: number;
  heroes: Hero[];
  buildings_on_map: Building[];
  upgrades_completed: Upgrade[];
  units_on_map: Unit[];
  researches_in_progress: Research[];
}

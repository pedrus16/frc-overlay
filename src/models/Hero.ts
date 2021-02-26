import Ability from './Ability';
import Item from './Item';

export default interface Hero {
  id: string;
  level: number;
  experience: number;
  experience_max: number;
  hitpoints: number;
  hitpoints_max: number;
  mana: number;
  mana_max: number;
  abilities: Ability[];
  inventory: Item[];
}

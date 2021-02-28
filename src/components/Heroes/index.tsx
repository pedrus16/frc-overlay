import { CircularProgress } from '@material-ui/core';
import { useMemo } from 'react';
import { default as AbilityModel } from '../../models/Ability';
import { default as HeroModel } from '../../models/Hero';
import { default as ItemModel } from '../../models/Item';
import Player from '../../models/Player';
import Ability from '../Ability';
import Item from '../Item';
import HeroPortrait from './HeroPortrait';

import style from './style.module.css';

interface AbilitiesProps {
  abilities: AbilityModel[];
}

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <>
      {abilities.map((ability) => (
        <Ability key={ability.id} ability={ability} />
      ))}
    </>
  );
};

interface InventoryProps {
  items: ItemModel[];
}

const Inventory = ({ items }: InventoryProps) => {
  return (
    <div className={style.inventory}>
      {items.map((item) => (
        <Item key={item.slot} item={item} />
      ))}
    </div>
  );
};

interface HeroProps {
  hero: HeroModel;
  reverse?: boolean;
}

const Hero = ({ hero, reverse }: HeroProps) => {
  const reverseClass = reverse ? style.reverse : '';

  const abilities = useMemo(
    () => hero.abilities.filter((ability) => ability.is_hero_ability),
    [hero]
  );

  const levelPercent = useMemo(
    () => (hero.experience / hero.experience_max) * 100,
    [hero]
  );

  return (
    <div className={`${style.hero} ${reverseClass}`}>
      <div className={style.portrait}>
        <HeroPortrait hero={hero} />
      </div>

      <div className={style.level}>
        <div className={style.levelProgress}>
          <CircularProgress
            variant="determinate"
            className={style.levelProgressBackground}
            size={50}
            thickness={6}
            value={100}
            color="inherit"
          />
          <CircularProgress
            variant="determinate"
            className={style.levelProgressForeground}
            value={levelPercent}
            size={50}
            thickness={6}
            color="inherit"
          />
          <div className={style.levelLabel}>
            <div>{hero.level}</div>
          </div>
        </div>
      </div>

      <div className={style.abilities}>
        <Abilities abilities={abilities} />
      </div>
    </div>
  );
};

const sortByIndex = (a: HeroModel, b: HeroModel) => a.index - b.index;

interface Props {
  player: Player;
  reverse?: boolean;
}

const Heroes = ({ player, reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  const sortedHeroes = useMemo(() => player.heroes.concat().sort(sortByIndex), [
    player,
  ]);

  return (
    <div className={`${style.container} ${reverseClass}`}>
      {sortedHeroes.map((hero) => (
        <div key={hero.id} className={style.item}>
          <Hero hero={hero} reverse={reverse} />
          <Inventory items={hero.inventory} />
        </div>
      ))}
    </div>
  );
};

export default Heroes;

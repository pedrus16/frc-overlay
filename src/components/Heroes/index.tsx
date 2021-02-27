import { useMemo } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { default as AbilityModel } from '../../models/Ability';
import { default as HeroModel } from '../../models/Hero';
import Item from '../../models/Item';
import Player from '../../models/Player';
import Cameo from '../Cameo';

import style from './style.module.css';

interface AbilitiesProps {
  abilities: AbilityModel[];
}

const Abilities = ({ abilities }: AbilitiesProps) => {
  return (
    <>
      {abilities.map((ability) => (
        <Cameo key={ability.id} id={ability.id} />
      ))}
    </>
  );
};

interface InventoryProps {
  items: Item[];
}

const Inventory = ({ items }: InventoryProps) => {
  return (
    <>
      {items.map((item) => (
        <Cameo key={item.slot} id={item.id} />
      ))}
    </>
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

  const levelProgress = useMemo(
    () => (hero.experience / hero.experience_max) * 100,
    [hero]
  );

  return (
    <div className={`${style.hero} ${reverseClass}`}>
      <Cameo className={style.portrait} id={hero.id} />
      <div className={style.level}>
        <CircularProgressbarWithChildren
          className={style.levelProgress}
          value={levelProgress}
          text={`${hero.level}`}
        />
      </div>
      <div className={style.inventory}>
        <Inventory items={hero.inventory} />
      </div>
      <div className={style.abilities}>
        <Abilities abilities={abilities} />
      </div>
    </div>
  );
};

interface Props {
  player: Player;
  reverse?: boolean;
}

const Heroes = ({ player, reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass}`}>
      {player.heroes.map((hero) => (
        <Hero hero={hero} key={hero.id} reverse={reverse} />
      ))}
    </div>
  );
};

export default Heroes;

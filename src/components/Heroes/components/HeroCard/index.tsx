import HeroPortrait from '../HeroPortrait';
import Inventory, { Props as InventoryProps } from '../Inventory';
import SpellBar, { Props as SpellBarProps } from '../SpellBar';

import style from './style.module.css';
import ProgressBar, { Direction } from '../../../ProgressBar';

export interface Props {
  hero: {
    id: string;
    healthPercent: number;
    manaPercent: number;
    experiencePercent: number;
    level: number;
    inventory: InventoryProps['items'];
    spells: SpellBarProps['spells'];
    respawn: { totalDurationSec: number; timeLeftSec: number } | null;
  };
  reverse?: boolean;
  className?: string;
}

const HeroCard = ({ hero, className = '', reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${className} ${style.container} ${reverseClass}`}>
      <div className={style.topRow}>
        <HeroPortrait
          className={style.portrait}
          id={hero.id}
          healthPercent={hero.healthPercent}
          manaPercent={hero.manaPercent}
          respawn={hero.respawn}
        />
        <div className={style.level}>
          <div className={style.label}>
            <small>NIV</small>
            <div>{hero.level}</div>
          </div>
          <ProgressBar
            progressPercent={hero.experiencePercent}
            direction={Direction.VERTICAL}
            className={style.progressBackground}
            barClassName={style.experienceBar}
          />
        </div>
        <Inventory className={style.inventory} items={hero.inventory} />
      </div>

      <div className={style.bottomRow}>
        <SpellBar spells={hero.spells} />
      </div>
    </div>
  );
};

export default HeroCard;

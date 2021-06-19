import HeroPortrait from '../HeroPortrait';
import Inventory, { Props as InventoryProps } from '../Inventory';
import SpellBar, { Props as SpellBarProps } from '../SpellBar';
import ProgressBar, { Direction } from '../../../ProgressBar';

import style from './style.module.css';

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
  compact?: boolean;
  showBorder?: boolean;
  className?: string;
}

const HeroCard = ({
  hero,
  compact = false,
  showBorder = false,
  className = '',
  reverse,
}: Props) => {
  const reverseClass = reverse ? style.reverse : '';
  const compactClass = compact ? style.compact : '';
  const borderClass = showBorder ? style.border : '';

  return (
    <div
      className={`${className} ${style.container} ${reverseClass} ${compactClass} ${borderClass}`}
    >
      <div className={style.topRow}>
        <HeroPortrait
          className={style.portrait}
          id={hero.id}
          healthPercent={hero.healthPercent}
          manaPercent={hero.manaPercent}
          respawn={hero.respawn}
          compact={compact}
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
        {!compact && (
          <Inventory className={style.inventory} items={hero.inventory} />
        )}
      </div>

      {!compact && (
        <div className={style.bottomRow}>
          <SpellBar spells={hero.spells} />
        </div>
      )}
    </div>
  );
};

export default HeroCard;

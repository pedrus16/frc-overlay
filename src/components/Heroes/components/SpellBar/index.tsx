import range from '../../../../utils/range';
import Spell, { Props as SpellProps } from '../Spell';

import style from './style.module.css';

export interface Props {
  spells: SpellProps[];
}

const SpellBar = ({ spells }: Props) => {
  const slots = range(4);

  return (
    <div className={style.container}>
      {slots.map((index) => {
        const spell = spells[index];

        return (
          <div key={index} className={style.slot}>
            {!!spell && (
              <Spell
                id={spell.id}
                level={spell.level}
                levelMax={spell.levelMax}
                cooldown={spell.cooldown}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpellBar;

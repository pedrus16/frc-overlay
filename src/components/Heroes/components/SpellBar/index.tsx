import Spell, { Props as SpellProps } from '../Spell';

import style from './style.module.css';

export interface Props {
  spells: SpellProps[];
}

const SpellBar = ({ spells }: Props) => {
  const slots = [0, 1, 2, 3];

  return (
    <div className={style.container}>
      {slots.map((index) => {
        const spell = spells[index];

        return (
          <div className={style.slot}>
            {!!spell && (
              <Spell
                id={spell.id}
                level={spell.level}
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

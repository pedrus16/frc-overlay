import { animated, config, useTransition } from 'react-spring';

import range from '../../../../utils/range';
import Spell, { Props as SpellProps } from '../Spell';

import style from './style.module.css';

export interface Props {
  spells: SpellProps[];
}

const SpellBar = ({ spells }: Props) => {
  const slots = range(4);
  const transitions = useTransition(spells, (spell) => spell.id, {
    from: { opacity: 0, transform: 'scale(0.5)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.5)' },
    config: config.gentle,
  });

  return (
    <div className={style.container}>
      {slots.map((index) => {
        const transition = transitions[index];

        return (
          <div key={index} className={style.slot}>
            {!!transition && (
              <animated.div style={transition.props}>
                <Spell
                  id={transition.item.id}
                  level={transition.item.level}
                  levelMax={transition.item.levelMax}
                  cooldown={transition.item.cooldown}
                />
              </animated.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpellBar;

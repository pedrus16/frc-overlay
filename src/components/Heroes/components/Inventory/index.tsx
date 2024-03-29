import { animated, config, useTransition } from 'react-spring';

import ItemModel from '../../../../models/Item';
import range from '../../../../utils/range';
import Item from '../Item';

import { ReactComponent as BackpackIcon } from './backpack.svg';

import style from './style.module.css';

export interface Props {
  items: ItemModel[];
  className?: string;
}

const Inventory = ({ items, className = '' }: Props) => {
  const slots = range(6);
  const transitions = useTransition(items, (item) => item.slot, {
    from: { opacity: 0, transform: 'scale(1.5)', zIndex: 1 },
    enter: { opacity: 1, transform: 'scale(1)', zIndex: 0 },
    leave: { opacity: 0, transform: 'scale(1.5)', zIndex: 1 },
    config: config.stiff,
  });

  return (
    <div className={`${className} ${style.grid}`}>
      {slots.map((slot) => {
        const transition = transitions.find(({ item }) => item.slot === slot);

        return (
          <div key={slot} className={style.slot}>
            <div className={style.background}>
              <BackpackIcon className={style.backpackIcon} />
            </div>
            {transition && (
              <animated.div key={slot} style={transition.props}>
                <Item
                  id={transition.item.id}
                  charges={transition.item.charges}
                />
              </animated.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Inventory;

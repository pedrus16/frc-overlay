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

  return (
    <div className={`${className} ${style.grid}`}>
      {slots.map((slot) => {
        const item = items.find((i) => i.slot === slot);
        if (!item) {
          return <BackpackIcon className={style.backpackIcon} key={slot} />;
        }
        return <Item key={slot} id={item.id} charges={item.charges} />;
      })}
    </div>
  );
};

export default Inventory;

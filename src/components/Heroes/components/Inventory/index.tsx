import ItemModel from '../../../../models/Item';
import Item from '../Item';

import { ReactComponent as BackpackIcon } from './backpack.svg';

import style from './style.module.css';

export interface Props {
  items: ItemModel[];
  className?: string;
}

const Inventory = ({ items, className }: Props) => {
  const slots = [0, 1, 2, 3, 4, 5];

  return (
    <div className={`${className} ${style.grid}`}>
      {slots.map((slot) => {
        const item = items.find((i) => i.slot === slot);
        if (!item) {
          return <BackpackIcon />;
        }
        return <Item key={item.slot} id={item.id} charges={item.charges} />;
      })}
    </div>
  );
};

export default Inventory;

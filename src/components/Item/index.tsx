import { default as ItemModel } from '../../models/Item';
import Cameo from '../Cameo';

import style from './style.module.css';

interface Props {
  item: ItemModel;
}

const Item = ({ item }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={item.id} />
      {item.charges > 0 && <div className={style.charges}>{item.charges}</div>}
    </div>
  );
};

export default Item;

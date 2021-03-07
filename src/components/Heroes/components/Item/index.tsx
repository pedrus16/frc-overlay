import Cameo from '../../../Cameo';

import style from './style.module.css';

export interface Props {
  id: string;
  charges: number;
}

const Item = ({ id, charges }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={id} />
      {charges > 0 && <div className={style.charges}>{charges}</div>}
    </div>
  );
};

export default Item;

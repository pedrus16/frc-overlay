import Cameo from '../../../Cameo';

import style from './style.module.css';

export interface Props {
  id: string;
  count: number | null;
}

const Unit = ({ id, count = null }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={id} />
      {count !== null && (
        <div className={style.countContainer}>
          <div className={style.count}>{count}</div>
        </div>
      )}
    </div>
  );
};

export default Unit;

import Cameo from '../Cameo';
import Unit from '../../models/Unit';

import style from './style.module.css';

interface Properties {
  units: Unit[];
  reverse?: boolean;
  className?: string;
}

const Army = ({ units, reverse, className }: Properties) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass} ${className || ''}`}>
      {units.map((unit) => (
        <div key={unit.id} className={style.item}>
          <Cameo id={unit.id} />
          <div className={style.count}>{unit.alive_count}</div>
        </div>
      ))}
    </div>
  );
};

export default Army;

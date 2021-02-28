import Cameo from '../Cameo';
import Unit from '../../models/Unit';

import style from './style.module.css';

const sortByCount = (a: Unit, b: Unit) => a.alive_count - b.alive_count;

interface Properties {
  units: Unit[];
  reverse?: boolean;
  className?: string;
}

const Army = ({ units, reverse, className }: Properties) => {
  const reverseClass = reverse ? style.reverse : '';
  const workers = units.filter((unit) => unit.is_worker).sort(sortByCount);
  const soldiers = units.filter((unit) => !unit.is_worker).sort(sortByCount);

  return (
    <div className={`${style.container} ${reverseClass} ${className || ''}`}>
      {soldiers.map((unit) => (
        <div key={unit.id} className={style.item}>
          <Cameo id={unit.id} width={50} height={50} />
          <div className={style.count}>{unit.alive_count}</div>
        </div>
      ))}
      {workers.map((unit) => (
        <div key={unit.id} className={style.item}>
          <Cameo id={unit.id} width={50} height={50} />
          <div className={style.count}>{unit.alive_count}</div>
        </div>
      ))}
    </div>
  );
};

export default Army;

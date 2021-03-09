import { useMemo } from 'react';

import Unit from './components/Unit';
import ArmySummary, {
  Props as ArmySummaryProps,
} from './components/ArmySummary';

import style from './style.module.css';

/* TODO Use this in data builder */
// const sortByCount = (a: Unit, b: Unit) => a.alive_count - b.alive_count;
// const workers = units
//   .filter((unit) => unit.is_worker && unit.alive_count > 0)
//   .sort(sortByCount);
// const soldiers = units
//   .filter((unit) => !unit.is_worker && unit.alive_count > 0)
//   .sort(sortByCount);

export interface Props {
  soldiers: Array<{ id: string; count: number }>;
  workers: { id: string; count: number };
  race: ArmySummaryProps['race'];
  reverse?: boolean;
}

const Army = ({ soldiers, workers, race, reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  const soldierTotal = useMemo(
    () => soldiers.reduce((sum, unit) => sum + unit.count || 0, 0),
    [soldiers]
  );

  const reversedSoldiers = useMemo(() => soldiers.concat().reverse(), [
    soldiers,
  ]);

  return (
    <div className={`${style.container} ${reverseClass}`}>
      {reversedSoldiers.map((unit) => (
        <Unit key={unit.id} id={unit.id} count={unit.count} />
      ))}
      <ArmySummary
        className={style.summary}
        soldiers={soldierTotal}
        workers={workers.count}
        race={race}
        reverse={reverse}
      />
      <Unit id={workers.id} count={null} />
    </div>
  );
};

export default Army;

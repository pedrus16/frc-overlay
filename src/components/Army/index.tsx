import { useMemo } from 'react';

import Unit from './components/Unit';
import ArmySummary, {
  Props as ArmySummaryProps,
} from './components/ArmySummary';

import style from './style.module.css';

export interface Props {
  soldiers: Array<{ id: string; count: number }>;
  population: number;
  workers: { id: string; count: number };
  race: ArmySummaryProps['race'];
  reverse?: boolean;
}

const Army = ({ soldiers, population, workers, race, reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

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
        population={population}
        workers={workers.count}
        race={race}
        reverse={reverse}
      />
      <Unit id={workers.id} count={null} />
    </div>
  );
};

export default Army;

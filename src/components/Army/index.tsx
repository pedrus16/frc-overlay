import { useMemo } from 'react';
import { animated, config, useTransition } from 'react-spring';

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

  const transition = useTransition(reversedSoldiers, (unit) => unit.id, {
    from: { opacity: 0, transform: 'scale(0.5)', width: '0rem' },
    enter: { width: '2.5rem', opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.5)', width: '0rem' },
    config: config.gentle,
  });

  return (
    <div className={`${style.container} ${reverseClass}`}>
      {transition.map(({ item: unit, key, props }) => (
        <animated.div key={key} style={props}>
          <Unit key={unit.id} id={unit.id} count={unit.count} />
        </animated.div>
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

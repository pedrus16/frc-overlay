import { animated, config, useTransition } from 'react-spring';
import HeroCard, { Props as HeroCardProps } from './components/HeroCard';

import style from './style.module.css';

export interface Props {
  heroes: HeroCardProps['hero'][];
  reverse?: boolean;
  className?: string;
}

const Heroes = ({ heroes, reverse = false, className = '' }: Props) => {
  const reverseClass = reverse ? style.reverse : '';
  const transitions = useTransition(heroes, (hero) => hero.id, {
    from: { transform: `translateX(${reverse ? 100 : -100}%)` },
    enter: { transform: 'translateX(0)' },
    leave: { transform: `translateX(${reverse ? 100 : -100}%)` },
    config: config.slow,
  });

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      {transitions.map(({ item: hero, key, props }) => (
        <animated.div key={key} style={props}>
          <HeroCard className={style.item} hero={hero} reverse={reverse} />
        </animated.div>
      ))}
    </div>
  );
};

export default Heroes;

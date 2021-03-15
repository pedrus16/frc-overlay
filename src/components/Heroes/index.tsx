import { CSSTransitionGroup } from 'react-transition-group';
import HeroCard, { Props as HeroCardProps } from './components/HeroCard';

import style from './style.module.css';

export interface Props {
  heroes: HeroCardProps['hero'][];
  reverse?: boolean;
  className?: string;
}

const Heroes = ({ heroes, reverse = false, className = '' }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      <CSSTransitionGroup
        transitionName={{
          enter: style.slideEnter,
          enterActive: style.slideEnterActive,
          leave: style.slideLeave,
          leaveActive: style.slideLeaveActive,
        }}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
      >
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            className={style.item}
            hero={hero}
            reverse={reverse}
          />
        ))}
      </CSSTransitionGroup>
    </div>
  );
};

export default Heroes;

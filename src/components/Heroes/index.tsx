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
      {heroes.map((hero) => (
        <HeroCard
          key={hero.id}
          className={style.item}
          hero={hero}
          reverse={reverse}
        />
      ))}
    </div>
  );
};

export default Heroes;

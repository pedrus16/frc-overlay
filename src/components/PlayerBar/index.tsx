import { animated, config, useTransition } from 'react-spring';
import Army, { Props as ArmyProps } from '../Army';
import Resources, { Props as ResourcesProps } from '../Resources';
import Upgrade, { Props as UpgradeProps } from '../Upgrade';

import { ReactComponent as BackgroundImage } from './images/bg.svg';

import style from './style.module.css';

export interface Props {
  playerName: string;
  apm: number;
  army: ArmyProps;
  resources: ResourcesProps;
  techLevel: number;
  upgrades: UpgradeProps[];
  reverse?: boolean;
  className?: string;
  score: number | null;
  country: string | null;
}

const PlayerBar = ({
  playerName,
  apm,
  army,
  resources,
  upgrades,
  techLevel = 1,
  reverse = false,
  className = '',
  score,
  country,
}: Props) => {
  const reverseClass = reverse ? style.reverse : '';
  const upgradesTransition = useTransition(upgrades, (upgrade) => upgrade.id, {
    from: { opacity: 0, transform: 'scale(0.5)', width: '0rem' },
    enter: { width: '2rem', opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.5)', width: '0rem' },
    config: config.gentle,
  });

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      <BackgroundImage className={style.backgroundImage} />
      <div className={style.content}>
        <div className={style.top}>
          <Army
            className={style.army}
            soldiers={army.soldiers}
            population={army.population}
            workers={army.workers}
            race={army.race}
            reverse={reverse}
          />
          <div className={style.player}>
            <div className={style.apm}>
              {Math.min(999, apm)}
              <br />
              <small>APM</small>
            </div>
            <div className={style.playerName}>
              <span>{playerName}</span>
              {!!country && (
                <img
                  src={`${process.env.PUBLIC_URL}/flags/${country}.svg`}
                  alt={country}
                />
              )}
            </div>
          </div>
          <div className={style.score}>{score ?? score}</div>
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            <Resources
              gold={resources.gold}
              lumber={resources.lumber}
              food={resources.food}
              foodMax={resources.foodMax}
              className={style.resources}
            />
            <div className={style.techLevel}>
              <div>{`T${techLevel}`}</div>
            </div>
          </div>

          <div className={style.upgrades}>
            {upgradesTransition.map(({ item: upgrade, key, props }) => (
              <animated.div key={upgrade.id} style={props}>
                <Upgrade
                  className={style.upgrade}
                  id={upgrade.id}
                  level={upgrade.level}
                  levelMax={upgrade.levelMax}
                />
              </animated.div>
            ))}
          </div>

          <div className={style.right}></div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;

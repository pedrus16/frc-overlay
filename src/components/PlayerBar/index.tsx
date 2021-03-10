import Army, { Props as ArmyProps } from '../Army';
import Resources, { Props as ResourcesProps } from '../Resources';
import Upgrade, { Props as UpgradeProps } from '../Upgrade';

import { ReactComponent as ClockHole } from './images/bg1.svg';
// import { ReactComponent as Flag } from './images/flag.svg';

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
  score: string | null;
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
}: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass} ${className}`}>
      <div className={style.verticalContainer}>
        <div className={style.top}>
          <Army
            soldiers={army.soldiers}
            workers={army.workers}
            race={army.race}
            reverse={reverse}
          />
          <div className={style.player}>
            <div className={style.apm}>
              {apm}
              <br />
              <small>APM</small>
            </div>
            <div className={style.playerName}>{playerName}</div>
          </div>
        </div>
        <div className={style.bottom}>
          <div className={style.left}>
            {reverse && <div className={style.angleLeft}></div>}
            <Resources
              gold={resources.gold}
              lumber={resources.lumber}
              food={resources.food}
              foodMax={resources.foodMax}
            />
            <div className={style.techLevel}>
              <div>{`T${techLevel}`}</div>
            </div>
            {!reverse && <div className={style.angleLeft}></div>}
          </div>

          <div className={style.center}>
            {upgrades.map((upgrade) => (
              <Upgrade
                key={upgrade.id}
                className={style.upgrade}
                id={upgrade.id}
                level={upgrade.level}
                levelMax={upgrade.levelMax}
              />
            ))}
          </div>

          <div className={style.right}>
            {!reverse && <div className={style.angleRight}></div>}
            <div className={style.flagAndScore}>
              {/* <Flag className={style.flag} /> */}
              <div className={style.score}>{score}</div>
            </div>
            {reverse && <div className={style.angleRight}></div>}
          </div>
        </div>
      </div>
      <ClockHole className={style.clockHole} />
    </div>
  );
};

export default PlayerBar;

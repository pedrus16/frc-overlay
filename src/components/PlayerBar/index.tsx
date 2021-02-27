import Player from '../../models/Player';
import raceToTrigram from '../../utils/raceEnumToDisplay';
import Army from '../Army';
import Resources from '../Resources';

import style from './style.module.css';

interface Properties {
  reverse?: boolean;
  player: Player;
}

const PlayerBar = ({ player, reverse }: Properties) => {
  const units = player.units_on_map;
  const raceTrigram = raceToTrigram(player.race);
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={style.container}>
      <div className={`${style.topBarContainer} ${reverseClass}`}>
        <Army className={style.army} units={units} reverse={reverse} />
        <div className={`${style.card} ${style.race}`}>{raceTrigram}</div>
        <div className={`${style.card} ${style.name}`}>{player.name}</div>
      </div>
      <Resources
        gold={player.gold}
        lumber={player.lumber}
        food={player.food}
        foodMax={player.food_max}
        reverse={reverse}
      />
    </div>
  );
};

export default PlayerBar;

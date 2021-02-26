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
        <Army units={units} />
        <div className={style.padding}>{raceTrigram}</div>
        <div className={style.padding}>{player.name}</div>
      </div>
      <Resources
        gold={player.gold}
        lumber={player.lumber}
        food={player.food}
        foodMax={player.food_max}
      />
    </div>
  );
};

export default PlayerBar;

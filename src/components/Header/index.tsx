import Player from '../../models/Player';
import Clock from '../Clock';
import PlayerBar from '../PlayerBar';

import style from './style.module.css';

interface Properties {
  player1: Player;
  player2: Player;
}

const Header = ({ player1, player2 }: Properties) => {

  return (
    <div className={style.container}>
      <PlayerBar player={player1} />
      <Clock />
      <PlayerBar player={player2} reverse />
    </div>
  );
};

export default Header;

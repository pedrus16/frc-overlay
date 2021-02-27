import Player from '../../models/Player';
import Clock from '../Clock';
import PlayerBar from '../PlayerBar';

import style from './style.module.css';

interface Properties {
  player1: Player | undefined;
  player2: Player | undefined;
}

const Header = ({ player1, player2 }: Properties) => {
  return (
    <div className={style.container}>
      {player1 ? <PlayerBar player={player1} /> : <div />}
      <Clock />
      {player2 ? <PlayerBar player={player2} reverse /> : <div />}
    </div>
  );
};

export default Header;

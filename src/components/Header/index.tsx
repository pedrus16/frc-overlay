import Player from '../../models/Player';
import Clock from '../Clock';
import PlayerBar from '../PlayerBar';

import { ReactComponent as SwapIcon } from './swap.svg';

import style from './style.module.css';

interface Properties {
  player1: Player | undefined;
  player2: Player | undefined;
  onSwap?: () => void;
}

const Header = ({ player1, player2, onSwap }: Properties) => {
  const handleSwapClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onSwap && onSwap();
  };

  return (
    <div className={style.container}>
      {player1 ? <PlayerBar player={player1} /> : <div />}
      <Clock />
      {player2 ? <PlayerBar player={player2} reverse /> : <div />}
      <button className={style.swapButton} onClick={handleSwapClick}>
        <SwapIcon />
      </button>
    </div>
  );
};

export default Header;

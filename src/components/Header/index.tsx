import Player from '../../models/Player';
import Clock from '../Clock';
import PlayerBar from '../PlayerBar';

import { ReactComponent as SwapIcon } from './swap.svg';

import style from './style.module.css';
import { FormControlLabel, Switch } from '@material-ui/core';

interface Properties {
  player1: Player | undefined;
  player2: Player | undefined;
  onSwap?: () => void;
  onReforgedStyleChange?: (reforgedStyle: boolean) => void;
}

const Header = ({
  player1,
  player2,
  onSwap,
  onReforgedStyleChange,
}: Properties) => {
  const handleSwapClick = () => {
    onSwap && onSwap();
  };

  const handleReforceIconClick = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    onReforgedStyleChange && onReforgedStyleChange(checked);
  };

  return (
    <div className={style.container}>
      {player1 ? <PlayerBar player={player1} /> : <div />}
      <Clock />
      {player2 ? <PlayerBar player={player2} reverse /> : <div />}
      <div className={style.controls}>
        <FormControlLabel
          control={
            <Switch onChange={handleReforceIconClick} name="reforgedStyle" />
          }
          label="HD" /* TODO Change to Reforged/Classic label */
        />
        <button className={style.swapButton} onClick={handleSwapClick}>
          <SwapIcon />
        </button>
      </div>
    </div>
  );
};

export default Header;

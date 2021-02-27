import { useState } from 'react';
import Header from '../components/Header';
import Heroes from '../components/Heroes';
import State from '../models/State';

import style from './style.module.css';

interface Props {
  data: State;
}

const Overlay = ({ data }: Props) => {
  /* Define local state hook to store the "user input" data */
  const [playerData, setPlayerData] = useState({
    player1: data.content.players[0],
    player2: data.content.players[1],
  });

  const switchPlayer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    /* Prevent button click's default behavior */
    event.preventDefault();
    /* Call the state's "setter" method to update "userInput" state */
    setPlayerData((prev) => {
      return {
        player1: prev.player2,
        player2: prev.player1,
      };
    });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header player1={playerData.player1} player2={playerData.player2} />
        <button onClick={switchPlayer}>Swap</button>
      </div>
      <div className={style.bodyLeft}>
        <Heroes player={playerData.player1} />
      </div>
      <div className={style.bodyRight}>
        <Heroes player={playerData.player2} reverse />
      </div>
    </div>
  );
};

export default Overlay;

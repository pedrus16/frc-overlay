import { useState } from 'react';
import Header from './components/Header';
import State from './models/State';

interface Props {
  data: State;
}

const Overlay = ({ data }: Props) => {

  /* Define local state hook to store the "user input" data */
  const [playerData, setPlayerData] = useState({player1: data.content.players[0],
  player2: data.content.players[1]});

  const switchPlayer = (e: { preventDefault: () => void; }) => {
      /* Prevent button click's default behavior */
      e.preventDefault();
      /* Call the state's "setter" method to update "userInput" state */
      setPlayerData((prev) => {
        return {
          player1: prev.player2,
          player2: prev.player1
          }
        }
      );
  }

  return (
    <>
      <Header
        player1={playerData.player1}
        player2={playerData.player2}
      />
      <button onClick={switchPlayer}>switch</button>
    </>
  );
};

export default Overlay;

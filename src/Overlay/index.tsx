import Header from '../components/Header';
import Heroes from '../components/Heroes';
import State from '../models/State';

import style from './style.module.css';

interface Props {
  data: State;
}

const Overlay = ({ data }: Props) => {
  const player1 = data.content.players[0];
  const player2 = data.content.players[1];

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header player1={player1} player2={player2} />
      </div>
      <div className={style.bodyLeft}>
        <Heroes player={player1} />
      </div>
      <div className={style.bodyRight}>
        <Heroes player={player2} reverse />
      </div>
    </div>
  );
};

export default Overlay;

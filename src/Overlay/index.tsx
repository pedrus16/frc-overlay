import { createContext, useMemo, useState } from 'react';
import Header from '../components/Header';
import Heroes from '../components/Heroes';
import Upgrades from '../components/Upgrades';
import State from '../models/State';

import style from './style.module.css';

export const ReforgedStyleContext = createContext(false);

interface Props {
  data: State | null;
}

const Overlay = ({ data }: Props) => {
  const [swapped, setSwapped] = useState(false);
  const [reforgedStyle, setReforgedStyle] = useState(false);

  const switchPlayer = () => {
    setSwapped((prev) => !prev);
  };

  const player1 = useMemo(
    () => (swapped ? data?.content.players[0] : data?.content.players[1]),
    [data, swapped]
  );
  const player2 = useMemo(
    () => (swapped ? data?.content.players[1] : data?.content.players[0]),
    [data, swapped]
  );

  return (
    <ReforgedStyleContext.Provider value={reforgedStyle}>
      <div className={style.container}>
        <div className={style.header}>
          <Header
            player1={player1}
            player2={player2}
            onSwap={switchPlayer}
            onReforgedStyleChange={setReforgedStyle}
          />
        </div>
        {player1 && (
          <>
            <div className={style.heroLeft}>
              <Heroes player={player1} />
            </div>
            <div className={style.upgradesLeft}>
              <Upgrades upgrades={player1.upgrades_completed} />
            </div>
          </>
        )}
        {player2 && (
          <>
            <div className={style.heroRight}>
              <Heroes player={player2} reverse />
            </div>
            <div className={style.upgradesRight}>
              <Upgrades upgrades={player2.upgrades_completed} reverse />
            </div>
          </>
        )}
      </div>
    </ReforgedStyleContext.Provider>
  );
};

export default Overlay;

import { useEffect, useMemo, useState } from 'react';

import Heroes from '../components/Heroes';
import Production from '../components/Production';
import Research from '../components/Research';
import { ReforgedStyleContext } from '../contexts';
import State from '../models/State';
import { buildPlayerData } from './buildData';
import useLocalStorage from '../Settings/useLocalStorage';

import style from './style.module.css';
import PlayerBar from '../components/PlayerBar';
import { toBoolean, msToTime } from '../utils';

interface ProductionAndResearchProps {
  buildings: any[];
  units: any[];
  researches: any[];
}

const ProductionAndResearch = ({
  buildings,
  units,
  researches,
}: ProductionAndResearchProps) => {
  return (
    <>
      <div className={style.production}>
        {buildings.map((building, index) => (
          <Production
            key={index}
            id={building.id}
            progressPercent={building.progress_percent}
          />
        ))}
      </div>
      <div className={style.production}>
        {units.map((unit, index) => (
          <Production
            key={index}
            id={unit.id}
            progressPercent={unit.progress_percent}
          />
        ))}
      </div>
      <div className={style.research}>
        {researches.map((upgrade, index) => (
          <Research
            key={index}
            id={upgrade.id}
            progressPercent={upgrade.progress_percent}
          />
        ))}
      </div>
    </>
  );
};

interface GameTimeProps {
  time: number;
}

const GameClock = ({ time }: GameTimeProps) => {
  const refreshRateMs = 1000;
  const [currentTime, setCurrentTime] = useState(time);

  useEffect(() => {
    setCurrentTime(time);
    const id = setInterval(() => {
      setCurrentTime((prev) => prev + refreshRateMs);
    }, refreshRateMs);

    return () => clearInterval(id);
  }, [time]);

  return <div className={style.gameClock}>{msToTime(currentTime)}</div>;
};

interface Props {
  state: State;
}

const Overlay = ({ state }: Props) => {
  const [swapped] = useLocalStorage('swapped');
  const [reforgedStyle] = useLocalStorage('reforgedStyle');
  const [scoreP1] = useLocalStorage('scoreP1');
  const [scoreP2] = useLocalStorage('scoreP2');

  const player1 = useMemo(
    () =>
      buildPlayerData(
        toBoolean(swapped) ? state.content.players[0] : state.content.players[1]
      ),
    [state, swapped]
  );
  const player2 = useMemo(
    () =>
      buildPlayerData(
        toBoolean(swapped) ? state.content.players[1] : state.content.players[0]
      ),
    [state, swapped]
  );

  const p1Style = { '--team-color': player1.color } as React.CSSProperties;
  const p2Style = { '--team-color': player2.color } as React.CSSProperties;
  const gameTime = state.content.game.game_time;

  return (
    <ReforgedStyleContext.Provider value={toBoolean(reforgedStyle)}>
      <div className={style.container}>
        <div className={style.leftSide} style={p1Style}>
          <PlayerBar
            playerName={player1.playerName}
            apm={player1.apm}
            army={player1.army}
            resources={player1.resources}
            upgrades={player1.upgrades}
            techLevel={player1.techLevel}
            score={scoreP1}
          />
          <Heroes className={style.heroes} heroes={player1.heroes} />
          <div className={style.researchAndProduction}>
            <ProductionAndResearch
              buildings={player1.production.buildings}
              units={player1.production.units}
              researches={player1.research}
            />
          </div>
        </div>
        <div className={style.rightSide} style={p2Style}>
          <PlayerBar
            reverse
            playerName={player2.playerName}
            apm={player2.apm}
            army={player2.army}
            resources={player2.resources}
            upgrades={player2.upgrades}
            techLevel={player2.techLevel}
            score={scoreP2}
          />
          <Heroes className={style.heroes} reverse heroes={player2.heroes} />
          <div className={`${style.researchAndProduction} ${style.reverse}`}>
            <ProductionAndResearch
              buildings={player2.production.buildings}
              units={player2.production.units}
              researches={player2.research}
            />
          </div>
        </div>
      </div>
      <div className={style.gameClockContainer}>
        <GameClock time={gameTime} />
      </div>
    </ReforgedStyleContext.Provider>
  );
};

export default Overlay;

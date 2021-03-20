import { CSSProperties, useEffect, useMemo, useState } from 'react';

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

interface SideProps {
  player: ReturnType<typeof buildPlayerData> | null;
  score: number | null;
  country: string | null;
}

const LeftSide = ({ player, score, country }: SideProps) => {
  const teamColorStyle = player
    ? ({
        '--team-color': player.color,
      } as CSSProperties)
    : undefined;

  return (
    <div className={style.leftSide} style={teamColorStyle}>
      {player !== null && (
        <PlayerBar
          playerName={player.playerName}
          apm={player.apm}
          army={player.army}
          resources={player.resources}
          upgrades={player.upgrades}
          techLevel={player.techLevel}
          score={score}
          country={country}
        />
      )}
      {player !== null && (
        <>
          <div className={style.heroes}>
            <div className={style.ingameHeroCover} />
            <Heroes heroes={player.heroes} />
          </div>
          <div className={style.researchAndProduction}>
            <ProductionAndResearch
              buildings={player.production.buildings}
              units={player.production.units}
              researches={player.research}
            />
          </div>
        </>
      )}
    </div>
  );
};

const RightSide = ({ player, score, country }: SideProps) => {
  if (!player) {
    return null;
  }

  const teamColorStyle = {
    '--team-color': player.color,
  } as CSSProperties;

  return (
    <div className={style.rightSide} style={teamColorStyle}>
      <PlayerBar
        reverse
        playerName={player.playerName}
        apm={player.apm}
        army={player.army}
        resources={player.resources}
        upgrades={player.upgrades}
        techLevel={player.techLevel}
        score={score}
        country={country}
      />
      <Heroes className={style.heroes} reverse heroes={player.heroes} />
      <div className={`${style.researchAndProduction} ${style.reverse}`}>
        <ProductionAndResearch
          buildings={player.production.buildings}
          units={player.production.units}
          researches={player.research}
        />
      </div>
    </div>
  );
};

interface Props {
  state: State;
}

const Overlay = ({ state }: Props) => {
  const [swapped] = useLocalStorage('swapped');
  const [reforgedStyle] = useLocalStorage('reforgedStyle');
  const [scoreP1] = useLocalStorage('scoreP1');
  const [scoreP2] = useLocalStorage('scoreP2');
  const [country1] = useLocalStorage('country1');
  const [country2] = useLocalStorage('country2');

  const player1Data = useMemo(
    () => ({
      player: state.content.players[0]
        ? buildPlayerData(state.content.players[0])
        : null,
      score: scoreP1 ? parseInt(scoreP1) : null,
      country: country1,
    }),
    [state, scoreP1, country1]
  );

  const player2Data = useMemo(
    () => ({
      player: state.content.players[1]
        ? buildPlayerData(state.content.players[1])
        : null,
      score: scoreP2 ? parseInt(scoreP2) : null,
      country: country2,
    }),
    [state, scoreP2, country2]
  );

  const gameTime = state.content.game.game_time;

  const leftSideProps = useMemo(
    () => (toBoolean(swapped) ? player2Data : player1Data),
    [swapped, player1Data, player2Data]
  );

  const rightSideProps = useMemo(
    () => (toBoolean(swapped) ? player1Data : player2Data),
    [swapped, player1Data, player2Data]
  );

  return (
    <ReforgedStyleContext.Provider value={toBoolean(reforgedStyle)}>
      <div className={style.container}>
        <LeftSide {...leftSideProps} />
        <RightSide {...rightSideProps} />
      </div>
      <div className={style.gameClockContainer}>
        <GameClock time={gameTime} />
      </div>
    </ReforgedStyleContext.Provider>
  );
};

export default Overlay;

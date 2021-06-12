import { useEffect, useMemo, useRef, useState } from 'react';

import Heroes from '../components/Heroes';
import Production from '../components/Production';
import Research from '../components/Research';
import { GameStateContext, ReforgedStyleContext } from '../contexts';
import State from '../models/State';
import { buildPlayerData } from './buildData';
import useLocalStorage from '../Settings/useLocalStorage';
import PlayerBar from '../components/PlayerBar';
import { toBoolean } from '../utils';
import GameTime from './components/GameTime';
import teamColorStyle from '../utils/teamColorStyle';
import GoldGraphModal from './components/GoldGraphModal';
import ExperienceGraphModal from './components/ExperienceGraphModal';
import TwoPlayersBar from '../components/TwoPlayersBar';

import style from './style.module.css';

const REFRESH_RATE_MS = 2000;

function buildGraphLabel(players: Array<{ playerName: string }>) {
  return players.length > 1
    ? `${players[0].playerName} - ${players[1].playerName}`
    : players[0].playerName;
}

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

interface SideProps {
  players: Array<ReturnType<typeof buildPlayerData>>;
  score: number | null;
  country: string | null;
  side?: 'left' | 'right';
}

const TeamPanel = ({ players, score, country, side = 'left' }: SideProps) => {
  if (players.length === 0) {
    return null;
  }

  return (
    <div
      className={side === 'left' ? style.leftSide : style.rightSide}
      style={teamColorStyle(players[0].color)}
    >
      {players.length > 1 ? (
        <TwoPlayersBar reverse={side === 'right'} />
      ) : (
        <PlayerBar
          reverse={side === 'right'}
          playerName={players[0].playerName}
          apm={players[0].apm}
          army={players[0].army}
          resources={players[0].resources}
          upgrades={players[0].upgrades}
          techLevel={players[0].techLevel}
          score={score}
          country={country}
        />
      )}
      <div className={style.heroes}>
        {side === 'left' && <div className={style.ingameHeroCover} />}
        <Heroes
          heroes={players[0].heroes}
          reverse={side === 'right'}
          compact={players.length > 1}
        />
        {players.length > 1 && (
          <Heroes
            heroes={players[1].heroes}
            reverse={side === 'right'}
            compact
          />
        )}
      </div>
      <div
        className={`${style.researchAndProduction} ${
          side === 'right' ? style.reverse : ''
        }`}
      >
        <ProductionAndResearch
          buildings={players[0].production.buildings}
          units={players[0].production.units}
          researches={players[0].research}
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
  const [scoreTeam1] = useLocalStorage('scoreTeam1');
  const [scoreTeam2] = useLocalStorage('scoreTeam2');
  const [country1] = useLocalStorage('country1');
  const [country2] = useLocalStorage('country2');
  const [gameSpeed, setGameSpeed] = useState(0);
  const prevGameTime = useRef(state.content.game.game_time);
  const [showGraph] = useLocalStorage('graph');

  useEffect(() => {
    setGameSpeed(
      Math.max(0, state.content.game.game_time - prevGameTime.current) /
        REFRESH_RATE_MS
    );
    prevGameTime.current = state.content.game.game_time;
  }, [state]);

  const teamsData = useMemo(() => {
    return {
      team1: {
        players: state.content.players
          .filter((player) => player.team_index === 0)
          .map((player) => buildPlayerData(player)),
        score: scoreTeam1 ? parseInt(scoreTeam1) : null,
        country: country1,
      },
      team2: {
        players: state.content.players
          .filter((player) => player.team_index === 1)
          .map((player) => buildPlayerData(player)),
        score: scoreTeam2 ? parseInt(scoreTeam2) : null,
        country: country2,
      },
    };
  }, [state, scoreTeam1, scoreTeam2, country1, country2]);

  const gameTime = state.content.game.game_time;

  const leftSideProps = useMemo(
    () => (toBoolean(swapped) ? teamsData.team2 : teamsData.team1),
    [swapped, teamsData]
  );

  const rightSideProps = useMemo(
    () => (toBoolean(swapped) ? teamsData.team1 : teamsData.team2),
    [swapped, teamsData]
  );

  return (
    <GameStateContext.Provider value={{ gameSpeed }}>
      <ReforgedStyleContext.Provider value={toBoolean(reforgedStyle)}>
        <div className={style.gameTimeContainer}>
          <GameTime time={gameTime} />
        </div>
        <div className={style.container}>
          <TeamPanel {...leftSideProps} side="left" />
          <TeamPanel {...rightSideProps} side="right" />
        </div>
        <ExperienceGraphModal
          show={showGraph === 'xp'}
          state={state}
          team1Label={buildGraphLabel(teamsData.team1.players)}
          team1Color={teamsData.team1.players[0].color}
          team2Label={buildGraphLabel(teamsData.team2.players)}
          team2Color={teamsData.team2.players[0].color}
        />
        <GoldGraphModal
          show={showGraph === 'gold'}
          state={state}
          team1Label={buildGraphLabel(teamsData.team1.players)}
          team1Color={teamsData.team1.players[0].color}
          team2Label={buildGraphLabel(teamsData.team2.players)}
          team2Color={teamsData.team2.players[0].color}
        />
      </ReforgedStyleContext.Provider>
    </GameStateContext.Provider>
  );
};

export default Overlay;

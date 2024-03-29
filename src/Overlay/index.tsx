import { useEffect, useMemo, useRef, useState } from 'react';

import Heroes from '../components/Heroes';
import Production from '../components/Production';
import Research from '../components/Research';
import { GameStateContext, ReforgedStyleContext } from '../contexts';
import State from '../models/State';
import { buildPlayerData } from './buildData';
import PlayerBar from '../components/PlayerBar';
import GameTime from './components/GameTime';
import teamColorStyle from '../utils/teamColorStyle';
import GoldGraphModal from './components/GoldGraphModal';
import ExperienceGraphModal from './components/ExperienceGraphModal';
import TwoPlayersBar from '../components/TwoPlayersBar';
import { default as ResearchModel } from '../models/Research';
import Building from '../models/Building';
import Settings from '../models/Settings';

import style from './style.module.css';

const REFRESH_RATE_MS = 2000;

function buildGraphLabel(players: Array<{ playerName: string }>) {
  return players.length > 1
    ? `${players[0].playerName} - ${players[1].playerName}`
    : players[0].playerName;
}

interface ProductionAndResearchProps {
  player1: {
    color: string;
    buildings: Building[];
    units: ResearchModel[];
    researches: Array<{ id: string; progress_percent: number }>;
  };
  player2: {
    color: string;
    buildings: Building[];
    units: ResearchModel[];
    researches: Array<{ id: string; progress_percent: number }>;
  } | null;
}

const ProductionAndResearch = ({
  player1,
  player2,
}: ProductionAndResearchProps) => {
  const player1ColorStyle = teamColorStyle(player1.color);
  const player2ColorStyle = player2 ? teamColorStyle(player2.color) : undefined;

  return (
    <>
      <div className={style.production}>
        {player1.buildings.map((building, index) => (
          <Production
            key={index}
            id={building.id}
            progressPercent={building.progress_percent}
            style={player1ColorStyle}
          />
        ))}
      </div>
      <div className={style.production}>
        {player1.units.map((unit, index) => (
          <Production
            key={index}
            id={unit.id}
            progressPercent={unit.progress_percent}
            style={player1ColorStyle}
          />
        ))}
      </div>
      {!player2 ? (
        <div className={style.research}>
          {player1.researches.map((upgrade, index) => (
            <Research
              key={index}
              id={upgrade.id}
              progressPercent={upgrade.progress_percent}
              style={player1ColorStyle}
            />
          ))}
        </div>
      ) : (
        <div className={style.production}>
          {player1.researches.map((upgrade, index) => (
            <Production
              key={index}
              id={upgrade.id}
              progressPercent={upgrade.progress_percent}
              style={player1ColorStyle}
            />
          ))}
        </div>
      )}

      {player2 && (
        <>
          <div className={style.production}>
            {player2.buildings.map((building, index) => (
              <Production
                key={index}
                id={building.id}
                progressPercent={building.progress_percent}
                style={player2ColorStyle}
              />
            ))}
          </div>
          <div className={style.production}>
            {player2.units.map((unit, index) => (
              <Production
                key={index}
                id={unit.id}
                progressPercent={unit.progress_percent}
                style={player2ColorStyle}
              />
            ))}
          </div>
          <div className={style.production}>
            {player2.researches.map((upgrade, index) => (
              <Production
                key={index}
                id={upgrade.id}
                progressPercent={upgrade.progress_percent}
                style={player2ColorStyle}
              />
            ))}
          </div>
        </>
      )}
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
  const player1Production = useMemo(
    () => ({
      color: players[0].color,
      buildings: players[0].production.buildings,
      units: players[0].production.units,
      researches: players[0].research,
    }),
    [players]
  );

  const player2Production = useMemo(() => {
    if (players.length < 2) {
      return null;
    }

    return {
      color: players[1].color,
      buildings: players[1].production.buildings,
      units: players[1].production.units,
      researches: players[1].research,
    };
  }, [players]);

  if (players.length === 0) {
    return null;
  }

  const twoPlayers = players.length > 1;

  return (
    <div
      className={side === 'left' ? style.leftSide : style.rightSide}
      style={teamColorStyle(players[0].color)}
    >
      {twoPlayers ? (
        <TwoPlayersBar reverse={side === 'right'} players={players} />
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
      <div className={`${style.heroes} ${twoPlayers ? style.compact : ''}`}>
        {side === 'left' && players.length === 1 && (
          <div className={style.ingameHeroCover} />
        )}
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
          player1={player1Production}
          player2={player2Production}
        />
      </div>
    </div>
  );
};

interface Props {
  state: State;
  settings: Settings | null;
}

const Overlay = ({ state, settings }: Props) => {
  const [gameSpeed, setGameSpeed] = useState(0);
  const prevGameTime = useRef(state.game.game_time);

  useEffect(() => {
    setGameSpeed(
      Math.max(0, state.game.game_time - prevGameTime.current) / REFRESH_RATE_MS
    );
    prevGameTime.current = state.game.game_time;
  }, [state]);

  const teamsData = useMemo(() => {
    const indexes = state.players.reduce((indexes, player) => {
      if (!indexes.includes(player.team_index)) {
        return indexes.concat(player.team_index);
      }

      return indexes;
    }, [] as number[]);

    return {
      team1: {
        players: state.players
          .filter((player) => player.team_index === indexes[0])
          .map((player) => buildPlayerData(player)),
        score: settings?.scoreTeam1 === undefined ? null : settings?.scoreTeam1,
        country: settings?.country1 || null,
      },
      team2: {
        players: state.players
          .filter((player) => player.team_index === indexes[1])
          .map((player) => buildPlayerData(player)),
        score: settings?.scoreTeam2 === undefined ? null : settings?.scoreTeam2,
        country: settings?.country2 || null,
      },
    };
  }, [state, settings]);

  const gameTime = state.game.game_time;

  const leftSideProps = useMemo(
    () => (settings?.swapped ? teamsData.team2 : teamsData.team1),
    [settings, teamsData]
  );

  const rightSideProps = useMemo(
    () => (settings?.swapped ? teamsData.team1 : teamsData.team2),
    [settings, teamsData]
  );

  return (
    <GameStateContext.Provider value={{ gameSpeed }}>
      <ReforgedStyleContext.Provider value={settings?.reforgedIcons || false}>
        <div className={style.gameTimeContainer}>
          <GameTime time={gameTime} />
        </div>
        <div className={style.container}>
          <TeamPanel {...leftSideProps} side="left" />
          <TeamPanel {...rightSideProps} side="right" />
        </div>
        <ExperienceGraphModal
          show={settings?.graph === 'experience'}
          state={state}
          team1Label={buildGraphLabel(teamsData.team1.players)}
          team1Color={teamsData.team1.players[0].color}
          team2Label={buildGraphLabel(teamsData.team2.players)}
          team2Color={teamsData.team2.players[0].color}
        />
        <GoldGraphModal
          show={settings?.graph === 'gold'}
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

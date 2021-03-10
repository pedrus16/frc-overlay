import { useMemo } from 'react';

import Heroes from '../components/Heroes';
import Production from '../components/Production';
import UpgradeInProgress from '../components/UpgradeInProgress';
import { ReforgedStyleContext } from '../contexts';
import { ResearchType } from '../models';
import Player from '../models/Player';
import State from '../models/State';
import { buildPlayerData } from './buildData';
import useLocalStorage from '../Settings/useLocalStorage';

import style from './style.module.css';
import PlayerBar from '../components/PlayerBar';
import { toBoolean } from '../utils';

/* TODO This is not a hook! Rename with a conventionnal function name */
const usePlayerProduction = (
  player: Player | undefined
): Array<{ id: string; progress_percent: number }> => {
  if (!player) return [];

  const buildings = player.buildings_on_map.filter(
    (building) => building.progress_percent < 100
  );
  const units = player.researches_in_progress.filter(
    (research) => research.type === ResearchType.UNIT
  );

  return [...buildings, ...units];
};

interface ProductionAndResearchProps {
  productions: any[];
  researches: any[];
}

const ProductionAndResearch = ({
  productions,
  researches,
}: ProductionAndResearchProps) => {
  return (
    <>
      {productions.map((production, index) => (
        <Production
          key={index}
          id={production.id}
          progressPercent={production.progress_percent}
        />
      ))}
      {researches.map((upgrade, index) => (
        <UpgradeInProgress
          key={index}
          id={upgrade.id}
          progressPercent={upgrade.progress_percent}
        />
      ))}
    </>
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

  const player1 = useMemo(
    () =>
      toBoolean(swapped) ? state.content.players[0] : state.content.players[1],
    [state, swapped]
  );
  const player2 = useMemo(
    () =>
      toBoolean(swapped) ? state.content.players[1] : state.content.players[0],
    [state, swapped]
  );

  /* TODO Temporary variables until all of the State is converted to component data */
  const p1 = useMemo(() => buildPlayerData(player1), [player1]);
  const p2 = useMemo(() => buildPlayerData(player2), [player2]);

  const player1Production = usePlayerProduction(player1);
  const player1UpgradesInProgress =
    player1?.researches_in_progress.filter(
      (research) => research.type === ResearchType.UPGRADE
    ) || [];
  const player2Production = usePlayerProduction(player2);
  const player2UpgradesInProgress =
    player2?.researches_in_progress.filter(
      (research) => research.type === ResearchType.UPGRADE
    ) || [];

  const p1Style = { '--team-color': p1.color } as React.CSSProperties;
  const p2Style = { '--team-color': p2.color } as React.CSSProperties;

  return (
    <ReforgedStyleContext.Provider value={toBoolean(reforgedStyle)}>
      <div className={style.container}>
        <div className={style.leftSide} style={p1Style}>
          <PlayerBar
            playerName={p1.player.playerName}
            army={p1.player.army}
            resources={p1.player.resources}
            upgrades={p1.player.upgrades}
            techLevel={p1.player.techLevel}
            score={scoreP1}
          />
          <Heroes className={style.heroes} heroes={p1.heroes} />

          {player1 && (
            <>
              {/* <div className={style.upgradesLeft}>
                <Upgrades upgrades={player1.upgrades_completed} />
              </div> */}
              <div className={`${style.production}`}>
                <ProductionAndResearch
                  productions={player1Production}
                  researches={player1UpgradesInProgress}
                />
              </div>
            </>
          )}
        </div>
        <div className={style.rightSide} style={p2Style}>
          <PlayerBar
            reverse
            playerName={p2.player.playerName}
            army={p2.player.army}
            resources={p2.player.resources}
            upgrades={p2.player.upgrades}
            techLevel={p2.player.techLevel}
            score={scoreP2}
          />
          <Heroes className={style.heroes} reverse heroes={p2.heroes} />

          {player2 && (
            <>
              {/* <div className={style.upgradesRight}>
                <Upgrades upgrades={player2.upgrades_completed} reverse />
              </div> */}
              <div className={`${style.production}`}>
                <ProductionAndResearch
                  productions={player2Production}
                  researches={player2UpgradesInProgress}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </ReforgedStyleContext.Provider>
  );
};

export default Overlay;

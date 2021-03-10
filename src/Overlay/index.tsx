import { useMemo } from 'react';

import Heroes from '../components/Heroes';
import Production from '../components/Production';
import Research from '../components/Research';
import { ReforgedStyleContext } from '../contexts';
import State from '../models/State';
import { buildPlayerData } from './buildData';
import useLocalStorage from '../Settings/useLocalStorage';

import style from './style.module.css';
import PlayerBar from '../components/PlayerBar';
import { toBoolean } from '../utils';

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

  const p1Style = { '--team-color': p1.color } as React.CSSProperties;
  const p2Style = { '--team-color': p2.color } as React.CSSProperties;

  return (
    <ReforgedStyleContext.Provider value={toBoolean(reforgedStyle)}>
      <div className={style.container}>
        <div className={style.leftSide} style={p1Style}>
          <PlayerBar
            playerName={p1.playerName}
            apm={p1.apm}
            army={p1.army}
            resources={p1.resources}
            upgrades={p1.upgrades}
            techLevel={p1.techLevel}
            score={scoreP1}
          />
          <Heroes className={style.heroes} heroes={p1.heroes} />

          {player1 && (
            <>
              <div className={style.researchAndProduction}>
                <ProductionAndResearch
                  buildings={p1.production.buildings}
                  units={p1.production.units}
                  researches={p1.research}
                />
              </div>
            </>
          )}
        </div>
        <div className={style.rightSide} style={p2Style}>
          <PlayerBar
            reverse
            playerName={p2.playerName}
            apm={p2.apm}
            army={p2.army}
            resources={p2.resources}
            upgrades={p2.upgrades}
            techLevel={p2.techLevel}
            score={scoreP2}
          />
          <Heroes className={style.heroes} reverse heroes={p2.heroes} />

          {player2 && (
            <>
              <div
                className={`${style.researchAndProduction} ${style.reverse}`}
              >
                <ProductionAndResearch
                  buildings={p2.production.buildings}
                  units={p2.production.units}
                  researches={p2.research}
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

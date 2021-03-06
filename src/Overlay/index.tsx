import { createContext, useMemo, useState } from 'react';
import Header from '../components/Header';
import Heroes from '../components/Heroes';
import Production from '../components/Production';
import UpgradeInProgress from '../components/UpgradeInProgress';
import Upgrades from '../components/Upgrades';
import { ResearchType } from '../models';
import Player from '../models/Player';
import State from '../models/State';

import style from './style.module.css';

export const ReforgedStyleContext = createContext(false);

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
            <div className={`${style.production} ${style.productionLeft}`}>
              <ProductionAndResearch
                productions={player1Production}
                researches={player1UpgradesInProgress}
              />
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
            <div className={`${style.production} ${style.productionRight}`}>
              <ProductionAndResearch
                productions={player2Production}
                researches={player2UpgradesInProgress}
              />
            </div>
          </>
        )}
      </div>
    </ReforgedStyleContext.Provider>
  );
};

export default Overlay;

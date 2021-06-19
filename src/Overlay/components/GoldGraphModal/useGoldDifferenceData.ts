import { useContext, useEffect, useRef } from 'react';
import { GameStateContext } from '../../../contexts';

import useDataHistory from '../../../hooks/useDataHistory';
import Player from '../../../models/Player';
import State from '../../../models/State';

const getTeamTotalGold = (players: Player[], teamIndex: number) => {
  return players
    .filter((player) => player.team_index === teamIndex)
    .reduce((sum, player) => sum + (player.gold_mined - player.gold_taxed), 0);
};

const useGoldDifferenceData = (state: State) => {
  const { gameSpeed } = useContext(GameStateContext);
  const prevGameTime = useRef(state.game.game_time);
  const [data, addData, resetData] = useDataHistory<{
    value: number;
    gameTime: number;
  }>();

  useEffect(() => {
    if (gameSpeed === 0) return;

    const team1Gold = getTeamTotalGold(state.players, 0);
    const team2Gold = getTeamTotalGold(state.players, 1);

    addData({
      value: team1Gold - team2Gold,
      gameTime: state.game.game_time,
    });
  }, [addData, gameSpeed, state]);

  useEffect(() => {
    if (!state.game.is_in_game || state.game.game_time < prevGameTime.current) {
      resetData();
    }
    prevGameTime.current = state.game.game_time;
  }, [state, resetData]);

  return data;
};

export default useGoldDifferenceData;

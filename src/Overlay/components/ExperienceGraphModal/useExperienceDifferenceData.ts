import { useContext, useEffect, useRef } from 'react';

import { GameStateContext } from '../../../contexts';
import useDataHistory from '../../../hooks/useDataHistory';
import State from '../../../models/State';

const useExperienceDifferenceData = (state: State) => {
  const { gameSpeed } = useContext(GameStateContext);
  const prevGameTime = useRef(state.content.game.game_time);
  const [data, addData, resetData] = useDataHistory<{
    value: number;
    gameTime: number;
  }>();

  useEffect(() => {
    if (gameSpeed === 0) return;

    const p1TotalExperience = state.content.players[0].heroes.reduce(
      (sum, { experience }) => sum + experience,
      0
    );
    const p2TotalExperience = state.content.players[1].heroes.reduce(
      (sum, { experience }) => sum + experience,
      0
    );
    addData({
      value: p1TotalExperience - p2TotalExperience,
      gameTime: state.content.game.game_time,
    });
  }, [addData, gameSpeed, state]);

  useEffect(() => {
    if (
      !state.content.game.is_in_game ||
      state.content.game.game_time < prevGameTime.current
    ) {
      resetData();
    }
    prevGameTime.current = state.content.game.game_time;
  }, [state, resetData]);

  console.log(data);

  return data;
};

export default useExperienceDifferenceData;

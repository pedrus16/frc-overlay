import { useContext, useEffect, useRef } from 'react';

import { GameStateContext } from '../../../contexts';
import useDataHistory from '../../../hooks/useDataHistory';
import Hero from '../../../models/Hero';
import Player from '../../../models/Player';
import State from '../../../models/State';

const concatTeamHeroes = (players: Player[], teamIndex: number) => {
  return players
    .filter((player) => player.team_index === teamIndex)
    .reduce((heroes, player) => heroes.concat(player.heroes), [] as Hero[]);
};

const useExperienceDifferenceData = (state: State) => {
  const { gameSpeed } = useContext(GameStateContext);
  const prevGameTime = useRef(state.content.game.game_time);
  const [data, addData, resetData] = useDataHistory<{
    value: number;
    gameTime: number;
  }>();

  useEffect(() => {
    if (gameSpeed === 0) return;

    const team1Heroes = concatTeamHeroes(state.content.players, 0);
    const team1TotalExperience = team1Heroes.reduce(
      (sum, { experience }) => sum + experience,
      0
    );
    const team2Heroes = concatTeamHeroes(state.content.players, 1);
    const team2TotalExperience = team2Heroes.reduce(
      (sum, { experience }) => sum + experience,
      0
    );
    addData({
      value: team1TotalExperience - team2TotalExperience,
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

  return data;
};

export default useExperienceDifferenceData;

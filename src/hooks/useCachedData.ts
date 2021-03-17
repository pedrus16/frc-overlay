import { useRef } from 'react';

import useDataObserver from '../hooks/useDataObserver';
import State from '../models/State';

const isStateCorrupt = (state: State) => {
  const corruptedPlayer =
    state?.content?.players?.some(
      (player) => player.heroes.length + player.units_on_map.length === 0
    ) ?? 0;

  return (
    state &&
    state.type === 'state' &&
    state.content.game.is_in_game &&
    corruptedPlayer
  );
};

const useCleanedDataObserver = () => {
  const state = useDataObserver();
  const lastValidData = useRef(state);

  if (!isStateCorrupt(state)) {
    lastValidData.current = state;
  }

  return lastValidData.current;
};

export default useCleanedDataObserver;

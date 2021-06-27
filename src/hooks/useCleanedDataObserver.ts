import { useCallback, useRef } from 'react';

import useDataObserver from './useDataObserver';
import State from '../models/State';
import Settings from '../models/Settings';

const isStateCorrupt = (state: State, lastValidState: State) => {
  const playerCorrupt = state.players.some((player) => {
    const lastPlayerState = lastValidState.players.find(
      (p) => p.id === player.id
    );
    const lastHeroesLength = lastPlayerState?.heroes.length || 0;

    return (
      (player.units_on_map.length === 0 &&
        player.buildings_on_map.length === 0 &&
        player.researches_in_progress.length === 0 &&
        player.upgrades_completed.length === 0) ||
      player.heroes.length < lastHeroesLength
    );
  });

  return playerCorrupt;
};

const useCleanedDataObserver = () => {
  const { data, sendMessage } = useDataObserver();
  const lastValidState = useRef<State | null>(
    data?.type === 'state' ? (data.content as State) : null
  );
  const settings = useRef<Settings | null>(
    data?.type === 'settings' ? (data.content as Settings) : null
  );
  const setSettings = useCallback(
    (settings: Settings) => {
      sendMessage(
        JSON.stringify({ action: 'setClientSettings', content: settings })
      );
    },
    [sendMessage]
  );

  if (
    data?.type === 'state' &&
    (!lastValidState.current ||
      !isStateCorrupt(data.content, lastValidState.current))
  ) {
    lastValidState.current = data ? (data.content as State) : null;
  }

  if (data?.type === 'settings') {
    settings.current = data.content as Settings;
  }

  return {
    state: lastValidState.current,
    settings: settings.current,
    setSettings,
  };
};

export default useCleanedDataObserver;

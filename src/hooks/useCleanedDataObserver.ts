import { useCallback, useRef } from 'react';

import useDataObserver from './useDataObserver';
import State from '../models/State';
import Settings from '../models/Settings';
import Player from '../models/Player';

const isDataCorrupt = (data: any) => {
  const corruptedPlayer =
    data?.content?.players?.some(
      (player: Player) =>
        player.heroes.length + player.units_on_map.length === 0
    ) ?? 0;

  return (
    data &&
    data.type === 'state' &&
    data.content.game.is_in_game &&
    corruptedPlayer
  );
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

  if (data?.type === 'state' && !isDataCorrupt(data)) {
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

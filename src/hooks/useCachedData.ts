import { useEffect, useState } from 'react';

import useDataObserver from '../hooks/useDataObserver';

const useCachedGameData = () => {
  const { data } = useDataObserver();
  const [lastValidData, setLastValidData] = useState(data);

  useEffect(() => {
    // Empty heroes and units lists means corrupted data, we ignore the tick and keep the last valid data
    const corruptedPlayer =
      data?.content?.players?.some(
        (player) => player.heroes.length + player.units_on_map.length === 0
      ) ?? 0;

    if (
      data &&
      data.type === 'state' &&
      data.content &&
      data.content.game.is_in_game &&
      corruptedPlayer
    ) {
      return;
    }

    setLastValidData(data);
  }, [data]);

  return { data: lastValidData };
};

export default useCachedGameData;

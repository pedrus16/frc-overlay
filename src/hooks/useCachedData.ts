import { useEffect, useState } from 'react';

import useDataObserver from '../hooks/useDataObserver';

const useCachedGameData = () => {
  const { data } = useDataObserver();
  const [lastValidData, setLastValidData] = useState(data);

  useEffect(() => {
    const unitCount = data?.content.players.reduce(
      (sum, player) => player.heroes.length + player.units_on_map.length + sum,
      0
    );

    if (!data || data.type === 'state' || unitCount > 0) {
      setLastValidData(data);
    }
  }, [data]);

  return { data: lastValidData };
};

export default useCachedGameData;

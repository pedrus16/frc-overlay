import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

import { GameStateContext } from '../contexts';

const REFRESH_RATE_MS = 16;
const useRealTimeMs = (timeMs: number, countdown = false) => {
  const { gameSpeed } = useContext(GameStateContext);
  const [realtimeMs, setRealtimeMs] = useState(timeMs);

  useEffect(() => {
    if (gameSpeed === 0) return;

    const id = setInterval(() => {
      setRealtimeMs(
        (prev) => prev + REFRESH_RATE_MS * gameSpeed * (countdown ? -1 : 1)
      );
    }, REFRESH_RATE_MS / gameSpeed);

    return () => clearInterval(id);
  }, [timeMs, countdown, gameSpeed]);

  return [realtimeMs, setRealtimeMs] as [
    number,
    Dispatch<SetStateAction<number>>
  ];
};

export default useRealTimeMs;

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const REFRESH_RATE_MS = 16;
const useRealTimeMs = (timeMs: number, countdown = false) => {
  const [realtimeMs, setRealtimeMs] = useState(timeMs);

  useEffect(() => {
    const id = setInterval(() => {
      setRealtimeMs((prev) => prev + REFRESH_RATE_MS * (countdown ? -1 : 1));
    }, REFRESH_RATE_MS);

    return () => clearInterval(id);
  }, [timeMs, countdown]);

  return [realtimeMs, setRealtimeMs] as [
    number,
    Dispatch<SetStateAction<number>>
  ];
};

export default useRealTimeMs;

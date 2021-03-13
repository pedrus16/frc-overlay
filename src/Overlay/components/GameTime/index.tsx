import { useContext, useEffect, useState } from 'react';
import { GameStateContext } from '../../../contexts';
import { msToTime } from '../../../utils';

import style from './style.module.css';

interface GameTimeProps {
  time: number;
}

const GameTime = ({ time }: GameTimeProps) => {
  const refreshRateMs = 1000;
  const [currentTime, setCurrentTime] = useState(time);
  const { gameSpeed } = useContext(GameStateContext);

  useEffect(() => {
    if (gameSpeed === 0) return;

    setCurrentTime(time);
    const id = setInterval(() => {
      setCurrentTime((prev) => prev + refreshRateMs * gameSpeed);
    }, refreshRateMs / gameSpeed);

    return () => clearInterval(id);
  }, [time, gameSpeed]);

  return <div className={style.container}>{msToTime(currentTime)}</div>;
};

export default GameTime;

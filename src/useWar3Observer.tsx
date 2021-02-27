import State from './models/State';
import useWebSocket from 'react-use-websocket';

const useWar3Observer = () => {
  const { lastJsonMessage } = useWebSocket('ws://localhost:8124/', {
    onOpen: () => console.log('opened'),
    shouldReconnect: (closeEvent) => true,
  });

  return { data: lastJsonMessage as State };
};

export default useWar3Observer;

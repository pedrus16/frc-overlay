import useWebSocket from 'react-use-websocket';

import State from '../models/State';
import useMockData from './useMockData';

const useDataObserver = process.env.REACT_APP_MOCK_DATA
  ? useMockData
  : () => {
      const { lastJsonMessage } = useWebSocket('ws://localhost:8124/', {
        onOpen: () => console.log('opened'),
        shouldReconnect: (closeEvent) => true,
      });

      return { data: lastJsonMessage as State };
    };

export default useDataObserver;

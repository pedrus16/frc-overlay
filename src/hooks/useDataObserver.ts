import useWebSocket from 'react-use-websocket';

import useMockData from './useMockData';

const useDataObserver = process.env.REACT_APP_MOCK_DATA
  ? useMockData
  : () => {
      const { lastJsonMessage, sendMessage } = useWebSocket(
        'ws://localhost:8124/',
        {
          onOpen: () => console.log('opened'),
          shouldReconnect: () => true,
        }
      );

      return { data: lastJsonMessage, sendMessage };
    };

export default useDataObserver;

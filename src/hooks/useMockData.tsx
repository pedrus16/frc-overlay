import mockedData from '../mock/data-sample3.json';
import State from '../models/State';

const useMockData = () => {
  return { data: mockedData as State };
};

export default useMockData;

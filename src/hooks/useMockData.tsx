import mockedData from '../mock/data-sample4.json';
import State from '../models/State';

const useMockData = () => {
  return { data: mockedData as State };
};

export default useMockData;

import mockedData from '../mock/data-sample2.json';
import State from '../models/State';

const useMockData = () => {
  return { data: mockedData as State };
};

export default useMockData;

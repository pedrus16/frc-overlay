// import mockedData from '../mock/data-sample4.json';
import mockedData from '../mock/data-sample-empty1.json';
import State from '../models/State';

const useMockData = () => {
  return { data: mockedData as State };
};

export default useMockData;

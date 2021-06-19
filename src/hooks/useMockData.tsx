import mockedData from '../mock/2v2-sample1.json';
// import mockedData from '../mock/data-sample2.json';
// import mockedData from '../mock/data-sample-empty1.json';

const useMockData = () => {
  return { data: mockedData, sendMessage: () => {} };
};

export default useMockData;

import React from 'react';

import './App.css';
import Overlay from './Overlay';
import useWar3Observer from './useWar3Observer';

import mockedData from './mock/data-sample2.json';
import State from './models/State';

function App() {
  const { data } = useWar3Observer();
  // const data = mockedData as State;

  if (!data || data.type !== 'state') return null;

  return <Overlay data={data} />;
}

export default App;

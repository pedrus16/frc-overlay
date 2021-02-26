import React from 'react';

import './App.css';
import Overlay from './Overlay';
import useWar3Observer from './useWar3Observer';

import mockedData from './mock-data.json';
import State from './models/State';

function App() {
  // const { data } = useWar3Observer();
  const data = mockedData as State;

  return (
    <div className="App">
      <Overlay data={data} />
    </div>
  );
}

export default App;

import React from 'react';

import './App.css';
import Overlay from './Overlay';
import useDataObserver from './hooks/useWar3Observer';

function App() {
  const { data } = useDataObserver();

  if (!data || data.type !== 'state') return null;

  return <Overlay data={data} />;
}

export default App;

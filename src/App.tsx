import React from 'react';

import './App.css';
import useDataObserver from './hooks/useWar3Observer';
import { Route, HashRouter } from 'react-router-dom';
import Settings from './Settings';
import Overlay from './Overlay';

function App() {
  const { data } = useDataObserver();

  if (!data || data.type !== 'state') return null;

  return (
    <HashRouter>
      <Route path="/" exact>
        <Overlay state={data} />
      </Route>
      <Route path="/settings" exact>
        <Settings></Settings>
      </Route>
    </HashRouter>
  );
}

export default App;

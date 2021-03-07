import React from 'react';

import './App.css';
import Overlay from './Overlay';
import useDataObserver from './hooks/useWar3Observer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Settings from './Settings';

function App() {
  const { data } = useDataObserver();

  if (!data || data.type !== 'state') return null;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Overlay data={data} />
        </Route>
        <Route path="/settings" exact>
          <Settings></Settings>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

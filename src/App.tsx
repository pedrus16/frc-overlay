import React from 'react';

import './App.css';
import useDataObserver from './hooks/useWar3Observer';
import {
  BrowserRouter as Router,
  useLocation,
  Route,
  Switch,
} from 'react-router-dom';
import Settings from './Settings';
import Overlay from './Overlay';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/?settings=true" exact></Route>
        <Redirect />
      </Switch>
    </Router>
  );
}

export default App;

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Redirect = () => {
  const { data } = useDataObserver();
  let query = useQuery();
  const isSettings = query.get('settings') ? true : false;
  if (!isSettings) {
    if (!data || data.type !== 'state') return null;
  }

  return (
    <div className="overlay">
      {query.get('settings') ? <Settings></Settings> : <Overlay state={data} />}
    </div>
  );
};

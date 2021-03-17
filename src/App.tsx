import React from 'react';

import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Settings from './Settings';
import Overlay from './Overlay';
import useCleanedDataObserver from './hooks/useCachedData';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Redirect />
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
  const state = useCleanedDataObserver();
  let query = useQuery();
  const isSettings = query.get('settings') ? true : false;

  if (isSettings) {
    return <Settings></Settings>;
  }

  if (!state || state.type !== 'state' || !state.content.game.is_in_game) {
    return null;
  }

  return <Overlay state={state} />;
};

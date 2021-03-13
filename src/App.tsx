import React from 'react';

import './App.css';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import Settings from './Settings';
import Overlay from './Overlay';
import useCachedGameData from './hooks/useCachedData';

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
  const { data } = useCachedGameData();
  let query = useQuery();
  const isSettings = query.get('settings') ? true : false;

  if (isSettings) {
    return <Settings></Settings>;
  }

  if (!data || data.type !== 'state' || !data.content.game.is_in_game) {
    return null;
  }

  return <Overlay state={data} />;
};

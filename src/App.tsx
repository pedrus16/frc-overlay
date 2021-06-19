import { HashRouter, Route } from 'react-router-dom';

import State from './models/State';
import Settings from './Settings';
import Overlay from './Overlay';
import useCleanedDataObserver from './hooks/useCleanedDataObserver';
import SettingsModel from './models/Settings';

import './App.css';

function App() {
  const { state, settings, setSettings } = useCleanedDataObserver();

  const showOverlay = state?.game?.is_in_game;

  const handleSettingsChange = (value: SettingsModel) => {
    console.log('ONCHANGE', value);
    setSettings(value);
  };

  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route path="/settings" exact>
        <Settings value={settings} onChange={handleSettingsChange} />
      </Route>
      <Route path="/" exact>
        {showOverlay && <Overlay state={state as State} settings={settings} />}
      </Route>
    </HashRouter>
  );
}

export default App;

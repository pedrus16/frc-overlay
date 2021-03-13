import useLocalStorage from './useLocalStorage';
import {
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import style from './style.module.css';
import { ReactComponent as SwapIcon } from './swap.svg';
import { toBoolean } from '../utils';

import PlayerSettings from './components/PlayerSettings';
interface Props {}

const Settings = (props: Props) => {
  const [swapped, setSwapped] = useLocalStorage('swapped');
  const [, setReforgedStyle] = useLocalStorage('reforgedStyle');
  const [scoreP1, setScoreP1] = useLocalStorage('scoreP1');
  const [scoreP2, setScoreP2] = useLocalStorage('scoreP2');
  const [country1, setCountry1] = useLocalStorage('country1');
  const [country2, setCountry2] = useLocalStorage('country2');

  const swapPlayer = () => {
    setSwapped((currentValue) => {
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

  const swapHd = () => {
    setReforgedStyle((currentValue) => {
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

  const player1Settings = (
    <PlayerSettings
      score={scoreP1}
      onChangeScore={setScoreP1}
      country={country1}
      onChangeCountry={setCountry1}
    />
  );

  const player2Settings = (
    <PlayerSettings
      score={scoreP2}
      onChangeScore={setScoreP2}
      country={country2}
      onChangeCountry={setCountry2}
    />
  );
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <Button
              variant="contained"
              className={style.swapButton}
              onClick={swapPlayer}
            >
              <SwapIcon />
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <div className={style.controls}>
              <FormControlLabel
                control={
                  <Switch onChange={swapHd} name="reforgedStyle" size="small" />
                }
                label="HD"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <h2>Left Player</h2>
            {toBoolean(swapped) ? player2Settings : player1Settings}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <h2>Right Player</h2>
            {toBoolean(swapped) ? player1Settings : player2Settings}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

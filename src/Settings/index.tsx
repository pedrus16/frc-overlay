import useLocalStorage from './useLocalStorage';
import {
  TextField,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import style from './style.module.css';
import { ReactComponent as SwapIcon } from './swap.svg';

import React from 'react';
interface Props {}

const Settings = (props: Props) => {
  const [, setSwapped] = useLocalStorage('swapped');
  const [, setReforgedStyle] = useLocalStorage('reforgedStyle');
  const [scoreP1, setScoreP1] = useLocalStorage('scoreP1');
  const [scoreP2, setScoreP2] = useLocalStorage('scoreP2');

  const swapPlayer = () => {
    setSwapped((currentValue) => {
      setScoreP1(scoreP2);
      setScoreP2(scoreP1);
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

  const swapHd = () => {
    setReforgedStyle((currentValue) => {
      return currentValue === 'true' ? 'false' : 'true';
    });
  };

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
            <TextField
              id="player1"
              label="Player1"
              value={scoreP1}
              onChange={(event) => setScoreP1(event.target.value)}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <TextField
              id="standard-basic"
              label="Player2"
              value={scoreP2}
              onChange={(event) => setScoreP2(event.target.value)}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

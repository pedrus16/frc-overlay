import {
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Button,
  ButtonGroup,
} from '@material-ui/core';

import PlayerSettings from './components/PlayerSettings';
import { default as SettingsModel } from '../models/Settings';

import { ReactComponent as SwapIcon } from './swap.svg';

import style from './style.module.css';

interface Props {
  value: SettingsModel | null;
  onChange?: (value: SettingsModel) => void;
}

const Settings = ({ value: settings, onChange }: Props) => {
  const swapPlayer = () => {
    handleChange('swapped')(!settings?.swapped);
  };

  const swapHd = () => {
    handleChange('reforgedIcons')(!settings?.reforgedIcons);
  };

  const handleGraphClick = (value: 'gold' | 'experience' | null) => () => {
    handleChange('graph')(value);
  };

  const handleChange = (key: string) => (value: unknown) => {
    if (!onChange) return;

    onChange({
      ...settings,
      [key]: value,
    });
  };

  const player1Settings = (
    <PlayerSettings
      score={settings?.scoreTeam1}
      onChangeScore={handleChange('scoreTeam1')}
      country={settings?.country1 || null}
      onChangeCountry={handleChange('country1')}
    />
  );

  const player2Settings = (
    <PlayerSettings
      score={settings?.scoreTeam2}
      onChangeScore={handleChange('scoreTeam2')}
      country={settings?.country2 || null}
      onChangeCountry={handleChange('country2')}
    />
  );
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={4}>
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
        <Grid item xs={4}>
          <Paper className={style.paper}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={handleGraphClick('experience')}>XP</Button>
              <Button onClick={handleGraphClick('gold')}>Gold</Button>
              <Button onClick={handleGraphClick(null)}>Close</Button>
            </ButtonGroup>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={style.paper}>
            <div className={style.controls}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings?.reforgedIcons}
                    onChange={swapHd}
                    name="reforgedStyle"
                    size="small"
                  />
                }
                label="HD"
              />
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <h2>Left Player</h2>
            {settings?.swapped ? player2Settings : player1Settings}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={style.paper}>
            <h2>Right Player</h2>
            {settings?.swapped ? player1Settings : player2Settings}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;

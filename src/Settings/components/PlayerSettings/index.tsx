import { TextField } from '@material-ui/core';
import FlagSelect from '../FlagSelect';

import style from './style.module.css';

interface Props {
  score: string | null;
  country: string | null;
  onChangeScore: (value: string) => void;
  onChangeCountry: (value: string) => void;
  className?: string;
}

const PlayerSettings = ({
  score,
  country,
  onChangeScore,
  onChangeCountry,
  className = '',
}: Props) => {
  return (
    <>
      <div className={style.formRow}>
        <TextField
          className={style.formField}
          id="player1"
          placeholder="Score"
          value={score}
          onChange={(event) => onChangeScore(event.target.value)}
        />
      </div>
      <div className={style.formRow}>
        <FlagSelect
          value={country}
          onChange={onChangeCountry}
          className={style.flagSelector}
        />
      </div>
    </>
  );
};

export default PlayerSettings;

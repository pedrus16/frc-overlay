import { TextField } from '@material-ui/core';
import FlagSelect from '../FlagSelect';

import style from './style.module.css';

interface Props {
  score: number | undefined;
  country: string | null;
  onChangeScore: (value: number) => void;
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
          type="number"
          className={style.formField}
          id="player1"
          placeholder="Score"
          value={score === undefined ? '' : score}
          onChange={(event) => onChangeScore(parseInt(event.target.value))}
        />
      </div>
      <div className={style.formRow}>
        <FlagSelect
          value={country || ''}
          onChange={onChangeCountry}
          className={style.flagSelector}
        />
      </div>
    </>
  );
};

export default PlayerSettings;

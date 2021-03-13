import { MenuItem, Select } from '@material-ui/core';

import country from './country.json';
import style from './style.module.css';

interface Props {
  value: string | null;
  onChange: (value: string) => void;
  className?: string;
}

const FlagSelect = ({ value, onChange, className = '' }: Props) => {
  const countries = Object.keys(country);

  return (
    <Select
      className={className}
      value={value}
      onChange={(event) => onChange(event.target.value as string)}
    >
      {countries.map((key) => (
        <MenuItem value={key}>
          <div className={style.item}>
            <div className={style.flag}>
              <img src={`${process.env.PUBLIC_URL}/flags/${key}.svg`} />
            </div>
            <div>{key} </div>
          </div>
        </MenuItem>
      ))}
    </Select>
  );
};

export default FlagSelect;

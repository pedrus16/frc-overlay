import {
  createStyles,
  LinearProgress,
  Theme,
  withStyles,
} from '@material-ui/core';

import Cameo from '../Cameo';

import style from './style.module.css';

const ProductionProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 0,
    },
    colorPrimary: {
      backgroundColor: 'rgba(0 0 0 / 80%)',
    },
    bar: {
      borderRadius: 0,
      backgroundColor: 'var(--experience-color)',
      boxShadow:
        '0 3px 1px -1px rgb(255 255 255 / 50%) inset, 0 -4px 4px -2px rgb(0 0 0  / 40%) inset',
    },
  })
)(LinearProgress);

interface Props {
  id: string;
  progressPercent: number;
}

const Production = ({ id, progressPercent }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={id} />
      <ProductionProgress variant="determinate" value={progressPercent} />
    </div>
  );
};

export default Production;
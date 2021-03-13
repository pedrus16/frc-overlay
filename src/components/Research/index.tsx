import Cameo from '../Cameo';
import ProgressBar from '../ProgressBar';

import labelFR from './fr.json';

import style from './style.module.css';

export interface Props {
  id: string;
  progressPercent: number;
}

const Research = ({ id, progressPercent }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={id} width={48} height={48} />
      <div className={style.rightColumn}>
        <div className={style.label}>
          {(labelFR as Record<string, string>)[id] || 'N/A'}
        </div>
        <ProgressBar
          progressPercent={progressPercent}
          className={style.progressBackground}
          barClassName={style.progressBar}
        />
      </div>
    </div>
  );
};

export default Research;

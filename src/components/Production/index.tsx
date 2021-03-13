import Cameo from '../Cameo';
import ProgressBar from '../ProgressBar';

import style from './style.module.css';

export interface Props {
  id: string;
  progressPercent: number;
}

const Production = ({ id, progressPercent }: Props) => {
  return (
    <div className={style.container}>
      <Cameo id={id} width={48} height={48} />
      <div className={style.progress}>
        <ProgressBar
          progressPercent={progressPercent}
          className={style.progressBackground}
          barClassName={style.progressBar}
        />
      </div>
    </div>
  );
};

export default Production;

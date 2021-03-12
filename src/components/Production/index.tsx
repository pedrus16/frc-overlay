import Cameo from '../Cameo';

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
        <div className={style.progressBackground}>
          <div
            className={style.progressForeground}
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Production;

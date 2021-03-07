import style from './style.module.css';

export interface Props {
  progressPercent: number;
}

const ExperienceBar = ({ progressPercent }: Props) => (
  <div className={style.progressBackground}>
    <div
      className={style.progressForeground}
      style={{ height: `${progressPercent}%` }}
    ></div>
  </div>
);

export default ExperienceBar;

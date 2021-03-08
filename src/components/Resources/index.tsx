import style from './style.module.css';

import coinImage from './images/coin.png';
import foodImage from './images/food.png';
import treeImage from './images/tree.png';

export interface Props {
  gold: number;
  lumber: number;
  food: number;
  foodMax: number;
  className?: string;
}

const Resources = ({ gold, lumber, food, foodMax, className = '' }: Props) => (
  <div className={`${style.container} ${className}`}>
    <div className={style.resourceContainer}>
      <img className={style.icon} src={coinImage} alt="gold" />
      <span>{gold}</span>
    </div>
    <div className={style.resourceContainer}>
      <img className={style.icon} src={treeImage} alt="lumber" />
      <span>{lumber}</span>
    </div>
    <div className={style.resourceContainer}>
      <img className={style.icon} src={foodImage} alt="food" />
      <span>
        {food}/{foodMax}
      </span>
    </div>
  </div>
);

export default Resources;

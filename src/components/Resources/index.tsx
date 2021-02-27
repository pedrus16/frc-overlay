import style from './style.module.css';

import CoinImage from './coin.png';
import FoodImage from './food.png';
import LumberImage from './lumber.png';

interface Properties {
  gold: number;
  lumber: number;
  food: number;
  foodMax: number;
  reverse?: boolean;
}

const Resources = ({ gold, lumber, food, foodMax, reverse }: Properties) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass}`}>
      <div className={style.resourceContainer}>
        <img className={style.icon} src={CoinImage} alt="gold" />{' '}
        <span>{gold}</span>
      </div>
      <div className={style.resourceContainer}>
        <img className={style.icon} src={LumberImage} alt="lumber" />
        <span>{lumber}</span>
      </div>
      <div className={style.resourceContainer}>
        <img className={style.icon} src={FoodImage} alt="food" />
        <span>
          {food}/{foodMax}
        </span>
      </div>
    </div>
  );
};

export default Resources;

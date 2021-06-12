import { ReactComponent as BackgroundImage } from './images/bg.svg';

import style from './style.module.css';

export interface Props {
  reverse?: boolean;
}

const TwoPlayersBar = ({ reverse = false }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass}`}>
      <BackgroundImage className={style.backgroundImage} />
    </div>
  );
};

export default TwoPlayersBar;

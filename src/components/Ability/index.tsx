import { default as AbilityModel } from '../../models/Ability';
import Cameo from '../Cameo';

import style from './style.module.css';

interface AbilityLevelProps {
  level: number;
  levelMax: number;
}

const AbilityLevel = ({ level, levelMax }: AbilityLevelProps) => {
  const slots = [...Array(levelMax)];

  return (
    <div
      className={style.level}
      style={{ gridTemplateColumns: `repeat(${levelMax}, 1fr)` }}
    >
      {slots.map((_, index) => (
        <div
          className={`${style.slot} ${level > index ? style.active : ''}`}
        ></div>
      ))}
    </div>
  );
};

interface Props {
  ability: AbilityModel;
}

const Ability = ({ ability }: Props) => {
  if (ability.id === 'Ablr') return null;

  return (
    <div className={style.container}>
      <Cameo id={ability.id} />
      <AbilityLevel level={ability.level} levelMax={4} />
    </div>
  );
};
export default Ability;

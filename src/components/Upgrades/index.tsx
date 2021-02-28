import { default as UpgradeModel } from '../../models/Upgrade';
import Cameo from '../Cameo';

import style from './style.module.css';

interface UpgradeProps {
  upgrade: UpgradeModel;
}

export const Upgrade = ({ upgrade }: UpgradeProps) => {
  return (
    <div className={style.upgrade}>
      <Cameo id={upgrade.id} />
    </div>
  );
};

interface Props {
  upgrades: UpgradeModel[];
  reverse?: boolean;
}

const Upgrades = ({ upgrades, reverse }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass}`}>
      {upgrades.map((upgrade) => (
        <Upgrade key={upgrade.id} upgrade={upgrade} />
      ))}
    </div>
  );
};

export default Upgrades;

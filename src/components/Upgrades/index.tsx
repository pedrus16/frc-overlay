import { default as UpgradeModel } from '../../models/Upgrade';
import Cameo from '../Cameo';

import style from './style.module.css';

interface UpgradeProps {
  upgrade: UpgradeModel;
}

export const Upgrade = ({ upgrade }: UpgradeProps) => {
  const suffix = upgrade.level > 1 ? upgrade.level : '';

  return (
    <div className={style.upgrade}>
      <Cameo id={`${upgrade.id}${suffix}`} />
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

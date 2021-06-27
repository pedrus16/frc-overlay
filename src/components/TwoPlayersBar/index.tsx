import PlayerInfo from './components/PlayerInfo';
import { Props as ArmyProps } from '../Army';
import { Props as ResourcesProps } from '../Resources';

import { ReactComponent as BackgroundImage } from './images/bg.svg';

import style from './style.module.css';

const Separator = () => <div className={style.separator} />;

export interface Props {
  reverse?: boolean;
  players: Array<{
    playerName: string;
    army: ArmyProps;
    resources: ResourcesProps;
    techLevel: number;
  }>;
}

const TwoPlayersBar = ({ players, reverse = false }: Props) => {
  const reverseClass = reverse ? style.reverse : '';

  return (
    <div className={`${style.container} ${reverseClass}`}>
      <BackgroundImage className={style.backgroundImage} />
      <div className={style.players}>
        <PlayerInfo
          className={reverse ? '' : style.marginLeft}
          race={players[0].army.race}
          army={{
            population: players[0].army.population,
            workers: players[0].army.workers.count,
          }}
          playerName={players[0].playerName}
          resources={players[0].resources}
          techLevel={players[0].techLevel}
          reverse={reverse}
        />
        <Separator />
        <PlayerInfo
          className={reverse ? style.marginRight : ''}
          race={players[1].army.race}
          army={{
            population: players[1].army.population,
            workers: players[1].army.workers.count,
          }}
          playerName={players[1].playerName}
          resources={players[1].resources}
          techLevel={players[1].techLevel}
          reverse={reverse}
        />
      </div>
    </div>
  );
};

export default TwoPlayersBar;

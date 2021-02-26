import Cameo from './components/Cameo';
import State from './models/State';

interface Props {
  data: State;
}

const Overlay = ({ data }: Props) => {
  const id = data.content.players[0].heroes[0].id;

  return <Cameo id={id} />;
};

export default Overlay;

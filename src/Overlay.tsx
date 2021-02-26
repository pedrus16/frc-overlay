import Header from './components/Header';
import State from './models/State';

interface Props {
  data: State;
}

const Overlay = ({ data }: Props) => {
  return (
    <>
      <Header
        player1={data.content.players[0]}
        player2={data.content.players[1]}
      />
    </>
  );
};

export default Overlay;

import React from 'react';

import State from '../../../models/State';
import useGoldDifferenceData from './useGoldDifferenceData';
import Graph from '../Graph';
import Modal from '../Modal';

interface Props {
  show: boolean;
  state: State;
  team1Label: string;
  team1Color: string;
  team2Label: string;
  team2Color: string;
}

const GoldGraphModal = ({
  show,
  state,
  team1Label,
  team1Color,
  team2Label,
  team2Color,
}: Props) => {
  const data = useGoldDifferenceData(state);

  return (
    <Modal show={show}>
      <Graph
        title="Gold Difference"
        label="Gold"
        data={data}
        topLabel={{
          text: team1Label,
          color: team1Color,
        }}
        bottomLabel={{
          text: team2Label,
          color: team2Color,
        }}
      />
    </Modal>
  );
};

export default GoldGraphModal;

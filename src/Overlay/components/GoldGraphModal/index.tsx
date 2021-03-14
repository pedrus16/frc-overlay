import React from 'react';

import State from '../../../models/State';
import useGoldDifferenceData from './useGoldDifferenceData';
import Graph from '../Graph';
import Modal from '../Modal';

interface Props {
  show: boolean;
  state: State;
  p1Label: { playerName: string; color: string } | null;
  p2Label: { playerName: string; color: string } | null;
}

const GoldGraphModal = ({ show, state, p1Label, p2Label }: Props) => {
  const data = useGoldDifferenceData(state);

  return (
    <Modal show={show}>
      <Graph
        title="Gold Difference"
        label="Gold"
        data={data}
        topLabel={{
          text: p1Label?.playerName || '',
          color: p1Label?.color,
        }}
        bottomLabel={{
          text: p2Label?.playerName || '',
          color: p2Label?.color,
        }}
      />
    </Modal>
  );
};

export default GoldGraphModal;

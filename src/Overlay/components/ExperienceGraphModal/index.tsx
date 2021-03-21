import React from 'react';

import State from '../../../models/State';
import Graph from '../Graph';
import Modal from '../Modal';
import useExperienceDifferenceData from './useExperienceDifferenceData';

interface Props {
  show: boolean;
  state: State;
  p1Label: { playerName: string; color: string } | null;
  p2Label: { playerName: string; color: string } | null;
}

const ExperienceGraphModal = ({ show, state, p1Label, p2Label }: Props) => {
  const data = useExperienceDifferenceData(state);

  return (
    <Modal show={show}>
      <Graph
        title="XP Difference"
        label="Experience"
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

export default ExperienceGraphModal;

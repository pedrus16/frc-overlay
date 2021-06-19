import React from 'react';

import State from '../../../models/State';
import Graph from '../Graph';
import Modal from '../Modal';
import useExperienceDifferenceData from './useExperienceDifferenceData';

interface Props {
  show: boolean;
  state: State;
  team1Label: string;
  team1Color: string;
  team2Label: string;
  team2Color: string;
}

const ExperienceGraphModal = ({
  show,
  state,
  team1Label,
  team1Color,
  team2Label,
  team2Color,
}: Props) => {
  const data = useExperienceDifferenceData(state);

  return (
    <Modal show={show}>
      <Graph
        title="XP Difference"
        label="Experience"
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

export default ExperienceGraphModal;

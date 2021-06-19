import { Meta, Story } from '@storybook/react';
import { Race } from '../../../../models';

import PlayerInfo, { Props } from './index';

export default {
  title: 'Components/TwoPlayers/PlayerInfo',
  component: PlayerInfo,
} as Meta;

const Template: Story<Props> = (args) => <PlayerInfo {...args} />;

export const Base = Template.bind({});
Base.args = {
  race: Race.HUMAN,
  army: {
    soldiers: 42,
    workers: 99,
  },
  playerName: 'Foobar',
  resources: {
    food: 42,
    foodMax: 43,
    gold: 100,
    lumber: 400,
  },
  techLevel: 1,
};

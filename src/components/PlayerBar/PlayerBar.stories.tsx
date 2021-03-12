import { Meta, Story } from '@storybook/react';
import { Race } from '../../models';

import PlayerBar, { Props } from './index';

export default {
  title: 'Components/PlayerBar',
  component: PlayerBar,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => <PlayerBar {...args} />;

export const Base = Template.bind({});
Base.args = {
  army: {
    soldiers: [
      { id: 'asdfasdf', count: 1 },
      { id: 'asdfasdf', count: 2 },
      { id: 'asdfasdf', count: 1 },
      { id: 'asdfasdf', count: 1 },
    ],
    workers: { id: 'adfsdaf', count: 42 },
    population: 42,
    race: Race.HUMAN,
  },
  playerName: 'Foobar',
  resources: {
    food: 42,
    foodMax: 43,
    gold: 100,
    lumber: 400,
  },
  upgrades: [],
  reverse: false,
};

export const Reversed = Template.bind({});
Reversed.args = {
  army: {
    soldiers: [
      { id: 'asdfasdf', count: 1 },
      { id: 'asdfasdf', count: 2 },
      { id: 'asdfasdf', count: 1 },
      { id: 'asdfasdf', count: 1 },
    ],
    workers: { id: 'adfsdaf', count: 42 },
    population: 42,
    race: Race.HUMAN,
  },
  playerName: 'Foobar',
  resources: {
    food: 42,
    foodMax: 43,
    gold: 100,
    lumber: 400,
  },
  upgrades: [],
  reverse: true,
};

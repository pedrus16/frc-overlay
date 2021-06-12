import { Meta, Story } from '@storybook/react';
import { CSSProperties } from 'react';
import { Race } from '../../models';

import TwoPlayersBar, { Props } from './index';

export default {
  title: 'Components/TwoPlayers/Bar',
  component: TwoPlayersBar,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ '--team-color': '#FF00FF' } as CSSProperties}>
    <TwoPlayersBar {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  reverse: false,
  players: [
    {
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
      techLevel: 1,
    },
    {
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
      techLevel: 1,
    },
  ],
};

export const Reversed = Template.bind({});
Reversed.args = {
  ...Base.args,
  reverse: true,
};

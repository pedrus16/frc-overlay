import { Meta, Story } from '@storybook/react';

import { Race } from '../../../../models';

import ArmySummary, { Props } from './index';

export default {
  title: 'Components/Army/ArmySummary',
  component: ArmySummary,
  argTypes: {
    soldiers: {
      control: { type: 'range', min: 0 },
    },
    workers: {
      control: { type: 'range', min: 0 },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <ArmySummary {...args} />;

export const Base = Template.bind({});
Base.args = {
  race: Race.HUMAN,
  population: 25,
  workers: 10,
  reverse: false,
};

export const Reversed = Template.bind({});
Reversed.args = {
  race: Race.HUMAN,
  population: 25,
  workers: 10,
  reverse: true,
};

export const Emblem = Template.bind({});
Emblem.args = {
  race: Race.ORC,
  population: 25,
  workers: 10,
  reverse: false,
};

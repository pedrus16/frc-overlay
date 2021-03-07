import { Meta, Story } from '@storybook/react';

import HeroPortrait, { Props } from './index';

export default {
  title: 'Components/Hero/HeroPortrait',
  component: HeroPortrait,
  argTypes: {
    healthPercent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    manaPercent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    level: {
      control: {
        type: 'range',
        min: 0,
        max: 10,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <HeroPortrait {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'Haah',
  healthPercent: 100,
  manaPercent: 100,
  level: 1,
};

export const VariableHealthMana = Template.bind({});
VariableHealthMana.args = {
  id: 'Haah',
  healthPercent: 75,
  manaPercent: 25,
  level: 1,
};

export const ZeroHealth = Template.bind({});
ZeroHealth.args = {
  id: 'Haah',
  healthPercent: 0,
  manaPercent: 100,
  level: 1,
};

export const ZeroHealthZeroMana = Template.bind({});
ZeroHealthZeroMana.args = {
  id: 'Haah',
  healthPercent: 0,
  manaPercent: 0,
  level: 1,
};

export const Respawn = Template.bind({});
Respawn.args = {
  id: 'Haah',
  healthPercent: 100,
  manaPercent: 100,
  respawn: { totalDurationSec: 1, timeLeftSec: 0.5 },
  level: 1,
};

export const UnfoundId = Template.bind({});
UnfoundId.args = {
  id: 'BadID',
  healthPercent: 100,
  manaPercent: 100,
  level: 1,
};

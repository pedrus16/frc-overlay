import { Meta, Story } from '@storybook/react';

import Cooldown, { Props } from './index';

export default {
  title: 'Components/Cooldown',
  component: Cooldown,
  argTypes: {
    progressPercent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Cooldown {...args} />;

export const Base = Template.bind({});
Base.args = {
  progressPercent: 12.5,
};

export const Smaller = Template.bind({});
Smaller.args = {
  progressPercent: 12.5,
  width: 32,
  height: 32,
};

export const Bigger = Template.bind({});
Bigger.args = {
  progressPercent: 12.5,
  width: 128,
  height: 128,
};

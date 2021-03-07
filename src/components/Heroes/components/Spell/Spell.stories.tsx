import { Meta, Story } from '@storybook/react';

import Spell, { Props } from './index';

export default {
  title: 'Components/Hero/Spell',
  component: Spell,
  argTypes: {
    level: {
      control: {
        type: 'range',
        min: 1,
        max: 3,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Spell {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'AUfn',
  level: 1,
};

export const Cooldown = Template.bind({});
Cooldown.args = {
  id: 'AUfn',
  cooldown: { totalDurationSec: 10, timeLeftSec: 3 },
  level: 2,
};

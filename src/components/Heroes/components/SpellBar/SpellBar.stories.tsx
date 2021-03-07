import { Meta, Story } from '@storybook/react';

import SpellBar, { Props } from './index';

export default {
  title: 'Components/Hero/SpellBar',
  component: SpellBar,
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

const Template: Story<Props> = (args) => (
  <div style={{ background: 'var(--black-60)' }}>
    <SpellBar {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  spells: [
    { id: 'AUfn', level: 1 },
    { id: 'AUfa', level: 2 },
  ],
};

export const Full = Template.bind({});
Full.args = {
  spells: [
    { id: 'AUfn', level: 3 },
    { id: 'AUfa', level: 2 },
    { id: 'AUdr', level: 1 },
    { id: 'AUfn', level: 1 },
  ],
};

export const Cooldown = Template.bind({});
Cooldown.args = {
  spells: [
    {
      id: 'AUfn',
      level: 1,
      cooldown: { totalDurationSec: 10, timeLeftSec: 2 },
    },
    { id: 'AUfa', level: 2 },
    {
      id: 'AUdr',
      level: 2,
      cooldown: { totalDurationSec: 20, timeLeftSec: 19 },
    },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  spells: [
    { id: 'AUfn', level: 1 },
    { id: 'AUfa', level: 2 },
    { id: 'AUdr', level: 2 },
  ],
};

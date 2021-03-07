import { Meta, Story } from '@storybook/react';

import Heroes, { Props } from './index';

export default {
  title: 'Components/Hero/Heroes',
  component: Heroes,
} as Meta;

const Template: Story<Props> = (args) => <Heroes {...args} />;

export const Base = Template.bind({});
Base.args = {
  heroes: [
    {
      id: 'Haah',
      level: 1,
      spells: [
        {
          id: 'AUfn',
          level: 3,
          cooldown: { totalDurationSec: 10, timeLeftSec: 3 },
        },
        {
          id: 'AUfn',
          level: 1,
          cooldown: { totalDurationSec: 4, timeLeftSec: 2 },
        },
      ],
      experiencePercent: 42,
      healthPercent: 60,
      manaPercent: 80,
      inventory: [
        { slot: 1, id: 'AItp', charges: 1 },
        { slot: 4, id: 'AIms', charges: 0 },
      ],
      respawn: { totalDurationSec: 0, timeLeftSec: 0 },
    },
    {
      id: 'Haah',
      level: 1,
      spells: [
        {
          id: 'AUfn',
          level: 3,
          cooldown: { totalDurationSec: 10, timeLeftSec: 3 },
        },
        {
          id: 'AUfn',
          level: 1,
          cooldown: { totalDurationSec: 4, timeLeftSec: 2 },
        },
      ],
      experiencePercent: 0,
      healthPercent: 60,
      manaPercent: 80,
      inventory: [
        { slot: 1, id: 'AItp', charges: 1 },
        { slot: 4, id: 'AIms', charges: 0 },
      ],
      respawn: { totalDurationSec: 0, timeLeftSec: 0 },
    },
  ],
};

export const Reversed = Template.bind({});
Reversed.args = {
  ...Base.args,
  reverse: true,
};

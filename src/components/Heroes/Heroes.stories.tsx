import { Meta, Story } from '@storybook/react';
import { CSSProperties } from 'react';

import Heroes, { Props } from './index';

export default {
  title: 'Components/Hero/Heroes',
  component: Heroes,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ '--team-color': '#FF00FF' } as CSSProperties}>
    <Heroes {...args} />
  </div>
);

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
          levelMax: 3,
          cooldown: { totalDurationSec: 10, timeLeftSec: 3 },
        },
        {
          id: 'AUfn',
          level: 1,
          levelMax: 3,
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
      id: 'Hart',
      level: 1,
      spells: [
        {
          id: 'AUfn',
          level: 3,
          levelMax: 3,
          cooldown: { totalDurationSec: 10, timeLeftSec: 3 },
        },
        {
          id: 'AUfn',
          level: 1,
          levelMax: 3,
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

export const Compact = Template.bind({});
Compact.args = {
  ...Base.args,
  compact: true,
};

export const ReversedCompact = Template.bind({});
ReversedCompact.args = {
  ...Base.args,
  reverse: true,
  compact: true,
};

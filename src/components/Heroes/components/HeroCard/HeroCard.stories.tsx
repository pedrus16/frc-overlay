import { Meta, Story } from '@storybook/react';

import HeroCard, { Props } from './index';

export default {
  title: 'Components/Hero/HeroCard',
  component: HeroCard,
} as Meta;

const Template: Story<Props> = (args) => <HeroCard {...args} />;

export const Base = Template.bind({});
Base.args = {
  hero: {
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
        levelMax: 1,
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
};

export const Reversed = Template.bind({});
Reversed.args = {
  ...Base.args,
  reverse: true,
};

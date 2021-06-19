import { Meta, Story } from '@storybook/react';
import { CSSProperties } from 'react';

import HeroCard, { Props } from './index';

export default {
  title: 'Components/Hero/HeroCard',
  component: HeroCard,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ '--team-color': '#FF00FF' } as CSSProperties}>
    <HeroCard {...args} />
  </div>
);

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

export const Border = Template.bind({});
Border.args = {
  ...Base.args,
  showBorder: true,
};

export const BorderReverse = Template.bind({});
BorderReverse.args = {
  ...Base.args,
  reverse: true,
  showBorder: true,
};

export const CompactBorder = Template.bind({});
CompactBorder.args = {
  ...Base.args,
  compact: true,
  showBorder: true,
};

export const CompactBorderReverse = Template.bind({});
CompactBorderReverse.args = {
  ...Base.args,
  compact: true,
  reverse: true,
  showBorder: true,
};

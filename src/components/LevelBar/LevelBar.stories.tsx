import { Meta, Story } from '@storybook/react';

import LevelBar, { Props } from './index';

export default {
  title: 'Components/LevelBar',
  component: LevelBar,
  argTypes: {
    level: {
      control: {
        type: 'range',
        min: 0,
      },
    },
    levelMax: {
      control: {
        type: 'range',
        min: 0,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <LevelBar {...args} />;

export const Base = Template.bind({});
Base.args = {
  level: 1,
  levelMax: 3,
};

export const Empty = Template.bind({});
Empty.args = {
  level: 0,
  levelMax: 3,
};

export const Full = Template.bind({});
Full.args = {
  level: 3,
  levelMax: 3,
};

export const OneDot = Template.bind({});
OneDot.args = {
  level: 1,
  levelMax: 1,
};

export const OneDotEmpty = Template.bind({});
OneDotEmpty.args = {
  level: 0,
  levelMax: 1,
};

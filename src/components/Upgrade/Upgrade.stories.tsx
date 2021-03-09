import { Meta, Story } from '@storybook/react';

import Upgrade, { Props } from './index';

export default {
  title: 'Components/Upgrade',
  component: Upgrade,
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

const Template: Story<Props> = (args) => <Upgrade {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'Rosp',
  level: 1,
  levelMax: 1,
};

export const Leveled = Template.bind({});
Leveled.args = {
  id: 'Rora',
  level: 2,
  levelMax: 3,
};

import { Meta, Story } from '@storybook/react';

import Resources, { Props } from './index';

export default {
  title: 'Components/Resources',
  component: Resources,
  argTypes: {
    gold: {
      control: {
        type: 'range',
        min: 0,
        max: 9999,
      },
    },
    lumber: {
      control: {
        type: 'range',
        min: 0,
        max: 9999,
      },
    },
    food: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
    foodMax: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ background: 'var(--gray-1)' }}>
    <Resources {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  gold: 42,
  lumber: 42,
  food: 42,
  foodMax: 42,
};

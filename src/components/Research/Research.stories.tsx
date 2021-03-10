import { Meta, Story } from '@storybook/react';

import Research, { Props } from './index';

export default {
  title: 'Components/Research',
  component: Research,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    progressPercent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Research {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'Rhlh2',
  progressPercent: 50,
};

export const Empty = Template.bind({});
Empty.args = {
  id: 'Ruba',
  progressPercent: 0,
};

export const Full = Template.bind({});
Full.args = {
  id: 'Recb',
  progressPercent: 100,
};

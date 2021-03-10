import { Meta, Story } from '@storybook/react';

import Production, { Props } from './index';

export default {
  title: 'Components/Production',
  component: Production,
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

const Template: Story<Props> = (args) => <Production {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'edoc',
  progressPercent: 50,
};

export const Empty = Template.bind({});
Empty.args = {
  id: 'hrif',
  progressPercent: 0,
};

export const Full = Template.bind({});
Full.args = {
  id: 'hrif',
  progressPercent: 100,
};

export const Missing = Template.bind({});
Missing.args = {
  id: 'missingId',
  progressPercent: 100,
};

import { Meta, Story } from '@storybook/react';

import Unit, { Props } from './index';

export default {
  title: 'Components/Army/Unit',
  component: Unit,
  argTypes: {
    count: {
      control: { type: 'range', min: 0 },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Unit {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'hrif',
};

export const Count = Template.bind({});
Count.args = {
  id: 'hrif',
  count: 10,
};

export const MissingID = Template.bind({});
MissingID.args = {
  id: 'missingID',
  count: 10,
};

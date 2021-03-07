import { Meta, Story } from '@storybook/react';

import Item, { Props } from './index';

export default {
  title: 'Components/Hero/Item',
  component: Item,
  argTypes: {
    charges: {
      control: {
        type: 'range',
        min: 0,
        max: 20,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Item {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'brac',
};

export const Charges = Template.bind({});
Charges.args = {
  id: 'brac',
  charges: 1,
};

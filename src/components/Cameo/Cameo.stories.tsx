import { Meta, Story } from '@storybook/react';

import Cameo, { Props } from './index';

export default {
  title: 'Components/Cameo',
  component: Cameo,
  argTypes: {
    id: {
      control: {
        type: 'select',
        options: ['Aaha', 'Haah', 'brac', 'AUfn', 'UNKNOWN'],
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => <Cameo {...args} />;

export const Base = Template.bind({});
Base.args = {
  id: 'Aaha',
  width: 64,
  height: 64,
};

export const Small = Template.bind({});
Small.args = {
  id: 'Aaha',
  width: 32,
  height: 32,
};

export const UnfoundId = Template.bind({});
UnfoundId.args = {
  id: 'UNKNOWN',
  width: 64,
  height: 64,
};

export const SmallUnfoundId = Template.bind({});
SmallUnfoundId.args = {
  id: 'UNKNOWN',
  width: 32,
  height: 32,
};

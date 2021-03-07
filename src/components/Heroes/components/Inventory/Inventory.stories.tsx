import { Meta, Story } from '@storybook/react';

import Inventory, { Props } from './index';

export default {
  title: 'Components/Hero/Inventory',
  component: Inventory,
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ background: '#000000' }}>
    <Inventory {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  items: [
    { slot: 1, id: 'brac', charges: 0 },
    { slot: 5, id: 'brac', charges: 1 },
  ],
};

export const Full = Template.bind({});
Full.args = {
  items: [
    { slot: 1, id: 'brac', charges: 0 },
    { slot: 0, id: 'AItp', charges: 0 },
    { slot: 5, id: 'AIrl', charges: 2 },
    { slot: 2, id: 'AIms', charges: 0 },
    { slot: 3, id: 'AId2', charges: 0 },
    { slot: 4, id: 'AIm1', charges: 1 },
  ],
};

export const Empty = Template.bind({});
Empty.args = {
  items: [],
};

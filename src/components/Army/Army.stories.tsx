import { Meta, Story } from '@storybook/react';
import { Race } from '../../models';

import Army, { Props } from './index';

export default {
  title: 'Components/Army',
  component: Army,
} as Meta;

const Template: Story<Props> = (args) => <Army {...args} />;

export const Base = Template.bind({});
Base.args = {
  soldiers: [
    { id: 'hrif', count: 1 },
    { id: 'hgyr', count: 2 },
    { id: 'hfoo', count: 3 },
    { id: 'hbsh', count: 4 },
    { id: 'Hjai', count: 5 },
    { id: 'hkni', count: 6 },
  ],
  workers: { id: 'hpea', count: 42 },
  race: Race.HUMAN,
  reverse: false,
  population: 25,
};

export const Reversed = Template.bind({});
Reversed.args = {
  soldiers: [
    { id: 'hrif', count: 1 },
    { id: 'hgyr', count: 2 },
    { id: 'hfoo', count: 3 },
    { id: 'hbsh', count: 4 },
    { id: 'Hjai', count: 5 },
    { id: 'hkni', count: 6 },
  ],
  workers: { id: 'hpea', count: 42 },
  race: Race.HUMAN,
  reverse: true,
  population: 25,
};

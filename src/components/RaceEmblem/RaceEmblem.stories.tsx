import { Meta, Story } from '@storybook/react';
import { Race } from '../../models';

import RaceEmblem, { Props } from './index';

export default {
  title: 'Components/RaceEmblem',
  component: RaceEmblem,
} as Meta;

const Template: Story<Props> = (args) => <RaceEmblem {...args} />;

export const Human = Template.bind({});
Human.args = {
  race: Race.HUMAN,
};

export const Orc = Template.bind({});
Orc.args = {
  race: Race.ORC,
};

export const NighElf = Template.bind({});
NighElf.args = {
  race: Race.NIGHTELF,
};

export const Undead = Template.bind({});
Undead.args = {
  race: Race.UNDEAD,
};

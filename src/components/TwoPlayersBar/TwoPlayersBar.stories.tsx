import { Meta, Story } from '@storybook/react';
import { CSSProperties } from 'react';

import TwoPlayersBar, { Props } from './index';

export default {
  title: 'Components/TwoPlayersBar',
  component: TwoPlayersBar,
  parameters: {
    layout: 'padded',
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ '--team-color': '#FF00FF' } as CSSProperties}>
    <TwoPlayersBar {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  reverse: false,
};

export const Reversed = Template.bind({});
Reversed.args = {
  reverse: true,
};

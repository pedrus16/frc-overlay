import { Meta, Story } from '@storybook/react';

import Graph, { Props } from './index';

export default {
  title: 'Components/Graph',
  component: Graph,
} as Meta;

const Template: Story<Props> = (args) => <Graph {...args} />;

export const Base = Template.bind({});
Base.args = {
  values: [0, 10, 20, 25, 50, 200, 40, -10, -15, -15, -500],
};

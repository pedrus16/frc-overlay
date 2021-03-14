import { Meta, Story } from '@storybook/react';

import Graph, { Props } from './index';

export default {
  title: 'Components/Graph',
  component: Graph,
} as Meta;

const Template: Story<Props> = (args) => <Graph {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: [
    { value: 0, gameTime: 0 },
    { value: 10, gameTime: 2000 },
    { value: 20, gameTime: 4000 },
    { value: 25, gameTime: 6000 },
    { value: 50, gameTime: 8000 },
    { value: 200, gameTime: 10000 },
    { value: 40, gameTime: 12000 },
    { value: -10, gameTime: 14000 },
    { value: -15, gameTime: 16000 },
    { value: -15, gameTime: 18000 },
    { value: -500, gameTime: 20000 },

    { value: 0, gameTime: 22000 },
    { value: 1000, gameTime: 24000 },
    { value: 2000, gameTime: 26000 },
    { value: 2500, gameTime: 28000 },
    { value: 50, gameTime: 30000 },
    { value: 200, gameTime: 32000 },
    { value: 40, gameTime: 34000 },
    { value: -10000, gameTime: 36000 },
    { value: -1500, gameTime: 38000 },
    { value: -1500, gameTime: 40000 },
    { value: -5000, gameTime: 42000 },
  ],
};

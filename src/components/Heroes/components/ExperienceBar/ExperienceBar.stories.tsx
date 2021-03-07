import { Meta, Story } from '@storybook/react';

import ExperienceBar, { Props } from './index';

export default {
  title: 'Components/Hero/ExperienceBar',
  component: ExperienceBar,
  argTypes: {
    progressPercent: {
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
  },
} as Meta;

const Template: Story<Props> = (args) => (
  <div style={{ width: 14, height: 200 }}>
    <ExperienceBar {...args} />
  </div>
);

export const Base = Template.bind({});
Base.args = {
  progressPercent: 12.5,
};

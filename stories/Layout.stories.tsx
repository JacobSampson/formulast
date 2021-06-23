import React from 'react';

import { Meta, Story } from '@storybook/react';
import Layout from '../layouts/Layout2';

export default {
  title: 'Layouts/Layout',
  component: Layout,
} as Meta;

const Template: Story = (args) => <Layout {...args}><></></Layout>;

export const Primary = Template.bind({});
Primary.args = {}

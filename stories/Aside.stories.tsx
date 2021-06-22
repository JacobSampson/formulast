import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Aside, AsideProps } from '../components/Aside';

export default {
  title: 'Atoms/Aside',
  component: Aside,
} as Meta;

const Template: Story<AsideProps> = (args) => <Aside title='Title' description='Description' {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const LongDescription = Template.bind({});
LongDescription.args = {
  description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis culpa beatae suscipit maxime et incidunt voluptatum enim, obcaecati nihil magnam eaque delectus quis voluptates! Porro tempora natus nemo voluptas quae.'
};

import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Description, DescriptionProps } from '../components/Description';
import { HiPencilAlt, HiOutlineStar } from 'react-icons/hi';

export default {
  title: 'Atoms/Description',
  component: Description
} as Meta;

const Template: Story<DescriptionProps> = (args) => <Description title={'Title'} description={'Description'} {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  title: 'Hexadeximal / Decimal / Binary Converter',
  description: 'Convert numbers between hexadecimal/decimal/binary'
};

export const AuthorTags = Template.bind({});
AuthorTags.args = {
  title: 'Hexadeximal / Decimal / Binary Converter',
  description: 'Convert numbers between hexadecimal/decimal/binary',
  author: {
    username: 'Jacob Sampson'
  },
  tags: [
    { label: 'Software' },
    { label: 'Low-level' },
    { label: 'Programming' }
  ]
};


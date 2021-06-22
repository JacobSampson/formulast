import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, ButtonProps } from '../components/Button';
import { HiPencilAlt, HiOutlineStar } from 'react-icons/hi';

export default {
  title: 'Atoms/Button',
  component: Button
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button label={'Button'} {...args} />;

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary'
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary'
};

export const Inactive = Template.bind({});
Inactive.args = {
  variant: 'secondary',
  active: false,
  label: (<><HiOutlineStar />16.k</>)
};

export const Icon = Template.bind({});
Icon.args = {
  variant: 'primary',
  label: (<HiPencilAlt />)
};

export const Square = Template.bind({});
Square.args = {
  variant: 'secondary',
  square: true,
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: 'xlarge'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large'
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'medium'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small'
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  size: 'xsmall'
};

export const Styled = (args) => {
  return <div style={{ fontSize: '20px', fontWeight: 1000 }}>
    <Button label={'Button'} {...args} style={{ width: '10em', borderRadius: '0.1em' }}/>
  </div>
}
Styled.args = {
  active: false
}

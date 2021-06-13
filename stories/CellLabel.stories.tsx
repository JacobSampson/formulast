import React from 'react';
import { Story, Meta } from '@storybook/react';
import { CellLabel, CellLabelProps } from '../components/CellLabel';

export default {
  title: 'CellLabel',
  component: CellLabel
} as Meta;

const Template: Story<CellLabelProps> = (args) => {
  return (
    <div style={{ width: '15em', height: '4em', border: '2px solid lightgray' }}>
      <CellLabel label={'Label'} {...args} />
    </div>
  );
}

export const Default = Template.bind({});

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary'
};

export const Top = Template.bind({});
Top.args = {
  direction: 'top'
};

export const Left = Template.bind({});
Left.args = {
  direction: 'left'
};

export const Bottom = Template.bind({});
Bottom.args = {
  direction: 'bottom'
};

export const Right = Template.bind({});
Right.args = {
  direction: 'right'
};

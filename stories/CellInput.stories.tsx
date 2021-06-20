import { Story } from '@storybook/react';

import { CellInput, CellInputProps } from '../components/CellInput';

export default {
    title: 'CellInput',
    component: CellInput,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
}

const Template: Story<CellInputProps> = (args) => {
    return (
      <div style={{ width: '15em', height: '4em', border: '2px solid lightgray' }}>
        <CellInput {...args} />
      </div>
    );
  };

export const Primary = Template.bind({});
Primary.args = {}

export const Clearable = Template.bind({});
Clearable.args = {
    clearable: true
}

export const Numeric = Template.bind({});
Numeric.args = {
    clearable: true,
    type: 'number'
}

export const Function = Template.bind({});
Function.args = {
    type: 'function',
    value: '=2+6'
}

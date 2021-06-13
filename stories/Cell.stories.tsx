import { Story, Meta } from '@storybook/react';

import { Cell, CellProps } from '../components/Cell';

export default {
    title: 'Cell',
    component: Cell,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
}

const Template: Story<CellProps> = (args) => <Cell {...args} />

export const Primary = Template.bind({});
Primary.args = {}

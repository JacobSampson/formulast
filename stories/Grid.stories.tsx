import { Story } from '@storybook/react';
import { Grid, GridProps } from '../components/Grid';
import { CellModel, CellType } from '../lib/models/cell';


export default {
    title: 'Grid',
    component: Grid
}

const Template: Story<GridProps> = (args) => {
    const cells: CellModel[][] = [
        [null, null, null],
        [{ type: CellType.INPUT, props: { value: '2' } }, { type: CellType.LABEL, props: { label: 'label' } }, { type: CellType.INPUT, props: { type: 'function', value: '=2+2' } }],
        [{ type: CellType.INPUT, props: { value: '2' } }, null, { type: CellType.INPUT, props: { value: '2' } }],
    ]

    return (
        <div style={{ width: '200px', height: '150px' }}>
            <Grid cells={cells} />
        </div>
    );
  };

export const Primary = Template.bind({});
Primary.args = {}

import { Story } from '@storybook/react';
import { Grid, GridProps } from '../components/Grid';
import { testCells } from './data/test___cells';


export default {
    title: 'Molecules/Grid',
    component: Grid
}

const Template: Story<GridProps> = (args) => {
    return (
        <div style={{ width: '200px', height: '150px' }}>
            <Grid cells={testCells} />
        </div>
    );
  };

export const Filled = Template.bind({});
Filled.args = {}

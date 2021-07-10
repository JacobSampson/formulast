import { Story } from '@storybook/react';
import { useDispatch } from 'react-redux';
import { Sheet, SheetProps } from '../components/Sheet';
import { CellModel, CellType } from '../lib/models/cell';
import { loadCellValues, loadFormula } from '../lib/store';
import { testCells, testCells__UCB } from './data/test___cells';


export default {
    title: 'Molecules/Sheet',
    component: Sheet
}

const Template: Story<SheetProps> = (cells: CellModel[][], args) => {
    useDispatch()(
        loadFormula(
            JSON.stringify(cells) === '{}' ? testCells : cells,
            {
                title: 'Title',
                description: 'Convert numbers between hexadecimal/decimal/binary',
                author: {
                  username: 'Jacob Sampson'
                },
                tags: [
                  { label: 'Software' },
                  { label: 'Low-level' },
                  { label: 'Programming' }
                ]
            }
        )
    );

    return (
        <Sheet {...args} />
    );
  };

export const Filled = Template.bind({});
Filled.args = {}

export const UCB = Template.bind({}, testCells__UCB);
UCB.args = {}

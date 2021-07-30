import { Meta, Story } from '@storybook/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Layout, LayoutProps } from '../layouts/Layout';
import { CellModel } from '../lib/core';
import { loadFormula } from '../lib/client';
import { testCells, testCells__UCB } from './data/test___cells';
import * as HeaderStories from './Header.stories';


export default {
  title: 'Layouts/Page',
  component: Layout,
} as Meta;

const Template: Story<LayoutProps> = (args) => {
  useDispatch()(
    loadFormula({
      cells: testCells__UCB,
      meta: {
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
    })
  );

  return (
    <Layout {...args} />
  );
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};

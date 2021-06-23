import { Meta, Story } from '@storybook/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { Layout, LayoutProps } from '../layouts/Layout';
import { CellModel } from '../lib/models';
import { loadFunction } from '../lib/store';
import { testCells, testCells__UCB } from './data/test___cells';
import * as HeaderStories from './Header.stories';


export default {
  title: 'Layouts/Page',
  component: Layout,
} as Meta;

const Template: Story<LayoutProps> = (args) => {
  useDispatch()(
    loadFunction(
      testCells__UCB,
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
    <Layout {...args} onCreateAccount={console.log} onLogin={console.log} onLogout={console.log} />
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

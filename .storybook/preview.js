import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { globalStyle } from '../styles/global';
import { lightTheme } from '../styles/themes';
import { GridState, GridAction, DispatchType } from '../lib/store';
import reducer from '../lib/store/reducers';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const GlobalStyle = createGlobalStyle`${globalStyle}`;

const store = createStore(reducer, applyMiddleware(thunk));

export const decorators = [
  (Story) => (<div style={{ margin: '1em' }}><Story/></div>),
  (Story) => {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={lightTheme}>
          <Story/>
        </ThemeProvider>
      </>
    )
  },
  (Story) => (<Provider store={store}><Story /></Provider>)
];

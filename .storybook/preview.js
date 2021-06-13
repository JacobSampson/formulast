import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { globalStyle } from '../styles/global';
import { lightTheme } from '../styles/themes';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

const GlobalStyle = createGlobalStyle`${globalStyle}`;

export const decorators = [
  (Story) => {
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={lightTheme}>
          <div style={{ margin: '1em' }}><Story/></div>
        </ThemeProvider>
      </>
    )
  }
];

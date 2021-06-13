import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes';
import { globalStyle } from '../styles/global';
import { Button } from '../components/Button';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`${globalStyle}`;

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <>
      <GlobalStyle />
      <Button
        variant={'primary'}
        label={`Set ${theme === lightTheme ? 'light' : 'dark'} Mode`}
        onClick={() => theme === lightTheme ? darkTheme : lightTheme}
      />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default App;

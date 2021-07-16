import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes';
import { globalStyle } from '../styles/global';
import { useState } from 'react';
import { Provider } from 'react-redux';
import configureAppStore from '../lib/store/store';

const GlobalStyle = createGlobalStyle`${globalStyle}`;
const store = configureAppStore();

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes';
import { globalStyle } from '../styles/global';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer, RootState } from '../lib/store/reducer';
import { RootAction } from '../lib/store';

const GlobalStyle = createGlobalStyle`${globalStyle}`;
const store = createStore(rootReducer, applyMiddleware(thunk));
// const store: Store<RootState, RootAction> = createStore(rootReducer, applyMiddleware(thunk));

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

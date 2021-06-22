import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes';
import { globalStyle } from '../styles/global';
import { Button } from '../components/Button';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, Store } from 'redux';
import reducer from '../lib/store/reducers';
import thunk from 'redux-thunk';
import { DispatchType, GridAction, GridState } from '../lib/store';

const GlobalStyle = createGlobalStyle`${globalStyle}`;
const store: Store<GridState, GridAction> & {
  dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk));

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

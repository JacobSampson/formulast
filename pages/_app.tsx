import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../styles/themes';
import { globalStyle } from '../styles/global';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import configureAppStore from '../lib/client/store/store';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`${globalStyle}`;
const store = configureAppStore();

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);
  const router = useRouter();

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <PostHogProvider client={posthog}>
      <Provider store={store}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </PostHogProvider>
  );
}

export default App;

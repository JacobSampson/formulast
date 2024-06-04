import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export default function configureAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}

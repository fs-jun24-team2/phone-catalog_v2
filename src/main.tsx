import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { store } from './app/store';
import i18n from './i18n';
import { Root } from './Root';
import { ThemeProvider } from './context/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <Root />
        </I18nextProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

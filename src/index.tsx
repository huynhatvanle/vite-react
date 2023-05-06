import React, { lazy, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { Spin } from '@core/spin';
import { GlobalFacade, setupStore } from '@store';
import { reportWebVitals } from '@utils';
import Router from './router';

const fallbackLng = localStorage.getItem('i18nextLng');
if (!fallbackLng) {
  localStorage.setItem('i18nextLng', 'en');
}
i18n
  .use(XHR)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    fallbackLng: fallbackLng || 'en',
    interpolation: {
      escapeValue: false,
    },
  });
const store = setupStore();
let container: HTMLElement;
const Styling = lazy(() => import('./utils/init/styling'));

const Context = () => {
  const { locale } = GlobalFacade();
  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)?.indexOf('temp-') === 0) {
        localStorage.removeItem(localStorage.key(i) || '');
      }
    }
  }, []);

  return (
    <Styling>
      <ConfigProvider
        locale={locale}
        theme={{
          token: {
            fontFamily:
              "'Manrope', -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
          },
        }}
      >
        <Router />
      </ConfigProvider>
    </Styling>
  );
};

document.addEventListener(
  'DOMContentLoaded',
  () => {
    if (!container) {
      container = document.getElementById('root') as HTMLElement;
      const root = createRoot(container);
      root.render(
        <Suspense
          fallback={
            <Spin>
              <div className="w-screen h-screen" />
            </Spin>
          }
        >
          <Provider store={store}>
            <Context />
          </Provider>
        </Suspense>,
      );
    }
  },
  { passive: true },
);
reportWebVitals();

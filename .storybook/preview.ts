import '../src/assets/styles/index.less';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import i18n from './i18next';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  i18n,
  locale: 'en',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

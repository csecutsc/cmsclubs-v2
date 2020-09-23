import { action } from '@storybook/addon-actions';
import '../src/utils/styles/index.scss';
import './index.scss';

global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};

global.__BASE_PATH__ = '/';
window.___navigate = (pathname) => action('NavigateTo:')(pathname);

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [`Documentation`, `Components`],
      method: `alphabetical`,
    },
  },
};

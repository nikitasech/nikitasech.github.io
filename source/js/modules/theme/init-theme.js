import {Theme} from './theme';

export const initTheme = () => {
  const pageElement = document.querySelector('[data-page]');
  const theme = new Theme(pageElement);

  theme.addListeners();
};

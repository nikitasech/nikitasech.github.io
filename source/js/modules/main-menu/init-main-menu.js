import {MainMenu} from './main-menu';

export const initMainMenu = () => {
  const mainMenuElement = document.querySelector('[data-main-header]');
  const mainMenu = new MainMenu(mainMenuElement);

  mainMenu.init();
}

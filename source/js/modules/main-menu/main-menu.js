import {toggleButton} from './../../utils/toggle-button';

export class MainMenu {
  constructor(headerElement) {
    this.headerElement = headerElement;
    this.menuElement = headerElement.querySelector('[data-main-menu]');
    this.buttonElement = headerElement.querySelector('[data-main-menu-toggler]');
  }

  toggle() {
    this.headerElement.classList.toggle('is-menu-opened');
    this.menuElement.classList.toggle('is-opened');
    toggleButton(this.buttonElement);
  }

  buttoncClickHandler(evt) {
    evt.preventDefault();

    this.toggle();
  }

  addListeners() {
    this.buttonElement.addEventListener('click', this.buttoncClickHandler.bind(this));
  }

  init() {
    this.toggle();

    setTimeout(() => {
      this.headerElement.classList.add('is-animations');
      this.menuElement.classList.add('is-animations');
    });

    this.addListeners();
  }
}

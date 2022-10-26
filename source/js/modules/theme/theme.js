import {toggleButton} from './../../utils/toggle-button';

export class Theme {
  constructor(pageElement) {
    this.pageElement = pageElement;
    this.buttonElements = pageElement.querySelectorAll('[data-theme-toggler]');
  }

  toggle() {
    this.pageElement.classList.toggle('is-light-theme');
  }

  buttonClickHundler() {
    this.buttonElements.forEach((element) => {
      toggleButton(element);
    });
    this.toggle();
  }

  addListeners() {
    this.buttonElements.forEach((element) => {
      element.addEventListener('click', this.buttonClickHundler.bind(this, element));
    });
  }
}

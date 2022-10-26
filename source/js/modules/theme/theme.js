import {toggleButton} from './../../utils/toggle-button';

export class Theme {
  constructor(pageElement) {
    this.pageElement = pageElement;
    this.buttonElements = pageElement.querySelectorAll('[data-theme-toggler]');
    this.aboutPreviewElements = pageElement.querySelectorAll('[data-about-preview]');
  }

  toggleAboutPreview() {
    this.aboutPreviewElements.forEach((element) => {
      element.classList.toggle('is-hidden');
    });
  }

  toggleButtons() {
    this.buttonElements.forEach((element) => {
      toggleButton(element);
    });
  }

  toggle() {
    this.pageElement.classList.toggle('is-light-theme');
  }

  buttonClickHundler() {
    this.toggleButtons();
    this.toggleAboutPreview();
    this.toggle();
  }

  // var themeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  // themeQuery.addEventListener('change', setColorScheme(getPreferredColorScheme()));

  addListeners() {
    this.buttonElements.forEach((element) => {
      element.addEventListener('click', this.buttonClickHundler.bind(this, element));
    });
  }
}

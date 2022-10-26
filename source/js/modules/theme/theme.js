import {toggleButton} from './../../utils/toggle-button';

export class Theme {
  constructor(pageElement) {
    this.pageElement = pageElement;
    this.buttonElements = pageElement.querySelectorAll('[data-theme-toggler]');
    this.aboutPreviewElements = pageElement.querySelectorAll('[data-about-preview]');
    this.themeMedia = window.matchMedia('(prefers-color-scheme: light)');
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
    this.toggleButtons();
    this.toggleAboutPreview();
    this.pageElement.classList.toggle('is-light-theme');
  }

  buttonClickHundler() {
    this.toggle();
  }

  themeChangeHundler() {
    this.toggle();
  }

  addListeners() {
    this.themeMedia.addEventListener('change', this.themeChangeHundler.bind(this));
    this.buttonElements.forEach((element) => {
      element.addEventListener('click', this.buttonClickHundler.bind(this, element));
    });
  }

  init() {
    if (this.themeMedia.matches) {
      this.toggle();
    }

    this.addListeners();
  }
}

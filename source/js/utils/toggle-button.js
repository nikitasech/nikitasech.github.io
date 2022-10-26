export const toggleButton = (buttonElement) => {
  const buttonTextElement = buttonElement.querySelector('[data-toggler-text]');
  const buttonIconElements = buttonElement.querySelectorAll('[data-toggler-icon]');
  const buttonOutherText = buttonTextElement.dataset.togglerOutherText;

  buttonTextElement.dataset.togglerOutherText = buttonTextElement.textContent;
  buttonTextElement.textContent = buttonOutherText;

  buttonIconElements.forEach((element) => {
    element.classList.toggle('is-hidden');
  });
};

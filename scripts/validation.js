const settings = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(
  formElement,
  inputElement,
  errorMessage
  // errorElement
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add("modal__input_type_error");
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("modal__input_type_error");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement);
  } else {
    enableButton(buttonElement);
  }
}

const disableButton = (buttonElement) => {
  buttonElement.disabled = true;
  //add a modifier class the buttonElement and make it grey dont forget css
  buttonElement.classList.add("modal__button_disabled");
  buttonElement.classList.remove("modal__button_active");
};
const enableButton = (buttonElement) => {
  buttonElement.disabled = false;
  //remove the disabled class
  buttonElement.classList.remove("modal__button_disabled");
  buttonElement.classList.add("modal__button_active");
};

const resetValidation = (formElement, inputList) => {
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

const checkInputValidity = (formElement, inputElement) => {
  // const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage
      // errorElement
    );
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelecto);

  // formElement.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  // });

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};
// buttonElement.addEventListener("click", function () {
// toggleButtonState(inputList, buttonElement);
// });

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    // evt.preventDefault();
  });
};

enableValidation(settings);

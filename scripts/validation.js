const showInputError = (
  formElement,
  inputElement,
  errorMessage
  // errorElement
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  // inputElement.classList.add("modal__input_type_error");
  // errorElement.textContent = errorMessage;
  // errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  // inputElement.classList.remove("modal__input_type_error");
  // errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const toggleButtonState = (inputList, buttonElement) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add("modal__button_disabled");
//     buttonElement.setAttribute("disabled", true);
//   } else {
//     buttonElement.classList.remove("modal__button_disabled");
//     buttonElement.removeAttribute("disabled");
//   }
// };

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

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));
  const buttonElement = formElement.querySelector(".modal__button");

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });

  // toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // toggleButtonState(inputList, buttonElement);
    });
  });
};
// buttonElement.addEventListener("click", function () {
//   toggleButtonState(inputList, buttonElement);
// });

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    // evt.preventDefault();
  });
};

enableValidation();

function showInputError(formElement, inputElement, errorMessage, classSet) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(classSet.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classSet.errorClass);
}

function hideInputError(formElement, inputElement, classSet) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(classSet.inputErrorClass);
  errorElement.classList.remove(classSet.errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement, classSet) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      classSet
    );
  } else {
    hideInputError(formElement, inputElement, classSet);
  }
}

function setEventListeners(formElement, classSet) {
  const inputList = Array.from(
    formElement.querySelectorAll(classSet.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    classSet.submitButtonSelector
  );

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, classSet);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, classSet);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, classSet);
    });
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, classSet) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(classSet.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(classSet.inactiveButtonClass);
  }
}

function enableValidation(classSet) {
  const formList = Array.from(document.querySelectorAll(classSet.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, classSet);
  });
}


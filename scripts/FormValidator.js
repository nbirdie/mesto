export class FormValidator {
  constructor(formElement, classSet) {
    this._formElement = formElement;
    this._classSet = classSet;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._classSet.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._classSet.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._classSet.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classSet.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._classSet.inputErrorClass);
    errorElement.classList.remove(this._classSet.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._classSet.inactiveButtonClass);
    } else {
      this._buttonElement.classList.remove(this._classSet.inactiveButtonClass);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(this._inputList);
      });
    });
  }

  enableValidation() {
    this._formList = Array.from(
      document.querySelectorAll(this._classSet.formSelector)
    );
    this._formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners();
    });
  }
}

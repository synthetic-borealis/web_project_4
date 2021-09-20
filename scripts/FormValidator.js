class FormValidator {
  constructor(formClasses, formElement) {
    this._formClasses = formClasses;
    this._formElement = formElement;
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(this._formClasses.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._formClasses.errorClass);
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._formClasses.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._formClasses.errorClass);
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._formClasses.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._formClasses.inactiveButtonClass);
    }
  }

  _ignoreEnterKey(evt, inputList) {
    if (evt.key === "Enter" && this._hasInvalidInput(inputList)) {
      evt.preventDefault();
    }
  }

  _setValidationEventListeners(formElement, buttonElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._formClasses.inputSelector));

    this._toggleButtonState(inputList, buttonElement);
    // Ensure pressing enter doesn't submit unvalidated forms
    formElement.addEventListener("keydown", (evt) => this._ignoreEnterKey(evt, inputList));

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _setFormValidation(formElement) {
    const fieldsetList = Array.from(formElement.querySelectorAll(this._formClasses.fieldsetSelector));
    const buttonElement = formElement.querySelector(this._formClasses.submitButtonSelector);

    fieldsetList.forEach((fieldsetElement) => this._setValidationEventListeners(fieldsetElement, buttonElement));
  }

  resetFormValidation() {
    const fieldsetList = Array.from(this._formElement.querySelectorAll(this._formClasses.fieldsetSelector));
    const buttonElement = this._formElement.querySelector(this._formClasses.submitButtonSelector);

    fieldsetList.forEach((fieldsetElement) => {
      const inputList = Array.from(fieldsetElement.querySelectorAll(this._formClasses.inputSelector));
      inputList.forEach((inputElement) => {
        this._hideInputError(this._formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation() {
    this._setFormValidation(this._formElement);
  }
}

export default FormValidator;

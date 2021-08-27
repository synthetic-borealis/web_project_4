const formClassList = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  fieldsetSelector: ".form__fieldset",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

function showInputError(formElement, inputElement, errorMessage, formClasses) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(formClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formClasses.errorClass);
}

function hideInputError(formElement, inputElement, formClasses) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(formClasses.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(formClasses.errorClass);
}

function checkInputValidity(formElement, inputElement, formClasses) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formClasses);
  } else {
    hideInputError(formElement, inputElement, formClasses);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function setValidationEventListeners(formElement, buttonElement, formClasses) {
  const inputList = Array.from(formElement.querySelectorAll(formClasses.inputSelector));

  toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, formClasses);
      toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);
    });
  });
}

function setFormValidation(formElement, formClasses) {
  const fieldsetList = Array.from(formElement.querySelectorAll(formClasses.fieldsetSelector));
  const buttonElement = formElement.querySelector(formClasses.submitButtonSelector);

  fieldsetList.forEach((fieldsetElement) => setValidationEventListeners(fieldsetElement, buttonElement, formClasses));
}

function resetFormValidation(formElement, formClasses) {
  const fieldsetList = Array.from(formElement.querySelectorAll(formClasses.fieldsetSelector));
  const buttonElement = formElement.querySelector(formClasses.submitButtonSelector);

  fieldsetList.forEach((fieldsetElement) => {
    const inputList = Array.from(fieldsetElement.querySelectorAll(formClasses.inputSelector));
    inputList.forEach((inputElement) => {
      checkInputValidity(formElement, inputElement, formClasses);
      toggleButtonState(inputList, buttonElement, formClasses.inactiveButtonClass);
    });
  });
}

function enableValidation(formClasses) {
  const formList = Array.from(document.querySelectorAll(formClasses.formSelector));

  formList.forEach((formElement) => setFormValidation(formElement, formClasses));
}

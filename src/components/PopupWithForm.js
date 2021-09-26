import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import { formClassList } from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);

    this._form = this._container.querySelector(formClassList.formSelector);
    this._formValidator = new FormValidator(formClassList, this._form);
    this._onSubmit = submitCallback;
    this._inputList = this._form.querySelectorAll(formClassList.inputSelector);

    this._formValidator.enableValidation();
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  // The edit form needs this since its values get
  // updated when it's being opened
  resetFormValidation() {
    this._formValidator.resetFormValidation();
  }

  resetForm() {
    this._form.reset();
  }

  close() {
    super.close();
    this.resetForm();
    this.resetFormValidation();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._onSubmit(inputValues);
    });
  }
}

export default PopupWithForm;

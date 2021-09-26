import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import formClassList from "../utils/form-class-list.js";

class PopupWithForm extends Popup {
  constructor(submitCallback, popupSelector) {
    super(popupSelector);

    this._form = this._container.querySelector(".form");
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

  open() {
    this._formValidator.resetFormValidation();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputValues = this._getInputValues();
      this._onSubmit(this._inputValues);
    });
  }
}

export default PopupWithForm;

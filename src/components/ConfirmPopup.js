import Popup from "./Popup.js";
import { formClassList } from "../utils/constants.js"

class ConfirmPopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._actionCallback = null;
    this._confirmButton = this._container.querySelector(formClassList.submitButtonSelector);
  }

  setActionCallback(actionCallback) {
    this._actionCallback = actionCallback;
  }

  close() {
    this._actionCallback = null;
    super.close();
  }

  _handleConfirm = () => {
    if (typeof this._actionCallback === "function") {
      this._actionCallback();
    }
    this.close();
  };

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener("click", this._handleConfirm);
  }
}

export default ConfirmPopup;

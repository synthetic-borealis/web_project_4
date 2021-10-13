import { popupClassList } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._container = document.querySelector(popupSelector);
  }

  _handleEscClose = evt => {
    switch (evt.key) {
      case "Escape":
        this.close();
        break;
    }
  }

  _handlePopupClick = evt => {
    if (
      evt.target.classList.contains(popupClassList.closeButton)
      || evt.target === evt.currentTarget
    ) {
      this.close();
    }
  }

  open = () => {
    document.addEventListener("keydown", this._handleEscClose);
    this._container.classList.add(popupClassList.openedPopup);
  };

  close = () => {
    document.removeEventListener("keydown", this._handleEscClose);
    this._container.classList.remove(popupClassList.openedPopup);
  };

  setEventListeners() {
    this._container.addEventListener("click", this._handlePopupClick);
  }
}

export default Popup;

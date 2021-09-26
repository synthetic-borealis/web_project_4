class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._container = document.querySelector(this._selector);
  }

  _handleEscClose(evt, target) {
    switch (evt.key) {
      case "Escape":
        target.close();
        break;
    }
  }

  _handlePopupClick(evt, target) {
    if (
      evt.target.classList.contains("close-button")
      || evt.target === evt.currentTarget
    ) {
      target.close();
    }
  }

  open() {
    this._container.classList.add("popup-section_opened");
  }

  close() {
    this._container.classList.remove("popup-section_opened");
  }

  setEventListeners() {
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt, this));
    this._container.addEventListener("click", (evt) => this._handlePopupClick(evt, this));
  }
}

export default Popup;

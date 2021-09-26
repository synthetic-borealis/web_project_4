class Popup {
  constructor(popupSelector) {
    this._selector = popupSelector;
    this._container = document.querySelector(this._selector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handlePopupClick(evt) {
    if (
      evt.target.classList.contains("close-button")
      || evt.target === evt.currentTarget
      ) {
        this.close();
      }
  }

  open() {
    this._container.classList.add(`${this._selector}_opened`);
  }

  close() {
    this._container.classList.remove(`${this._selector}_opened`);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._container.addEventListener("click", this._handlePopupClick);
  }
}

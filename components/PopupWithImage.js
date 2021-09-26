import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._container.querySelector(`.image-popup__image`);
    this._caption = this._container.querySelector(`.image-popup__caption`);
  }

  _updateContent(data) {
    this._image.src = data.link;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
  }

  open(data) {
    super.open();
    this._updateContent(data);
  }
}

export default PopupWithImage;

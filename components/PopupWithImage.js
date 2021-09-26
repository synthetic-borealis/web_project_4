import Popup from "./Popup.js";
import { popupClassList } from "../utils/constants.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._image = this._container.querySelector(popupClassList.imageSelector);
    this._caption = this._container.querySelector(popupClassList.imageCaptionSelector);
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

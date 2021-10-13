import { cardClassList } from "../utils/constants.js";

class Card {
  constructor({data, cardSelector, handleCardClick, confirmPopup, api}) {
    this._name = data.name;
    this._imageLink = data.link;
    this._id = data["_id"];
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._confirmPopup = confirmPopup;
  }

  _onClickLikeButton(evt) {
    evt.target.classList.toggle(cardClassList.activeLikeButtonClass);
  }

  _onClickDeleteButton(evt) {
    evt.target.closest(cardClassList.cardSelector).remove();
  }

  _onClickImage() {
    this._handleCardClick({name: this._name, link: this._imageLink});
  }

  _setEventListeners() {
    this._buttonLike.addEventListener("click", this._onClickLikeButton);
    this._buttonDelete.addEventListener("click", this._onClickDeleteButton);
    this._image.addEventListener("click", (evt) => this._onClickImage(evt));
  }

  _getCardTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector);

    return cardElement;
  }

  getCard() {
    this._cardElement = this._getCardTemplate().content.querySelector(cardClassList.cardSelector).cloneNode(true);

    this._buttonLike = this._cardElement.querySelector(cardClassList.likeButtonSelector);
    this._buttonDelete = this._cardElement.querySelector(cardClassList.deleteButtonSelector);
    this._image = this._cardElement.querySelector(cardClassList.imageSelector);
    this._caption = this._cardElement.querySelector(cardClassList.captionSelector);

    this._image.style.backgroundImage = `url(${this._imageLink})`;
    this._image.ariaLabel = this._name;
    this._caption.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;

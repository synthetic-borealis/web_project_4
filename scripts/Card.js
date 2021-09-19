class Card {
  constructor(data, cardSelector, openImageModal) {
    this._name = data.name;
    this._imageLink = data.link;
    this._cardSelector = cardSelector;
    this._openImageModal = openImageModal;
  }

  _onClickLikeButton(evt) {
    evt.target.classList.toggle("place__like-button_active");
  }

  _onClickDeleteButton(evt) {
    evt.target.closest(".place").remove();
  }

  _onClickImage(evt) {
    this._openImageModal({name: this._name, link: this._imageLink});
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
    this._cardElement = this._getCardTemplate().content.querySelector(".place").cloneNode(true);

    this._buttonLike = this._cardElement.querySelector(".place__like-button");
    this._buttonDelete = this._cardElement.querySelector(".place__delete-button");
    this._image = this._cardElement.querySelector(".place__image");
    this._caption = this._cardElement.querySelector(".place__caption");

    this._image.style.backgroundImage = `url(${this._imageLink})`;
    this._image.ariaLabel = this._name;
    this._caption.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;

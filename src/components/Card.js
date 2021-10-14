import { cardClassList } from "../utils/constants.js";

class Card {
  constructor({data, cardSelector, handleCardClick, confirmPopup, api, userId}) {
    this._name = data.name;
    this._imageLink = data.link;
    this._likes = data.likes.length;
    this._id = data["_id"];
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._confirmPopup = confirmPopup;
    this._api = api;

    this._isLiked = data.likes.some((like) => like._id === userId);
  }

  updateLikeCounter = () => {
    this._likeCounter.textContent = this._likes;
  };

  _onClickLikeButton = () => {
    if (this._isLiked) {
      this._api.unlikeCard(this._id)
        .then(() => {
          this._isLiked = false;
          this._buttonLike.classList.remove(cardClassList.activeLikeButtonClass);
          this._likes--;
          this.updateLikeCounter();
        })
        .catch(err => console.log);
    } else {
      this._api.likeCard(this._id)
        .then(() => {
          this._isLiked = true;
          this._buttonLike.classList.add(cardClassList.activeLikeButtonClass);
          this._likes++;
          this.updateLikeCounter();
        })
        .catch(console.log);
    }
  };

  _onClickDeleteButton = (evt) => {
    this._confirmPopup.setActionCallback(() => {
      this._api.removeCard(this._id)
        .then(() => {
          evt.target.closest(cardClassList.cardSelector).remove();
        })
        .catch(console.log);
    });
    this._confirmPopup.open();
  };

  _onClickImage = () => {
    this._handleCardClick({name: this._name, link: this._imageLink});
  };

  _setEventListeners() {
    this._buttonLike.addEventListener("click", this._onClickLikeButton);
    this._buttonDelete.addEventListener("click", this._onClickDeleteButton);
    this._image.addEventListener("click", this._onClickImage);
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
    this._likeCounter = this._cardElement.querySelector(cardClassList.likeCounterSelector);

    this._image.style.backgroundImage = `url(${this._imageLink})`;
    this._image.ariaLabel = this._name;
    this._caption.textContent = this._name;
    this._likeCounter.textContent = this._likes;
    if (this._isLiked) {
      this._buttonLike.classList.add(cardClassList.activeLikeButtonClass);
    }

    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;

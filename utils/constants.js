// Initial card list
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

// Form Classes
const formClassList = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-btn",
  fieldsetSelector: ".form__fieldset",
  errorSelector: ".form__error",
  inactiveButtonClass: "form__submit-btn_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible"
};

// Popup Classes
const popupClassList = {
  openedPopup: "popup-section_opened",
  closeButton: "close-button",
  imageSelector: ".image-popup__image",
  imageCaptionSelector: ".image-popup__caption"
};

// Card Classes
const cardClassList = {
  cardSelector: ".card",
  imageSelector: ".card__image",
  captionSelector: ".card__caption",
  likeButtonSelector: ".card__like-button",
  activeLikeButtonClass: "card__like-button_active",
  deleteButtonSelector: ".card__delete-button"
};

// Container Selectors
const containerPlacesSelector = ".places";
const containerEditSelector = ".popup-section_type_edit";
const containerAddSelector = ".popup-section_type_add";
const containerImagePopupSelector = ".popup-section_type_image";

// Labels, headings, etc.
const profileNameSelector = ".profile__name";
const profileJobSelector = ".profile__job";

export {
  initialCards,
  formClassList,
  popupClassList,
  cardClassList,
  containerPlacesSelector,
  containerEditSelector,
  containerAddSelector,
  containerImagePopupSelector,
  profileNameSelector,
  profileJobSelector
};
